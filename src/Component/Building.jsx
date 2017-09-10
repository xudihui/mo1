import React, { Component, PropTypes } from 'react';
import { Result } from 'antd-mobile-web'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage } from './common/index';


class Main extends Component {
    render() {
        return (
            <Result
                img={<i style={{fontSize:'70px',color:'#ff5b05'}} className="iconfont icon-process"></i>}
                title="功能建设中"
                message="程序员通宵在开发，敬请期待！"
            />
        );
    }
}

export default Main;
//export default Main;
