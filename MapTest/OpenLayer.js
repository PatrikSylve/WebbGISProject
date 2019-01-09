//WMS sources
var public_buildings = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
        'LAYERS': 'APAlayers:public_buildings_wgs84'
    },
    serverType: 'geoserver'
    });
var roads_highway = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
        'LAYERS': 'APAlayers:roads_highway_wgs84'
    },
     serverType: 'geoserver'
     });
var adresses = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
     'LAYERS': 'APAlayers:addresses_wgs84'
     },
     serverType: 'geoserver'
     });
var roads_throug = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
    'LAYERS': 'APAlayers:roads_throug_wgs84'
    },
    serverType: 'geoserver'
    });
var rural_buildings = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
    'LAYERS': 'APAlayers:rural_buildings_wgs84'
    },
    serverType: 'geoserver'
    });
var districts = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
    'LAYERS': 'APAlayers:districts_wgs84'
    },
    serverType: 'geoserver'
    });
var railroads = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
    'LAYERS': 'APAlayers:railroads_wgs84'
    },
    serverType: 'geoserver'
    });
    var roads_all = new ol.source.ImageWMS({
        url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
        params: {
        'LAYERS': 'APAlayers:roads_all_wgs84'
        },
        serverType: 'geoserver'
        });


var public_buildings = new ol.source.ImageWMS({
  url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
  params: {
  'LAYERS': 'APAlayers:public_buildings_wgs84'
    },
    serverType: 'geoserver'
    });
    var layers2 = [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),

      new ol.layer.Image({
        source: public_buildings
      }),
      new ol.layer.Image({
      source: roads_highway
      }),
      new ol.layer.Image({
      source: roads_throug
      }),
      new ol.layer.Image({
      source: roads_all
      }),
      new ol.layer.Image({
      source: rural_buildings
      }),

      new ol.layer.Image({
      source: railroads
      }),
      new ol.layer.Image({
      source: adresses
      }),
    ];

    var sourceBingMaps = new ol.source.BingMaps({
        key: 'AqsqeZAt1OAOxK71ONck3RPobRs7_eZoxmgSyXfCL9ihKO7TjxAgGvzuFabQuYS1',
        imagerySet: 'Road',
        culture: 'fr-FR'
      });

      var layers3 = [
      bingMapsRoad = new ol.layer.Tile({
        preload: Infinity,
        source: sourceBingMaps
      }),

       bingMapsAerial = new ol.layer.Tile({
        preload: Infinity,
        source: new ol.source.BingMaps({
          key: 'AqsqeZAt1OAOxK71ONck3RPobRs7_eZoxmgSyXfCL9ihKO7TjxAgGvzuFabQuYS1',
          imagerySet: 'Aerial',
        })
      })];

      t0 = new ol.layer.Tile({
        source: new ol.source.OSM()
      })

      var sourceDraw =  new ol.source.Vector();
      var drawGeometries = new ol.layer.Vector({
          source: sourceDraw
    });

      var map = new ol.Map({
        layers: [bingMapsAerial,t0, drawGeometries],
        projection: 'EPSG:4326',
        controls: ol.control.defaults({
          attributionOptions:
          ({
      collapsible: false
      })
      }).extend([
      //Extra functionality of the map


      //Control for displaying a scale line
      new ol.control.ScaleLine() ])
      ,
        target: 'map',
        view: new ol.View({
           center: ol.proj.fromLonLat([13.19, 55.70]),
          zoom: 13
        })
      });


      t0.on('precompose', function(event) {
        var ctx = event.context;
        var width = ctx.canvas.width * (swipe.value / 100);

        ctx.save();
        ctx.beginPath();
        ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
        ctx.clip();
      });

      t0.on('postcompose', function(event) {
        var ctx = event.context;
        ctx.restore();
      });

      swipe.addEventListener('input', function() {
        map.render();
      }, false);


      // create geometries
       var typeSelect = document.getElementById('type');
       var draw;
       function addInteraction() {
         var value = typeSelect.value;
         if (value !== 'None') {
           var geometryFunction;
           draw = new ol.interaction.Draw({
             source: sourceDraw,
             type: value,
             geometryFunction: geometryFunction
           });
           map.addInteraction(draw);
         }
       }

      function onChange() {

         map.removeInteraction(draw);
         addInteraction();
       };
       function setGeometry(element) {
           var e = document.getElementById('type');
           e.value=element;

           onChange();
       }


 // Attributes
    function getGeomFeature()  {
            const distortion = 0.5683;
            var select = new ol.interaction.Select();

            select.getFeatures().on("add", function (e) {

                var feature = e.element; //the feature selected
                var geomType = feature.getGeometry().getType();
                var string = 'Type: ' + geomType;
                var coord = feature.getGeometry().getCoordinates();
                if (geomType == 'Circle') {
                    string += '\n Radius: ' + feature.getGeometry().getRadius()*distortion;
                    var temp = feature.getGeometry().getCenter();
                    string += '\n Center coordinates: \n Lon:' + temp[0];
                    string += '\n Lat:' + temp[1];
                    }
                if (geomType == 'Polygon') {
                    string += '\n Area: ' + feature.getGeometry().getArea()*distortion*distortion +
                    '\n Coordinates: \n';
                    var point = 0;
                    for (var i = 0; i < coord[0].length; i++){
                        point = i+1;
                        string += '\n Point: '+ point + '\n Lon' + (coord[0])[i][0] + '\n Lat' + (coord[0])[i][1];
                    }
                }
                if (geomType == 'LineString') {
                    string +=  '\n Length: ' + feature.getGeometry().getLength()*distortion
                    +'\n Coordinates: \n ';
                    var point = 0;

                        string += 'Start point:';
                        string += '\n Lon: ' + (coord[0])[0];
                        string += '\n Lat: ' + (coord[0])[1];
                        string += '\n End point: ';
                        string += '\n Lon: ' + (coord[1])[0];
                        string += '\n Lat: ' + (coord[1])[1];
                        console.log(coord);

                }
                if (geomType == 'Point') {
                    temp = feature.getGeometry().getCoordinates();
                    string += '\n Center coordinates: \n Lon:' + temp[0];
                    string += '\n Lat:' + temp[1];
                }

                document.getElementById('info').innerHTML = string; // add type in textbox

                //var length = feature.getGeometry().getLength();
                //document.getElementById('attributes').innerHTML = '&nbsp;' + length
                });

                map.addInteraction(select);
    }
    getGeomFeature();


    function removeGeometries() {sourceDraw.clear(true);}
    function zoomToGeometries(){
        var extent = sourceDraw.getExtent();
        map.getView().fit(extent, map.getSize());
     }
    function addLayer(box) {
        var layerIndex = box.value;
        if(box.checked){
            map.addLayer(layers2[layerIndex]);
        }
        else {
            map.removeLayer(layers2[layerIndex]);
        }
       }
