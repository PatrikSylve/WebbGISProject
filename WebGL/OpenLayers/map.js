


// webGl layer

function main() {
    alert("main");
  mainOL();
}


function mainOL() {
    alert('0');
    proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
      '+x_0=400000 +y_0=-100000 +ellps=airy ' +
      '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
      '+units=m +no_defs');
  function transform(extent) {
        return ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
      }
alert("1");

var extents = {
    India: transform([68.17665, 7.96553, 97.40256, 35.49401]),
    Argentina: transform([-73.41544, -55.25, -53.62835, -21.83231]),
    Nigeria: transform([2.6917, 4.24059, 14.57718, 13.86592]),
    Sweden: transform([11.02737, 55.36174, 23.90338, 69.10625])
  };

  //var canvasFunction = function(extent, resolution, pixelRatio, size, projection) {
     var canvas = document.createElement('canvas');
    // var canvasWidth = size[0],
     //  canvasHeight = size[1];
       var canvasWidth = 200,
         canvasHeight = 200;

     canvas.setAttribute('width', canvasWidth);
     canvas.setAttribute('height', canvasHeight);
     var gl = canvas.getContext("webgl");
     alert(gl);
     var glOut = webGL(canvas, gl);
     gl.drawArrays(glOut[1], glOut[2], glOut[3]);
     return canvas;
  // };

var imageExtent = [0, 0, 700000, 1300000];
 var overlay = new ol.layer.Tile({
       extent: extents.India,
       source: new ol.source.TileJSON({
         url: 'https://api.tiles.mapbox.com/v3/mapbox.world-black.json?secure',
         crossOrigin: 'anonymous'
       })
     });

var canvasLayer = new ol.layer.Image({
    source: new ol.source.ImageCanvas({
        canvasFunction: canvasFunction,
        projection: 'EPDSG:3857'
    })
});

var map = new ol.Map({
     target: 'map',
     layers: [
       new ol.layer.Tile({
         source: new ol.source.OSM()
       })
     ],
     view: new ol.View({
       center: ol.proj.fromLonLat([13.345, 55.63]),

       // webG vtest
      // center: ol.proj.transform(
        //ol.extent.getCenter(imageExtent), 'EPSG:27700', 'EPSG:3857'),
       zoom: 5
     })
   });
   map.addLayer(overlay);
map.addLayer(canvasLayer);

canvasLayer.setExtent(extents["India"]);
overlay.setExtent(extents["India"]);
return canvasLayer;
}




function webGL(canvas, gl){
    //var canvas = document.getElementById('canvas'); // get canvas
    //var slide = document.getElementById('redSlide');
    //var gl = canvas.getContext("webgl"); // skapa webGlRenderingContext
alert('ebgl');
    // hämta shaders.
    var vertexShaderSource = document.getElementById("vert-shader").text;
    var fragmentShaderSource = document.getElementById("frag-shader").text;
    //skapa shader
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    // skapa program
    var program = createProgram(gl, vertexShader, fragmentShader);
    //skapa uniform och attribut
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");


            //Lägg till/ta bort uniformer, matcha mot shaders
            var redUniformLocation = gl.getUniformLocation(program, "u_red");





    //skapa buffer, attribut i shader får data från dessa
    var positionBuffer = gl.createBuffer();

    //" WebGL lets us manipulate many WebGL resources on global bind points.
    //You can think of bind points as internal global variables inside WebGL.
    // First you bind a resource to a bind point.
    //Then, all other functions refer to the resource through the bind point.
    //So, let's bind the position buffer."
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var positions = [
        10, 50,
        100, 30.5,
        150.7, 55.0,
        ];
    var position_size = positions.length;
    // next line copies the data to positionBuffer on GPU, because we bound it to ARRAY_BUFFER above
    //                              creates 32bin from position
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // conversion between clip space <-> pixels, clip space [-1,1].
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    clearCanvas(gl);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // set the resolution ( uniform values comes after we set program)
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

                // change/set uniform values
                gl.uniform1f(redUniformLocation, setRed());


    // tell webGl how to take data from buffer above
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset)

        // "A hidden part of gl.vertexAttribPointer is that it binds the current ARRAY_BUFFER to the attribute.
        //In other words now this attribute is bound to positionBuffer.
        //That means we're free to bind something else to the ARRAY_BUFFER bind point.
        //The attribute will continue to use positionBuffer."

    // execute prog
    var primitiveType = gl.TRIANGLES; // LINE_STRIP available
    var offset = 0;
    var count = position_size/2; // tells the prog how many times the vertexx shader will be executed -
    // a-pos will take values from positionBuffer.1 triangle = 3, if 2 triangles count = 6
    //gl.drawArrays(primitiveType, offset, count);
    return [gl, primitiveType, offset, count];

}
main();
