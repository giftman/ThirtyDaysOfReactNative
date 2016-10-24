/**
 * Day 9
 * 
 */
'use strict';
import React,{Component} from 'react';
import {Image,StyleSheet,Text,TouchableOpacity,PanResponder,LayoutAnimation,ScrollView,TabBarIOS,StatusBarIOS,SegmentedControlIOS,View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../utils/Util';

class TwitterUser extends Component{
  constructor() {
    super();
    this.state = {
      scrollEnabled: false,
      scale: 1,
      iconTop: 95,
      bannerTop:0,
      opacity:0,
      zIndex:0,
    };
  }

  _scrollEnabled = false;
  _previousTop = 0;
  _iconTop = 95;
  _scale = 1;
  _bannerTop = 0;
  _opacity = 0;
  _minTop = -192;
  _zIndex = 0;
  _userStyle = {};
  user = (null : ?{ setNativeProps(props: Object): void });

  _updatePosition() {
     this.user && this.user.setNativeProps(this._userStyles);
  }

  _endMove(evt, gestureState) {
    this._previousTop = this._userStyles.style.top;
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy/gestureState.dx!=0;
      },
      onPanResponderGrant: (evt, gestureState) => {
         
      },
      onPanResponderMove: (evt, gestureState) => {
        this._userStyles.style.top = this._previousTop + gestureState.dy;
        this._scale = 1+this._userStyles.style.top/162.5;//以自我位置为中心点，向上负数缩小，向下正数
        console.log(this._userStyles.style.top);
        this._iconTop = 95 - this._userStyles.style.top/4.16; //上移过程有点因素值可以使icon位置同时上向下移，速度稍慢于
        // console.log(this._iconTop);
        this._bannerTop = 0;  //_bannerTop 一直为0，直到上移到-62.5,然后再上移一步，_bannerTop就是相对高度下移了一步
        this._opacity = 0;  //透明度，主要这个算法是用了现在的高度去/最终高度  math.pow()
        this._zIndex = 0;
        this._scrollEnabled = false; //最后的手势，需要设置panResponder 将触摸权限交回给scrollView 这里不展开 动画可参考sticker header
        if (this._userStyles.style.top< -62.5) {
          this._scale = 0.6;
          this._iconTop = 110;
          this._bannerTop = -this._userStyles.style.top-62.5;
          this._zIndex = 1;
          this._opacity = Math.pow(this._bannerTop/129.5,0.5)
        };
        if (this._userStyles.style.top>0) {
          this._userStyles.style.top = 0;
          this._scale = 1;
          this._iconTop = 95;
          this._zIndex = 0;
        };
        if (this._userStyles.style.top < this._minTop) {
          this._userStyles.style.top = this._minTop;
          this._opacity = 1;
          this._bannerTop = 129.5;
          this._scrollEnabled = true;
        };
        console.log(this._scrollEnabled);
        this.setState({
          scrollEnabled: this._scrollEnabled,
          scale: this._scale,
          iconTop: this._iconTop,
          bannerTop: this._bannerTop,
          zIndex:this._zIndex,
          opacity: this._opacity
        });

        this._updatePosition();
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
      onShouldBlockNativeResponder: (event, gestureState) => true,
    });

    this._panResponderRelease = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
    });

    this._userStyles = {
      style: {
        top: this._previousTop,
      },
    };

  }

  componentDidMount() {
    this._updatePosition();
  }

  render () {
    let panProps = this.state.scrollEnabled?{...this._panResponderRelease.panHandlers}:{...this._panResponder.panHandlers};
    return(
      <View ref={(user) => {this.user = user;}} style={styles.userContainer} {...panProps}>
        <View style={[styles.userPanel,{backgroundColor:'white'}]}>
          <Image style={{position:'absolute',top:this.state.bannerTop,zIndex:this.state.zIndex,left:0,width:Util.size.width,height:125}} source={require('../img/ban.png')}></Image>
          
          <View>
            <View style={[styles.iconContainer,{top:this.state.iconTop,transform:[{scale:this.state.scale}]}]}>
               <Image style={{height:68,width:68}} source={require('../img/icon.png')}></Image>
            </View>
            <View style={styles.userControl}>
              <TouchableOpacity style={styles.controlIcon}><Icon name="ios-home" size={20} style={{color:"#8999a5"}}></Icon></TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn}><Icon name="ios-person" size={20} style={{color:"#8999a5"}}></Icon></TouchableOpacity>
              <TouchableOpacity style={styles.controlBtn2}><Text style={styles.controlBtnText}>编辑个人资料</Text></TouchableOpacity>
            </View>
            <Text style={{fontSize:20,position:'absolute',top:173,left:10,padding:5}}>Github</Text>
            <Text style={{fontSize:14,position:'absolute',top:200,left:10,padding:5,color:'grey'}}>@Github</Text>
            <View style={{flexDirection:'row',position:'absolute',top:223,left:10,alignItems:'stretch',width:Util.size.width*0.7}}>
              <Text style={{fontSize:16,padding:5,color:"#292f33",
    fontWeight:"500"}}>183</Text>
              <Text style={{fontSize:16,padding:5,color:'grey'}}>正在关注   </Text>
              <View style={{flex:1}} />
              <Text style={{fontSize:16,padding:5,color:"#292f33",
    fontWeight:"500"}}>183</Text>
              <Text style={{fontSize:16,padding:5,color:'grey'}}>正在关注   </Text>
            </View>
          </View>
           {this.state.bannerTop<=0?<View></View>: <Image style={{position:'absolute',top:this.state.bannerTop,opacity:this.state.opacity,zIndex:this.state.zIndex,left:0,width:Util.size.width,height:125}} source={require('../img/bannerBlur.png')}></Image>}
           <Text style={{backgroundColor:'transparent',zIndex:this.state.zIndex,position:'absolute',top:this.state.bannerTop + 90,opacity:this.state.opacity,left:Util.size.width/2 - 30 ,fontSize:20, fontWeight:"500" ,color:'#fff'}}>Github</Text>
         <View style={styles.segment}>
            <SegmentedControlIOS values={['推文', '媒体', '喜欢']}  selectedIndex={0} tintColor="#2aa2ef"/>
          </View>
        </View>
        <ScrollView  style={styles.detailScroll} scrollEnabled={true}>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <Text style={{flex:1,height:20,padding:5}}>List</Text>
          <View style={{width:Util.size.width,backgroundColor:"#f5f8fa"}}>
            <Image style={{width:Util.size.width, height:0.835*Util.size.width, resizeMode:"contain"}} source={require('../img/moreinfo.png')}></Image>
          </View>
        </ScrollView>
      </View>
    )
  }
}

