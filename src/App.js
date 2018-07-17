import React, { Component } from 'react';
import { Screen } from '@shoutem/ui';
import Camera from 'react-native-camera';

export default class App extends Component {
  render() {
    return (
      <Screen>
        <Camera 
          style={{flex: 1}} 
          ref={cam => this.camera=cam}
          aspect={Camera.constants.Aspect.fill}
        >
        </Camera>
      </Screen>
    )
  }
}