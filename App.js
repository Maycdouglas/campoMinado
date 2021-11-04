import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './src/params';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CAMPO MINADO</Text>
        <Text>Tamanho da grade:
            {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>CAMPO MINADO</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
