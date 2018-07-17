import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import { Screen } from '@shoutem/ui';
import Camera from 'react-native-camera';
import { Surface } from 'gl-react-native';
import Saturate from './Saturate';

export default class App extends Component {
  state = {
    width: null,
    height: null
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (e, {x0, y0}) => {
          //start gesture
        },

        onPanResponderMove: (e, {dx, dy}) => {
          //gesture progress
        },

        onPanResponderRelease: (ev, {vx, vy}) => {
          //gesture complete
      }
    });
  }

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;

    this.setState({
      width,
      height
    });
    this.start();
  }

  refreshPic = () => {
    this.camera
      .capture({
        target: Camera.constants.CaptureTarget.temp, jpegQuality: 70
      })
      .then(data => this.setState({
        path: data.path
      }))
      .catch(err => console.error(err));
  }

  start() {
    this.timer = setInterval(() => this.refreshPic(), 5);
  }

  onComponentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { width, height } = this.state;
    const filter = {
      contrast: 1,
      saturation: 1,
      saturation: 1,
      brightness: 1
    }

    if (width && height) {
      return (
        <Screen onLayout={this.onLayout}>
          <Camera 
            style={{flex: 1}} 
            ref={cam => this.camera=cam}
            captureQuality={Camera.constants.CaptureQuality['720p']}
            aspect={Camera.constants.Aspect.fill}
          >
          <Surface style={{ width, height }}>
            <Saturate {...filter}>
              {{ uri: 'https://i.imgur.com/uTP9Xfr.jpg' }}
            </Saturate>
          </Surface>
          </Camera>
        </Screen>
      );
    } else {
      return (
        <Screen onLayout={this.onLayout} />
      );
    }
  }
}