import glsl from "babel-plugin-glsl/macro"

export const vertex = glsl`
    uniform float uTime; 
    varying vec2 vUv; 
    attribute float scale; 
    attribute float rotation; 
    attribute float offset; 
    attribute float speed; 

    varying float vOffset; 
    varying float vSpeed; 

    #pragma glslify: rotate = require(glsl-rotate/rotate) 

    float HALF_PI = 1.570796327;

    void main() {
        vec3 transformedPosition = position; 
        transformedPosition.xyz *= scale;

        vec3 axis = vec3(1.0, 1.0, 1.0);
        transformedPosition = rotate(transformedPosition, axis, rotation * HALF_PI);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPosition, 1.0); 
        vUv = uv; 
        vOffset = offset; 
        vSpeed = speed; 
    }
`
