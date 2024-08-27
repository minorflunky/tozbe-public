import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  Pressable,
  AppState,
  Platform,
  NativeModules,
  PermissionsAndroid,
} from "react-native";
import { Banner, COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { androidSafeArea } from "../constants/theme";
import { Stack } from "expo-router";
import Navbar from "../constants/navbar";

import { SendDirectSms } from "react-native-send-direct-sms";
//import SendSMS from "react-native-sms-x";
import SmscApi from "./smsc_api.js";
import smsc_api from "./smsc_api.js";

//var smsc = require('./smsc_api.js');

SmscApi.configure({
  login: "minorflunky",
  password: "28232823Ns!",
});


const SendSMS = async (receiver, user, location) => {
  try {
  url = 'https://smsc.kz/rest/send/';
  response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': "application/json" 
    },
    body: JSON.stringify({
      login: "login",
      psw: "password",
      phones: receiver,
      mes: `Пользователь ${user} находится в опасности по адресу ${location}`,
      flash: 1
    }),
  })
  //console.log(response)
  const json = await response.json();
  console.log(json);
  return await json;
}
catch (error) {
  console.error(error);
  return error;
}
};

const TozbeScreen = ({ navigation }) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const [emergencyMessage, setEmergencyMessage] = useState(
    "Помоги мне, я в опасности!"
  );
  const [keywordDetection, setKeywordDetection] = useState(false);
  const [isSosActive, setIsSosActive] = useState(false);

  const handleSwitchChange = () => {
    setKeywordDetection(!keywordDetection);
  };

  const handleMessageChange = (text) => {
    setEmergencyMessage(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { color: COLORS.white }]}>MAIN</Text>

        <Pressable
          onPress={() => {
            console.log("INFO pressed");
            navigation.navigate("Info");
          }}
        >
          <Text style={styles.headerText}>INFO</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            console.log("SETTINGS pressed");
            navigation.navigate("Settings");
          }}
        >
          <Text style={styles.headerText}>SETTINGS</Text>
        </Pressable>
      </View>
      <Text style={styles.instructionText}>
        Отправь экстренное сообщение доверенным контактам
      </Text>
      <View style={styles.sosContainer}>
        <Pressable
          onPress={() => {
            console.log("SOS pressed");
            console.log(SendSMS("+77019251175",'user','location'))
          }}
        >
          <Text style={styles.sosText}>SOS</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.messageInput}
        value={emergencyMessage}
        onChangeText={handleMessageChange}
        placeholder="Текст сообщения"
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          Начать распознавание ключевого слова
        </Text>
        <Switch
          value={keywordDetection}
          onValueChange={handleSwitchChange}
          style={styles.switch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerText: {
    minWidth: 100,
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  instructionText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  sosContainer: {
    margin: 16,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    height: 150,
    width: 150,
    borderRadius: 75,
  },

  sosText: {
    borderRadius: 100,
    borderColor: "#8b008b",
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
  },
  messageInput: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    color: "#fff",
    fontSize: 16,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default TozbeScreen;
