WY.models.CountryLabel = (function(){
  function CountryLabel(params){
    THREE.Mesh.call( this );
    // this.material = params.material;
    this.name = params.name;
    this.uniforms = {};
    this.attributes = {};
    this.scale_num = 1.0;

  }

  CountryLabel.prototype = Object.create(THREE.Mesh.prototype);

  CountryLabel.prototype.init = function(){
    var fontface = "Arial";
    var fontsize = 100;
    var borderThickness = 4;
    var borderColor = { r:0, g:0, b:0, a:1.0 };
    var backgroundColor =  { r:255, g:255, b:255, a:1.0 };
    // var spriteAlignment = THREE.SpriteAlignment.topLeft;
    var canvas = document.createElement('canvas');

    // $("body").append($(canvas));
    canvas.width = 300;
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText( this.name );
    var textWidth = metrics.width;
    // console.log(metrics);

    // var ratio = metrics.width / 100;

    context.fillStyle = "rgba(255, 255, 255, 1.0)";

    context.fillText( this.name, borderThickness, fontsize + borderThickness);
  
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;

    this.uniforms.label_texture = {type: 't', value: texture};

    this.geometry = new THREE.PlaneGeometry(2.6, 1.5, 1, 1);
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

  CountryLabel.prototype.update = function(camera){
    this.scale_num = constrain(map(camera.position.z, 0.0001, 300, 0.15, 4.0), 0.15, 4.0);
    // console.log(camera.position.z + " " + this.scale_num);
    this.scale.set(this.scale_num, this.scale_num, this.scale_num);
    if (this.scale_num > 3.6) {
      this.visible = false;
    } else {
      this.visible = true;
    }
  };


  return CountryLabel;
})();
