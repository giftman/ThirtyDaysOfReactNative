'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
} from 'react-native';
import Util from '../utils/Util';

export type Layout = 
  'default'
| 'icon'
| 'title';

class Timer extends Component {
	props:{
	};

	constructor(props) {
	  super(props);
	  this.state = {
	  		resetWatch:true,
	  		stopWatch:false,
	  		totalTime:'00:00:00',
	  		secondTime:'00:00:00',
	  		initialTime:0,
	  		currentTime:0,
	  		recordTime:0,
	  		timeAccumulation:0,
	  		recordCounter:0,
	  		record:[
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""}
        ],	  };
	}
  _startWatch(){
  		if(this.state.resetWatch){
  			this.setState({
  				resetWatch:false,
  				stopWatch:false,
  				timeAccumulation:0,
  				initialTime:(new Date()).getTime()
  			})
  		}else{
  			this.setState({
  				stopWatch:false,
  				initialTime:(new Date()).getTime()
  			})
  		}
  		let milSecond, second, minute, countingTime, secmilSecond, secsecond, secminute, seccountingTime;
    let interval = setInterval(
        () => { 
          this.setState({
            currentTime: (new Date()).getTime()
          })
          countingTime = this.state.timeAccumulation + this.state.currentTime - this.state.initialTime;
          minute = Math.floor(countingTime/(60*1000));
          second = Math.floor((countingTime-60000*minute)/1000);
          milSecond = Math.floor((countingTime%1000)/10);
          seccountingTime = countingTime - this.state.recordTime;
          secminute = Math.floor(seccountingTime/(60*1000));
          secsecond = Math.floor((seccountingTime-60000*secminute)/1000);
          secmilSecond = Math.floor((seccountingTime%1000)/10);
          this.setState({
            totalTime: (minute<10? "0"+minute:minute)+":"+(second<10? "0"+second:second)+"."+(milSecond<10? "0"+milSecond:milSecond),
            secondTime: (secminute<10? "0"+secminute:secminute)+":"+(secsecond<10? "0"+secsecond:secsecond)+"."+(secmilSecond<10? "0"+secmilSecond:secmilSecond),
          })
          if (this.state.stopWatch) {
            this.setState({
              timeAccumulation: countingTime 
            })
            clearInterval(interval)
          };
        },10);
  }

  _clearRecord(){
  	this.setState({
  		resetWatch:true,
	  		stopWatch:false,
	  		totalTime:'00:00:00',
	  		secondTime:'00:00:00',
	  		initialTime:0,
	  		currentTime:0,
	  		recordTime:0,
	  		timeAccumulation:0,
	  		recordCounter:0,
	  		record:[
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""},
          {title:"",time:""}]
  	});
  }

  _stopWatch(){
  	this.setState({
	  		stopWatch:true,
  	})
  }

  _addRecord(){
  	let {recordCounter,record} = this.state;
  	recordCounter++;
  	record.unshift({title:"计数" + recordCounter,time:this.state.secondTime});
  	
  	this.setState({
  		recordTime: this.state.timeAccumulation + this.state.currentTime - this.state.initialTime,
      recordCounter: recordCounter,
      record: record
  	});
  }
  render() {

    return (
      <View style={styles.container}>
         <WatchFace totalTime={this.state.totalTime} secondTime={this.state.secondTime} />
         <WatchFaceControl stopWatch={this._stopWatch.bind(this)} clearRecord={this._clearRecord.bind(this)} startWatch={this._startWatch.bind(this)} addRecord={this._addRecord.bind(this)} />
         <WatchRecord record={this.state.record} />
      </View>
    );
  }
}

class WatchFace extends Component{
	props:{
		totalTime:string,
		secondTime:string,
	}
	render(){
		return(
			<View style={styles.watchFaceContainer}>
				<Text style={styles.secondTime}>{this.props.secondTime}</Text>
         		<Text style={styles.totalTime}>{this.props.totalTime}</Text>
			</View>
			)
	}
}

