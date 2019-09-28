import React from "react";
import { View, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {
  SiriShortcutsEvent,
  donateShortcut,
  suggestShortcuts,
  clearAllShortcuts,
  clearShortcutsWithIdentifiers,
  presentShortcut,
  getShortcuts,
  ShortcutOptions,
  ShortcutData,
} from "react-native-siri-shortcut";

import Text from './VoiceText';
import Intent from './VoiceIntent';
import Shortcut from './VoiceShortcut';
import Speak from './VoiceSpeak';

class HomeScreen extends React.Component {

  componentDidMount() {
    SiriShortcutsEvent.addListener(
      "SiriShortcutListener",
      this.handleSiriShortcut.bind(this)
    );
  }

  handleSiriShortcut({ userInfo, activityType }) {
    console.log(userInfo, activityType);
    if (activityType === 'nl.wbroek.reactvoice.openapp' && userInfo && userInfo.who === 'wouter') {
      this.props.navigation.navigate('shortcut');
    }
    if (activityType === 'nl.wbroek.reactvoice.openapp' && userInfo && userInfo.who === 'victoria') {
      this.props.navigation.navigate('speak');
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
            title="Speech to Text"
            onPress={() => this.props.navigation.navigate('text')}
          />
          <Button
            title="Intent action"
            onPress={() => this.props.navigation.navigate('intent')}
          />
          {/* <Button
            title="Shortcut"
            onPress={() => this.props.navigation.navigate('shortcut')}
          />
          <Button
            title="Text to Speech"
            onPress={() => this.props.navigation.navigate('speak')}
          /> */}
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  shortcut: {
    screen: Shortcut,
  },
  speak: {
    screen: Speak,
  },
  text: {
    screen: Text,
  },
  intent: {
    screen: Intent,
  },
});

export default createAppContainer(AppNavigator);