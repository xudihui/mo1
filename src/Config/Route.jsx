import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import {Toast} from 'antd-mobile-web';
import IndexList from '../Component/IndexList'; //首页组件
import MyList from '../Component/MyList'; //主题详情
import MyInfo from '../Component/MyInfo'; //保单详情
import Help from '../Component/Help'; //保单详情
import Login from '../Component/Login'; //登录
import Vcode from '../Component/Vcode'; //登录
import SearchHistory from '../Component/SearchHistory'; //登录
import MyOwn from '../Component/MyOwn'; //买家中心
import MotoDetail from '../Component/MotoDetail'; //摩托详情页
import Choose from '../Component/Choose'; //摩托详情页
import MySelling from '../Component/MySelling'; //摩托详情页
import SellEdit from '../Component/SellEdit'; //卖车编辑页
import Building from '../Component/Building'; //卖车编辑页
/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}
var history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

var requireLogin = (nextState, push) => {
    if (!localStorage.getItem('id')) {
        push({ pathname: '/Login' });
        Toast.info('只有登录才能查看哦！')
    }
}

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={IndexList} />
            <Route path="myList" component={MyList} />
            <Route path="my/info" component={MyInfo} />
            <Route path="help" component={Help} />
            <Route path="Login" component={Login} />
            <Route path="Vcode" component={Vcode} />
            <Route path="myOwn" component={MyOwn} />
            <Route path="motoDetail" component={MotoDetail} onEnter={requireLogin}/>
            <Route path="choose" component={Choose} />
            <Route path="MySelling" component={MySelling} />
            <Route path="SellEdit" component={SellEdit} />
            <Route path="Building" component={Building} />


            <Route path="SearchHistory" component={SearchHistory} />
        </Route>
    </Router>
);

export default RouteConfig;
