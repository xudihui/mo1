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
        }
    }
    componentDidMount() {
        document.body.scrollTop = 0;


    }
    render() {
        const { getFieldProps,getFieldError } = this.props.form;
        const {userInfo} = this.props.state;
        const {login} = this.props;
        console.log('个人信息：',userInfo)
        return (
            <div className="mySetting" >
                <TopNavBar title={this.props.params.userId}/>
                <div className="myTop">
                    <img className="myImg" src={userInfo.headUrl || myHead} />
                    <p>
                        {userInfo.realName}
                    </p>
                    <p>
                       我就是我不一样的烟火！
                    </p>
                </div>
                <WhiteSpace />
                <MyHotList title="在售车辆" data={this.props.MyList.myHotList} paddingBottom="50px"/>
                <div className="btnWrap">
                    <Button className="btn" type="primary"  onClick={() => {

                    }}>查看全部</Button>
                </div>
            </div>
        );
    }
}
const TextareaItemExampleWrapper = createForm()(Main);


export default connect((state) => { return { state: state['User'],MyList: state['MyList'] } },action())(TextareaItemExampleWrapper);



