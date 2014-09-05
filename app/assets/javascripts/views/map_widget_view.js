WY.views.map_widget_view = (function(){
  var map_widget,
      default_config = {
        type: 'marker', //area
        map: 'local', //world, local
        unit: '특정시도', // '특정시도'
        code: 26, //서울
        
        complexity: '시/군/구', // 광역시/도, 시/군/구, 동/읍/면
        x: undefined,
        y: undefined,
        value: undefined,
        label: undefined,
        
        marker_rules: [
          {
            column: '',
            operator: '',
            boundary: '',
            expect_color: '#ffffff',
            expect_visible: true,
            expect_column: ''// 특정컬럼
          }
        ],
        
        area_rules: [
          {
            column: '',
            operator: '',
            boundary: '',
            expect_color: '#ffffff',
            expect_column: ''// 특정컬럼
          }
        ]
      };

  var gui;

  function map_widget_view(){
    map_widget = new LOGPRESSO.models.MapWidget({
      container: $("#glContainer"),
      config: default_config
    });

    map_widget.init();

    gui = new dat.GUI();
    var map_folder = gui.addFolder("지도 종류 선택");
    map_folder.add(default_config, "type", { '마커': 'marker', '영역': 'area'});
    

  }

  return map_widget_view;
})();