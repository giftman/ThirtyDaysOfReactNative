/**
 * Day 22
 * 
 */
'use strict';

import React,{
  Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput, 
  TouchableWithoutFeedback,
  Animated,
  Easing,
  View,
  TouchableOpacity
} from 'react-native';
import Util from '../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';

export default class extends Component{
  constructor() {
    super();

    this.state = {
      scale: new Animated.Value(1),
      on: 0,
      scaleOn: 0,
    }
  }

  _onMic() {
    this.setState({
      on:1
    });
    Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
      this.state.scale,                 // 将`bounceValue`值动画化
      {
        toValue: 20,                         // 将其值以动画的形式改到一个较小值
        duration: 200,
        easing: Easing.elastic(1),                          // Bouncier spring
      }
    ).start(()=>{
      this.setState({
        scaleOn:1
      })
    });  
    
  }

  _offMic() {
    this.setState({
      scaleOn:0
    });
    Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
      this.state.scale,                 // 将`bounceValue`值动画化
      {
        toValue: 1,                         // 将其值以动画的形式改到一个较小值
        duration: 200,
        easing: Easing.elastic(1),                          // Bouncier spring
      }
    ).start(()=>{
      this.setState({
        on:0
      })
    }); 
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name='md-settings' size={25} color="#666"></Icon>
          <Text style={{flex:1,fontSize:18,color:'#666',textAlign:'center'}}>SIGN IN</Text>
          <Icon name='ios-albums-outline' size={25} color="#666"></Icon>
        </View>
        <View style={styles.content}>
          <Image style={{height:50,resizeMode:'contain'}} source={require('../img/googlelogo_color_272x92dp.png')} />
          <View style={styles.inputContainer} >
          <TextInput style={{width:Util.size.width-100,height:40,paddingLeft:10}} />
          </View>
          <TouchableOpacity onPress={()=>this._onMic()}>
          <Animated.View style={{marginTop:20,width:50,height:50,borderRadius:25, backgroundColor:'#fff',alignItems:'center',justifyContent:'center',transform: [{scale:this.state.scale },]}}>
          {this.state.on?
                    <View style={[styles.btnContent,{backgroundColor:"#ff3b3e",top:8,transform:[{scale:0.05}]}]}>
                      <Icon name="md-mic" size={25} color="#fff"/>
                    </View>:
                  <Icon name="md-mic" size={25} color="#4285f4"/>}
          </Animated.View>
          </TouchableOpacity>
        </View>

        {this.state.scaleOn?
        <View style={{position:'absolute',width:Util.size.width,height:Util.size.height,top:0,left:0,backgroundColor:'transparent'}} >
        <TouchableOpacity  onPress={()=>this._offMic()} style={{position:'absolute',left:15,bottom:15}} >
        <Icon name='md-close' size={25} color="#666" style={{backgroundColor:'transparent'}}></Icon>
        </TouchableOpacity>
        <View style={{position:'absolute',left:15,top:45}}>
           <Text style={{fontSize:20,color:'#666'}}>Speak Now</Text>
        </View>
        </View>:<View />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:Util.size.height,
    width:Util.size.width,
    paddingTop:30,
    backgroundColor:"#f2f2f2",
  },
  content1:{
    alignItems:'center',
    backgroundColor:'blue',
  },
  header:{
    height:30,
    width:Util.size.width,
    backgroundColor:'transparent',
    flexDirection:'row',
    paddingLeft:15,
    paddingRight:15,
    alignItems:'center',
  },
  nav:{
    alignItems:"center",
    justifyContent:"space-between",
    height:30,
    flexDirection:"row",
    paddingLeft:25,
    paddingRight:25,
  },
  navText:{
    color:"#969696",
    fontSize:18,
  },
  content:{
    paddingTop: 120,
    alignItems:'center',
  },
  logo:{
    height:50,
    resizeMode:"contain"
  },
  btn:{
    width:Util.size.width,
    alignItems:"center",
    justifyContent:"center"
  },
  btnContent:{
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  input:{
    width: Util.size.width-100,
    height: 40,
    paddingLeft:10,
  },
  inputContainer:{
    width: Util.size.width-80,
    height: 40,
    marginTop:40,
    marginBottom:40,
    backgroundColor:"#fff",
    shadowColor: "#888",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  scaleText:{
    color:"#969696",
    fontSize:25,
    paddingLeft:25,
    paddingTop:50,
    backgroundColor:"#fff",
  },
  scaleContainer:{
    position: "absolute",
    height:Util.size.height,
    width:Util.size.width,
    top:0,
    left:0,
  },
  closeIcon:{
    height:50,
    width:50,
    position:"absolute",
    bottom: 0,
    left:30,
    backgroundColor:"#fff",
  }
});

