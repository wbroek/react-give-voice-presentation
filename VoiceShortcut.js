import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  SafeAreaView,
  View,
  Image,
} from "react-native";
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

const onstage = {
  activityType: "nl.wbroek.reactvoice.openapp",
  title: "On stage",
  userInfo: {
    who: "wouter",
  },
  keywords: ["wbroek"],
  persistentIdentifier: "nl.wbroek.reactvoice.openapp",
  suggestedInvocationPhrase: "Who is on stage?",
  needsSave: true
};



export default class Shortcut extends Component {
  componentDidMount() {
   
    suggestShortcuts([onstage]);

    donateShortcut(onstage);

    SiriShortcutsEvent.addListener(
      "SiriShortcutListener",
      this.handleSiriShortcut.bind(this)
    );
  }

  handleSiriShortcut({ userInfo, activityType }) {
    this.setState({
      shortcutInfo: userInfo,
      shortcutActivityType: activityType
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Image style={{flex: 1}} resizeMode="cover" source={require('./screen.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
});



















const cool = {
  activityType: "nl.wbroek.reactvoice.openapp",
  title: "Coolest person",
  userInfo: {
    who: "victoria",
  },
  keywords: ["wbroek"],
  persistentIdentifier: "nl.wbroek.reactvoice.openapp.cool",
  suggestedInvocationPhrase: "The coolest person in the room?",
  needsSave: true
};
