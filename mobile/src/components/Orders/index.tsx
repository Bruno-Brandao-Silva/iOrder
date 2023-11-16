import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import socketIo, { Socket } from 'socket.io-client';
import axios from 'axios';

interface Order {
  _id: string;
  table: number;
  status: string;
}

let socket: Socket | undefined = undefined;

export default function Orders({ backendIP }: { backendIP: string }) {

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get(`http://${backendIP}:3001/orders`).then((response) => {
      setOrders(response.data);
    });

    if (socket == undefined) {
      socket = socketIo(`ws://${backendIP}:3001`, {
        transports: ['websocket'],
      });
    }
    !socket.hasListeners('newOrder') &&
      socket.on('newOrder', (order: Order) => {
        setOrders((prevState) => [order, ...prevState]);
      });
    !socket.hasListeners('statusChange') &&
      socket.on('statusChange', (updatedOrder: Order) => {
        setOrders((prevState) =>
          prevState.map((order) => (order._id === updatedOrder._id ? updatedOrder : order))
        );
      });
  }, []);
  const onPressHandler = (order: Order) => {
    if (order.status === 'DONE')
      Alert.alert(
        'Confirmar entrega',
        'Você tem certeza que deseja continuar?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              axios.patch(`http://${backendIP}:3001/orders/${order._id}/status`, { "status": "DELIVERED" });
            },
          },
        ],
        { cancelable: false }
      );
  };
  return (
    <FlatList
      data={orders}
      keyExtractor={(order) => order._id}
      renderItem={({ item: order }) => (
        order.status !== 'DELIVERED' ? <View style={[styles.card, order.status === 'PREPARING' ? styles.preparing : styles.done]}>
          <TouchableOpacity onPress={() => { onPressHandler(order) }}>
            <Text style={[styles.tableNumber, order.status === 'PREPARING' ? styles.preparing : styles.done]}>
              #{order.table}
            </Text>
            <Text style={[styles.status, order.status === 'PREPARING' ? styles.preparing : styles.done]}>
              {order.status}
            </Text>
          </TouchableOpacity>
        </View> : null
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 55,
    marginBottom: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  tableNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  preparing: {
    backgroundColor: '#F6A609',
    color: '#FFF',
  },
  done: {
    backgroundColor: '#2AC769',
    color: '#FFF',
  },
});