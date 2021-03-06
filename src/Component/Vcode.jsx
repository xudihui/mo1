import React, { Component, PropTypes } from 'react';
import { List, InputItem, Toast,Button, WhiteSpace, WingBlank,ActivityIndicator } from 'antd-mobile-web';
import { connect } from 'react-redux';
import { history } from './common/index';
import {ajaxFetch} from '../Config/Store';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
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
        var code = this.state.value.replace(/\s/g, '');
        var {login} = this.props;
        var self = this;

        //异步的action
        /*
        ajaxFetch({
            url:'http://115.236.162.166:18081/ext_smk_activity/baseUser/getUserIdByToken.ext',
            query:{request:JSON.stringify({accessToken:'0AE2BD2CB088451D188970E48733BE066B2A6A82B5D35802FE81A2FFE5519E461FB903139E41D022F82DA482585AE7D24485950A235B2EBB22EB2F3FA6B1D582968620D9405D813E'})}
        });
        */
        Tool.post($extTelMsgLogin,{tel:sessionStorage.getItem('tel'),code:code},function(data){
            if(data.code == '0'){
                sessionStorage.setItem('selectedTab','My');
                history.replace('/');
                Toast.info('登录成功！');
                login(data.response);
            }
            else{
                Toast.offline(data.msg)
            }
        })


    }
    render() {
        return (
            <div>
                <List renderHeader={() => '请输入您收到的验证码'}>
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

            </div>
        );
    }
}


export default connect((state) => {return{state:state['User']}},action())(Main);

