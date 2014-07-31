WY.views.practice_03_view = (function(){
  var korea_geojson_data,
      world_geojson_data,
      renderer,
      scene,
      camera,
      controls;

  function practice_02_view(){
    load_shader();
  }

  function load_shader(){
    WY.constants.ShaderLoader = new WY.models.ShaderLoader({
      shader_list: ['/assets/basic_line']
    });

    WY.constants.ShaderLoader.on('load_complete', function(e){
      load_geojson_korea();
    });

    WY.constants.ShaderLoader.load();
  }

  function load_geojson_korea(){
    $.ajax({
      url: '/assets/vadm.json',
      type: 'GET',
      success: function(data){
        korea_geojson_data = data;
        load_geojson_world();
      }
    });
  }

  function load_geojson_world(){
    $.ajax({
      url: '/assets/world_countries.json',
      type: 'GET',
      success: function(data){
        world_geojson_data = data;
        init();
        animate();
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
      45, window.innerWidth / window.innerHeight, 1, 100000
    );

    camera.position.x = 818;
    camera.position.y = -200;
    camera.position.z = 600;
    camera.lookAt({x: 600, y: -200, z: 0});



    var korea_countries = new WY.models.GeoJSONCountries({
      geojson: korea_geojson_data
    });

    korea_countries.init();
    scene.add(korea_countries.mesh);
    


    var world_countries = new WY.models.GeoJSONCountries({
      geojson: world_geojson_data
    });

    world_countries.init();
    scene.add(world_countries.mesh);
    
     // TweenMax.to(camera.position, 10, {y: "+=3"});

  }

  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // controls.update();
  }

  return practice_02_view;
})();
