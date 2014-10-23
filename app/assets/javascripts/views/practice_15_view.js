WY.views.practice_15_view = (function(){
  function practice_15_view(){


    document.getElementById("canvas").addEventListener( 'mousemove', mouse_down_handler, false );
  }

  function mouse_down_handler(event){
    var x = ( event.offsetX / 500 ) * 2 - 1;
    var y = - ( event.offsetY / 500 ) * 2 + 1;

    $("#point_container").html(x + ", " + y);
  }


  return practice_15_view;
})();