class TwitterTab extends Component{
  constructor() {
    super();
    this.state = {
      selectedTab:'我',
    };
  }

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName
    });
  }

  render(){
    return (
      <TabBarIOS
        barTintColor="#fff"
        tintColor="#1b95e0">
        <Icon.TabBarItem
        title="主页"
        iconName="ios-home-outline"
        selectedIconName="ios-home"
        onPress={ () => this.changeTab('主页') }
        selected={ this.state.selectedTab === '主页' }>
          <TwitterUser/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="通知"
        iconName="ios-notifications-outline"
        selectedIconName="ios-notifications"
        onPress={ () => this.changeTab('通知') }
        selected={ this.state.selectedTab === '通知'}>
          <TwitterUser/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="私信"
        iconName="ios-mail-outline"
        selectedIconName="ios-mail"
        onPress={ () => this.changeTab('私信') }
        selected={ this.state.selectedTab === '私信'}>
          <TwitterUser/>
        </Icon.TabBarItem>
        <Icon.TabBarItem
        title="我"
        iconName="ios-person-outline"
        selectedIconName="ios-person"
        onPress={ () => this.changeTab('我') }
        selected={ this.state.selectedTab === '我'}>
          <TwitterUser/>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

export default class extends Component{
  componentDidMount() {
    // StatusBarIOS.setStyle(1);
  }

  render() {
    return(
      <View style={styles.twitterContainer}>
        <TwitterTab/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper:{
    backgroundColor: '#fff'
  },
  twitterContainer:{
    width: Util.size.width,
    height: Util.size.height,
    backgroundColor:"#f5f8fa",
  },
  userContainer:{
    width: Util.size.width,
    height: Util.size.height-50,
    backgroundColor:"#fff",
    position:"absolute",
    top:0,
    left:0,
  },
  detailScroll:{
    position:"absolute",
    top: 300,
    width: Util.size.width,
    height: Util.size.height-350,
    left:0,
    borderTopWidth:Util.pixel,
    borderTopColor:"#9eacb6"
  },
  userPanel:{
    flex:1,
    height:300,
  },
  banner:{
    width: Util.size.width,
    height:125,
    position:"absolute",
    top:0,
    left:0
  },
  iconContainer:{
    position:"absolute",
    left:10,
    top:95,
    borderWidth:5,
    borderColor:"#fff",
    borderRadius:5,
  },
  icon:{
    width:68,
    height:68
  },
  userControl:{
    height:55,
    position:"absolute",
    top:125,
    width: 200,
    right:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  controlBtn:{
    borderColor:"#8999a5",
    borderWidth:1,
    paddingTop:3,paddingLeft:5,paddingBottom:3,paddingRight:5,
    borderRadius:3,
    width:40,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  controlBtn2:{
    borderColor:"#8999a5",
    borderWidth:1,
    paddingTop:3,paddingLeft:5,paddingBottom:3,paddingRight:5,
    borderRadius:3,
    width:120,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  controlIcon:{
    width: 30
  },
  controlBtnText:{
    color:"#8999a5",
    fontSize:14
  },
  userInfo:{
    width: Util.size.width,
    position:"absolute",
    top: 165,
    paddingTop:15, paddingLeft:15, paddingBottom:15,
    left:0,
    height:90,
  },
  userInfoName:{
    color:"#292f33",
    fontSize:20,
    fontWeight:"500",
    paddingBottom:5
  },
  userInfoAccount:{
    color:"#66757f",
    paddingBottom:5
  },
  userInfoFollower:{
    color:"#95a4ae",
    width:110
  },
  userInfoFollowing:{
    color:"#95a4ae",
    width:110
  },
  userInfoFollow:{
    flexDirection:"row"
  },
  fontEm:{
    color:"#292f33",
    fontWeight:"500"
  },
  segment:{
    position: "absolute",
    top: 263,
    left:0,
    width: Util.size.width-15,
    paddingLeft:15,
    height:40,
  }
});