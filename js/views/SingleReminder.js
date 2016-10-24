/**
 * Day 20
 * Reminder
 */
'use strict';

import React,{Component} from 'react';
import {Image,StyleSheet,Text,TextInput,LayoutAnimation,TouchableHighlight,TouchableOpacity,View} from 'react-native';
import Util from '../utils/Util';
// import {BlurView,VibrancyView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';

export class ReminderContainer extends Component{
  static defaultProps = {
    listData:{
      title:"提醒事项",
      numOfItems:0,
      theme:"#fe952b",
      list:[]
    },
  };

  static propTypes = {
    listData: React.PropTypes.object,
    switch: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      listData: this.props.listData,
      numOfItems: this.props.listData.numOfItems,
    }
    this.animations = {
      duration: 20,
      create: {
        type: LayoutAnimation.Types.linear,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        springDamping: 0.7,
      },
    };
  }

  _done(index) {
    const listData = this.state.listData;
    let selectedIndex = listData.list[index];
    let numOfItems = this.state.numOfItems;
    if(selectedIndex.selected){
      numOfItems = numOfItems + 1;
    }else{
      numOfItems = numOfItems - 1;
    }
    
    listData.list[index].selected = !listData.list[index].selected;
    this.setState({
      listData,
      numOfItems
    })

    LayoutAnimation.configureNext(this.animations);

  }

  _addList(text) {
    console.log(text);
    let listData = this.state.listData;
    let numOfItems = this.state.numOfItems;
    listData.list.push({selected:false,
        text});
    this.setState({
      listData,
      numOfItems:numOfItems+1
    });
    this.refs.addList.setNativeProps({text: ''});
 }



  render() {
    const listData = this.state.listData;
    const list = listData.list.map((elem,index) => {
      return (
        <View ref={"list"+ index} key={index} style={{height:45,width:Util.size.width,flexDirection:'row',alignItems:'center',paddingLeft:15}}>
                  <TouchableOpacity style={{width:22,height:22,borderRadius:11,borderWidth:.5,borderColor:elem.selected?listData.theme:"#c6c6c6",justifyContent:'center',alignItems:'center'}} onPress={()=>this._done(index)}>
                      <View style={elem.selected?{width:16,height:16,borderRadius:8,backgroundColor:listData.theme}:null}>
                      </View>
                  </TouchableOpacity>
                  <View style={{flex:1,marginLeft:15,borderBottomWidth:1,borderColor:'#eee'}} >
                      <TextInput style={{flex:1}} defaultValue={elem.text}></TextInput>
                  </View>
        </View>
        
      );
    });
    list.push(
      <View key="add" style={{height:50,width:Util.size.width,flexDirection:'row',alignItems:'center',paddingLeft:15}}>
                  <View style={{width:22,height:22,justifyContent:'center',alignItems:'center'}}>
                     <Icon name="md-add" size={22} color='#c6c6c6'></Icon>
                  </View>
                  <View style={{flex:1,marginLeft:15,borderBottomWidth:1,borderColor:'#eee'}} >
                      <TextInput  autoCapitalize="none" ref="addList" onBlur={(event) => this._addList(event.nativeEvent.text)} style={{flex:1}}></TextInput>
                  </View>
              </View>
      
    );
    return(
      <View style={[{borderRadius:10,height:Util.size.height-65,width:Util.size.width,position:'absolute',top:20,left:0,backgroundColor:'#fff',shadowColor: "#000",
    shadowOpacity: .2,
    shadowRadius: 2,
    shadowOffset: {
      height: -1,
      width: 0,
    }},this.props.listStyle]}>
        <Image style={{height:Util.size.height - 65,width:Util.size.width,borderRadius:10,opacity:0.5}} source={require('../img/packed.png')}/>
        <View style={{width:Util.size.width,position:'absolute',left:0,top:0,backgroundColor:'transparent',borderRadius:10}}>
            <TouchableOpacity onPress={this.props.switch} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:15,paddingRight:15,height:65,width:Util.size.width,backgroundColor:'transparent',borderBottomWidth:1,borderBottomColor:'#eee'}}>

            <Text style={{fontWeight:'500',fontSize:28,color:listData.theme,textShadowColor:"#ccc",
    textShadowOffset:{width:0, height:1,},
    textShadowRadius:1,}}>{this.state.listData.title}</Text>
                 <Text style={{fontWeight:'300',fontSize:28, color:listData.theme}}>{this.state.numOfItems}</Text>
            </TouchableOpacity>
            <View style={{flex:1,width:Util.size.width,backgroundColor:'transparent'}}>
             {list}
              
            </View>
           
            
        </View>
       
      </View>
    );
  }
}

export default class extends Component{
  constructor() {
    super();
    this.listData = {
      title:"Development",
      numOfItems:6,
      theme:"#fe952b",
      list:[{
        selected:false,
        text:"day20",
      },{
        selected:false,
        text:"day21",
      },{
        selected:false,
        text:"day22",
      },{
        selected:false,
        text:"day23",
      },{
        selected:false,
        text:"day24",
      },{
        selected:false,
        text:"day25",
      }],
    };
  }

  componentDidMount() {
    // StatusBarIOS.setStyle(1);
  }

  render() {
    return(
      <View style={styles.container}>
        <Image source={require('../img/desktop.png')} style={styles.container}> 
          
        </Image>       
        <ReminderContainer listData={this.listData}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    height: Util.size.height,
    width: Util.size.width,
  },
  reminderContainer:{
    height: Util.size.height-65,
    width:Util.size.width,
    borderRadius: 10,
    position:"absolute",
    top:20,
    left:0,
    backgroundColor:"#fff",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: -1,
      width: 0,
    }
  },
  reminderBg:{
    height: Util.size.height-65,
    width:Util.size.width,
    borderRadius: 10,
    resizeMode:"cover",
    opacity:0.5,
  },
  reminderContent:{
    height: Util.size.height-65,
    width:Util.size.width,
    backgroundColor:"transparent",
    position:"absolute",
    top:0,
    left:0,
  },
  reminderTitleContainer:{
    height: 65,
    width: Util.size.width,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:15,
    paddingRight:15,
    alignItems:"center"
  },
  reminderTitle:{
    fontSize:28,
    fontWeight:"300",
    textShadowColor:"#ccc",
    textShadowOffset:{width:0, height:1,},
    textShadowRadius:1,
  },
  reminderListContainer:{
    flex:1,
    borderTopColor:"#ccc",
    borderTopWidth:1,
  },
  reminderList:{
    flexDirection:"row",
    paddingLeft:15,
    height:45,
    width:Util.size.width,
    justifyContent:"space-between",
    alignItems:"center"
  },
  check:{
    backgroundColor:"transparent",
    borderWidth:1,
    borderColor:"#c6c6c6",
    width:22,
    height:22,
    borderRadius:11,
    shadowOffset:{
        width: 0,
        height: 1,
    },
    shadowRadius:1,
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    justifyContent:"center",
    alignItems:"center"
  },
  fill:{
    width:16,
    height:16,
    borderRadius:8,
  },
  input:{
    width:Util.size.width-50,
    height:45,
    borderBottomWidth:1,
    borderBottomColor:"#ccc",
  },
  inputText:{
    height:43,
    color:"#363636",
  }
});

