import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { history,TopNavBar } from './common/index';
import { Button,PlaceHolder } from 'antd-mobile-web';

import Rows from './Rows';
/**
 * 砍价，降价，收藏，浏览，订阅记录
 *
 * @param {Object} mySeting
 * @returns
 */
//banner滚动图
class Main extends Component {
    constructor(props) {
        super(props);
        this.handlerInit.bind(this);
        this.icon = this.props.location.query.icon;
        this.type = this.props.location.query.type;
    }
    handlerInit(){
        var text = '';
        var id = this.type;
        console.log('aaaa:' + id);
        switch(id)
        {
            case '买到车辆':
                text = '哎呀，您还没有挑选心仪的爱车';
                break;
            case '砍价记录':
                text = '您太忙了，还没去砍价哦';
                break;
            case '降价提醒':
                text = '暂无降价信息，快去选车吧！';
                break;
            case '收藏车辆':
                text = '暂无收藏车辆，快去选车吧！';
                break;
            case '浏览记录':
                text = '哎呀，您居然没有浏览过车辆！';
                break;
            case '订阅车源':
                text = '哎呀，您还没有订阅心仪的爱车';
                break;
            default:
                text = '****';
        }
        return(
            <span>
                <i className={'iconfont '+this.icon} ></i>
                {text}
            </span>
        ) ;

    }
    componentDidMount() {
        document.body.scrollTop = 0
    }
    render() {
        return (
            <div className="my-own">
                <TopNavBar title={this.type} />
                <p className="none">
                {
                    this.handlerInit()
                }
                </p>
                <div className="btnWrap">
                    <Button className="btn" type="primary"  onClick={() => {
                        sessionStorage.setItem('selectedTab','Buy');
                        history.push('/')}}>立即去逛逛</Button>
                </div>
                <div className="sub-title">为您推荐</div>
                <div className="am-list am-list-view-scrollview" >
                    <div className="am-list-body">
                        <div className="list-view-section-body">
                            <Rows />
                            <Rows />
                            <Rows />
                            <Rows />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default connect((state) => { return { state: state['MyList']} }, action())(Main);
