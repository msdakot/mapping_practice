uniform sampler2D texture;
varying vec4 v_color;

void main(){

  vec4 tex_color = texture2D(texture, gl_PointCoord.xy );
  gl_FragColor = tex_color * v_color;
}