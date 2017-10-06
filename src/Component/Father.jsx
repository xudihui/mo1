import React, { Component, PropTypes } from 'react';
import { Result } from 'antd-mobile-web'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage,history } from './common/index';
import { Drawer,List ,Grid,NoticeBar, Modal,WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import myHead from '../Images/myHead.gif';
const alert = Modal.alert;
class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }
    render() {
        return (
            <div style={{paddingBottom:'2px'}} className="moto-detail">
                <div className="myTop">
                    <img className="myImg" src={myHead} />
                    <p>
                        欢迎使用乐天对账系统
                    </p>
                </div>
                <List className="my-list"  >
                    <List.Item extra="进入" arrow="horizontal" onClick={() => {
                        history.push(`/Fatheryy?type=yy&id=base`)
                    }}>玉岩账单中心</List.Item>
                    <List.Item extra="进入" arrow="horizontal" onClick={() => {
                        history.push(`/Fatheryy?type=fp&id=base`)
                    }}>枫坪账单中心</List.Item>
                </List>


            </div>
        );
    }
}

export default connect((state) => { return { state: state['FatherData']} }, action())(Main);
