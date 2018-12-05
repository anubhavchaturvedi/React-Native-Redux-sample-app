import React from 'react';
import {
    AsyncStorage,
    Button,
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { connect } from 'react-redux'
import AppActions from '../actions/AppActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});



class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Show me more of the app" onPress={this._showMoreApp} />
                <Text></Text>
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Todo');
    };

    _signOutAsync = async () => {
        this.props.dispatch({ type: AppActions.CLEAR_STATE })
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const connectedHomeScreen = connect()(HomeScreen)

export default connectedHomeScreen