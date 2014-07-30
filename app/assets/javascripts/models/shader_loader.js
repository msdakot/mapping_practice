WY.models.ShaderLoader = (function(){
  //  list of shaders we'll load
  
  function ShaderLoader(params){
    this.shaderList = params.shader_list;
    this.shaders = {}; 

    _.extend(this, Backbone.Events);
  }

  ShaderLoader.prototype = {
    load: function(){

      var expectedFiles = this.shaderList.length * 2;
      var loadedFiles = 0;

      function makeCallback( name, type ){
        return function(data){
          if( this.shaders[name] === undefined ){
            this.shaders[name] = {};
          }
          
          this.shaders[name][type] = data;

          //  check if done
          loadedFiles++;
          if( loadedFiles == expectedFiles ){       
            this.trigger("load_complete");
          }

        };
      }
      
      for( var i=0; i < this.shaderList.length; i++ ){
        var vertexShaderFile = this.shaderList[i] + '.vsh';
        var fragmentShaderFile = this.shaderList[i] + '.fsh';  

        //  find the filename, use it as the identifier 
        var splitted = this.shaderList[i].split('/');
        var shaderName = splitted[splitted.length-1];
        $(document).load( vertexShaderFile, _.bind(makeCallback(shaderName, 'vertex'), this) );
        $(document).load( fragmentShaderFile,  _.bind(makeCallback(shaderName, 'fragment'), this) );
      }
    }
  }

  return ShaderLoader;

})();
