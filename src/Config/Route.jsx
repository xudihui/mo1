import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import IndexList from '../Component/IndexList'; //首页组件
import MyList from '../Component/MyList'; //主题详情
import MyToDoList from '../Component/MyToDoList'; //我的待办列表
import MyInfo from '../Component/MyInfo'; //保单详情
import Help from '../Component/Help'; //保单详情
import Menu from '../Component/Menu'; //菜单详情
import Amount from '../Component/Amount'; //余额查询
import Login from '../Component/Login'; //登录
import Vcode from '../Component/Vcode'; //登录
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
console.log(history)
const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={IndexList} />
            <Route path="my/list/:id" component={MyList} />
            <Route path="todo" component={MyToDoList} />
            <Route path="my/info/:id" component={MyInfo} />
            <Route path="help" component={Help} />
            <Route path="menu" component={Menu} />
            <Route path="amount" component={Amount} />
            <Route path="Login" component={Login} />
            <Route path="Vcode" component={Vcode} />
        </Route>
    </Router>
);

export default RouteConfig;
