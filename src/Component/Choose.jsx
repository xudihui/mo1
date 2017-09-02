import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {Range, WingBlank, WhiteSpace, createTooltip,Button } from 'antd-mobile-web';
import action from '../Action/Index';

import { history,TopNavBar } from './common/index';
import { connect } from 'react-redux';
const RangeWithTooltip = createTooltip(Range);
const data = [
    {
        title: 'Meet hotel',
        des: ' 山西 临汾市  Yamaha YZF 系列 YZF-R6',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
    {
        title: 'McDonald\'s invites you',
        des: ' 广东 汕尾市  Honda Dio 系列 Dio',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
    {
        title: 'Eat the week',
        des: '湖南 Yamaha Vino 系列 Vino 50',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
];
const log = (name) => {
    return (value) => {
        console.log(`${name}: ${value}`);
    };
};

/**
 * 筛选器
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mile: [],
            year: [],
            price:[]
        }
    }
    componentDidMount() {

    }
    render() {

        return(
            <div>
                <TopNavBar title='筛选' />
                <WhiteSpace size="lg"  />
                <WhiteSpace size="lg"  />
                <div className="sub-title">价格要求（单位:万）<span>{this.state.price.join('~')}万元</span></div>
                <WingBlank size="lg">
                    <RangeWithTooltip
                        min={0}
                        max={20}
                        defaultValue={[3, 10]}
                        pushable={2}
                        onChange={(value) => {this.setState({price:value})}}
                    />
                    <p data-flex="main:justify" className="choose_p" >
                        <span>0</span>
                        <span>4</span>
                        <span>8</span>
                        <span>12</span>
                        <span>16</span>
                        <span>20</span>
                    </p>
                </WingBlank>
                <div className="sub-title">车龄要求（单位:年）<span>{this.state.year.join('~')}年</span></div>
                <WingBlank size="lg">
                    <RangeWithTooltip
                        min={0}
                        max={8}
                        pushable={2}
                        defaultValue={[3, 5]}
                        onChange={(value) => {this.setState({year:value})}}
                    />
                    <p data-flex="main:justify" className="choose_p" >
                        <span>0</span>
                        <span>2</span>
                        <span>4</span>
                        <span>6</span>
                        <span>8</span>
                    </p>
                </WingBlank>
                <div className="sub-title">行驶里程（单位:万公里）<span>{this.state.mile.join('~')}万公里</span></div>
                <WingBlank size="lg">
                    <RangeWithTooltip
                        min={0}
                        max={20}
                        pushable={2}
                        defaultValue={[3, 10]}
                        onChange={(value) => {this.setState({mile:value})}}
                    />
                    <p data-flex="main:justify" className="choose_p" >
                        <span>0</span>
                        <span>10</span>
                        <span>20</span>
                    </p>
                </WingBlank>
                <div className="btnWrap">
                    <Button className="btn" type="primary"  onClick={() => {
                        sessionStorage.setItem('selectedTab','Buy');
                        history.push('/')}}>确定</Button>
                </div>
            </div>
        )
    }
}


export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
//export default Main;
