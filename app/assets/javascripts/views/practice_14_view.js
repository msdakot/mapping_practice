WY.views.practice_14_view = (function(){
  var piechart_data,
      korea_geojson_data,
      renderer,
      scene,
      camera,
      controls,
      projector,
      raycaster,
      tooltip,
      korea_countries,
      mouse = new THREE.Vector2(), INTERSECTED, CLICK_INTERSECTED, mousedowned = false;
      

  function practice_14_view(){
    load_shader();
  }

  function load_shader(){
    WY.constants.ShaderLoader = new WY.models.ShaderLoader({
      shader_list: ['/assets/basic_line', '/assets/basic_color', '/assets/basic_marker', '/assets/dashed_line']
    });

    WY.constants.ShaderLoader.on('load_complete', function(e){
      load_piechart_data();
    });

    WY.constants.ShaderLoader.load();
  }

  function load_piechart_data(){
    $.ajax({
      url: '/assets/piechart.json',
      type: 'GET',
      success: function(data){
        piechart_data = data;
        load_geojson_world();
      }
    });
  }

  function load_geojson_world(){
    $.ajax({
      url: '/assets/vadm3.json',
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
    // renderer.setViewport(0, 0, screen_width * devicePixelRatio, screen_height * devicePixelRatio);

    $(renderer.domElement).width(screen_width);
    $(renderer.domElement).height(screen_height);

    renderer.autoClear = true;
    renderer.sortObjects = false;
    renderer.generateMipmaps = false;

    document.getElementById('glContainer').appendChild( renderer.domElement );


    renderer.setClearColor(0x000000, 1);
    renderer.clear();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      45, window.innerWidth / window.innerHeight, 0.00001, 100000
    );

    camera.position.x = 4;
    camera.position.y = 25;
    camera.position.z = 300;
    // camera.lookAt({x: 15, y: 30, z: 0});


    controls = new THREE.TrackballControls( camera, renderer.domElement, new THREE.Vector3().set(4, 25, 0));

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.noRotate = true;

    controls.keys = [ 65, 83, 68 ];

    // var korea_countries = new WY.models.GeoJSONCountries({
    //   geojson: korea_geojson_data
    // });

    // korea_countries.init();
    // scene.add(korea_countries.mesh);
    

    var only_seoul = {
      type: 'FeatureCollection',
      features: _.filter(korea_geojson_data.features, function(f){ return f.properties.metroCityCode == "11" })
    };

    korea_countries = new WY.models.GeoJSONLineCountries({
      geojson: only_seoul
    });

    
    korea_countries.init();
    korea_countries.set_bounding_box();

    scene.add(korea_countries);

    // var marker = new WY.models.Marker({
    //   marker_data: marker_data
    // });
    // marker.init();

    // scene.add(marker.point_cloud);
    
    projector = new THREE.Projector();
    raycaster = new THREE.Raycaster();

    // $(renderer.domElement).mousedown(onDocumentMouseDown);

    // document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    // tooltip = new WY.models.Tooltip({
    //   data: piechart_data
    // });
    // tooltip.init();
    // tooltip.hide();

    // init_choropleth();
  


    controls.lookAtBoundingBox(korea_countries.boundingBox);

  }

  function init_choropleth(){
    var colors = [
      new THREE.Color("rgb(247,251,255)"),
      new THREE.Color("rgb(222,235,247)"),
      new THREE.Color("rgb(198,219,239)"),
      new THREE.Color("rgb(158,202,225)"),
      new THREE.Color("rgb(107,174,214)"),
      new THREE.Color("rgb(66,146,198)"),
      new THREE.Color("rgb(33,113,181)"),
      new THREE.Color("rgb(8,81,156)"),
      new THREE.Color("rgb(8,48,107)")
    ];


    var quantize = d3.scale.quantize()
                            .domain([0, d3.max(piechart_data.features, function(f){ return f.properties.value; })])
                            .range(d3.range(colors.length));

    _.each(piechart_data.features, function(feature){
      countries = korea_countries.find_country_by_name(feature.properties.name);

      var geometry_center = new THREE.Vector3();

      _.each(countries, function(country){
        country.change_color(colors[quantize(feature.properties.value)]);
        geometry_center.copy(country.geometry.boundingBox.center());
      });

       var label = new WY.models.CountryLabel({
        name: feature.properties.value
      });

      label.init();
      label.position.copy(geometry_center);
      scene.add(label);

    });
     
  }

  function onDocumentMouseUp(event){
    mousedowned = false;
    if ( CLICK_INTERSECTED ) {

          CLICK_INTERSECTED.set_mouse_out();

        }
        CLICK_INTERSECTED = null;
  }

  function onDocumentMouseMove( event ) {

      event.preventDefault();

      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      tooltip.update(event);

      if (!mousedowned){
       var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
          projector.unprojectVector( vector, camera );

          raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

          var intersects = raycaster.intersectObjects( scene.children, true );

          if ( intersects.length > 0 ) {

            if ( INTERSECTED != intersects[ 0 ].object ) {

              if ( INTERSECTED ) {

                if (!_.isUndefined(INTERSECTED.set_mouse_out)) {
                  INTERSECTED.set_mouse_out();
                }
              }
              INTERSECTED = intersects[ 0 ].object;

              if (!_.isUndefined(INTERSECTED.set_mouse_over)) {
                INTERSECTED.set_mouse_over();
                tooltip.show(INTERSECTED);
              } else {
                    
                INTERSECTED = null;
                tooltip.hide();
              }
              // console.log("mouse over");

            }

          } else {

            if ( INTERSECTED ) {

              if (!_.isUndefined(INTERSECTED.set_mouse_out)) {
                INTERSECTED.set_mouse_out();
              }

            }
            INTERSECTED = null;
            tooltip.hide();
              // console.log("mouse out");
          }
      }
        
  }

  function onDocumentMouseDown( event ) {
      mousedowned = true;
      // event.preventDefault();
      

      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


      var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
      projector.unprojectVector( vector, camera );

      raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

      var intersects = raycaster.intersectObjects( scene.children, true );

      if ( intersects.length > 0 ) {

        if ( CLICK_INTERSECTED != intersects[ 0 ].object ) {

          if ( CLICK_INTERSECTED ) {
            CLICK_INTERSECTED.set_mouse_out();

          }
          CLICK_INTERSECTED = intersects[ 0 ].object;
          CLICK_INTERSECTED.set_mouse_click();
          
          controls.lookAtObject(CLICK_INTERSECTED);
          
        }

      } else {

        if ( CLICK_INTERSECTED ) {

          CLICK_INTERSECTED.set_mouse_out();

        }
        CLICK_INTERSECTED = null;
      }
  }



  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }

  return practice_14_view;
})();

