uniform sampler2D label_texture;
varying vec2 v_uv;
uniform vec3 custom_color;

void main(){
  vec4 cal_color = vec4(custom_color, 1.0);

  vec4 texture_color = texture2D(label_texture, v_uv);
  gl_FragColor = texture_color * vec4(1.0, 0.0, 0.0, 1.0);
}