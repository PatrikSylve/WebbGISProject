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

      t1 = new ol.layer.Image({
        source: public_buildings
      })

      t2 = new ol.layer.Image({
      source: roads_highway
      })

      t3 = new ol.layer.Image({
      source: adresses
      })

      t4 = new ol.layer.Image({
      source: roads_throug
      })

      t5 = new ol.layer.Image({
      source: rural_buildings
      })

      t6 = new ol.layer.Image({
      source: railroads
      })

      t7 = new ol.layer.Image({
      source: roads_all
      })

      var layers = [t1,t2,t3,t4,t5];

      var map = new ol.Map({
        layers: [bingMapsAerial,t0],
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

    // var map = new ol.Map({
    //   target: 'map',
    //   layers: layers2,
    //   view: new ol.View({
    //     center: ol.proj.fromLonLat([13.41, 55.55]),
    //     zoom: 10
    //   })
    // });

    // var map = new ol.Map({
    //     layers: bingMapsRoad,
    //     target: 'map',
    //     view: new ol.View({
    //       center: ol.proj.transform([6.562783, 46.517814], 'EPSG:4326', 'EPSG:3857'),
    //       zoom: 13
    //     })
    //   });
    //
    function addLayer(box) {
        var layerIndex = box.value;
        if(box.checked){
            map.addLayer(layers2[layerIndex]);
        }
        else {
            map.removeLayer(layers2[layerIndex]);
        }
       }
