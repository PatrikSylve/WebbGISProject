



// create and compile shader

function createShader(gl, type, source) {
var shader = gl.createShader(type);
gl.shaderSource(shader, source);
gl.compileShader(shader);
var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
if (success) {
return shader;
}
console.log(gl.getShaderInfoLog(shader));
gl.deleteShader(shader);
}

// link shader to program
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
    return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function clearCanvas(gl){
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
}

function setRed(){ 
    red = document.getElementById('redSlide');
    red = red.value;
    return red;
}
