WY.models.Tooltip = (function(){
  function Tooltip(params){
    this.data = params.data;
    this.template = JST['templates/tooltip'];
    this.dom = $(this.template()).appendTo($("body"));

    this.tooltip_width = 250;
    this.tooltip_height = 250;

    this.dom.hide();
    _.extend(this, Backbone.Events);
  }

  Tooltip.prototype = {
    init: function(){
      this.svg = d3.select(".tooltip").append("svg")
                                      .attr({
                                        width: this.tooltip_width,
                                        height: this.tooltip_height
                                      });
    },

    update: function(event){   
      this.dom.css({
        'left': event.clientX + 30,
        'top': event.clientY
      });
    },

    show: function(obj){

      var tooltip_show_data = _.find(this.data.features, function(f){ return f.properties.name == obj.properties.name });
      if (_.isUndefined(tooltip_show_data)){
        this.dom.show().html("데이터 없음");
      } else {
        this.dom.show();
        this.init_chart(tooltip_show_data);   
      }


    },

    init_chart: function(show_data){
      // console.log(show_data);    

      var innerRadius = 0;
      var outerRadius = this.tooltip_width / 2;
      var layout = d3.layout.pie();
      var color = d3.scale.category10();
      var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
      var arcs = this.svg.selectAll("arc")
                    .data(layout(_.map(show_data.properties.data, function(d){ return d.value; })))
                    .enter()
                    .append("g")
                    .attr({
                      "class": 'arc',
                      "transform": 'translate(' + outerRadius  + ', ' + outerRadius + ')'
                    });


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

    },

    hide: function(){
      this.dom.hide();;
    }
  }

  return Tooltip;
})();
