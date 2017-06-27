/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,     //获取屏幕高宽
  Button,
  Alert
} from 'react-native';

let screenHeight=Dimensions.get('window').height;

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

export default class hello extends Component {
  render() {
    return (
      <View style={[Layout.outer]}>
        <View style={[Layout.top,{flexDirection:'row-reverse',alignItems:'center'}]}>
          <Text style={{margin:6}}>
            注册
          </Text>
          <Text >
            登陆
          </Text>
        </View>
        <Text style={[Layout.body]}>
          To get started, edit index.android.js
        </Text>
        <View style={[Layout.bottom,{justifyContent:'space-around',alignItems:'center'}]}>
          <Button
            onPress={onButtonPress}
            color='green'
            title="菜单"
          />
          <Text>
            菜单
          </Text>
          <Text>
            菜单
          </Text>
          <Text>
            菜单
          </Text>
        </View>
      </View>
    );
  }
}

const Layout = StyleSheet.create({
  outer:{
    height:screenHeight-25,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  top:{
    height:30,
    backgroundColor:'orange'
  },
  body:{
    height:screenHeight-100,
    backgroundColor:'yellow'
  },
  bottom:{
    height:45,
    backgroundColor:'green',
    flexDirection:'row',
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const css1 = StyleSheet.create({
  myhead:{
    backgroundColor:'#ffaabb',
    borderStyle:'solid',
    borderColor:'green',
    borderWidth:3,
  },
})

AppRegistry.registerComponent('hello', () => hello);
