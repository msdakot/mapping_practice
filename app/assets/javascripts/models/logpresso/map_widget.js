LOGPRESSO.models.MapWidget = (function(){
  function MapWidget(params){

    this.config = params.config;
    this.container = params.container;
    this.projector;
    this.raycaster;
    this.geography_data = null;
    this.completeLoadThreed = false;

    _.extend(this, Backbone.Event);
  
  }

  MapWidget.prototype = {
    init: function(){
      
      this.loadShader();

    },

    loadShader: function(){
      if (_.isUndefined(LOGPRESSO.constants.ShaderLoader)){
        LOGPRESSO.constants.ShaderLoader = new LOGPRESSO.models.ShaderLoader({
          shader_list: ['/assets/basic_line', '/assets/basic_color', '/assets/basic_marker', '/assets/basic_sprite']
        });  
      
        LOGPRESSO.constants.ShaderLoader.on('load_complete', _.bind(function(e){
          this.loadGeoJSON();        
        }, this));

        LOGPRESSO.constants.ShaderLoader.load();
      } else {
        this.loadGeoJSON();
      }
      
      
    }, 

    updateConfig: function(config){
      this.config = config;
      this.loadGeoJSON();
    },

    loadGeoJSON: function(){
      var map_name = '';

      if (this.config.map == 'world') {
        // 세계 맵 로드 
        map_name = 'world.json';
      } else if (this.config.map == 'local'){
        // 국내 맵 설정일 경우 
        map_name = 'local';

        if (this.config.unit == '전국') {
          // 전국을 다 보여줌 
          map_name += '_country';

          switch(this.config.complexity) {
            // complexity를 정함, 전국은 시/군/구 아래 없음
            case "광역시/도":
              map_name += "_complexity_1.json"
              break;
            case "시/군/구":
              map_name += "_complexity_2.json"
              break;
            default:
              map_name += "_complexity_1.json"
              break;
          };
        } else if (this.config.unit == '특정시도') {

          map_name += '_' + this.config.code;

          switch(this.config.complexity) {
            // complexity를 정함 
            case "시/군/구":
              map_name += "_complexity_2.json"
              break;
            case "동/읍/면":
              map_name += "_complexity_3.json"
              break;
            default: 
              map_name += "_complexity_2.json"
              break;
          };


        }
      }
    


      $.ajax({
        url: '/assets/' + map_name,
        type: 'GET',
        success: _.bind(function(data){
          this.geography_data = data;
          
          if (!this.completeLoadThreed) {
            this.init_threed();
            this.animate();
          }

          this.reset_geography();
          this.init_geography();

        }, this)
      })
    },

    reset_geography: function(){
      if (!_.isUndefined(this.geography_mesh)){
        this.scene.remove(this.geography_mesh);
        this.geography_mesh = undefined;
      }
    },

    init_geography: function(){
      
      this.geography_mesh = new LOGPRESSO.models.GeoJSONCountries({
        geojson: this.geography_data
      });

      this.geography_mesh.init();
      this.scene.add(this.geography_mesh);

      this.geography_mesh.set_bounding_box();

      this.controls.lookAtBoundingBox(this.geography_mesh.boundingBox);
    },

    init_threed: function(){
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      var devicePixelRatio = window.devicePixelRatio || 1;
      var screen_width = $(window).width()-5;
      var screen_height = $(window).height()-5;

      this.renderer.setSize(screen_width, screen_height);
      // renderer.setViewport(0, 0, screen_width * devicePixelRatio, screen_height * devicePixelRatio);

      $(this.renderer.domElement).width(screen_width);
      $(this.renderer.domElement).height(screen_height);

      this.renderer.autoClear = true;
      this.renderer.sortObjects = false;
      this.renderer.generateMipmaps = false;

      this.container.append($(this.renderer.domElement));

      this.renderer.setClearColor(0x000000, 1);
      this.renderer.clear();

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.000001, 1000000
      );

      this.camera.position.x = 4;
      this.camera.position.y = 25;
      this.camera.position.z = 300;

      this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement, new THREE.Vector3().set(4, 25, 0));

      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;

      this.controls.noZoom = false;
      this.controls.noPan = false;

      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;
      this.controls.noRotate = true;

      
      
      this.projector = new THREE.Projector();
      this.raycaster = new THREE.Raycaster();

      this.completeLoadThreed = true;
 

    },

    animate: function(){
      requestAnimationFrame(_.bind(this.animate, this));
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
    }
  }

  return MapWidget;
})();
