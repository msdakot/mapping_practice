WY.views.practice_02_view = (function(){
  var korea_geojson_data,
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
      load_geojson();
    });

    WY.constants.ShaderLoader.load();
  }

  function load_geojson(){
    $.ajax({
      url: '/assets/vadm.json',
      type: 'GET',
      success: function(data){
        korea_geojson_data = data;
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


    camera.position.z = 25;
    camera.position.y = -122;
    camera.position.x = 926;

    // var mesh = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshBasicMaterial({color: 0xFF0000}));
    // scene.add(mesh);

    // mesh.position.set(922.2832753173957, 127.74269248744247, 1);
    camera.lookAt({x: 926.2832753173957, y: -124.74269248744247, z: 1});
    camera.up.set({x: 0, y: 1, z: 0});

        // controls = new THREE.TrackballControls( camera );

        // controls.rotateSpeed = 1.0;
        // controls.zoomSpeed = 1.2;
        // controls.panSpeed = 0.8;

        // controls.noZoom = false;
        // controls.noPan = false;

        // controls.staticMoving = true;
        // controls.dynamicDampingFactor = 0.3;

        // controls.keys = [ 65, 83, 68 ];



    korea_countries = new WY.models.KoreaCountries({
      geojson: korea_geojson_data
    });

    korea_countries.init();
    scene.add(korea_countries.mesh);
    
     // TweenMax.to(camera.position, 10, {y: "+=3"});

  }

  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // controls.update();
  }

  return practice_02_view;
})();
