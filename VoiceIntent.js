import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFetch } from "react-async"

import Voice from 'react-native-voice';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';

class VoiceIntent extends Component {
  constructor(props) {
    super(props);
    this.webref = null;
    this.interval = null;
    this.mapview = null;
    this.state = {
      active: false,
      results: [],
      marker: null,
    };
    Voice.onSpeechResults = this.onSpeechResults;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  startRecognizing = async () => {
    this.webref.injectJavaScript('startFunction()');
    this.setState({
      results: [],
      active: true,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  stopRecognizing = async () => {
    clearInterval(this.interval);
    if (this.state.active) {
      this.webref.injectJavaScript('stopFunction()');
      this.fetchIntent();
      this.setState({ active: false });
      try {
        await Voice.stop();
      } catch (e) {
        console.error(e);
      }
    }
  };

  onSpeechResults = e => {
    clearInterval(this.interval);
    this.interval = setInterval(
      this.stopRecognizing,
      1000
    );
    this.setState({
      results: e.value,
    });
  };

  fetchIntent = async () => {
    const { results } = this.state;
    const response = await fetch(`https://api.wit.ai/message?v=20190903&q=${results.join(' ')}`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer 3QG5RCLIUTYYUU6KS63OKFU2U7MUV43X',
      }
    });
    const intentdata = await response.json();
    if (intentdata.entities.intent.some(obj => obj.value === 'location' && obj.confidence > 0.9)) {
      this.currenLocation();
    }
  }

  currenLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({ marker: { latitude: position.coords.latitude, longitude: position.coords.longitude}});
        this.mapview.animateToRegion({
          latitude:  position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }, 2000);
      },
      error => console.error(error.message),
      { enableHighAccuracy: true }
    );
  }

  render() {
    return (
      <>
        <WebView
          style={{ flex: 0.7}}
          ref={r => (this.webref = r)}
          originWhitelist={['*']}
          source={require('./wave.html')}
        />
        <View style={styles.container}>
          
          <MapView
            style={{flex: 1, flexDirection: 'column'}}
            ref={r => (this.mapview = r)}
          >
            {this.state.marker && (
            <Marker
              coordinate={this.state.marker}
              title="React Native EU"
            />
            )}
          </MapView>
          
          <TouchableHighlight  style={{height: 65,  justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000FF',}} onPress={this.state.active ? this.stopRecognizing : this.startRecognizing}>
            <Text style={styles.action}> {this.state.active ? 'Talk....' : 'Speak'}</Text>
          </TouchableHighlight>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    backgroundColor: '#0000FF',
    color: '#fff',
    marginVertical: 5,
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
  },
  stat: {
    textAlign: 'center',
    marginBottom: 1,
  },
});

export default VoiceIntent;