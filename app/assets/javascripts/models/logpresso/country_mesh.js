LOGPRESSO.models.CountryMesh = (function(){
  function CountryMesh(params){
    
    THREE.Mesh.call( this );
    this.material = null;
    this.uniforms = {};
    this.attributes = {
      customColor:  { type: 'c', value: [] }
    };

    this.geometry = params.geometry;
    this.color = params.color;
    this.properties = params.properties;

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      attributes: this.attributes,
      vertexShader: LOGPRESSO.constants.ShaderLoader.shaders.basic_color.vertex,
      fragmentShader: LOGPRESSO.constants.ShaderLoader.shaders.basic_color.fragment,

      blending: this.blending,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      sizeAttenuation: true
    });

  }

  CountryMesh.prototype = Object.create( THREE.Mesh.prototype );

  CountryMesh.prototype.init = function(){
    this.geometry.computeBoundingBox();
    _.each(this.geometry.vertices, _.bind(function(vertex, i){
      this.attributes.customColor.value.push(this.color.clone());
    }, this));

    // this.mesh = new THREE.Mesh(this.geometry, this.material);

  };

  CountryMesh.prototype.change_color = function(color){
    this.color = color.clone();
    _.each(this.attributes.customColor.value, _.bind(function(color_value){
      color_value.copy(this.color);
    }, this));

    this.attributes.customColor.needsUpdate = true;
  };

  CountryMesh.prototype.set_mouse_over = function(){
    _.each(this.attributes.customColor.value, _.bind(function(color_value){
      color_value.setRGB(0.5, 0.5, 0);
    }, this));
    this.attributes.customColor.needsUpdate = true;
  }

  CountryMesh.prototype.set_mouse_click = function(){
    _.each(this.attributes.customColor.value, _.bind(function(color_value){
      color_value.setRGB(1, 0, 0);
    }, this));
    this.attributes.customColor.needsUpdate = true;
  }

  CountryMesh.prototype.set_mouse_out = function(){
    _.each(this.attributes.customColor.value, _.bind(function(color_value){
      color_value.copy(this.color);
    }, this));

    this.attributes.customColor.needsUpdate = true;
  }

  return CountryMesh;
})();
