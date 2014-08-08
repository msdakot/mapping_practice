WY.views.d3_practice_06_view = (function(){
  var sample_data = [],
      svg, pie, arc;
  var w = 500,
      h = 500;


  function d3_practice_06_view(){
    init_data();
    init();
  }

  function init_data(){
    for (var i = 0; i < 23; i++) {
      sample_data.push(Math.random() * 120 + 5);
    }
    // sample_data = [5, 10, 20, 45, 6, 25]; 
  }

  function init(){
    var innerRadius = w / 3;
    var outerRadius = w / 2;
    var color = d3.scale.category10();

    pie = d3.layout.pie();

    svg = d3.select('body').append('svg')
                            .attr({
                              'width': w,
                              'height': h,
                              'class': 'svg_area'
                            }).style("margin-left", -w / 2).style("margin-top", -h / 2);

    arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    var arcs = svg.selectAll('g.arc').data(pie(sample_data))
                                      .enter()
                                      .append('g')
                                      .attr('class', 'arc')
                                      .attr('transform', 'translate(' + outerRadius  + ', ' + outerRadius + ')');


    arcs.append('path')
        .attr({
          fill: function(d, i){
            return color(i);
          },
          d: arc
        });
    arcs.append("text")
        .text(function(d, i){
          return Math.floor(d.value);
        })
        .attr({
          'transform': function(d, i){
            return 'translate(' + arc.centroid(d) + ')';
          },
          'text-anchor': 'middle'
        })
        .style({
          fill: 'white'
        });
  }

  return d3_practice_06_view;
})();
