import React, { Component, PropTypes } from 'react';
import { List, InputItem, Toast,Button, WhiteSpace, WingBlank,ActivityIndicator } from 'antd-mobile-web';
import { connect } from 'react-redux';
import {  browserHistory, hashHistory } from 'react-router';
import action from '../Action/Index';
const Button_ = function(props){
    var before = <Button className="btn" >提交</Button>;
    var after =  <Button className="btn" type="primary" onClick={props.onClick}>提交</Button>;
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
        console.log('router',this.context)
    }
    onErrorClick(){
        if (this.state.hasError) {
            Toast.info('请输入收到的验证码');
        }
    }
    onChange(value){
        var x = value.replace(/\s/g, '');
        if (!(/^\d{4}$/.test(x))) {
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
        this.setState({
            loading:true
        });
        setTimeout(()=>{
            this.setState({
                loading:false
            });
            var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
            history.replace('/');
            Toast.info('登录成功！');
            this.props.login('您好！叶俊');
        },1500)
    }
    render() {
        return (
            <div>
                <List renderHeader={() => '手机验证码登录'}>
                    <InputItem
                        maxLength="4"
                        placeholder="请输入验证码"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick.bind(this)}
                        onChange={this.onChange.bind(this)}
                        value={this.state.value}
                    >验证码</InputItem>

                </List>
                <WhiteSpace />
                <WingBlank>
                    <div className="btn-container">
                        <Button_ before={this.state.hasError} onClick={this.getYzm.bind(this)}/>
                    </div>
                </WingBlank>

                <ActivityIndicator
                    toast
                    text="登录中"
                    animating={this.state.loading}
                />

            </div>
        );
    }
}


export default connect((state) => {return{state:state['User']}},action())(Main);

