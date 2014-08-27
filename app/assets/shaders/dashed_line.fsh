uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
varying vec3 vCustomColor;

void main() {
  if ( mod( vLineDistance, totalSize ) > dashSize ) {
    discard;
  }

  gl_FragColor = vec4( vCustomColor, 1.0 );

}