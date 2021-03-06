/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';

import React,{Component} from 'react';
import {View,Text} from 'react-native';
import Timer from './views/Timer';
import Weather from './views/Weather';
import Twitter from './views/Twitter';
import Test from './views/test';
import Spotify from './views/Spotify';
import TwitterUser from './views/TwitterUser';
import TumblrAnimation from './views/TumblrAnimation';
import TwitterUi from './views/TwitterUi';
import SwipeCard from './views/SwipeCard';
import Day15 from './views/Day15';
import Password from './views/Password';
import SortableGrid from './views/SortableGrid';
import SingleReminder from './views/SingleReminder';
import MultiReminder from './views/MultiReminder';
import GoogleNow from './views/GoogleNow';
import D3 from './views/D3';
import FacebookTab from './views/FacebookTab';
import DrawableLayout from './views/DrawableLayout';
import IMessage from './views/IMessage';
import IMessagePick from './views/IMessagePick';
class Playground extends Component {
  constructor() {
    super();
    const content = [];
    const define = (name: string, render: Function) => {
      content.push(<Example key={name} render={render} />);
    };
    // var Module = require('F8PageControl');
    // var Module = require('F8Header');
    // var Module = require('./tabs/schedule/AddToScheduleButton');
    // var Module = require('./rating/Header');
    // Module.__cards__(define);
    this.state = {content};
  }

  render() {
    return (
      // <View style={{backgroundColor: '#336699', flex: 1,}}>
        <IMessagePick />
      // </View>
    );
  }
}

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const content = this.props.render(this.state.inner, (inner) => this.setState({inner}));
    return (
      <View>
        {content}
      </View>
    );

  }
}

module.exports = Playground;
