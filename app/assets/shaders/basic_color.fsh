varying vec3 v_customColor;
void main(){

  gl_FragColor = vec4(v_customColor, 1.0);
}