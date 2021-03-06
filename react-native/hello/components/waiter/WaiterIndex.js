import React, { Component } from 'react';
import Head from '../public/Head'
import TableList from './TableList'
import Footer from './Footer'
import Storage from '../../common/Storage'

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Alert
} from 'react-native';


let screenHeight=Dimensions.get('window').height;
export default class Index extends Component {
  constructor(props, context){
    super(props,context);
    let shoprole = this.props.shoprole;
    this.state={};
    this.state.body=<TableList/>;
    this.tempPath=this.state.body;
    this.path=[]
    //this.changeBody.bind(this);
    Storage.getInstance().setProp('waiterIndex',this);
    this.back.bind(this);
  }
  
  changeBody(tag){
      this.setState({body:tag});
      this.path.push(this.tempPath);
      this.tempPath=tag;
  }
  back(){
    let tag = this.path.pop();
    this.tempPath=tag;
    if(typeof(tag)!='undefined'){
      this.setState({body:tag});
    }
  }
  // static navigationOptions = ({ navigation }) => ({
  //       title: `餐厅App`,
  //     });
  render() {
    // const { navigate } = this.props.navigation;
    // alert(this.props.navigation.navigate);
    
    return (
      <View style={[Layout.outer]}>
        <Head shopname={this.props.shopname} shoprole={this.props.shoprole}/>
        {this.state.body}
        <Footer helloFun={this.helloFun} changeBody={this.changeBody.bind(this)}/>
      </View>
    );
  }
}

const Layout = StyleSheet.create({
  outer:{
    height:screenHeight-25,
    flexDirection:'column',
    justifyContent:'space-between'
  }
})