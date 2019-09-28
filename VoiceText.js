import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button } from 'react-native';
import { WebView } from 'react-native-webview';

import Voice from 'react-native-voice';

class VoiceTest extends Component {
  constructor(props) {
    super(props);
    this.webref = null;
    this.state = {
      active: false,
      results: [],
    };

    Voice.onSpeechResults = this.onSpeechResults;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechResults = e => {
    this.setState({
      results: e.value,
    });
  };

  startRecognizing = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }

    this.webref.injectJavaScript('startFunction()');
    this.setState({
      results: [],
      active: true,
    });
  };

  stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }

    this.webref.injectJavaScript('stopFunction()');
    this.setState({ active: false });
  };

  render() {
    return (
      <>
        <WebView
          style={{ flex: 1}}
          ref={r => (this.webref = r)}
          originWhitelist={['*']}
          source={require('./wave.html')}
        />
        <View style={styles.container}>
          
          <View style={{flex: 1, flexDirection: 'row',  justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            {this.state.results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
          </View>

          <TouchableHighlight  style={{flex: 1, flexDirection: 'row',  justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000FF',}} onPress={this.state.active ? this.stopRecognizing : this.startRecognizing}>
            <Text style={styles.action}> {this.state.active ? 'Stop' : 'Start'}</Text>
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

export default VoiceTest;