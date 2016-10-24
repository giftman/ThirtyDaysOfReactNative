/**
 * Day 13
 * A twitter tweet UI
 */
'use strict';

import React,{Component} from 'react';
import {Image,StyleSheet,Text,View} from 'react-native';
import Util from '../utils/Util';


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
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
});
