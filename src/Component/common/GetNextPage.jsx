import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import { Tool, merged, config } from '../../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, Footer, UserHeadImg,Empty,formatParams,history } from './index';

import GetNextPage from './PageCenter';
import { SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder,Tag } from 'antd-mobile-web';
const {target} = config;

/**
 * 模块入口方法
 * 
 * @param {Object} mySetting
 * @returns
 */

const Main = (mySetting) => {
    var setting = {
        id: '', //应用唯一id表示
        type: 'GET', //请求类型
        url: '', //请求地址
        data: null, //发送给服务器的数据
        component: <div></div>, //数据回调给的组件
        success: (state) => { return state; }, //请求成功后执行的方法
        error: (state) => { return state; } //请求失败后执行的方法
    };

    /**
     * 覆盖默认设置
     */
    for (let key in mySetting) {
        setting[key] = mySetting[key];
    }

    /**
     * 组件入口
     * 
     * @class Index
     * @extends {Component}
     */
    class Index extends Component {
        constructor(props) {
            super(props);
            /**
             * 初始化状态
             * 
             * @param {Object} props
             */
            this.initState = (props) => {
                var {state, location} = props;
                var {pathname, search} = location;
                this.path = pathname + search;

                if (typeof this.action == 'undefined' && location.action == 'PUSH') {
                    this.action = false;
                } else {
                    this.action = true;
                }

                if (typeof state.path[this.path] === 'object' && state.path[this.path].path === this.path && this.action) {
                    this.state = state.path[this.path];
                } else {
                    this.state = merged(state.defaults); //数据库不存在当前的path数据，则从默认对象中复制，注意：要复制对象，而不是引用
                    this.state.path = this.path;
                    this.action = false;
                }

            }

            /**
             * DOM初始化完成后执行回调
             */
            this.redayDOM = () => {



                var {success, error} = this.props.setting;
                var {scrollX, scrollY} = this.state;
                if (this.get) return false; //已经加载过
                window.scrollTo(scrollX, scrollY); //设置滚动条位置
                this.get = new GetNextPage(this.refs.dataload, {
                    url: target + this.getUrl(),
                    data: this.getData(),
                    start: this.start,
                    load: this.load,
                    error: this.error,
                    pageName:'page'
                });
            }

            /**
             * 请求开始
             */
            this.start = () => {
                this.state.loadAnimation = true;
                this.state.loadMsg = '正在加载中...';
                this.props.setState(this.state);
            }
            /**
             * 下一页加载成功
             * 
             * @param {Object} res
             */
            this.load = (res) => {
                var {state } = this;
                var {response,systemDate} = res;
                response = response.searchData;
                if(!response){
                    response = [];
                }
                if(this.props.location.search == '?none'){ //测试代码，强制呈现空列表页面
                    response = [];
                }
                if (response.length < state.rows) {
                    this.get.end();//卸载翻页组件
                    state.nextBtn = false;
                    state.loadMsg = '加载完毕~';
                    if(state.page == 1 && response.length == 0){
                        state.loadMsg = 'none';
                    }
                }
                else {
                    state.nextBtn = true;
                    state.loadMsg = '上拉加载更多';
                }
                Array.prototype.push.apply(state.data, response);
                state.loadAnimation = false;
                state.page = ++state.page;
                this.props.setState(state);
                console.log('systemDate',systemDate)
                this.props.setTime(systemDate);//设置系统时间
                if(!this.props.time){ //没有设置系统时间的话进行设置
                    this.props.setTime(systemDate);//设置系统时间
                }


            }

            /**
             * 请求失败时
             */
            this.error = () => {
                this.state.loadAnimation = false;
                this.state.loadMsg = '加载失败,点击重试~';
                this.props.setState(this.state);
            }

            /**
             * url更改时
             */
            this.unmount = () => {
                this.get.end();
                delete this.get;
                delete this.action;
                this.state.scrollX = window.scrollX; //记录滚动条位置
                this.state.scrollY = window.scrollY;
                this.props.setState(this.state);
            }

            /**
             * 获取ajax 请求url
             * 
             * @returns Object
             */
            this.getUrl = () => {
                var {url} = this.props.setting;
                if (typeof url === 'function') {
                    return url(this.props, this.state);
                } else if (url && typeof url === 'string') {
                    return url;
                } else {
                    return this.props.location.pathname;
                }
            }

            /**
             * 获取要发送给服务器的数据
             * 
             * @returns
             */
            this.getData = () => {
                var {data} = this.props.setting;
                if (typeof data === 'function') {
                    return data(this.props,  this.state);
                } else if (data && typeof data === 'string') {
                    return data;
                } else {
                    return this.props.location.query;
                }
            }
            this.initState(this.props);
        }
        render() {
            var {loadAnimation, loadMsg} = this.state;
            var query = this.props.location.query;
            var queryKeys = Object.keys(query);
            console.log('this.props.setting.component',this.props.setting.component);
            return (
                <div>
                    <this.props.setting.component {...this.props} state={this.state} />
                    {
                        loadMsg == 'none' ? <Empty text="暂无出售车辆" /> : <div ref="dataload" style={{paddingBottom:'98px'}}><DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} /></div>
                    }

                </div>
            );
        }
        /**
         * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
         * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
         * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
         */
        componentDidMount() {
            this.redayDOM();
        }
        /**
         * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用
         */
        componentWillReceiveProps(np) {
            console.log('接收到的props:',np)
            var {location} = np;
            var {pathname, search} = location;
            var path = pathname + search;

            //如果是卖车列表强制卸载
            if (this.path !== path ) {
                this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
            }


            this.initState(np);

        }
        /**
         * 在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
         * 使用该方法可以在组件更新之后操作 DOM 元素。
         */
        componentDidUpdate() {
            this.redayDOM();
        }
        /**
         * 在组件从 DOM 中移除的时候立刻被调用。
         * 在该方法中执行任何必要的清理，比如无效的定时器，
         * 或者清除在 componentDidMount 中创建的 DOM 元素
         */
        componentWillUnmount() {
            this.unmount(); //地址栏已经发生改变，做一些卸载前的处理
        }


    }
    Index.defaultProps = { setting }
    return connect((state) => { return { state: state[setting.id],city: state['User']['city'],phone: state['User']['id'] } }, action())(Index); //连接redux
}


export default Main;