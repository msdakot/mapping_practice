uniform sampler2D label_texture;
varying vec2 v_uv;

void main(){
  vec4 texture_color = texture2D(label_texture, v_uv);
  gl_FragColor = texture_color;
}