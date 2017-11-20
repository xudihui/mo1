import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { history,dataBrand,dataModel,dataCity,TopNavBar,dataCityNo } from './common/index';
import { Modal,List ,InputItem,Grid,NoticeBar, WhiteSpace,Toast, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import ImageChoose from './ImageChoose';
import { createForm } from 'rc-form';
import { Tool, merged } from '../Tool';
import MyHotList from './common/MyHotList';
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
        console.log('个人中心：',props.params.userId)
        this.state = {
            edit: props.state.userInfo.realName,
            userId:props.params.userId,
            userInfo:'',
            data:'loading'
        }
    }
    componentDidMount() {
        document.body.scrollTop = 0;
        var self = this;

        //请求用户信息
        Tool.post($extGetUserInfoById,{userId:self.state.userId},function(data){
            if(data.code == '0'){
                self.setState({userInfo:data.response || {}});
            }
            else if(data.code == '-1001'){
                Toast.offline(data.msg);
            }
            else{
                Toast.offline(data.msg)
            }
        })
        //请求用户在售车辆
        Tool.post($extMotorFindPage,{userId:self.state.userId,rows:100},function(data){
            if(data.code == '0'){
                self.setState({data:data.response.searchData || []});
            }
            else if(data.code == '-1001'){
                Toast.offline(data.msg);
            }
            else{
                Toast.offline(data.msg)
            }
        })
    }
    render() {
        const {userInfo,data} = this.state;
        return (
            <div className="mySetting" >
                <TopNavBar title='卖家个人主页'/>
                <div className="myTop">
                    <img className="myImg" src={userInfo.headUrl || myHead} />
                    <p>
                        {userInfo.userName}
                    </p>
                    <p>
                        {userInfo.sign || '该用户暂无个性签名'}
                    </p>
                </div>
                <WhiteSpace />
                {
                    data == 'loading' ? <div className="data-load data-load-true"><div className="msg">正在加载中...</div></div> : <MyHotList title="在售车辆" from="new" data={data} paddingBottom="50px"/>
                }

            </div>
        );
    }
}
const TextareaItemExampleWrapper = createForm()(Main);


export default connect((state) => { return { state: state['User'],MyList: state['MyList'] } },action())(TextareaItemExampleWrapper);



