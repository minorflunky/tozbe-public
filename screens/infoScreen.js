import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Switch, ScrollView, Linking } from "react-native";
import { COLORS } from "../constants";

const InfoScreen = ({navigation}) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Pressable
        onPress={() => {
            console.log("MAIN pressed");
            navigation.navigate("Sos");
        }}>
        <Text style={[styles.headerText, { color: COLORS.white }]}>MAIN</Text>
        </Pressable>

        <Text style={styles.headerText}>INFO</Text>

        <Pressable
          onPress={() => {
            console.log("SETTINGS pressed");
            navigation.navigate("Settings");
          }}
        >
          <Text style={styles.headerText}>SETTINGS</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.container}>
      <Text style={styles.title}>ТЕЛЕФОНЫ ДОВЕРИЯ</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionItem}>1. Бесплатная психологическая помощь жителям Алматы телефон доверия: 1 303, +7 708 983 2863</Text>
        <Text style={styles.sectionItem}>2. Единый государственный контакт-центр для казахстанцев, ставших жертвами домашнего насилия и буллинга: 111</Text>
        <Text style={styles.sectionItem}>3. Национальная телефонная линия доверия для детей и молодежи: 150, +7 708 106 0810</Text>
      </View>

      <Text style={styles.subtitle}>Полезные сайты</Text>
      <View style={styles.section}>
        <Text style={styles.link} onPress={() => Linking.openURL('https://svetpf.org')}>
          https://svetpf.org
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://schitaetsya.kz')}>
          https://schitaetsya.kz
        </Text>
      </View>

      <Text style={styles.subtitle}>Контакты помощи</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Красный полумесяц Казахстана (медики)</Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://redcrescent.kz/contact-us')}>
          https://redcrescent.kz/contact-us
        </Text>
        {/* Add more content here */}
      </View>

      {/* Add more sections for each region and organization */}

    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    container: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    sectionItem: {
      fontSize: 16,
      marginBottom: 4,
    },
    link: {
      color: 'blue',
      textDecorationLine: 'underline',
      marginBottom: 4,
    },
});
export default InfoScreen;
