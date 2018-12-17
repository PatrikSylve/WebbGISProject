	//Information about OpenLayers:

		//API - http://openlayers.org/en/master/apidoc/index.html
		//Examples - https://openlayers.org/en/latest/examples/

		function init() {



			//The bounding box of New York streets layer, add the bounding box coordinates in the array
      var extent = [13, 55, 13, 55];




			//Initial view
      var view = new ol.View({
        center: ol.proj.transform([13.19, 55.705], 'EPSG:4326', 'EPSG:3857'),
        zoom: 15
        });




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

function updateLayers(evt) {
	var e = target.getElementById();
	alert e;

}

			//OpenStreetMap background layer and New York streets layer
      var layers = [
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
      ];





			//Bind the map object to our "map" div and add some extra functionality
      var map = new ol.Map({
        layers: layers,
        controls: ol.control.defaults({
          attributionOptions:
          ({
      collapsible: false
      })
      }).extend([
      //Extra functionality of the map

      //Control for displaying coordinates
      new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326'
      }),
      //Control for displaying a scale line
      new ol.control.ScaleLine({
      target: document.getElementById('scale-line')
      }),
      //Control for zoming to a defined extent
      new ol.control.ZoomToExtent({
      extent: ol.proj.transform(extent, 'EPSG:4326', 'EPSG:3857')
      })
      ]),
      target: 'map',
      view: view
      });






			//Add click event for getting attributes from WMS
      map.on('singleclick', function (evt) {
        var viewResolution = /** @type {number} */ (view.getResolution());
        var url = wmsSource.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, 'EPSG:3857',
        { 'INFO_FORMAT': 'application/json' });

      // JQuery HTTP GET request
      $.get(url, function (resp) {
        var features = resp.features;
        if (features.length > 0) {
            var properties = features[0].properties;
            fillInfoPanel(properties)
        }

      })
      });






			// Add function that fills the panel with attributes collected by the click event
      function fillInfoPanel(props) {
        var infoPanel = document.getElementById('infoContent');
        var content = ''
        var heading = '';
        var listBegin = '<ul>'
        var listItems = '';
        var listEnd = '</ul>'
        for (var prop in props) {
        // skip loop if the property is from prototype
        if (!props.hasOwnProperty(prop)) continue;

        listItems += '<li>' + '<b>' + prop + "</b> : " + props[prop] + '</li>';
      }
      content = heading + listBegin + listItems + listEnd;
      infoPanel.innerHTML = content;
      }








			// Toggles the info panel overlaying the map

			toggleInfo = function() {
				var checkBox = document.getElementById('infoToggle');
				var checked = checkBox.checked;
				var display = ''
				if (checked) {
					display = 'block'
				} else {
					display = 'none'
				}
				document.getElementById('info').style.display = display
			}
		}
