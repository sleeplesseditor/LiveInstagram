import React, { Component } from 'react';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-native';

//Define shaders statistically in gl-react
const shaders = Shaders.create({
    helloGL: {
        //First fragment shader in GLSL language (OpenGL Shading Language)
        frag: GLSL`
            precision highp float;
            varying vec2 uv;
            void main() {
                gl_FragColor = vec4(uv.x, uv.y, 0.5, 0.4);
        }`
    // the main() function is called FOR EACH PIXELS
    // the varying uv is a vec2 where x and y respectively varying from 0.0 to 1.0.
    // we set in output the pixel color using the vec4(r,g,b,a) format.
    // see [GLSL_ES_Specification_1.0.17](http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf)
    }
});

export default class HelloGL extends Component {
    render() {
        return (
            <Node shader={shaders.helloGL} />
        );
        
    }
}