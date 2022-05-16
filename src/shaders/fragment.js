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
   
        alpha = max(alpha, 0.05);

        gl_FragColor = vec4(vec3(0.0, 0.58, 1.0), alpha);
    }
`