class WatchFaceControl extends Component{
	props:{
		stopWatch: React.PropTypes.func.isRequired,
		clearRecord: React.PropTypes.func.isRequired,
		startWatch: React.PropTypes.func.isRequired,
		addRecord: React.PropTypes.func.isRequired,
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
			watchOn: false,
			startBtnText: "启动",
			startBtnColor: "#60B644",
			stopBtnText: "计次",
			underlayColor: "#fff",
	  };
	}

	_startWatch(){
		if(this.state.watchOn){
			this.props.stopWatch();
			this.setState({
				watchOn: false,
			startBtnText: "启动",
			startBtnColor: "#60B644",
			stopBtnText: "复位",
			underlayColor: "#eee",
			})
		}else{
			this.props.startWatch()
			this.setState({
				watchOn: true,
			startBtnText: "停止",
			startBtnColor: "#ff0044",
			stopBtnText: "计次",
			underlayColor: "#eee",
			})
		}
	}

	_addRecord(){
		if(this.state.watchOn){
			this.props.addRecord();
		}else{
			this.props.clearRecord();
			this.setState({
				stopBtnText:"计次",
			});
		}
	}
	render(){
		return(
			<View style={styles.watchControlContainer}>
				 <TouchableOpacity style={styles.btnStop} underlayColor={this.state.underlayColor} onPress={this._addRecord.bind(this)}>
				 <Text style={[styles.btnStopText]}>{this.state.stopBtnText}</Text>
				 </TouchableOpacity>
				 <TouchableOpacity style={styles.btnStart} underlayColor="#eee" onPress={this._startWatch.bind(this)}>
  				 <Text style={[styles.btnStopText,{color:this.state.startBtnColor}]}>{this.state.startBtnText}</Text>
				 </TouchableOpacity>
			</View>
			)
	}
}

class WatchRecord extends Component{
  static propTypes = {
        record: React.PropTypes.array.isRequired,
    }; 

  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    theDataSource = ds.cloneWithRows(this.props.record);
    return (
      <ListView
        style={styles.recordList}
        dataSource={theDataSource}
        renderRow={(rowData) => 
          <View style={styles.recordItem}>
            <Text style={styles.recordItemTitle}>{rowData.title}</Text>
              <Text style={styles.recordItemTime}>{rowData.time}</Text>
          </View>}/>
    );
  }
}

const CIRCLE_SIZE = 60;
const styles = StyleSheet.create({
	recordList:{
		flex:1,
		width:Util.size.width,
		backgroundColor:'#f3f3f3',
		// paddingTop:50,
	},
	recordItem:{
		height:40,
		paddingTop:20,paddingLeft: 30, paddingRight:30,paddingBottom:5,
		justifyContent:'space-between',
		alignItems:'center',
		flexDirection:'row',
		borderBottomWidth:Util.pixel,borderBottomColor:"#bbb",
	},
	recordItemTitle:{
		justifyContent:'center',
		backgroundColor:'transparent',
		fontWeight: "100",
    	color: "#777",
	},
	recordItemTime:{
		justifyContent:'center',
		backgroundColor:'transparent',
		fontWeight: "100",
    	color: "#222",
	},
	container:{
		marginTop: 50,
   	    alignItems: "center",
		// justifyContent: 'center',
		// backgroundColor:'blue',
	},
	watchFaceContainer:{
    width: Util.size.width,
    paddingTop: 50, paddingLeft: 30, paddingRight:30, paddingBottom:40,
    backgroundColor: "#fff",
    borderBottomWidth: 1, borderBottomColor:"#ddd",
    height: 170,
    // backgroundColor:'#666',
  },
  secondTime:{
    fontSize: 20,
    fontWeight:"100",
    color: "#555",
    position:"absolute",
    left:Util.size.width-140,
    // paddingRight: 30,
    // marginRight:30,
    // backgroundColor:'#555',
    top:30
  },
  totalTime:{
    fontSize: Util.size.width === 375? 70:60,
    fontWeight: "100",
    color: "#222",
    paddingLeft:20,
    // backgroundColor:'#111',
  },
    watchControlContainer:{
    width: Util.size.width,
    height: 100,
    flexDirection:"row",
    backgroundColor: '#f3f3f3',
    paddingLeft: 60, paddingRight:60, paddingBottom:0,
    justifyContent:'space-between',
    alignItems:'center',
  },
  btnStart:{
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center"
  },
  btnStop:{
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center"
  },
  btnStartText:{
    fontSize:14,
    backgroundColor:"transparent"
  },
  btnStopText:{
    fontSize:14,
    backgroundColor:"transparent",
    color:"#555"
  },
	
});


export default Timer;