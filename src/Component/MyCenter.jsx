import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { history,dataBrand,dataModel,dataCity,TopNavBar,dataCityNo } from './common/index';
import { Modal,List ,InputItem,Grid,NoticeBar, WhiteSpace,Toast, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import ImageChoose from './ImageChoose';
import { createForm } from 'rc-form';
import { Tool, merged } from '../Tool';
const alert = Modal.alert;
import myHead from '../Images/head.svg';
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
            edit: props.state.userInfo.realName,
        }
    }
    handlerClick(){
        var x = this.props.form.getFieldsValue();
        var self = this;
        var {login} = this.props;
        if(this.state.edit){
            alert('提示','确认更新？', [
                { text: '朕再想想', onPress: () => {

                } },
                { text: '立即更新', onPress: () =>{
                    self.setState({
                        edit:false
                    });
                }}
            ])
            return
        }
        var headUrl = this.refs.headUrl.querySelector('.imageChoose').getAttribute('src');
        x.headUrl = headUrl;
        console.log(x)
        Tool.post($extUpdateUserInfo,x,function(data){ //用户信息更新
            if(data.code == '0'){
                Toast.info('更新成功！');
                login(data.response);
                self.setState({
                    edit:true
                });
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
        const {login} = this.props;
        console.log('个人信息：',userInfo)
        return (
            <div className="mySetting" >
                {
                    !userInfo.idCard && <NoticeBar  mode="closable"  marqueeProps={{ loop: true,fps: 25, style: { padding: '0 7.5px' } }}>
                        尊敬的摩一二手车用户，您的账户还未取网名，请完善信息。响亮的网名有助于提高交易成功率哦！
                    </NoticeBar>
                }
                {
                    this.state.edit && <div className="myTop">
                        <img className="myImg" src={userInfo.headUrl || myHead} />
                        <p>
                            {userInfo.tel}
                        </p>
                    </div>
                }

                {
                    !this.state.edit && <div ref="headUrl" >
                        <ImageChoose aspect={1} src={userInfo.headUrl||''} titles={['编辑头像']} length="1" />
                    </div>
                }

                <List>
                    <InputItem
                        {...getFieldProps('tel')}
                        type='text'
                        value={userInfo.tel.slice(0,3)+'****'+userInfo.tel.slice(-4)}
                        disabled
                        clear
                    >认证手机号</InputItem>
                    {
                        this.state.edit && <div>
                            <InputItem
                                {...getFieldProps('realName_', {
                                    initialValue: userInfo.realName,
                                })}
                                type='text'
                                clear
                                disabled
                                maxLength="4"
                            >网名</InputItem>
                        </div>
                    }
                    {
                        !this.state.edit && <div>
                            <InputItem
                                {...getFieldProps('realName', {
                                    initialValue: userInfo.realName || '',
                                })}
                                type='text'
                                placeholder="为自己取一个响亮的名字吧"
                                clear
                                maxLength="8"
                            >网名</InputItem>
                        </div>
                    }

                </List>
                <WhiteSpace />
                <div className="btnWrap">
                    {
                        this.state.edit && <Button className="btn" onClick={() => this.handlerClick()} type="primary">更新用户信息</Button>
                    }
                    {
                        !this.state.edit && <Button className="btn" onClick={() => this.handlerClick()} type="primary">提交修改</Button>
                    }
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



