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
      
      _.each(geometry.coordinates, _.bind(function(coordinate){

        if (geometry.type == "MultiPolygon") {


          _.each(coordinate, _.bind(function(sub_coordinate){
            this.create_mesh_or_line(sub_coordinate, properties);
            
          }, this));


        } else if (geometry.type == "Polygon"){
          
          this.create_mesh_or_line(coordinate, properties);
        }
        
      }, this));
    }, this));
  };

  GeoJSONCountries.prototype.create_mesh_or_line = function(coordinate, properties){
    var shape_contours = this.convert_geometries_to_shapes(coordinate);
    // console.log(shape_contours);
    var shape = new THREE.Shape(shape_contours);
    var shape_geometry = new THREE.ShapeGeometry(shape);
    var country, country_line, country_property, country_line_property;

    if (this.type == 'mesh') {
      country_property = {
        geometry: shape_geometry,
        properties: properties,
        color: new THREE.Color("#FFFFFF")
      };

      country_line_property = {
        geometry: shape_geometry.clone(),
        properties: properties,
        color: new THREE.Color("#303030"),
        line_width: 2,
        blending: THREE.MultiplyBlending
      }


    } else {
      country_property = {
        geometry: shape_geometry,
        properties: properties,
        color: new THREE.Color("#222222"),
        blending: THREE.MultiplyBlending
      };

      country_line_property = {
        geometry: shape_geometry.clone(),
        properties: properties,
        color: new THREE.Color("#FFFFFF"),
        line_width: 1,
        blending: THREE.AdditiveBlending
      }

    }


    country = new LOGPRESSO.models.CountryMesh(country_property);

    country_line = new LOGPRESSO.models.CountryLine(country_line_property);

    country.init();
    country_line.init();

    this.add(country);
    this.add(country_line);
  };

  GeoJSONCountries.prototype.find_country_by_iso_a3 = function(iso_a3){
    var countries = _.filter(this.children, function(country){
      if (!_.isUndefined(country.properties)){
        return country.properties.iso_a3 == iso_a3;
      } else {
        return false;
      }
    });

    return countries;
  };


  GeoJSONCountries.prototype.find_country_by_local_code = function(local_code){
    var str_length = String(local_code).length;
    
    var countries = _.filter(this.children, function(country){
      if (!_.isUndefined(country.properties)){
        if (str_length == 2) {
          return country.properties.metroCityCode == local_code;
        } else if (str_length == 4){
          return country.properties.cityBoroughCode == local_code;
        } else if (str_length == 8) {
          return country.properties.dongCode == local_code;
        }
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