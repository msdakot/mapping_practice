WY.models.GeoJSONCountries = (function(){
  function GeoJSONCountries(params){

    THREE.Object3D.call( this );

    this.geojson = params.geojson;


    this.countries = [];
    
  }

  GeoJSONCountries.prototype = Object.create( THREE.Object3D.prototype );

  GeoJSONCountries.prototype.init = function(){

    _.each(this.geojson.features, _.bind(function(feature, i){
      var properties = feature.properties;
      var geometry = feature.geometry;
      // console.log(geometry.coordinates.length);
      var color = new THREE.Color(colorbrewer.YlGn[6][i % 6]);

      _.each(geometry.coordinates, _.bind(function(coordinate){
        // console.log(geometry);
        // console.log(coordinate[0]);

        if (geometry.type == "MultiPolygon") {

          _.each(coordinate, _.bind(function(sub_coordinate){

            var shape_contours = this.convert_geometries_to_shapes(sub_coordinate);
            // console.log(shape_contours);
            var shape = new THREE.Shape(shape_contours);
            var shape_geometry = new THREE.ShapeGeometry(shape);
            
            var country_mesh = new WY.models.CountryMesh({
              geometry: shape_geometry,
              color: color.clone()
            });

            country_mesh.init();

            this.add(country_mesh);

          }, this));

        } else if (geometry.type == "Polygon"){
          var shape_contours = this.convert_geometries_to_shapes(coordinate);
          // console.log(shape_contours);
          var shape = new THREE.Shape(shape_contours);
          var shape_geometry = new THREE.ShapeGeometry(shape);
          
          var country_mesh = new WY.models.CountryMesh({
            geometry: shape_geometry,
            color: color.clone()
          });

          country_mesh.init();

          this.add(country_mesh);
          
        }
        
      }, this));
    }, this));
  };



  GeoJSONCountries.prototype.convert_geometries_to_shapes =  function(coordinate) {
    var vertices = [];

    _.each(coordinate, function(vertex){
      vertices.push(new THREE.Vector2(vertex[0], vertex[1]));
    });

    vertices.push(new THREE.Vector2(coordinate[0][0], coordinate[0][1]));

    return vertices;
  };


  return GeoJSONCountries;
})();