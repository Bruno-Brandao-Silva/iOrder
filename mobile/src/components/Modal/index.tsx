import React, { useState } from 'react';
import {
  Modal as RNModal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Alert,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//@ts-ignore
import logo from '../../images/logo.png';

interface ModalProps {
  visible: boolean;
  onRequestClose: () => void;
}

export default function Modal({ visible, onRequestClose }: ModalProps) {
  const [table, setTable] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  async function  handleSubmit() {
    try{
      const response = await fetch('http://192.168.56.1:3001/orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ table, description }),
    })
    const data = await response.json();

      // .then((resp) => {
      //   if (resp.ok) {
      //     Alert.alert('Pedido cadastrado com sucesso!');
      //     onRequestClose();
      //   } else {
      //     Alert.alert('Ops!', 'Ocorreu um erro ao cadastrar o pedido!');
      //   }
      // });
    }catch(e){
      console.log(e);
    }
  }

  return (
    <RNModal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.header}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
                  <Ionicons name="ios-close" style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.form}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Número da mesa</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Número da mesa"
                    onChangeText={setTable}
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Pedido</Text>
                  <TextInput
                    style={styles.multilineInput}
                    multiline
                    placeholder="Descrição do pedido"
                    onChangeText={setDescription}
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Button onPress={handleSubmit} title='Cadastrar Pedido' />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 135,
  },
  form: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    color: '#0A100D',
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    padding: 0,
  },
  multilineInput: {
    height: 110,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 38,
    color: '#0A100D',
  },
});