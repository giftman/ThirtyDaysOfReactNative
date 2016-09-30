'use strict';

import React, { Component } from 'react';


import {Animated,Image,ScrollView,StatusBarIOS,Text,TouchableOpacity,View} from 'react-native';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from '../utils/Util';
const StyleSheet  = require('../utils/CustomStyleSheet');

class Intro extends Component {
	render(){
		return (
				<View style={styles.container}>
					<View style={styles.logoContain}>
						<Icon name='spotify' size={60} color='white' />
						<Text style={styles.logoText}>Spotify</Text>
					</View>
					<View style={styles.slider}>
					<Swiper 
        showsButtons={false}
        dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
        activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.5)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
                <View style={styles.slide}>
                <Text style={styles.slideTextTitle}>Welcome</Text>
                <Text style={styles.slideText}>Sign up for free music on your phone,tablet</Text>
                <Text style={styles.slideText}>and computer.</Text>
              </View>
              <View style={styles.slide}>
                <Text style={styles.slideTextTitle}>Browse</Text>
                <Text style={styles.slideText}>Explore top tracks, new releases and the right</Text>
                <Text style={styles.slideText}>playlist for every moment</Text>
              </View>
              <View style={styles.slide}>
                <Text style={styles.slideTextTitle}>Search</Text>
                <Text style={styles.slideText}>Looking for that special album or artist? Just</Text>
                <Text style={styles.slideText}>search and hit play!</Text>
              </View>
              <View style={styles.slide}>
                <Text style={styles.slideTextTitle}>Running</Text>
                <Text style={styles.slideText}>Music that perfectly matches</Text>
                <Text style={styles.slideText}>your tempo.</Text>
              </View>
              <View style={styles.slide}>
                <Text style={styles.slideTextTitle}>Your Library</Text>
                <Text style={styles.slideText}>Save any song,album or artist to your own</Text>
                <Text style={styles.slideText}>music collection.</Text>
              </View>
        </Swiper>
					</View>
					<View style={styles.buttonContainer} >
						<TouchableOpacity style={[styles.button,{backgroundColor:"#201437"}]} ><Text style={styles.buttonText}>Log In</Text></TouchableOpacity>
						<TouchableOpacity style={[styles.button,{backgroundColor:"#29b859"}]} ><Text style={styles.buttonText}>Log In</Text></TouchableOpacity>
					</View>
					
				</View>

			)
	}
}

class Spotify extends Component {
  render() {
  	let video =  <Video
  source={require('../img/moments.mp4')} // Can be a URL or a local file.
  rate={1.0}                   // 0 is paused, 1 is normal.
  volume={1.0}                 // 0 is muted, 1 is normal.
  muted={false}                // Mutes the audio entirely.
  paused={false}               // Pauses playback entirely.
  resizeMode="cover"           // Fill the whole screen at aspect ratio.
  repeat={true}                // Repeat forever.
  playInBackground={true}     // Audio continues to play when aentering background.
  playWhenInactive={true}     // [iOS] Video continues to play whcontrol or notification center are shown.
  style={styles.backgroundVideo}
/>;
    return (
    	<View>
    	{video}
    	<Intro />
    	</View>
    );
  }
}

const styles = StyleSheet.create({
	buttonContainer:{
		position:'absolute',
		bottom:0,
		width:Util.size.width,
		flexDirection:'row',
		// backgroundColor:'green',
		height:50,
		// borderTopWidth:.5,
		borderTopColor:'#eee',
	},
	button:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	buttonText:{
		color:'#fff',
		fontSize:16,
	},
	slider:{
	position: 'absolute',
    width: Util.size.width,
    bottom: 70,
    left:0,
	},
	slide:{
		flex: 1,
    height: Util.size.height,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom:40,
    backgroundColor:'transparent'
	},
	slideTextTitle:{
		fontSize:16,
    color: "#fff",
    fontWeight: "200",
    textAlign:'center',
	},
	slideText:{
		fontSize:12,
    color: "#fff",
    fontWeight: "100",
    textAlign:'center',
},
	container:{
		width:Util.size.width,
		backgroundColor:'transparent',
		height:Util.size.height,
	},
	logoContain:{
		paddingTop:50,
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row',
		backgroundColor:'transparent',
	},
	logoText:{
		paddingLeft:5,
	fontSize:40,
    color: "#fff",
    fontWeight: "600",
	},
	backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});


export default Spotify;