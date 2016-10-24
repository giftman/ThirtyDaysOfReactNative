/**
 * Day 14
 * Tinder Like Swipe
 * know bugs. simg of png win't change no matter how. Other properties changes fine.
 * but changes to gif works fine
 * Maybe bugs internally
 */
'use strict';

import React,{Component} from 'react';
import {Image,StyleSheet,Text,TouchableHighlight,PanResponder,Animated,LayoutAnimation,View} from 'react-native';
import Util from '../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';


const minion1 = require('../img/minion1.png');
const minion2 = require('../img/minion2.png');
const minion3 = require('../img/minion3.png');
const minion4 = require('../img/minion4.png');
const minion5 = require('../img/minion5.png');
class Card extends Component{
  static propTypes = {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    img: React.PropTypes.string.isRequired,
  };

  render(){
    return(
      <View style={[styles.card,{top:this.props.top,width:this.props.width,left:this.props.left}]}>
        <Image style={{width:this.props.width-2,height:350}} source={{uri:this.props.img}}></Image>
        <View style={styles.cardInfo}>
          <View>
            <Text style={styles.cardText}>{this.props.name}, very old  <Icon name="ios-checkmark" size={18} color="#208bf6"></Icon></Text>
          </View>
          <View style={styles.cardIcon}>
            <View style={styles.cardIconContainer}>
              <Icon name="ios-people" size={25} color="#fc6b6d"></Icon>
              <Text style={[styles.cardIconText,{color:"#fc6b6d"}]}>0</Text>
            </View>
            <View style={styles.cardIconContainer}>
              <Icon name="ios-book" size={25} color="#cecece"></Icon>
              <Text style={[styles.cardIconText,{color:"#cecece"}]}>0</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

class SCard extends Component{
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    top: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    img: React.PropTypes.string.isRequired,
  };
 
  render(){
    return(
      <View key={this.props.id} style={{top:13,width:Util.size.width - 20,borderWidth:1,borderRadius:5,height:410,borderColor:'#f5f5f5',backgroundColor:'white'}}>
        <Image  style={{width:this.props.width-2,height:350}} source={{uri:this.props.img}} />
        <View style={{height:60,flexDirection:'row',paddingTop:5,paddingLeft:20,paddingRight:20,justifyContent:'space-between',alignItems:'center'}}>
          <Text style={{fontSize:20,fontWeight:'500',flex:1}}>{this.props.name}, very old  <Icon name="ios-checkmark" size={18} color="#208bf6"></Icon></Text>
          <View style={{flexDirection:'row',padding:5}}>
            <Icon name="ios-people" size={25} color="#fc6b6d"></Icon>
            <Text style={{fontSize:20,fontWeight:'500',color:'#fc6b6d',paddingLeft:5}}>0</Text>
          </View>
          <View style={{flexDirection:'row',padding:5}}>
            <Icon name="ios-book" size={25} color="#cecece"></Icon>
            <Text style={{fontSize:20,fontWeight:'500',color:'#cecece',paddingLeft:5}}>0</Text>
          </View>
        </View>
      </View>
    )
  }
}

class SwipeCard extends Component{
  constructor() {
    super();
    const simgs=["https://d17oy1vhnax1f7.cloudfront.net/items/2A2i1S1m3t3S2H1P2C2j/user.png?v=cec82b32","https://d17oy1vhnax1f7.cloudfront.net/items/2x0P3S202L1t3T2B450O/Screen%20Shot%202016-09-14%20at%2011.25.07%20AM.png?v=70b29e76","https://d17oy1vhnax1f7.cloudfront.net/items/31412e2j1c441k0S0p2D/0B38C5B8-3DEF-450A-A489-DF968939053C.png?v=a44c6e0a","https://d17oy1vhnax1f7.cloudfront.net/items/0c0O292N1H2U1g0c363O/pass.png?v=4e698746","https://d17oy1vhnax1f7.cloudfront.net/items/0c0O292N1H2U1g0c363O/pass.png?v=4e698746"];
    // const simgs = ["https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif","https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif","https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif","https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif","https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif"];
    const names=["Stuart","Bob","Kevin","Dave","Jerry"];
    const scards = simgs.map(function(elem, index) {
      return {id:"sc"+index,img:simgs[4-index], name:names[4-index], top:13+index*4, width:Util.size.width-22-index*4,}
    })

    this.state = {
      scards,
    };
  }

  handleYup(card) {
    // this.props.next();
  }

  handleNope(card) {
    // this.props.next()
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.scards}
        renderCard={(cardData) => <SCard key={cardData.id} {...cardData} />}
        handleYup={() => this.handleYup()}
        handleNope={() => this.handleNope()}
        showYup={false}
        showNope={false}
      />
    )
  }
}

