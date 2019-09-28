import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import * as Speech from 'expo-speech';

export default class App extends React.Component {

  speak() {
    var cool= 'Victoria Quirante';
    Speech.speak(cool, { voice: 'com.apple.ttsbundle.Zosia-compact' });
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight>
            <Image source={require('./photo.png')} />
          </TouchableHighlight>
      </View>
    );
  }

  componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.speak();
      }
    );
  }

  componentWillUnmount() {
    this.focusSubscription.remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});