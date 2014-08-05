WY.views.d3_practice_02_view = (function(){
  var sample_data = [],
      svg,
      w = 700,
      h = 450,
      padding = 30,
      xScale, yScale, rScale, xAxis, yAxis;


  function d3_practice_02_view(){
    init_data();
    init();
  }

  function init_data(){
    for (var i = 0; i < 25; i++) {
      sample_data.push([Math.random() * 500 + 5, Math.random() * 100 + 5]);
    } 
  }

  function init(){
    xScale = d3.scale.linear()
                      .domain([0, d3.max(sample_data, function(d){
                        return d[0];
                      })])
                      .range([padding, w - padding]);
    yScale = d3.scale.linear()
                      .domain([0, d3.max(sample_data, function(d){
                        return d[1];
                      })])
                      .range([h - padding, padding]);

    rScale = d3.scale.linear()
                      .domain([0, d3.max(sample_data, function(d){
                        return d[1]
                      })])
                      .range([2, 5]);

    xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
    yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

    svg = d3.select("body").append("svg");
    svg.attr({
      "width": w,
      "height": h,
      "class": "svg_area"  
    }).style("margin-left", -w / 2).style("margin-top", -h / 2);

    svg.selectAll("circle")
        .data(sample_data)
        .enter()
        .append("circle")
        .attr({
          cx: function(d, i){
            return xScale(d[0]);
          },
          cy: function(d, i){
            return yScale(d[1]);
          },
          r: function(d, i){
            return rScale(d[1]);
          },
          fill: "teal"
        });

    // svg.selectAll("text")
    //     .data(sample_data)
    //     .enter()
    //     .append("text")
    //     .text(function(d, i){
    //       return Math.floor(d[0]) + ", " + Math.floor(d[1]);
    //     })
    //     .attr({
    //       x: function(d, i){
    //         return xScale(d[0]);
    //       },
    //       y: function(d, i){
    //         return yScale(d[1]);
    //       },
    //       "font-family": "sans-serif",
    //       "font-size": "11px",
    //       "fill": "red",
    //       "text-anchor": "middle"
    //     });

    svg.append("g").attr("class", "axis").attr("transform", "translate(0, " + (h - padding) + ")").call(xAxis);
    svg.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ", 0)").call(yAxis);
  }

  return d3_practice_02_view;
})();
