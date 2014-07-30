WY.views.practice_01_view = (function(){
  var world_countries_json_data,
      world_countries,
      scene,
      camera;


  function practice_01_view(){
    load_shader();
  }

  function load_shader(){
    WY.constants.ShaderLoader = new WY.models.ShaderLoader({
      shader_list: ['/assets/basic_line']
    });

    WY.constants.ShaderLoader.on('load_complete', function(e){
      load_world_countries_geojson();
    });

    WY.constants.ShaderLoader.load();
  }

  function load_world_countries_geojson(){
    $.ajax({
      type: 'GET',
      url: '/assets/world_countries.geojson',
      success: function(data){
        if (data) {
          world_countries_json_data = data;
          init();
          animate();
        }
      }
    })
  }

  function init(){
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    var devicePixelRatio = window.devicePixelRatio || 1;
    var screen_width = $(window).width()-5;
    var screen_height = $(window).height()-5;

    renderer.setSize(screen_width, screen_height);
    renderer.setViewport(0, 0, screen_width * devicePixelRatio, screen_height * devicePixelRatio);

    $(renderer.domElement).width(screen_width);
    $(renderer.domElement).height(screen_height);

    renderer.autoClear = true;
    renderer.sortObjects = false;
    renderer.generateMipmaps = false;

    $("body").append($(renderer.domElement));

    renderer.setClearColor(0x000000, 1);
    renderer.clear();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      30, window.innerWidth / window.innerHeight, 0.5, 10000
    );


    camera.position.z = 600;
    camera.position.y = 1000;
    camera.lookAt({x: 0, y: 0, z: 0});
    

    world_countries = new WY.models.WorldCountries({
      geojson: world_countries_json_data
    });

    world_countries.init();
    scene.add(world_countries.mesh);
    
    // TweenMax.to(camera.position, 20, {y: 0});

  }

  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  return practice_01_view;
})();
