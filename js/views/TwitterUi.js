/**
 * Day 13
 * A twitter tweet UI
 */
'use strict';

import React,{Component} from 'react';
import {Image,StyleSheet,CameraRoll,Text,TextInput,TouchableHighlight,View} from 'react-native';
import Util from '../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';

//attention Text background 造成的挡遮挡 
class FunctionView extends Component{
  static defaultProps = {
    numOfText: 140,
  };

  static propTypes = {
    numOfText: React.PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    const fetchParams = {
      first: 4,
    };
    CameraRoll.getPhotos(fetchParams).done((data) => this.storeImages(data), (err) => this.logImageError(err));
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }

  render() {
    return(

      <View style={{width:Util.size.width,height:276,borderTopWidth:1,borderTopColor:'#eee'}}>
        <View style={{width:Util.size.width,height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{paddingLeft:10,flexDirection:'row',backgroundColor:'white',alignItems:'center',justifyContent:'space-around',width:210}}>
            <Icon name="ios-card" size={23} color="#8899a5"></Icon>
            <Icon name="ios-attach" size={23} color="#8899a5"></Icon>
            <Icon name="ios-beaker" size={23} color="#8899a5"></Icon>
            <Icon name="ios-locate" size={23} color="#8899a5"></Icon>
          </View>
          <View style={{flexDirection:'row',width:110,justifyContent:'space-around',alignItems:'center'}}>
              <Text style={{color:'grey',fontWeight:'300'}}>{this.props.numOfText}</Text>
            <TouchableHighlight style={{borderRadius:5,backgroundColor:'#2aa2ef', height:35,
    width:60, justifyContent:'center',alignItems:'center',borderColor:'#ccd6dd',borderWidth:1}} >
              <Text style={this.props.numOfText == 140?styles.btnText:styles.activeBtnText}>Send</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
          <View style={{width:Util.size.width/3,height:113,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#eee'}}>
              <Icon name="ios-camera" size={70} color="#2aa2ef"></Icon>
          </View>
          <View style={{width:Util.size.width/3,height:113,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#eee'}}>
               <Icon name="ios-videocam" size={70} color="#2aa2ef"></Icon>
          </View>
          {this.state.images.map((image,index) => <View key={index} style={styles.imageIcon}>
              <Image style={styles.imageIcon} source={{uri:image.uri}} />
            </View>)}
        </View>
      </View>
    )
  }
}

export default class extends Component{
  constructor() {
    super();
    this.state = {
      numOfText:140,
    };
  }

  _updateTextNum(text) {
    let remain = 140 - text.length;
    this.setState({
      numOfText:remain,
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
          <Image style={{width:30,height:30,marginLeft:15}} source={require('../img/icon.png')} />
          <Icon style={{paddingRight:15}} name="ios-close" size={30} color="#2aa2ef"></Icon>
        </View>
        <TextInput style={{fontSize:20,flex:1,borderWidth:1,borderColor:'#eee',padding:10,}} 
        ref="textArea"
        onChangeText={(text)=>this._updateTextNum(text)} 
        multiline={true}
        maxLength={140}
        placeholder="kkk"
         selectionColor="#2aa2ef"
          placeholderTextColor="#ced8de"
        />
        <FunctionView numOfText={this.state.numOfText}></FunctionView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingTop:30,
    height:Util.size.height,
  },
  icon:{
    width:30,
    height:30,
    borderRadius:5,
  },
  iconContainer:{
    paddingLeft:15,
    paddingRight:15,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  textArea:{
    height:335,
    padding:15,
    fontSize:20
  },
  functionContainer:{
    height:275,
    width:375,
    position:"absolute",
    bottom:0,
    left:0,
    borderTopWidth:1,
    borderTopColor:"#a0adb7"
  },
  functionIconContainer:{
    height:50,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    borderBottomWidth:1,
    borderBottomColor:"#ccd6dd"
  },
  functionIcon:{
    width:210,
    flexDirection:"row",
    justifyContent:"space-around"
  },
  functionBtn:{
    width:110,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  btn:{
    height:35,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    borderColor:"#ccd6dd",
    borderWidth:1
  },
  activeBtn:{
    height:35,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    backgroundColor:"#2aa2ef"
  },
  text:{
    color:"#ccd6dd",
    fontSize:18
  },
  btnText:{
    color:"#eee",
    fontSize:14
  },
  activeBtnText:{
    color:"#fff",
    fontSize:14
  },
  imageGrid:{
    flexDirection:"row",
    flexWrap:"wrap"
  },
  imageIcon:{
    width: Util.size.width/3,
    height:113,
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#ddd",
    borderRightWidth:1,
    borderBottomWidth:1
  },
  image:{
    width: Util.size.width/3,
    height:113,
  },
});
