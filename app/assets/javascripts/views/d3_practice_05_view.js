var svg, sample_data = [];

WY.views.d3_practice_05_view = (function(){
  // var sample_data = [],
      // svg,
  var w = 800,
      h = 250,
      xScale, yScale,
      bars;


  function d3_practice_05_view(){
    init_data();
    init();
  }

  function init_data(){
    for (var i = 0; i < 23; i++) {
      sample_data.push(Math.random() * 120 + 5);
    } 
  }

  function init(){
    svg = d3.select("body").append("svg");
    svg.attr({
      "width": w,
      "height": h,
      "class": "svg_area"  
    }).style("margin-left", -w / 2).style("margin-top", -h / 2);

    xScale = d3.scale.ordinal()
                      .domain(d3.range(sample_data.length))
                      .rangeRoundBands([0, w], 0.05);

    yScale = d3.scale.linear()
                      .domain([5, d3.max(sample_data)])
                      .range([25, h]);

    svg.selectAll("rect")
        .data(sample_data)
        .enter()
        .append("rect")
        .attr({
          x: function(d, i){
            return xScale(i);
          },
          y: function(d, i){
            return h - yScale(d);
          },
          width: function(d, i){
            return xScale.rangeBand();
          },
          height: function(d, i){
            return yScale(d);
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
            return 29 + xScale(i) - xScale.rangeBand() / 2;
          },
          y: function(d, i){
            return h - yScale(d) + 12;
          },
          "font-family": "sans-serif",
          "font-size": "11px",
          "fill": "white",
          "text-anchor": "middle"
        });

    d3.selectAll(".refresh_btn").on('click', function(e) {
      add_data();
      refresh();
    })

    // bars = svg.selectAll("rect").data(sample_data);
  }

  function add_data(){
    sample_data.push(Math.random() * 120 + 5);
  }

  function refresh(){
    console.log("refresh");
    xScale = d3.scale.ordinal()
                      .domain(d3.range(sample_data.length))
                      .rangeRoundBands([0, w], 0.05);
    yScale = d3.scale.linear()
                      .domain([5, d3.max(sample_data)])
                      .range([25, h]);
                      
    // console.log(svg.selectAll("rect").data(sample_data).enter().length);
    svg.selectAll("rect").data(sample_data)
        .enter()
        .append("rect")
        .attr({
          x: w,
          y: function(d, i){
            return h - yScale(d);
          },
          width: function(d, i){
            return xScale.rangeBand();
          },
          height: function (d, i) {
            return yScale(d);
          },
          fill: "teal"
        });

    svg.selectAll("text").data(sample_data)
        .enter()
        .append("text")
        .text(function(d, i){
          return Math.floor(d);
        })
        .attr({
          x: function(d, i){
            return w;
          },
          y: function(d, i){
            return h - yScale(d) + 12;
          },
          "font-family": "sans-serif",
          "font-size": "11px",
          "fill": "white",
          "text-anchor": "middle"
        })

    svg.selectAll("rect")
        .transition()
        .duration(500)
        .attr({
          x: function(d, i){
            return xScale(i);
          },
          y: function(d, i){
            return h - yScale(d);
          },
          width: function(d, i){
            return xScale.rangeBand();
          },
          height: function(d, i){
            return yScale(d);
          }
        })

    svg.selectAll("text")
        .transition()
        .duration(500)
        .attr({
          x: function(d, i){
            return 29 + xScale(i) - xScale.rangeBand() / 2;
          },
          y: function(d, i){
            return h - yScale(d) + 12;
          }
        })
  }

  return d3_practice_05_view;
})();
