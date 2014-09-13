LOGPRESSO.models.CountryLine = (function(){
  function CountryLine(params){
    
    THREE.Line.call( this );
    this.blend_mode = params.blending;
    this.line_width = params.line_width;
    this.material = null;
    this.uniforms = {
      scale: {type: 'f', value: 200},
      opacity: {type: 'f', value: 1},
      dashSize: {type: 'f', value: 1},
      totalSize: {type: 'f', value: 2}
    };

    this.attributes = {
      customColor:  { type: 'c', value: [] }
      // lineDistance: { type: 'f', value: [] }
    };

    this.geometry = params.geometry;
    this.color = params.color;
    this.properties = params.properties;
    this.transparent = params.transparent;

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      attributes: this.attributes,
      vertexShader: LOGPRESSO.constants.ShaderLoader.shaders.basic_line.vertex,
      fragmentShader: LOGPRESSO.constants.ShaderLoader.shaders.basic_line.fragment,

      blending: this.blend_mode,
      depthTest: false,
      depthWrite: false,
      transparent: this.transparent,
      sizeAttenuation: true
    });

    this.material.linewidth = this.line_width;

  }

  CountryLine.prototype = Object.create( THREE.Line.prototype );

  CountryLine.prototype.init = function(){
    this.geometry.computeBoundingBox();
    _.each(this.geometry.vertices, _.bind(function(vertex, i){
      this.attributes.customColor.value.push(this.color.clone());
    }, this));

    this.geometry.computeLineDistances();
    this.geometry.lineDistancesNeedUpdate = true;

    // this.attributes.lineDistance.value = this.geometry.lineDistances;

    // this.mesh = new THREE.Mesh(this.geometry, this.material);

  };

  CountryLine.prototype.change_color = function(color){
    this.color = color.clone();
    _.each(this.attributes.customColor.value, _.bind(function(color_value){
      color_value.copy(this.color);
    }, this));

    this.attributes.customColor.needsUpdate = true;
  };

  CountryLine.prototype.set_mouse_over = function(){
    _.each(this.attributes.customColor.value, _.bind(function(color_value){
      color_value.setRGB(0.5, 0.5, 0);
    }, this));
    this.attributes.customColor.needsUpdate = true;
  }

  CountryLine.prototype.set_mouse_click = function(){
    _.each(this.attributes.customColor.value, _.bind(function(color_value){
      color_value.setRGB(1, 0, 0);
    }, this));
    this.attributes.customColor.needsUpdate = true;
  }

  CountryLine.prototype.set_mouse_out = function(){
    _.each(this.attributes.customColor.value, _.bind(function(color_value){
      color_value.copy(this.color);
    }, this));

    this.attributes.customColor.needsUpdate = true;
  }

  return CountryLine;
})();
