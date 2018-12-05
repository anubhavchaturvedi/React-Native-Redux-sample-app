import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import SignInScreen from './screens/SignInScreen'
import HomeScreen from './screens/HomeScreen'
import TodoScreen from './screens/TodoScreen'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import Constants from './Util/Constants'

const store = createStore(rootReducer, Constants.INITIAL_STATE)


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Todo: TodoScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const RootStack =  createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

import  { Component } from 'react'

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <RootStack></RootStack>
        </Provider>
    )
  }
}
