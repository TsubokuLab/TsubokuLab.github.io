attribute vec3  position;
attribute vec4  color;
attribute float size;

uniform   vec2  mouse; // マウスカーソルの位置（正規化済み） @@@
varying   vec2  vResolution;
varying   vec2  vMouse;
varying   vec4  vColor;
void main(){
    //vResolution = resolution;
    vMouse = mouse;
    vColor = color;

    // マウスカーソルの動きを頂点座標にそのまま加算する @@@
    gl_Position = vec4(position, 1.0);
    gl_PointSize = size;
}
