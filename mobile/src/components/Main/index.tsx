import React, { useEffect, useState } from 'react';

import { View, Image, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
// @ts-ignore
import logo from '../../images/logo.png'
import Modal from '../Modal/index';
import Orders from '../Orders/index';
import NetInfo from "@react-native-community/netinfo";
import UdpSocket from 'react-native-udp'

const udpSocket = UdpSocket.createSocket({ type: 'udp4' });
const msg = "iOrder[Mobile]"
udpSocket.bind(3002);

export default function Main() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [backendIP, setBackendIP] = useState('');
  const [broadcastAddress, setBroadcastAddress] = useState('');
  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  useEffect(() => {
    udpSocket.on('message', (data, rinfo) => {
      if (data.toString() === 'iOrder[Backend]') {
        setBackendIP(rinfo.address);
      }
    });
    const calculateBroadcastAddress = (ip: any, subnetMask: any) => {
      const ipArray = ip.split('.').map(Number);
      const subnetMaskArray = subnetMask.split('.').map(Number);
      const broadcastArray = [];

      for (let i = 0; i < 4; i++) {
        broadcastArray.push(ipArray[i] | (subnetMaskArray[i] ^ 255));
      }

      return broadcastArray.join('.');
    };

    const fetchBroadcastAddress = async () => {
      const netInfo = await NetInfo.fetch();
      if (netInfo.type === 'wifi' && netInfo.details) {
        const { ipAddress, subnet } = netInfo.details;
        const broadcast = calculateBroadcastAddress(ipAddress, subnet);
        setBroadcastAddress(broadcast);
      }
    };

    fetchBroadcastAddress();

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.type === 'wifi' && state.details) {
        const { ipAddress, subnet } = state.details;
        const broadcast = calculateBroadcastAddress(ipAddress, subnet);
        setBroadcastAddress(broadcast);
      }
    });
    return () => {
      unsubscribe();
    };

  }, []);

  useEffect(() => {
    try {
      if (broadcastAddress !== '') {
        udpSocket.send(msg, undefined, undefined, 3002, broadcastAddress);
      }
    } catch (e) {
      console.log(e);
    }
  }, [broadcastAddress]);

  return (
    <>
      <StatusBar style="auto" />
      {backendIP != '' && <Modal backendIP={backendIP} visible={isModalVisible} onRequestClose={handleCloseModal} />}
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          {backendIP != '' && <Orders backendIP={backendIP} />}
        </View>
        <View style={styles.newOrderContainer}>
          <TouchableOpacity style={backendIP == '' ? styles.buttonDisabled : styles.button} onPress={handleOpenModal} disabled={backendIP === ''}>
            <Text style={styles.buttonText}>Novo Pedido</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.ip}>{backendIP == '' ? "Servidor não encontrado" : backendIP}</Text>
      </View>
    </>
  );
}


