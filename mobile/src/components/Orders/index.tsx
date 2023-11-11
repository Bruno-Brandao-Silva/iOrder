import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import socketIo from 'socket.io-client';


interface Order {
  _id: string;
  table: number;
  status: string;
}
const socket = socketIo('ws://192.168.56.1:3001', {
  transports: ['websocket'],
});

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('http://192.168.56.1:3001/orders')
      .then((res) => res.json())
      .then(setOrders);

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

  return (
    <FlatList
      data={orders}
      keyExtractor={(order) => order._id}
      renderItem={({ item: order }) => (
        <View style={[styles.card, order.status === 'PREPARING' ? styles.preparing : styles.done]}>
          <Text style={[styles.tableNumber, order.status === 'PREPARING' ? styles.preparing : styles.done]}>
            #{order.table}
          </Text>
          <Text style={[styles.status, order.status === 'PREPARING' ? styles.preparing : styles.done]}>
            {order.status}
          </Text>
        </View>
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