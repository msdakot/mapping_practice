WY.models.Tooltip = (function(){
  function Tooltip(params){

    this.template = JST['templates/tooltip'];
    this.dom = $(this.template()).appendTo($("body"));

    this.dom.hide();
    _.extend(this, Backbone.Events);
  }

  Tooltip.prototype = {
    init: function(){
    
    },

    update: function(event){   
      this.dom.css({
        'left': event.clientX,
        'top': event.clientY - 30
      });
    },

    show: function(){
      this.dom.show();
      

    },

    hide: function(){
      this.dom.hide();;
    }
  }

  return Tooltip;
})();
