import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import params from './src/params';
import Field from './src/components.js/Field';
import Mine from './src/components.js/Mine';
import Flag from './src/components.js/Flag';
import MineField from './src/components.js/MineField';
import { createMinedBoard } from './src/functions';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount())
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>CAMPO MINADO</Text>
        <Text>Tamanho da grade:
            {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <StatusBar style="auto" />
        {/* <Field></Field>
        <Field opened/>
        <Field opened nearMines={1}/>
        <Field opened nearMines={2}/>
        <Field opened nearMines={3}/>
        <Field opened nearMines={6}/>
        <Field mined/>
        <Field mined opened/>
        <Field mined opened exploded/>
        <Field flagged/>
        <Field flagged opened/>
        <Mine/>
        <Flag bigger/> */}
        <View style={styles.board}>
          <MineField board={this.state.board} />
        </View>

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  }
});
