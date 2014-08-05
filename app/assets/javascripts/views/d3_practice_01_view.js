WY.views.d3_practice_01_view = (function(){
  var sample_data = [],
      svg,
      w = 500,
      h = 100;


  function d3_practice_01_view(){
    init_data();
    init();
  }

  function init_data(){
    for (var i = 0; i < 25; i++) {
      sample_data.push(Math.random() * 20 + 5);
    } 
  }

  function init(){
    svg = d3.select("body").append("svg");
    svg.attr({
      "width": w,
      "height": h,
      "class": "svg_area"  
    }).style("margin-left", -w / 2).style("margin-top", -h / 2);

    svg.selectAll("rect")
        .data(sample_data)
        .enter()
        .append("rect")
        .attr({
          x: function(d, i){
            return i * (w / sample_data.length);
          },
          y: function(d, i){
            return h - d * 4
          },
          width: function(d, i){
            return w / sample_data.length - 1;
          },
          height: function(d, i){
            return d * 4;
          },
          fill: "teal"
        });

    svg.selectAll("text")
        .data(sample_data)
        .enter()
        .append("text")
        .text(function(d, i){
          return Math.floor(d);
        })
        .attr({
          x: function(d, i){
            return i * (w / sample_data.length) + (w / sample_data.length - 1) / 2;
          },
          y: function(d, i){
            return h - (d * 4) + 15;
          },
          "font-family": "sans-serif",
          "font-size": "11px",
          "fill": "white",
          "text-anchor": "middle"
        })
  }

  return d3_practice_01_view;
})();
