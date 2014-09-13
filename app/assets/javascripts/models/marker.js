WY.models.Marker = (function(){
  function Marker(params){
    this.marker_data = params.marker_data;
    
    this.point_cloud = null;
    this.geometry = null;
    this.material = null;
    this.uniforms = {};
    this.attributes = {};

    this.mercator = d3.geo.equirectangular();
    this.path = d3.geo.path().projection(this.mercator);
    this.points = [];
  }

  Marker.prototype = {
    init : function(){
      this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        attributes: this.attributes,
        vertexShader: WY.constants.ShaderLoader.shaders.basic_marker.vertex,
        fragmentShader: WY.constants.ShaderLoader.shaders.basic_marker.fragment,


        blending:     THREE.AdditiveBlending,
        depthTest:    false,
        depthWrite:   false,
        transparent:  true,
        sizeAttenuation: true      
      });


      this.set_geometries();

      this.point_cloud = new THREE.PointCloud(this.geometry, this.material);
    },

    set_geometries: function(){

      this.geometry = new THREE.Geometry();
      _.each(this.marker_data.features, _.bind(function(feature){
        var properties = feature.properties;

        this.geometry.vertices.push(this.convert_coordinates(feature.geometry.coordinates));

      }, this));

    },

    convert_coordinates: function(coordinates){
      var vertex = new THREE.Vector3();
      vertex.z = 0;
      vertex.x = coordinates[0];
      vertex.y = coordinates[1];

      return vertex;
    }

  };

  return Marker;
})();

