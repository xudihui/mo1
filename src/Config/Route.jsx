import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import {Toast} from 'antd-mobile-web';
import IndexList from '../Component/IndexList'; //首页组件
import ImageChoose from '../Component/ImageChoose'; //保单详情
import MyList from '../Component/MyList'; //主题详情
import MySellList from '../Component/MySellList'; //主题详情
import MySetting from '../Component/MySetting'; //个人中心设置
import MyCenter from '../Component/MyCenter'; //个人信息编辑
import PersonCenter from '../Component/PersonCenter'; //个人信息编辑
import Help from '../Component/Help'; //保单详情
import Login from '../Component/Login'; //登录
import Vcode from '../Component/Vcode'; //登录
import SearchHistory from '../Component/SearchHistory'; //登录
import MyOwn from '../Component/MyOwn'; //买家中心
import MotoDetail from '../Component/MotoDetail'; //摩托详情页
import MotoDetailHot from '../Component/MotoDetailHot'; //摩托详情页
import MotoDetailNew from '../Component/MotoDetailNew'; //摩托详情页
import Steps from '../Component/Steps'; //摩托详情页

import Choose from '../Component/Choose'; //摩托详情页
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
    if (!localStorage.getItem('userInfo')) {
        push({ pathname: '/Login' });
        Toast.info('只有登录才能查看哦！',1)
    }
}

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={IndexList} />
            <Route path="myList" onEnter={requireLogin} component={MyList} />
            <Route path="mySellList" onEnter={requireLogin} component={MySellList} />
            <Route path="help" component={Help} />
            <Route path="Login" component={Login} />
            <Route path="Vcode" component={Vcode} />
            <Route path="myOwn" component={MyOwn} />
            <Route path="motoDetail" component={MotoDetail} onEnter={requireLogin}/>
            <Route path="motoDetailHot" component={MotoDetailHot} onEnter={requireLogin}/>
            <Route path="MotoDetailNew" component={MotoDetailNew} onEnter={requireLogin}/>

            <Route path="choose" component={Choose} />
            <Route path="MySetting" component={MySetting} />
            <Route path="MyCenter" component={MyCenter} />
            <Route path="PersonCenter/:userId" component={PersonCenter} />
            <Route path="Steps" component={Steps} />

            <Route path="SellEdit" component={SellEdit} />
            <Route path="Building" component={Building} />
            <Route path="ImageChoose" component={ImageChoose} />
            <Route path="SearchHistory" component={SearchHistory} />
        </Route>
    </Router>
);


export default RouteConfig;
