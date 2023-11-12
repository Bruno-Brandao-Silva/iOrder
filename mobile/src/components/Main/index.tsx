import React, { useState } from 'react';

import { LogBox, View, Image, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {styles} from './styles';
// @ts-ignore
import logo from '../../images/logo.png'
import Modal from '../Modal/index';
import Orders from '../Orders/index';

LogBox.ignoreLogs(['Unrecognized WebSocket']);


export default function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <StatusBar style="auto" />
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


