import React from 'react';

import { LogBox } from 'react-native';
import Main from './src/components/Main/index';

LogBox.ignoreLogs(['Unrecognized WebSocket']);


export default function App() {
  return (
    <>
      <Main/>
    </>
  );
}


