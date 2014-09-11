LOGPRESSO.models.Marker = (function(){
  function Marker(params){
    this.marker_data = params.marker_data;
    
    this.point_cloud = null;
    this.geometry = null;
    this.material = null;

    this.texture = THREE.ImageUtils.loadTexture( "/assets/marker_texture.png" );

    this.uniforms = {
      texture:   { type: "t", value: this.texture }
    };
    this.attributes = {
      size: {type: 'f', value: []},
      customColor: {type: 'c', value: []}
    };

    // this.mercator = d3.geo.equirectangular();
    // this.path = d3.geo.path().projection(this.mercator);
  }

  Marker.prototype = {
    init : function(){
      this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        attributes: this.attributes,
        vertexShader: LOGPRESSO.constants.ShaderLoader.shaders.basic_marker.vertex,
        fragmentShader: LOGPRESSO.constants.ShaderLoader.shaders.basic_marker.fragment,


        blending:     THREE.AdditiveBlending,
        depthTest:    false,
        depthWrite:   false,
        transparent:  true,
        sizeAttenuation: true      
      });


      this.set_geometries();

      // console.log(this.geometry.vertices);
      this.point_cloud = new THREE.PointCloud(this.geometry, this.material);
    },

    set_geometries: function(){

      var max = d3.max(this.marker_data.features, function(feature){ return feature.properties.value; });
      var min = d3.min(this.marker_data.features, function(feature){ return feature.properties.value; });
      this.geometry = new THREE.Geometry();
      _.each(this.marker_data.features, _.bind(function(feature){
        var properties = feature.properties;

        this.geometry.vertices.push(this.convert_coordinates(feature.geometry.coordinates));
        this.attributes.size.value.push(map(properties.value, min, max, 5, 50));
        this.attributes.customColor.value.push(new THREE.Color("#52CEE5"));

      }, this));
      // console.log(this.points);
    },

    convert_coordinates: function(coordinates){
      var vertex = new THREE.Vector3();
      vertex.z = 0;
      vertex.x = coordinates[0];// * Math.cos(coordinates[0]);
      vertex.y = coordinates[1];

      return vertex;
    }

  };

  return Marker;
})();

