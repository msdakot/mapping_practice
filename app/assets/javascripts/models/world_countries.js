WY.models.WorldCountries = (function(){
  function WorldCountries(params){
    this.geojson = JSON.parse(params.geojson);
    this.mercator = d3.geo.equirectangular();
    this.path = d3.geo.path().projection(this.mercator);
    this.translate = this.mercator.translate();
    this.translate[0] = 500;
    this.translate[1] = 0;

    this.mercator.translate(this.translate);
    this.mercator.scale(200);

    this.countries = [];
    this.material = null;
    this.uniforms = {};
    this.attributes = {};
  }

  WorldCountries.prototype = {
    init: function(){
      this.mesh = new THREE.Object3D();

      _.each(this.geojson.features, _.bind(function(geo_feature){
        var properties = geo_feature.properties;
        var feature = this.path(geo_feature);
        var shapes = transformSVGPathExposed(feature);

        _.each(shapes, _.bind(function(shape){
          this.countries.push({data: properties, shape: shape});
        }, this));

      }, this));

      this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        attributes: this.attributes,
        vertexShader: WY.constants.ShaderLoader.shaders.basic_line.vertex,
        fragmentShader: WY.constants.ShaderLoader.shaders.basic_line.fragment,

        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        sizeAttenuation: true
      });

      _.each(this.countries, _.bind(function(country){
        country.geometry = country.shape.extrude({
          amount: 1,
          bevelEnabled: false
        });

        country.mesh = new THREE.Line(country.geometry, this.material);
        country.mesh.rotation.x = Math.PI/2;
        country.mesh.translateX(-490);
        country.mesh.translateZ(50);
        country.mesh.translateY(20);

        this.mesh.add(country.mesh);

      }, this));


    }
  }

  return WorldCountries;
})();
