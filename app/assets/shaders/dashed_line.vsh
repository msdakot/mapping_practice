uniform float scale;
attribute float lineDistance;
attribute vec3 customColor;

varying float vLineDistance;
varying vec3 vCustomColor;

void main() {

 
  vLineDistance = scale * lineDistance;
  vCustomColor = customColor;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;


}