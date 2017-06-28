import React, { Component } from 'react';
import {FirstPage,SecondPage,ThirdPage} from './MultiPage'
//import {NavigationExperimental.Navigator} from 'react-native-deprecated-custom-components'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,     //获取屏幕高宽
  Button,
  Alert,
  NavigationExperimental
} from 'react-native';

const routes = [
        {message:'第一页',index:0,component:FirstPage},
        {message:'第二页',index:1,component:SecondPage},
        {message:'第三页',index:2,component:ThirdPage}
    ];

export default class RouterBar extends Component {
  render() {
     return(
     	<NavigationExperimental
                initialRoute={routes[0]}
                initialRouteStack = {routes}
                renderScene={(route,navigator) =>
                    <route.component route={route} navigator={navigator} routes={routes}/>
                }
                style={styles.navigator}
                configureScene = {(route) => {
                    if (route.index === 0) {
                        return Navigator.SceneConfigs.HorizontalSwipeJump
                    }
                    if (route.index === 1) {
                        return Navigator.SceneConfigs.PushFromRight
                    }
                    if (route.index === 2) {
                        return Navigator.SceneConfigs.FloatFromBottom
                    }
                }}
                navigationBar={
                       <Navigator.NavigationBar
                             routeMapper={{
                               LeftButton: (route, navigator, index, navState) =>
                                { 
                                    if(route.index === 0) {
                                        return null;
                                    }else {
                                        return(
                                            <TouchableHighlight onPress={() => {
                                                    navigator.jumpBack() //不能是当前栈里面的第一个页面
                                                }}>
                                                <Text>back</Text>
                                            </TouchableHighlight>
                                        )
                                    }
                                 },
                               RightButton: (route, navigator, index, navState) =>
                                 { 
                                    if(route.index === 2) {
                                        return null;
                                    }else {
                                        return(
                                            <TouchableHighlight onPress={() => {
                                                let routes = navigator.getCurrentRoutes()
                                                if (routes.length < 1) {
                                                    return;
                                                }
                                                if (routes.pop().index !== route.index) {
                                                    navigator.jumpForward() //不能是当前栈里面的最后一个页面
                                                }
                                            }}>
                                            <Text>forward</Text>
                                            </TouchableHighlight>)
                                    }
                                  },
                               Title: (route, navigator, index, navState) =>
                                 { return (<Text style={styles.Title}>{route.message}</Text>); },
                             }}
                            style={{backgroundColor: 'green'}}
                       />
                }

            >

            </NavigationExperimental>
     )
	}

}

const styles = StyleSheet.create({
    navigator:{}
})