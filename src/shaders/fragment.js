import glsl from "babel-plugin-glsl/macro"

export const fragment = glsl`
    uniform float uTime; 
    varying vec2 vUv; 
    varying float vOffset; 
    varying float vSpeed; 

    void main() {
        float wave = fract(uTime * vSpeed) + vOffset; 
        float alpha = smoothstep(wave - 0.05, wave, vUv.x) + 1.0 - step(wave, vUv.x); 
        alpha = alpha - 1.0; 
   
        if(alpha < 0.1) discard; 

        gl_FragColor = vec4(vec3(1.0, 1.0, 1.0), alpha);
    }
`
