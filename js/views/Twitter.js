'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  Easing,
  RefreshControl,
  TabBarIOS,
} from 'react-native';

import Util from '../utils/Util';
const StyleSheet  = require('../utils/CustomStyleSheet');
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
	prop:{
		hideThis: React.PropTypes.func.isRequired,
	}

	constructor(props: any) {
    super(props);
    this.state = {
      transformAnim: new Animated.Value(1),
      opacity:new Animated.Value(1),
      rotateAnim:new Animated.Value(0),
    };
  }
  render(): ReactElement {
  	const spin = this.state.rotateAnim.interpolate({
  		inputRange:[0,1],
  		outputRange:['0deg','360deg'],
  	})
    return (
      <Animated.Image                         // 可选的基本组件类型: Image, Text, View
        source={require('../img/day2/w4.png')}
        style={{
          flex: 1,
          position:'absolute',
          top:0,
          left:0,
          opacity:this.state.opacity,
        }}
      >
      <AnimatedIcon size={60} style={{
      color:"blue",
      position:'relative',
      backgroundColor:'transparent',
      left:-Util.size.width/2,
      top:Util.size.height/2 -50,
      textAlign: "center",
      transform: [                        // `transform` is an ordered array
            {scale: this.state.transformAnim}, 
            // {rotateY:spin} // Map `bounceValue` to `scale`
          ],
  }} name="logo-twitter"></AnimatedIcon>
      </Animated.Image>
    );
  }
  componentDidMount() {
    // this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
    Animated.timing(                          // 可选的基本动画类型: spring, decay, timing
      this.state.transformAnim,                 // 将`bounceValue`值动画化
      {
        toValue: 50,                         // 将其值以动画的形式改到一个较小值
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),                          // Bouncier spring
      }
    ).start();  
    Animated.timing(
    	this.state.opacity,
    	{
    		toValue:0,
    		duration:800,
    		delay:2200,
    		easing: Easing.elastic(1),
    	}
    ).start();  
    Animated.timing(
    	this.state.rotateAnim,
    	{
    		toValue:.5,
    		duration:800,
    		delay:2000,
    		easing:Easing.elastic(1),
    	}
    	).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);                  // 开始执行动画
  }
}

class TwitterPost extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isRefreshing:false,
	  };
	}

	_onRefresh() {
		this.setState({isRefreshing:true});
		setTimeout(()=> {
			this.setState({isRefreshing:false});
		},2000);
	}

	render(){
		return(
			<ScrollView style={{backgroundColor:'#eee',width: Util.size.width,
    height:Util.size.height-90,
    }}
				refreshControl = {
					<RefreshControl 
						refreshing={this.state.isRefreshing}
						onRefresh ={this._onRefresh.bind(this)}
						tintColor="#ddd"
					/>
			}>
			<Image source={require('../img/day3.png')} style={styles.postImg}></Image>
			</ScrollView>
			)
	}
}

class TwitterFlow extends Component{
  render() {
    return(
      <View>
        <View style={styles.header}>
          <View style={styles.navLeft}>
            <Icon name="ios-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
          </View>
          <View style={styles.navMid}>
            <Icon name="logo-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
          </View>
          <View style={styles.navRight}>
            <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
            <Icon name="ios-git-compare" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
          </View>
        </View>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
}
class TwitterTab extends Component{
  constructor() {
    super();
    this.state = {
      selectedTab:'主页',
    };
  }

  changeTab(tabName) {
      this.setState({
        selectedTab: tabName
      });
  }

  render(){
    return (
      
      <TabNavigator>
      <TabNavigator.Item
        title="主页"
        renderIcon={()=><Icon name="ios-home-outline" size={30} color="#4F8EF7" />}
        renderSelectedIcon={()=><Icon name="ios-home" size={30} color="#4F8EF7" />}
        // badgeText="1"
        onPress={ () => this.changeTab('主页') }
        selected={ this.state.selectedTab === '主页' }>
          <TwitterFlow/>
        </TabNavigator.Item>
         <TabNavigator.Item
        title="通知"
        renderIcon={()=><Icon name="ios-alert-outline" size={30} color="#4F8EF7" />}
        renderSelectedIcon={()=><Icon name="ios-alert" size={30} color="#4F8EF7" />}
        // badgeText="1"
        onPress={ () => this.changeTab('通知') }
        selected={ this.state.selectedTab === '通知' }>
          <TwitterFlow/>
        </TabNavigator.Item>
         <TabNavigator.Item
        title="私信"
        renderIcon={()=><Icon name="ios-mail-outline" size={30} color="#4F8EF7" />}
        renderSelectedIcon={()=><Icon name="ios-mail" size={30} color="#4F8EF7" />}
        // badgeText="1"
        onPress={ () => this.changeTab('私信') }
        selected={ this.state.selectedTab === '私信' }>
          <TwitterFlow/>
        </TabNavigator.Item>
         <TabNavigator.Item
        title="我"
        renderIcon={()=><Icon name="ios-person-outline" size={30} color="#4F8EF7" />}
        renderSelectedIcon={()=><Icon name="ios-person" size={30} color="#4F8EF7" />}
        // badgeText="1"
        onPress={ () => this.changeTab('我') }
        selected={ this.state.selectedTab === '我' }>
          <TwitterFlow/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

class Twitter extends Component {
	constructor(props: any) {
		super(props);
		this.state = {
			show: true,
		};
	}
    _hide(){
		this.setState({
			show:false,
		})
	}
  render() {
  	let launch = this.state.show ? <Entrance hideThis={()=>this._hide()} /> : <View />;
    return (
      <View style={{width:Util.size.width,height:Util.size.height}}>
     <TwitterTab />
      </View>
    );
  }
}

const FacebookTabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return <View style={[styles.tabs, this.props.style, ]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={35}
            color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
            ref={(icon) => { this.tabIcons[i] = icon; }}
          />
        </TouchableOpacity>;
      })}
    </View>;
  },
});


const styles = StyleSheet.create({
	postImg:{
		width:Util.size.width, height:Util.size.height-110,
		ios:{
			top:-20,
		},
		android:{
			top:5,
		}
	},
	header:{
		flexDirection:'row',paddingBottom:5,borderBottomWidth:2,borderBottomColor:'#eee', 
		backgroundColor:'#fff',
		ios:{
			paddingTop:30,
		},
		android:{
			paddingTop:5,
		}
	},
	navLeft:{
		flex:1,
		// backgroundColor:'green',
		justifyContent:'center',
		alignItems:'flex-start',
	},
	navMid:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	navRight:{
		flex:1,
		justifyContent:'flex-end',
		alignItems:'center',
		flexDirection:'row',
	},
	tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});


export default Twitter;