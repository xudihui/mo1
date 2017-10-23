import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { history,dataBrand,dataModel,dataCity,TopNavBar,dataCityNo } from './common/index';
import { Drawer,List ,InputItem,Grid,NoticeBar, WhiteSpace,Toast, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import ImageChoose from './ImageChoose';
import { createForm } from 'rc-form';
import { Tool, merged } from '../Tool';
/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */

/**
 * (循环列表)
 *
 * @class List
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    handlerClick(){
        var x = this.props.form.getFieldsValue();
        var {login} = this.props;
        x.headUrl = '111';
        if(!/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/.test(x.idCard)){
           return Toast.offline('请输入正确的身份证号码')
        }
        if(!/^[\u4E00-\u9FA5]{1,4}$/.test(x.realName)){
            return Toast.offline('请输入中文姓名')
        }
        console.log(x)
        Tool.post($extUpdateUserInfo,x,function(data){ //用户信息更新
            if(data.code == '0'){
                Toast.info('更新成功！');
                login(data.response);
            }
            else{
                Toast.info(data.msg);
            }
        })
    }

    componentDidMount(){

    }
    render() {
        const { getFieldProps,getFieldError } = this.props.form;
        const {userInfo} = this.props.state;
        console.log('个人信息：',userInfo)
        return (
            <div className="mySetting" >
                <NoticeBar  mode="closable"  marqueeProps={{ loop: true,fps: 25, style: { padding: '0 7.5px' } }}>
                    尊敬的摩一二手车用户，您的账户还未实名，请完善信息。真实的个人信息有助于提高交易成功率哦！
                </NoticeBar>
                <List>
                    <div ref="headUrl" >
                        <ImageChoose src='' titles={['上传头像']} length="1" />
                    </div>
                    <InputItem
                        {...getFieldProps('tel')}
                        type='text'
                        value={userInfo.tel.slice(0,3)+'****'+userInfo.tel.slice(-4)}
                        disabled
                        clear
                    >认证手机号</InputItem>
                    <InputItem
                        {...getFieldProps('idCard')}
                        type='text'
                        placeholder="请输入身份证号码"
                        maxLength="18"
                        clear
                    >身份证号码</InputItem>
                    <InputItem
                        {...getFieldProps('realName')}
                        type='text'
                        placeholder="请输入您的真实姓名"
                        clear
                        maxLength="4"
                    >姓名</InputItem>
                </List>
                <WhiteSpace />
                <div className="btnWrap">
                    <Button className="btn" onClick={() => this.handlerClick()} type="primary">完善用户信息</Button>
                </div>
                <div className="btnWrap">
                    <Button className="btn" onClick={() => history.goBack()} type="">返回首页</Button>
                </div>
            </div>
        );
    }
}
const TextareaItemExampleWrapper = createForm()(Main);


export default connect((state) => { return { state: state['User'] } },action())(TextareaItemExampleWrapper);



