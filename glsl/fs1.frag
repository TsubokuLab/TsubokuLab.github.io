// - glslfan.com --------------------------------------------------------------
// Ctrl + s or Command + s: compile shader
// Ctrl + m or Command + m: toggle visibility for codepane
// ----------------------------------------------------------------------------
precision mediump float;
uniform vec2  resolution;     // resolution (width, height)
uniform vec2  vMouse;          // mouse      (0.0 ~ 1.0)
uniform float time;           // time       (1second == 1.0)
uniform sampler2D backbuffer; // previous scene

const float PI = 3.1415926;

const int REFLECT_ITER = 3;
const int RAY_ITER = 99;
const float FAR = 100.0;
const float EPS = 0.0001;

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

mat2 rot(float a){
    return mat2(cos(a), sin(a), -sin(a), cos(a));
}

float sdPlane(vec3 p, float h){
    return p.y - h;
}

float sdBox(vec3 p, vec3 s){
    vec3 q = abs(p) - s;
    return max(max(q.x, q.y), q.z);
}

float sdBarX(vec3 p, vec2 s){
    vec2 q = abs(p.yz) - s;
    return max(q.x, q.y);
}
float sdBarZ(vec3 p, vec2 s){
    vec2 q = abs(p.xy) - s;
    return max(q.x, q.y);
}

float sdSphere(vec3 p, float r){
    return length(p) - r;
}

float sdPoleX(vec3 p, float r){
    return length(p.yz) - r;
}
float sdPoleY(vec3 p, float r){
    return length(p.xz) - r;
}

float sdInfinityDoor(vec3 p, float s, float interbal){
    p.z = mod(p.z, interbal) - interbal / 2.0;
    
    float d = sdPoleX(p - vec3(0.0, s, 0.0), s);
    d = min(d, sdBarX(p - vec3(0.0, -s, 0.0), vec2(s * 2.0,s)));
    return d;
}

float sdInfinityPole(vec3 p, float s, float interbal){
    p.z = mod(p.z, interbal) - interbal / 2.0;
    
    float d = sdPoleY(p - vec3(0.0, s, 0.0), s);
    return d;
}

float sdTiledFloor(vec3 p, float interbal){
    float d;
    p.xz = mod(p.xz, interbal) - interbal / 2.0;
    d = sdPlane(p, 0.0);
    d = max(d, -sdBarX(p - vec3(0.0, 0.0, 0.0), vec2(0.01, 0.01)));
    d = max(d, -sdBarZ(p - vec3(0.0, 0.0, 0.0), vec2(0.01, 0.01)));
    return d;
}

float sdRotateBox(vec3 p, vec3 s){
    p.xz *= rot(time);
    
    for(int i = 0; i < 2; i++){
        p = abs(p) - 0.1;
        p.xz *= rot(time);
        p.xy *= rot(time * 1.24);
        p.yz *= rot(time * 1.45);
    }
    
    vec3 q = abs(p) - s;
    return max(max(q.x, q.y), q.z);
}

float map(vec3 p){
    float d = FAR;
    
    d = min(d, abs(p.x + 1.5) - 0.1);
    d = min(d, abs(1.5 - p.x) - 0.1);
    d = min(d, 2.0 - p.y);
    d = max(d, -sdBarZ(p - vec3(0.0, 2.0, 0.0), vec2(1.0, 0.2)));
    
    d = max(d, -sdInfinityDoor(p - vec3(0.0, 0.8, 0.0), 0.4, 1.5));
    d = min(d, sdInfinityPole(p - vec3(-1.2, 0.0, 0.0 + 0.75), 0.1, 1.5));
    d = min(d, sdInfinityPole(p - vec3(1.2, 0.0, 0.0 + 0.75), 0.1, 1.5));
    
    d = min(d, sdTiledFloor(p - vec3(0.0, -0.5, 0.0), 0.3));
    d = min(d, sdRotateBox(p - vec3(0.0, 0.0, time + 3.0), vec3(0.3, 0.02, 0.05)));
    return d;
}

vec3 calcN(vec3 p){
	vec2 e =vec2(EPS, 0.0);
	vec3 n = normalize(vec3(
	    map(p+e.xyy)-map(p-e.xyy),
	    map(p+e.yxy)-map(p-e.yxy),
	    map(p+e.yyx)-map(p-e.yyx)
	    ));
	return n;
}

float calcAO(vec3 p, vec3 n, float len, float power){
    vec3 aoPos = p;
    float occ = 0.0;
    for(int i = 0; i < 3; i++){
        aoPos = p + n * len / 3.0 * float(i+1);
        float d = map(aoPos);
        occ += (len - d) * power;
        power *= 0.5;
    }
    return clamp(1.0 - occ, 0.0, 1.0);
}

float calcBloom(vec3 cam, vec3 ray, float endDepth){
    float bloom = 0.0;
    float depth = 0.0;
    for(int i = 0; i < RAY_ITER; i++){
        vec3 p = cam + ray * depth;
        p.z = mod(p.z, 4.0) - 2.0;
        float d = sdSphere(p - vec3(0.0, 2.0, 0.0), 0.05);
        bloom += exp(-d*0.25);
        if(depth > endDepth) break;
        depth += d;
    }
    return bloom / float(RAY_ITER);
}

vec3 draw(vec3 camPos, vec3 rayDirection, out vec3 rayPos, out vec3 normal, out bool hit){
    vec3 col = vec3(0.0);
    float depth = 0.0;
    float dist;
    for(int i = 0; i < RAY_ITER; i++){
        rayPos = camPos + rayDirection * depth;
        dist = map(rayPos);
        if(dist < EPS || depth > FAR){
            normal = calcN(rayPos);
            break;
        }
        depth += dist;
    }
    
    col = vec3(1.0) / 2.0;//hsv(depth / 5.0, 1.0, 1.0);
    col *= max(dot(normal, vec3(1.0, 1.0, 1.0) * 1.0), 0.5);
    col *= max(depth / FAR, 0.1);
    col *= calcAO(rayPos, normal, 0.5, 1.0);
    
    col += vec3(1.0, 0.8, 0.6) * calcBloom(camPos, rayDirection, depth) * 10.0;
    
    hit = dist < EPS;
    return col;
}

vec3 canvas(vec2 uv){
    vec3 col = vec3(0.0);
    vec3 normal = vec3(0.0);
    vec3 camPos = vec3(cos(time / 2.0) * 0.1, sin(time / 3.0) * 0.1 - 0.2, time);
    vec3 rayDirection = normalize(vec3(uv.x, uv.y + 0.4 + sin(time / 5.0) * 0.2, 1.5));
    vec3 rayPos = camPos;
    float depth = 0.0;
    bool hit = false;
    float alpha = 1.0;
    for(int i = 0; i < REFLECT_ITER; i++){
        col += draw(camPos, rayDirection, rayPos, normal, hit) * alpha;
        
        rayDirection = normalize(reflect(rayDirection, normal));
        camPos = rayPos + normal * EPS;
        alpha *= 0.5;
        if(!hit)break;
    }
    
    return col;
}

void main(){
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    vec3 col;
    col = canvas(uv);
    
    gl_FragColor = vec4(col, 1.0);
}
