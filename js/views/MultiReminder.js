/**
 * Day 20
 * Reminder
 */
'use strict';

import React,{Component} from 'react';
import {Image,StyleSheet,Text,TextInput,LayoutAnimation,TouchableHighlight,TouchableOpacity,View} from 'react-native';
import Util from '../utils/Util';
// import {BlurView,VibrancyView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import {ReminderContainer} from './SingleReminder';

export default class extends Component{
  constructor() {
    super();
    this.state={
      isOn:this.isOn,
      init:true,
    };
    this.animations = {
      duration: 20,
      create: {
        type: LayoutAnimation.Types.linear,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        springDamping: 0.5,
      },
    };
    this.listData = [{
      title:"Scheduled",
      numOfItems:0,
      theme:"#979797",
      list:[],
    },{
      title:"Movie",
      numOfItems:0,
      theme:"#cb7adf",
      list:[],
    },{
      title:"Work",
      numOfItems:0,
      theme:"#f9005f",
      list:[],
    },{
      title:"Home",
      numOfItems:0,
      theme:"#00a8f4",
      list:[],
    },{
      title:"Reminder",
      numOfItems:0,
      theme:"#68d746",
      list:[],
    },{
      title:"Development",
      numOfItems:6,
      theme:"#fe952b",
      list:[{
        selected:false,
        text:"day20",
      },{
        selected:false,
        text:"day21",
      },{
        selected:false,
        text:"day22",
      },{
        selected:false,
        text:"day23",
      },{
        selected:false,
        text:"day24",
      },{
        selected:false,
        text:"day25",
      }],
    }];
  }

  componentDidMount() {
    // StatusBarIOS.setStyle(1);
  }

  _switch(index){
    console.log(index);
     const isOn = this.listData.map(() => {
      return false;
    });
    isOn[index] = true;
    this.setState({
      isOn,
      init:false
    });
     LayoutAnimation.configureNext(this.animations);
  }

  _reset(){
    const isOn = this.listData.map(() => {
      return false;
    });
    this.setState({
      isOn,
      init:true
    });
     LayoutAnimation.configureNext(this.animations);
  }
  render() {
    let len = this.listData.length;
    const reminders = this.listData.map((elem,index) => {
        return <ReminderContainer key={'list'+index} listData={this.listData[index]} listStyle={this.state.init?{top:20+65*index}:{top:this.state.isOn[index]?20:(Util.size.height + 5*index - 5*len)}} switch={()=>this._switch(index)}/>
    });
    return(
      <View style={styles.container}>
        <Image source={require('../img/desktop.png')} style={styles.container}> 
        </Image>       
        {reminders}
        <TouchableHighlight underlayColor="transparent" style={{height:30,position:'absolute',bottom:0,left:0,width:Util.size.width}} onPress={() => this._reset()}>
          <View></View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: Util.size.height,
    width: Util.size.width,
  },
  reminderContainer:{
    height: Util.size.height-65,
    width:Util.size.width,
    borderRadius: 10,
    position:"absolute",
    top:20,
    left:0,
    backgroundColor:"#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: -1,
      width: 0,
    }
  },
  reminderBg:{
    height: Util.size.height-65,
    width:Util.size.width,
    borderRadius: 10,
    resizeMode:"cover",
    opacity:0.5,
  },
  reminderContent:{
    height: Util.size.height-65,
    width:Util.size.width,
    backgroundColor:"transparent",
    position:"absolute",
    top:0,
    left:0,
  },
  reminderTitleContainer:{
    height: 65,
    width: Util.size.width,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:15,
    paddingRight:15,
    alignItems:"center"
  },
  reminderTitle:{
    fontSize:28,
    fontWeight:"300",
    textShadowColor:"#ccc",
    textShadowOffset:{width:0, height:1,},
    textShadowRadius:1,
  },
  reminderListContainer:{
    flex:1,
    borderTopColor:"#ccc",
    borderTopWidth:1,
  },
  reminderList:{
    flexDirection:"row",
    paddingLeft:15,
    height:45,
    width:Util.size.width,
    justifyContent:"space-between",
    alignItems:"center"
  },
  check:{
    backgroundColor:"transparent",
    borderWidth:1,
    borderColor:"#c6c6c6",
    width:22,
    height:22,
    borderRadius:11,
    shadowOffset:{
        width: 0,
        height: 1,
    },
    shadowRadius:1,
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    justifyContent:"center",
    alignItems:"center"
  },
  fill:{
    width:16,
    height:16,
    borderRadius:8,
  },
  input:{
    width:Util.size.width-50,
    height:45,
    borderBottomWidth:1,
    borderBottomColor:"#ccc",
  },
  inputText:{
    height:43,
    color:"#363636",
  }
});

