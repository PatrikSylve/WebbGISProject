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
     'LAYERS': 'addresses_wgs84'
     },
     serverType: 'geoserver'
     });
var roads_throug = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
    'LAYERS': 'roads_throug_wgs84'
    },
    serverType: 'geoserver'
    });
var rural_buildings = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
    'LAYERS': 'rural_buildings_wgs84'
    },
    serverType: 'geoserver'
    });
var districts = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
    'LAYERS': 'districts_wgs84'
    },
    serverType: 'geoserver'
    });
var railroads = new ol.source.ImageWMS({
    url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
    params: {
    'LAYERS': 'railroads_wgs84'
    },
    serverType: 'geoserver'
    });
    var roads_all = new ol.source.ImageWMS({
        url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
        params: {
        'LAYERS': 'roads_all_wgs84'
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
      source: adresses
      }),
      new ol.layer.Image({
      source: roads_throug
      }),
      new ol.layer.Image({
      source: rural_buildings
      }),

      new ol.layer.Image({
      source: railroads
      }),
      new ol.layer.Image({
      source: roads_all
      }),
    ];

    var map;
    require(["esri/map", "dojo/domReady!"], function(Map) {
      map = new Map("map", {
        basemap: "topo",
        center: [-122.45, 37.75],
        zoom: 13
      });
    });



    // var map = new ol.Map({
    //   target: 'map',
    //   layers: layers2,
    //   view: new ol.View({
    //     center: ol.proj.fromLonLat([13.41, 55.55]),
    //     zoom: 10
    //   })
    // });
    //
    // function addLayer(box) {
    //     var layerIndex = box.value;
    //     if(box.checked){
    //         map.addLayer(layers2[layerIndex]);
    //     }
    //     else {
    //         map.removeLayer(layers2[layerIndex]);
    //     }
    //    }
