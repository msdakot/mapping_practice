WY.models.ImageLabel = (function(){
  function ImageLabel(params){
    THREE.Mesh.call( this );
    // this.material = params.material;
    this.uniforms = {
      custom_color: {type: 'c', value: new THREE.Color("#FF0000")}
    };
    this.attributes = {};
    this.scale_num = 1.0;
    this.image_url = '/assets/notice.png';
  }

  ImageLabel.prototype = Object.create(THREE.Mesh.prototype);

  ImageLabel.prototype.init = function(){
  
    // canvas contents will be used for a texture
    var texture = THREE.ImageUtils.loadTexture( this.image_url);
    texture.needsUpdate = true;

    this.uniforms.label_texture = {type: 't', value: texture};

    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      attributes: this.attributes,
      vertexShader: WY.constants.ShaderLoader.shaders.basic_sprite.vertex,
      fragmentShader: WY.constants.ShaderLoader.shaders.basic_sprite.fragment,
      
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      sizeAttenuation: true
    });
    

    // this.scale.set(canvas.width / 150 * 1.0, 1.0, 1.0);
  };

  ImageLabel.prototype.update = function(camera){
    this.scale_num = constrain(map(camera.position.z, 0.0001, 300, 0.15, 4.0), 0.15, 4.0);
    // console.log(camera.position.z + " " + this.scale_num);
    this.scale.set(this.scale_num, this.scale_num, this.scale_num);
    if (this.scale_num > 3.6) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  };


  return ImageLabel;
})();