class Cards extends Component{
  constructor() {
    super();
    const imgs = ["https://d17oy1vhnax1f7.cloudfront.net/items/2A2i1S1m3t3S2H1P2C2j/user.png?v=cec82b32","https://d17oy1vhnax1f7.cloudfront.net/items/2x0P3S202L1t3T2B450O/Screen%20Shot%202016-09-14%20at%2011.25.07%20AM.png?v=70b29e76","https://d17oy1vhnax1f7.cloudfront.net/items/31412e2j1c441k0S0p2D/0B38C5B8-3DEF-450A-A489-DF968939053C.png?v=a44c6e0a","https://d17oy1vhnax1f7.cloudfront.net/items/0c0O292N1H2U1g0c363O/pass.png?v=4e698746"];
    const names = ["Stuart","Bob","Kevin","Dave","Jerry"];
    
    this.state = {imgs,names,};
  }

  _next() {
    const imgs = this.state.imgs;
    imgs.pop();
    this.setState({imgs,});
  }

  render() {
    const {names,} = this.state;
    const cards = this.state.imgs.map(function(elem, index) {
      return <Card key={index} name={names[index]} img={elem} top={30-index*4} width={Util.size.width-38+index*4} left={18-index*2}></Card>
    });
    return (
      <View>
      {cards}
        <SwipeCard next={() => this._next()} />
      
        
      </View>
    );
  } 
}

export default class extends Component{
  render() {
    return(
      <View style={styles.container}>
        <View style={{paddingTop:20,height:60,flexDirection:'row',justifyContent:'space-between',paddingLeft:15,paddingRight:15,borderBottomColor:"#ebebeb",
    borderBottomWidth:1}}>
          <Icon name="md-person" size={35} color="#cecece"></Icon>
          <Image style={styles.logo} source={{uri:'tinder'}}></Image>
          <Icon name="ios-chatbubbles" size={35} color="#cecece"></Icon>
        </View>
        <View style={{position:'absolute',bottom:0,height:175,alignItems:'center',paddingRight:7.5,paddingLeft:7.5,flexDirection:'row',}}>
          <View style={[{borderWidth:10,borderColor:'#f5f5f5',width:70,height:70,borderRadius:35,justifyContent:'center',alignItems:'center'},{left:5}]}>
            <Icon name="md-refresh" color="#fdcd6d" size={30}></Icon>
          </View>
          <View style={styles.largeAction}>
            <Icon name="md-close" color="#fc6c6e" size={45}></Icon>
          </View>
          <View style={styles.largeAction}>
            <Icon name="md-heart" color="#52cb93" size={45}></Icon>
          </View>
          <View style={[styles.smallAction,{right:5}]}>
            <Icon name="md-locate" color="#318ff6" size={30}></Icon>
          </View>
        </View>
        <Cards/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    height:Util.size.height,
    width:Util.size.width
  },
  nav:{
    width:Util.size.width,
    flexDirection:"row",
    justifyContent:"space-between",
    height:60,
    paddingTop:20,
    paddingBottom:5,
    paddingLeft:15,
    paddingRight:15,
    backgroundColor:"#fff",
    borderBottomColor:"#ebebeb",
    borderBottomWidth:1
  },
  card:{
    width:Util.size.width-20,
    height:410,
    borderRadius:5,
    borderWidth:1,
    borderColor:"#e1e1e1",
    position:"absolute",
    left:10,
    top:70,
    backgroundColor:"#fff"
  },
  scard:{
    width:Util.size.width-20,
    height:410,
    borderRadius:5,
    borderWidth:1,
    borderColor:"#e1e1e1",
    position:"relative",
    backgroundColor:"#fff",
    top:13
  },
  logo:{
    width:91,
    height:39
  },
  cardInfo:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    height:60,
    paddingLeft:20,
    paddingRight:5
  },
  cardText:{
    fontSize:20,
    fontWeight:"500",
    color:"#423e39"
  },
  cardIcon:{
    flexDirection:"row"
  },
  cardIconContainer:{
    width:50,
    flexDirection:"row",
    alignItems:"center",
  },
  cardIconText:{
    paddingLeft:5,
    fontWeight:"500",
    fontSize:16
  },
  actionContainer:{
    paddingLeft:7.5,
    paddingRight:7.5,
    flexDirection:"row",
    alignItems:"flex-start",
    top: 520,
    position:"absolute",
  },
  smallAction:{
    width: Util.size.width===375?70:60,
    height:Util.size.width===375?70:60,
    borderColor:"#f5f5f5",
    borderWidth:10,
    borderRadius:35,
    alignItems:"center",
    justifyContent:"center",
    position:"relative",
    paddingTop:5
  },
  largeAction:{
    width: Util.size.width===375?110:100,
    height:Util.size.width===375?110:100,
    borderColor:"#f5f5f5",
    borderWidth:10,
    borderRadius:55,
    alignItems:"center",
    justifyContent:"center",
    paddingTop:5
  },
});
