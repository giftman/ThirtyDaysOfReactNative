'use strict';

import React,{Component} from 'react';
import {Image,StyleSheet,Text,View} from 'react-native';
import Util from '../utils/Util';

import {PasswordGesture} from 'react-native-gesture-password';

class SetPassword extends Component{
  prop:{
    password:string,
    SetPassword:React.PropTypes.func.isRequired,
  }

  constructor(props) {
   super(props);
    this.state = {
      password: this.props.password,
      message: 'Please set your password.',
      status: 'normal',
    };
  }


  onEnd(password) {
        if ( this.state.password === '' ) {
            // The first password
            this.setState({
              password:password
            })
            this.setState({
                status: 'normal',
                message: 'Please input your password secondly.'
            });
        } else {
            // The second password
            if ( password === this.state.password ) {
                this.setState({
                    status: 'right',
                    message: 'Your password is set to ' + password
                });

                // your codes to close this view
                this.props.setPassword(password);
            } else {
                this.setState({
                    status: 'wrong',
                    message:  'Not the same, try again.'
                });
            }
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }
    onReset() {
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }

  render() {
    return(
     <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                />
    )
  }
}

class InputPassword extends Component{
  prop:{
    password:string,
    enterPasswd:React.PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      message: 'Please input your password.',
      status: 'normal',
    };
  }

  onEnd(password) {
        if (password == this.props.password) {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });

            // your codes to close this view\
            this.props.enterPasswd();
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }

  render() {
    return(
     <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                />
    )
  }
}

export default class extends Component{
  constructor() {
    super();
    this.state = {
      password:'',
      hasSet:false,
      enterGame:false,
    };
  }

  _setPassword(password){
    this.setState({
      password:password,
      hasSet:true,
    });
  }

  _enterPasswd(){
    this.setState({
      enterGame:true,
    })
  }
  render() {

    return(
      <View style={{backgroundColor:"transparent",height: Util.size.height, width: Util.size.width}}>
      {this.state.enterGame ? <View style={{justifyContent:'center',alignItems:'center',height: Util.size.height, width: Util.size.width}}><Text style={{fontSize:20,color:'#000'}}>Enter</Text></View>:<View /> }
     {this.state.hasSet ? <View /> :<SetPassword password={this.state.password} setPassword={(password) => this._setPassword(password)} />}
     {(this.state.hasSet && !this.state.enterGame ) ? <InputPassword password={this.state.password} enterPasswd={()=>this._enterPasswd()} />:<View />}
     </View>
    )
  }
}

const styles = StyleSheet.create({
  
});
