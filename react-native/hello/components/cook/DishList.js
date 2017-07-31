
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Alert
} from 'react-native';

export default class DishList extends Component {
  constructor(props, context){
    super(props,context);
    //this.state={};
  }

  render() {
    return (   
        <View style={[Layout.table]}>
          <Text>菜品列表</Text>
        </View>
    );
  }
}

const Layout = StyleSheet.create({
   table:{
    flexDirection:'column'
  },
  row:{
    flexDirection:'row'
  },
  column:{
    margin:3,
  },
  columnText:{
    fontSize:18,
    padding:6
  },
  orderView:{
    borderStyle:'solid',
    borderColor:'#000',
    borderWidth:1,
    margin:3,
  },
  textBtn:{
    backgroundColor:'green',
    height:33,
    color:'#fff',
    padding:3,
    fontSize:18,
    textAlign:'center'
  },
  delOrder:{
    backgroundColor:'red',
    height:33,
    color:'#fff',
    padding:3,
    fontSize:18,
    textAlign:'center'
  }
})