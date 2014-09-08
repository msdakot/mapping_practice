var gui;

WY.views.map_widget_view = (function(){
  var map_widget,
      default_config = {
        type: 'marker', //area
        map: 'local', //world, local
        unit: '특정시도', // '전국', 특정시도'
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

  // var gui;

  function map_widget_view(){
    map_widget = new LOGPRESSO.models.MapWidget({
      container: $("#glContainer"),
      config: default_config
    });

    map_widget.init();

    gui = new dat.GUI();
    
    gui.add(default_config, "type", { '마커': 'marker', '영역': 'area'});
    gui.add(default_config, "map", { '세계': 'world', '대한민국': 'local'});
    gui.add(default_config, "unit", { '전국': '전국', '특정시도': '특정시도'});
    gui.add(default_config, "code", {"서울특별시":"11","부산광역시":"26","대구광역시":"27","인천광역시":"28","광주광역시":"29","대전광역시":"30","울산광역시":"31","경기도":"41","강원도":"42","충청북도":"43","충청남도":"44","전라북도":"45","전라남도":"46","경상북도":"47","경상남도":"48","제주특별시":"50"});
    gui.add(default_config, "complexity", {"광역시/도": "광역시/도", "시/군/구": "시/군/구", "동/읍/면": "동/읍/면"});
    
    _.each(gui.__controllers, function(controller){
      controller.onChange(function(value){
        map_widget.updateConfig(default_config);

      });
    });
  }

  return map_widget_view;
})();