import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import route from './Config/Route'; //路由配置
import store from './Config/Store';
import 'normalize.css'; //重置浏览器默认样式
import 'flex.css'; //flex布局
import './Style/antd-mobile.css'; //加载ant ui
import './Style/style.less'; //加载公共样式
//import './Style/style.scss'; //加载图片裁切样式


render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);