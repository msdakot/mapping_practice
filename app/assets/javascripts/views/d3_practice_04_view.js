WY.views.d3_practice_04_view = (function(){
  var sample_data = [],
      svg,
      w = 700,
      h = 450,
      padding = 30,
      xScale, yScale, rScale, xAxis, yAxis;


  function d3_practice_04_view(){
    init_data(800, 300);
    init();
  }

  function init_data(max_x, max_y){
    for (var i = 0; i < 25; i++) {
      sample_data.push([Math.random() * max_x + 5, Math.random() * max_y + 5]);
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

    svg.append("g").attr("class", "x axis").attr("transform", "translate(0, " + (h - padding) + ")").call(xAxis);
    svg.append("g").attr("class", "y axis").attr("transform", "translate(" + padding + ", 0)").call(yAxis);

    d3.select(".refresh_btn").on('click', function(e){
      sample_data = [];
      init_data(Math.random() * 350 + 250, Math.random() * 300 + 250);

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

      svg.selectAll("circle")
          .data(sample_data)
          .transition()
          .duration(1000)
          .each("start", function(){
            d3.select(this)
              .attr({
                fill: "magenta",
                r: 3
              });
          })
          .attr({
            cx: function(d, i){
              return xScale(d[0]);
            },
            cy: function(d, i){
              return yScale(d[1]);
            }
          })
          .each("end", function(){
            d3.select(this)
              .transition()
              .duration(1000)
              .attr("fill", "black")
              .attr("r", 2);
          });              
      svg.select(".x.axis")
          .transition()
          .duration(1000)
          .call(xAxis);

      svg.select(".y.axis")
          .transition()
          .duration(1000)
          .call(yAxis);
    });
  }

  return d3_practice_04_view;
})();
