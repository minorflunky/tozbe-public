import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Pressable } from 'react-native';
import { COLORS } from '../constants';

const SettingsScreen = ({navigation}) => {
  const [audioRecordingDuration, setAudioRecordingDuration] = useState(1);
  const [sendLocation, setSendLocation] = useState(false);

  const toggleSendLocation = () => {
    setSendLocation(!sendLocation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Pressable
          onPress={() => {
            console.log("Sos pressed");
            navigation.navigate("Sos");
          }}
        >
        <Text style={[styles.headerText, { color: COLORS.gray }]}>MAIN</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            console.log("INFO pressed");
            navigation.navigate("Info");
          }}
        >
          <Text style={[styles.headerText, {color : COLORS.gray }]}>INFO</Text>
        </Pressable>


          <Text style={[styles.headerText, {color: COLORS.white }]}>SETTINGS</Text>

      </View>

      <TouchableOpacity style={styles.contactContainer}>
        <Text style={styles.contactText}>Номер телефона</Text>
        <Text style={styles.requiredText}>*Обязательно</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactContainer}>
        <Text style={styles.contactText}>Доверенный контакт 1</Text>
        <Text style={styles.requiredText}>*Обязательно</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactContainer}>
        <Text style={styles.contactText}>Доверенный контакт 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactContainer}>
        <Text style={styles.contactText}>Доверенный контакт 3</Text>
      </TouchableOpacity>

      <View style={styles.keywordContainer}>
        <Text style={styles.keywordLabel}>Ключевое слово</Text>
        <Text style={styles.keywordText}>Help me</Text>
      </View>

      <View style={styles.audioRecordingContainer}>
        <Text style={styles.audioRecordingLabel}>Продолжительность аудио записи(макс...)</Text>
        <View style={styles.audioRecordingDurationContainer}>
          <Text style={styles.audioRecordingDuration}>{audioRecordingDuration}</Text>
          <Text style={styles.audioRecordingDurationUnit}>МИН</Text>
        </View>
        <Text style={styles.requiredText}>*Обязательно</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Отправка обновленной локации</Text>
        <Switch
          value={sendLocation}
          onValueChange={toggleSendLocation}
          style={styles.locationSwitch}
        />
      </View>

      <TouchableOpacity style={styles.locationContainer}>
        <Text style={styles.locationText}>Отправлять новую локаци...</Text>
        <Text style={styles.requiredText}>*Обязательно</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>СОХРАНИТЬ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
  },
  requiredText: {
    color: '#8b008b',
    fontSize: 14,
  },
  keywordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  keywordLabel: {
    color: '#fff',
    fontSize: 16,
  },
  keywordText: {
    color: '#8b008b',
    fontSize: 16,
  },
  audioRecordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  audioRecordingLabel: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  audioRecordingDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  audioRecordingDuration: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  audioRecordingDurationUnit: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationLabel: {
    color: '#fff',
    fontSize: 16,
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
  },
  locationSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  saveButton: {
    backgroundColor: '#8b008b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;