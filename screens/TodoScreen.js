import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text
} from 'react-native';

import Constants from '../Util/Constants'
import { connect } from 'react-redux'
import AppActions from '../actions/AppActions';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

class TodoScreen extends React.Component {
    static navigationOptions = {
      title: 'Todo List demo',
    };

    constructor(props) {
        super(props);
        this.state = { todoDetails: '' };
        this.handleAddTodo = this.handleAddTodo.bind(this);
      }
  
    handleAddTodo(){
        if(this.state.todoDetails != ''){
            this.props.dispatch({
                type: AppActions.ADD_TODO,
                details: this.state.todoDetails
            })
            this.setState({
                todoDetails: ''
            })
        }
    }

    render() {
      return (
        <View style={styles.container}>

            <StatusBar barStyle="default" />
            <TextInput
                style={{height: 40, borderColor: 'gray', fontSize:16}}
                onChangeText={(text) => this.setState({todoDetails: text})}
                value={this.state.todoDetails}
                placeholder='Todo item details'
            />
            <Button title="Add Todo" onPress={this.handleAddTodo}/>
            <FlatList 
                data={this.props.todos} 
                renderItem={({item}) => <Text style={{fontSize:30}}>{item.id} : {item.details}</Text>}
                keyExtractor={(item, index) => item.id.toString()}
            />
        </View>
      );
    }
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }

const mapStateToProps = (state) => {
    console.log("mapStateToProps")
    console.log(state)
    if (state.visibility === Constants.SHOW_ALL)
        return { todos: state.todos }
    else if (state.visibility === Constants.SHOW_PENDING)
        return {todos : state.todos.filter((t) => t.status === Constants.STATUS_PENDING)}
    else if (state.visibility === Constants.SHOW_COMPLETED)
        return {todos : state.todos.filter((t) => t.status === Constants.STATUS_COMPLETED)}
}

const ConnectedTodoScreen = connect(mapStateToProps, null)(TodoScreen)
export default ConnectedTodoScreen