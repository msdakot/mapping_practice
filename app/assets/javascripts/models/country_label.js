WY.models.CountryLabel = (function(){
  function CountryLabel(params){
    THREE.Sprite.call(this);
    // this.material = params.material;
    this.name = params.name;
  }

  CountryLabel.prototype = Object.create(THREE.Sprite.prototype);

  CountryLabel.prototype.init = function(){
    var fontface = "Arial";
    var fontsize = 100;
    var borderThickness = 4;
    var borderColor = { r:0, g:0, b:0, a:1.0 };
    var backgroundColor =  { r:255, g:255, b:255, a:1.0 };
    // var spriteAlignment = THREE.SpriteAlignment.topLeft;
    var canvas = document.createElement('canvas');

    // $("body").append($(canvas));
    canvas.width = 400;
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText( this.name );
    var textWidth = metrics.width;
    // console.log(metrics);

    // var ratio = metrics.width / 100;

    var roundRect = function(ctx, x, y, w, h, r) 
    {
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+r);
        ctx.lineTo(x+w, y+h-r);
        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();   
    }


    // background color
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                    + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                    + borderColor.b + "," + borderColor.a + ")";



    context.fillStyle = "rgba(255, 255, 255, 1.0)";

    context.fillText( this.name, borderThickness, fontsize + borderThickness);
  
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;

    this.material = new THREE.SpriteMaterial( 
      { map: texture  } );
     this.scale.set(canvas.width / 150,1.0,1.0);
  };


  return CountryLabel;
})();
