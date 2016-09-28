'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Util from '../utils/Util';
import Icon from 'react-native-vector-icons/Ionicons';

class Counter extends Component {
  render() {
    return (
      <View style={styles.container}>
         <View style={styles.section1}></View>
         <View style={styles.section2}></View>
         <View style={styles.section3}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		// flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		// backgroundColor:'blue',
	},
	section1:{
		flex:1,
		backgroundColor:'#00bb9c',
		width:Util.size.width,
	},
	section2:{
		flex:1,
		backgroundColor:'#ecf0f1',
		width:Util.size.width,
	},
	section3:{
		flex:1,
		backgroundColor:'#56abe4',
		width:Util.size.width,
	}

});


export default Counter;