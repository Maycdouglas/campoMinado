import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params';
import Field from './src/components.js/Field';
import Mine from './src/components.js/Mine';
import Flag from './src/components.js/Flag';
import MineField from './src/components.js/MineField';
import Header from './src/components.js/Header';
import LevelSelection from './src/screens/LevelSelection';
import { 
  createMinedBoard,
  cloneBoard,
  openField,
  hasExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/functions';

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
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Que buuuuurro!')
    }

    if (won) {
      Alert.alert('Parabéns!!!', 'Você venceu!')
    }

    this.setState({ board, lost, won })

  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if(won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    this.setState({ board, won })
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}>
        <LevelSelection isVisible={this.state.showLevelSelection} onLevelSelected={this.onLevelSelected} onCancel={()=> this.setState({showLevelSelection: false})}/>
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} onNewGame={() => this.setState(this.createState())} onFlagPress={() => this.setState({showLevelSelection: true})}/>
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
          <MineField board={this.state.board} 
                     onOpenField={this.onOpenField}
                     onSelectField={this.onSelectField}/>
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
