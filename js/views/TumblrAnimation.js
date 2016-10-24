/**
 * Day 10
 * 
 */
'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,Text,TouchableWithoutFeedback,TouchableOpacity,StatusBar,Animated,Easing,View } from 'react-native';
import Util from '../utils/Util';

export default class extends Component{
  constructor() {
    super();
    this.state = {
      shift: new Animated.Value(-120),
      show:false,
    };
  }

  _pushMenu() {
    this.setState({show:true});     //1 注意这个顺序有讲究，先让看到再执行动画，后面则相反，延迟一点让动画执行完再不显示 2 Touchable控件的子件默认是占满整个父件空间，可以参考NeverMind
    Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
      this.state.shift,                 // 将`bounceValue`值动画化
      {
        toValue: 50,                         // 将其值以动画的形式改到一个较小值
        duration: 200,
        delay:100,
        easing: Easing.elastic(1),                          // Bouncier spring
      }
    ).start();  
    
    console.log('_pushMenu');
  }
  _popMenu() {
    Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
      this.state.shift,                 // 将`bounceValue`值动画化
      {
        toValue: -120,                         // 将其值以动画的形式改到一个较小值
        duration: 200,
        delay:100,
        easing: Easing.elastic(1),                          // Bouncier spring
      }
    ).start();
    setTimeout(() => {
        this.setState({show:false});
    },500);  
    
  }

  componentDidMount() {
    StatusBar.setBarStyle(1);
  }

  render() {
    return(
      <View style={{backgroundColor:"#37465c"}}>
        <TouchableWithoutFeedback onPress={() => this._pushMenu()} >
        <Image style={{position:'absolute',top:0,left:0,height:Util.size.height,width:Util.size.width}} source={require('../img/tumblr.png')} />
        </TouchableWithoutFeedback>
        {this.state.show?
          <View style={{position:'absolute',top:0,left:0,backgroundColor:"#37465c",zIndex:1,height:Util.size.height,width:Util.size.width}} >
              <Animated.View style={{position:'absolute',top:76,left:this.state.shift}}>
                <Image style={{height:100,width:100}} source={require('../img/tumblr-text.png')} />
                <Text style={{flex:1,textAlign:'center',color:'white',fontWeight:'500'}}>Text</Text>
              </Animated.View>
              <Animated.View style={{position:'absolute',top:76,right:this.state.shift}}>
                <Image style={{height:100,width:100}} source={require('../img/tumblr-photo.png')} />
                <Text style={{flex:1,textAlign:'center',color:'white',fontWeight:'500'}}>Photo</Text>
              </Animated.View>
              <TouchableOpacity style={{position:'absolute',width:Util.size.width,left:0,bottom:50}} underlayColor="#fff" activeOpacity={0} onPress={() => this._popMenu()} >
              <Text style={{fontSize:16,fontWeight:'700',color:'rgba(255,255,255,0.2)',textAlign:'center'}}>NeverMind</Text>
              </TouchableOpacity>
          </View>
        :<View />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgContainer:{
    height: Util.size.height,
    width: Util.size.width,
    position:"absolute",
    top:0,
    left:0
  },
  img:{
    resizeMode:"contain",
    height: Util.size.height-10,
    width: Util.size.width,
    marginTop:15
  },
  menu:{
    height: Util.size.height,
    width: Util.size.width,
    resizeMode:"cover",
    position:"absolute",
    top:0,
    left:0
  },
  blur:{
    height: Util.size.height,
    width: Util.size.width,
  },
  menuImg:{
    width:120,
    height:100,
    resizeMode:"contain",
  },
  menuText:{
    width:120,
    textAlign:"center",
    color:"#fff",
    backgroundColor: "transparent"
  },
  menuItem1:{
    position:"absolute",
    left: 50,
    top: 80
  },
  menuItem3:{
    position:"absolute",
    left:50,
    top: 250
  },
  menuItem5:{
    position:"absolute",
    left:50,
    top: 420
  },
  menuItem2:{
    position:"absolute",
    right:50,
    top: 80
  },
  menuItem4:{
    position:"absolute",
    right:50,
    top: 250
  },
  menuItem6:{
    position:"absolute",
    right:50,
    top: 420
  },
  dismissBtn:{
    position:"absolute",
    width:Util.size.width,
    left:0,
    bottom:50,
  },
  dismiss:{
    textAlign:"center",
    color:"rgba(255,255,255,0.2)",
    fontWeight:"700",
    backgroundColor: "transparent"
  },
});