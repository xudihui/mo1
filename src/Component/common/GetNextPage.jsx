import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import { Tool, merged, config } from '../../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, Footer, UserHeadImg,Empty } from './index';

import GetNextPage from './PageCenter';

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
                console.log('props:',props)
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
                    pageName:'pageNumber'
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
                if(this.props.location.search == '?none'){ //测试代码，强制呈现空列表页面
                    response = [];
                }
                for(let i = 0; i < 15; i++){
                    response.push({
                            "id": 39,
                            "flowId": "S20170726170822331_41_6032",
                            "carMsg": {
                                "licenseNo": "粤S*",
                                "cityCode": "441900",
                                "cityName": "东莞市",
                                "noLicenseFlag": "0",
                                "vehicleModelName": "形格INTEGRA 1.8GS轿车",
                                "vehicleCodeId": "XGI1006BTQ",
                                "vehicleFrameNo": "26652145336552265",
                                "engineNo": "54225636555",
                                "firstRegisterDate": "2017-02-02"
                            },
                            "postAddress": {
                                "addresseeCity": "441900",
                                "addresseeDetails": "广东省东莞市分分合合干活好尴尬嘎嘎嘎",
                                "addresseeProvince": "440000"
                            },
                            "applicationInfo": {
                                "applicantName": "滚滚本",
                                "applicantIdType": "01",
                                "applicantIdNo": "362502199104080151",
                                "applicantMobile": "18868342556",
                                "applicantEmail": "18868342556@139.com",
                                "applicantSex": "M",
                                "applicantBirth": "1991-04-08"
                            },
                            "insured": {
                                "insuredName": "滚滚本",
                                "insuredIdType": "01",
                                "insuredIdNo": "362502199104080151",
                                "insuredMobile": "18868342556",
                                "insuredSex": "M",
                                "insuredBirth": "1991-04-08"
                            },
                            "owner": {
                                "ownerName": "滚滚本",
                                "ownerIdType": "001",
                                "ownerIdNo": "362502199104080151",
                                "ownerSex": "M",
                                "ownerBirth": "1991-04-08"
                            },
                            "applyInfo": {
                                "applyNo": "53523003900210926770",
                                "policyNo": "13523003980052357932",
                                "orderNo": "2017000304889324612",
                                "applyTime": "2017-07-26 17:10:20",
                                "policyTime": "2017-07-26 17:14:59",
                                "policyBeginTime": "2017-07-27",
                                "policyEndTime": "2018-07-26",
                                "safeType": "C01",
                                "safePromise": "1) 尊敬的客户：为保障您的利益，请在收到本保险单一周内拨打我公司24小时服务热线95511核实保险单资料。2) 无其它特别约定。",
                                "totalPremium": "15039.30",
                                "applyType": "1"
                            },
                            "bizInfoList": [
                                {
                                    "bizCode": "01",
                                    "bizDesc": "机动车损失保险",
                                    "bizAmount": "368600.00",
                                    "bizPremium": "4867.96"
                                },
                                {
                                    "bizCode": "02",
                                    "bizDesc": "机动车第三者责任保险",
                                    "bizAmount": "1000000.00",
                                    "bizPremium": "2012.00"
                                },
                                {
                                    "bizCode": "03",
                                    "bizDesc": "机动车全车盗抢险",
                                    "bizAmount": "368600.00",
                                    "bizPremium": "1926.14"
                                },
                                {
                                    "bizCode": "04",
                                    "bizDesc": "机动车车上人员责任保险（司机）",
                                    "bizAmount": "50000.00",
                                    "bizPremium": "210.00"
                                },
                                {
                                    "bizCode": "05",
                                    "bizDesc": "机动车车上人员责任保险（乘客）",
                                    "bizAmount": "50000.00",
                                    "bizPremium": "540.00"
                                },
                                {
                                    "bizCode": "08",
                                    "bizDesc": "玻璃单独破碎险",
                                    "bizAmount": "0.00",
                                    "bizPremium": "1254.00"
                                },
                                {
                                    "bizCode": "17",
                                    "bizDesc": "车身划痕损失险",
                                    "bizAmount": "20000.00",
                                    "bizPremium": "1780.00"
                                },
                                {
                                    "bizCode": "18",
                                    "bizDesc": "自燃损失险",
                                    "bizAmount": "368600.00",
                                    "bizPremium": "442.32"
                                },
                                {
                                    "bizCode": "27",
                                    "bizDesc": "不计免赔险(机动车损失保险)",
                                    "bizAmount": "0.00",
                                    "bizPremium": "730.19"
                                },
                                {
                                    "bizCode": "28",
                                    "bizDesc": "不计免赔险(机动车第三者责任保险)",
                                    "bizAmount": "0.00",
                                    "bizPremium": "301.80"
                                },
                                {
                                    "bizCode": "48",
                                    "bizDesc": "不计免赔险(机动车全车盗抢险)",
                                    "bizAmount": "0.00",
                                    "bizPremium": "385.23"
                                },
                                {
                                    "bizCode": "49",
                                    "bizDesc": "不计免赔（车上人员责任保险（司机））",
                                    "bizAmount": "0.00",
                                    "bizPremium": "31.50"
                                },
                                {
                                    "bizCode": "63",
                                    "bizDesc": "机动车损失保险无法找到第三方特约险",
                                    "bizAmount": "0.00",
                                    "bizPremium": "121.70"
                                },
                                {
                                    "bizCode": "75",
                                    "bizDesc": "不计免赔（车身划痕损失险）",
                                    "bizAmount": "0.00",
                                    "bizPremium": "267.00"
                                },
                                {
                                    "bizCode": "77",
                                    "bizDesc": "不计免赔（自燃损失险）",
                                    "bizAmount": "0.00",
                                    "bizPremium": "88.46"
                                },
                                {
                                    "bizCode": "80",
                                    "bizDesc": "不计免赔险（车上人员责任保险（乘客））",
                                    "bizAmount": "0.00",
                                    "bizPremium": "81.00"
                                }
                            ],
                            "insurancePayInfo": {
                                "payDeadLine": "2017-07-26 23:59:59",
                                "paymentType": "0002",
                                "bankCode": "99059222-杭州市民卡支付",
                                "bankName": "杭州市民卡支付",
                                "paySuccessTime": "2017-07-26 17:10:38"
                            }
                        });
                }

                if (response.length < state.limit) {
                    this.get.end();//卸载翻页组件
                    state.nextBtn = false;
                    state.loadMsg = '保单加载完毕~';
                    if(state.pageNumber == 1 && response.length == 0){
                        state.loadMsg = 'none';
                    }
                }
                else {
                    state.nextBtn = true;
                    state.loadMsg = '上拉加载更多';
                }
                Array.prototype.push.apply(state.data, response);
                state.loadAnimation = false;
                state.pageNumber = ++state.pageNumber;
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
                this.state.loadMsg = '加载失败';
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
            console.log('this.props.setting.component',this.props.setting.component);
            return (
                <div>

                    <this.props.setting.component {...this.props} state={this.state} />
                    {
                        loadMsg == 'none' ? <Empty text="无保单信息" /> : <div ref="dataload"><DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} /></div>
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
            if (this.path !== path) {
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
    return connect((state) => { return { state: state[setting.id],time: state['User']['time'],phone: state['User']['id'] } }, action())(Index); //连接redux
}


export default Main;