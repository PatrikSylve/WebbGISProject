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




			//The source for the New York streets layer
      var wmsSource = new ol.source.ImageWMS({
          url: ' http://stark.nateko.lu.se:8080/geoserver/wms',
          params: {
          'LAYERS': 'workspaceName:layerName'
            },
            serverType: 'geoserver'
            });




			//OpenStreetMap background layer and New York streets layer
      var layers = [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Image({
          source: wmsSource
        })
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

