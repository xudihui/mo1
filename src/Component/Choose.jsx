import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {Range, WingBlank, WhiteSpace, createTooltip,Button } from 'antd-mobile-web';
import action from '../Action/Index';

import { history,TopNavBar,formatParams} from './common/index';
import { connect } from 'react-redux';
const RangeWithTooltip = createTooltip(Range);

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
            price:[],
            minPrice:props.location.query.minPrice/1000000||0,
            maxPrice:props.location.query.maxPrice/1000000||50

        }
    }
    componentDidMount() {

    }
    render() {
        var query = this.props.location.query;
        return(
            <div>
                <TopNavBar title='筛选' />
                <WhiteSpace size="lg"  />
                <WhiteSpace size="lg"  />
                <div className="sub-title">价格要求（单位:万）<span>{this.state.minPrice + '~' + this.state.maxPrice}万元</span></div>
                <WingBlank size="lg">
                    <RangeWithTooltip
                        min={0}
                        max={50}
                        defaultValue={[this.state.minPrice,this.state.maxPrice]}
                        pushable={1}
                        onChange={(value) => {this.setState({minPrice:value[0],maxPrice:value[1]})}}
                    />
                    <p data-flex="main:justify" className="choose_p" >
                        <span>0</span>
                        <span>25万</span>
                        <span>50万</span>
                    </p>
                </WingBlank>

                <div className="btnWrap">
                    <Button className="btn" type="primary"  onClick={() => {
                        var target = Object.assign({},query,{minPrice:this.state.minPrice*1000000,maxPrice:this.state.maxPrice*1000000})
                        if(location.href.indexOf('MySellList') > -1){
                            history.replace(`/MySellList?${formatParams(target)}`)
                        }
                        else{
                            history.replace(`/?${formatParams(target)}`)
                        }
                    }}>确定</Button>
                </div>
            </div>
        )
    }
}
const bak = function(){
    return(
        <div>
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
        </div>
    )
}

export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
//export default Main;
