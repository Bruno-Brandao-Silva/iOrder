import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { LogBox, View, Image, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// @ts-ignore
import logo from './src/images/logo.png';
import Modal from './src/components/Modal/index';
import Orders from './src/components/Orders/index';

LogBox.ignoreLogs(['Unrecognized WebSocket']);


export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <StatusBar style="dark" />
      <Modal visible={isModalVisible} onRequestClose={handleCloseModal} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Orders />
        </View>

        <View style={styles.newOrderContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
            <Text style={styles.buttonText}>Novo Pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  content: {
    paddingVertical: 32,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    aspectRatio: 1.3,
    marginBottom: 42,
  },
  newOrderContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 13,
    padding: 16,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#C52233',
    borderRadius: 5,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
