import React, { Component, PropTypes } from 'react';
import { List, InputItem, Toast,Button, WhiteSpace, WingBlank,ActivityIndicator } from 'antd-mobile-web';
import { connect } from 'react-redux';
import {  browserHistory, hashHistory } from 'react-router';
import {Tool} from '../Tool';
const Button_ = function(props){
    var before = <Button className="btn" >获取验证码</Button>;
    var after =  <Button className="btn" type="primary" onClick={props.onClick}>获取验证码</Button>;
    return props.before ? before : after
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: true,
            value: '',
            loading:false
        }
    }
    onErrorClick(){
        if (this.state.hasError) {
            Toast.info('请输入正确手机号');
        }
    }
    onChange(value){
        var x = value.replace(/\s/g, '');
        if (!(/^1[34578]\d{9}$/.test(x))) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
                value:x
            });
        }
        this.setState({
            value,
        });
    }
    getYzm(value){
        var tel = this.state.value.replace(/\s/g, '');
        Tool.post($A,{tel:tel},function(data){
              if(data.code == '0'){
                  var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
                  history.replace('/Vcode');
              }
              else{
                  Toast.offline(data.msg)
              }
        })

    }
    render() {
        return (
            <div>
                <List renderHeader={() => '手机验证码登录'}>
                    <InputItem
                        maxLength="11"
                        placeholder="请输入您的手机号码"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick.bind(this)}
                        onChange={this.onChange.bind(this)}
                        value={this.state.value}
                    >手机号码</InputItem>
                </List>
                <WhiteSpace />
                <WingBlank>
                    <div className="btn-container">
                        <Button_ before={this.state.hasError} onClick={this.getYzm.bind(this)}/>
                    </div>
                </WingBlank>
            </div>
        );
    }
}


export default connect((state) => {return{a:1}})(Main);

