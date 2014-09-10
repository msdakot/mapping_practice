LOGPRESSO.models.GeoJSONCountries = (function(){
  function GeoJSONCountries(params){

    THREE.Object3D.call( this );
    this.geojson = params.geojson;
    this.countries = [];
    this.bounding_box = null;
    this.type = params.type;
    
  }

  GeoJSONCountries.prototype = Object.create( THREE.Object3D.prototype );

  GeoJSONCountries.prototype.init = function(){

    _.each(this.geojson.features, _.bind(function(feature, i){
      var properties = feature.properties;
      var geometry = feature.geometry;
      // console.log(geometry.coordinates.length);
      var color = new THREE.Color(colorbrewer.YlGn[6][i % 6]);
      
      _.each(geometry.coordinates, _.bind(function(coordinate){

        if (geometry.type == "MultiPolygon") {


          _.each(coordinate, _.bind(function(sub_coordinate){

            var shape_contours = this.convert_geometries_to_shapes(sub_coordinate);
            // console.log(shape_contours);
            var shape = new THREE.Shape(shape_contours);
            var shape_geometry = new THREE.ShapeGeometry(shape);
            var country;

            if (this.type == 'mesh') {
              country = new LOGPRESSO.models.CountryMesh({
                geometry: shape_geometry,
                properties: properties,
                color: color.clone()
              });

            } else {
              country = new LOGPRESSO.models.CountryLine({
                geometry: shape_geometry,
                properties: properties,
                color: color.clone()
              });

            }
            
            country.init();

            this.add(country);
          }, this));

          // geometry_center.divideScalar(coordinate.length);


        } else if (geometry.type == "Polygon"){
          var shape_contours = this.convert_geometries_to_shapes(coordinate);
          // console.log(shape_contours);
          var shape = new THREE.Shape(shape_contours);
          var shape_geometry = new THREE.ShapeGeometry(shape);
          
          var country;

          if (this.type == 'mesh') {
            country = new LOGPRESSO.models.CountryMesh({
              geometry: shape_geometry,
              properties: properties,
              color: color.clone()
            });

          } else {
            country = new LOGPRESSO.models.CountryLine({
              geometry: shape_geometry,
              properties: properties,
              color: color.clone()
            });

          }
          country.init();

          this.add(country);



        }
        
      }, this));
    }, this));
  };

  GeoJSONCountries.prototype.find_country_by_name = function(name){
    var countries = _.filter(this.children, function(country){
      if (!_.isUndefined(country.properties)){
        return country.properties.name == name;
      } else {
        return false;
      }
    });

    return countries;
  };



  GeoJSONCountries.prototype.convert_geometries_to_shapes =  function(coordinate) {
    var vertices = [];

    _.each(coordinate, function(vertex){
      vertices.push(new THREE.Vector2(vertex[0], vertex[1]));
    });

    vertices.push(new THREE.Vector2(coordinate[0][0], coordinate[0][1]));

    return vertices;
  };

  GeoJSONCountries.prototype.set_bounding_box = function(){
    var min = new THREE.Vector3();
    var max = new THREE.Vector3();

    if (this.children.length > 0) {
      var first_min_point = this.children[0].geometry.boundingBox.min;
      var first_max_point = this.children[0].geometry.boundingBox.max;

      min.copy( first_min_point );
      max.copy( first_max_point );

      _.each(this.children, function(child){
        var b_min = child.geometry.boundingBox.min;
        var b_max = child.geometry.boundingBox.max;

        min.x = Math.min(min.x, b_min.x);
        min.y = Math.min(min.y, b_min.y);
        min.z = Math.min(min.z, b_min.z);

        max.x = Math.max(max.x, b_max.x);
        max.y = Math.max(max.y, b_max.y);
        max.z = Math.max(max.z, b_max.z);
      });


    }

    this.boundingBox = new THREE.Box3(min, max);
    
  }


  return GeoJSONCountries;
})();