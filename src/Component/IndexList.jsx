import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { history } from './common/index';
import { Drawer,List ,NoticeBar, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import Seller from './Sell';
import Buy from './Buy';
import My from './My';
import First from './First';
import MyList from './MyList';



import Rows from './Rows';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';





class TabBarExample extends Component {
    constructor(props) {
        super(props);
        this.changeTab.bind(this);
        this.state = {
            selectedTab: props.location.query['type'] || sessionStorage.getItem('selectedTab') || 'Buy',
            hidden: false
        };
    }
    changeTab(el){
        this.setState({selectedTab:el || 'Buy'});
    }
    renderContent(pageText,m) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {
                    m=='First'&&<First changeTab={(el) => {this.changeTab(el)}}/>
                }
                {
                    m=='Buy'&&<MyList  {...this.props} />
                }

                {
                    m=='Sell'&&<Seller />
                }
                {
                    m=='My'&&<My id={this.props.state.id} login={this.props.login} />
                }
            </div>
        );
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    icon={<i className="iconfont icon-zhuye"></i>}
                    selectedIcon={<i className="iconfont icon-zhuye"></i>}
                    title="首页"
                    key="首页"
                    selected={this.state.selectedTab === 'First'}
                    onPress={() => {
                        sessionStorage.setItem('selectedTab','First');
                        this.setState({
                            selectedTab: 'First',
                        });
                    }}
                >
                    {this.renderContent('首页','First')}
                </TabBar.Item>

                <TabBar.Item
                    title="买车"
                    key="买车"
                    icon={
                        <i className="iconfont icon-zuche"></i>
                    }
                    selectedIcon={
                        <i className="iconfont icon-zuche"></i>
                    }
                    selected={this.state.selectedTab === 'Buy'}
                    onPress={() => {
                        sessionStorage.setItem('selectedTab','Buy');
                        this.setState({
                            selectedTab: 'Buy',
                        });
                    }}
                >
                    {this.renderContent('生活','Buy')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<i className="iconfont icon-tuikuan"></i>}
                    selectedIcon={<i className="iconfont icon-tuikuan"></i>}
                    title="卖车"
                    key="卖车"
                    selected={this.state.selectedTab === 'Sell'}
                    onPress={() => {
                        sessionStorage.setItem('selectedTab','Sell');
                        this.setState({
                            selectedTab: 'Sell',
                        });
                    }}
                >
                    {this.renderContent('卖车','Sell')}
                </TabBar.Item>
                <TabBar.Item

                    icon={<i className="iconfont icon-geren"></i>}
                    selectedIcon={<i className="iconfont icon-geren"></i>}
                    title="我的"
                    key="我的"
                    selected={this.state.selectedTab === 'My'}
                    onPress={() => {
                        sessionStorage.setItem('selectedTab','My');
                        this.setState({
                            selectedTab: 'My',
                        });
                    }}
                >
                    {this.renderContent('我的','My')}
                </TabBar.Item>
            </TabBar>
        );
    }
}


class Main_ extends Component {
    constructor(props) {
        super(props);
        this.state = {token:'',token_:Tool.getQueryString('token'),'links':{}}
    }
    componentDidMount(){
        Tool.post('http://115.236.162.166:18081/ext_smk_activity/baseUser/getUserIdByToken.ext',
            //{request:JSON.stringify({accessToken:Tool.getQueryString('token')})},
            {request:JSON.stringify({accessToken:'0AE2BD2CB088451D188970E48733BE066B2A6A82B5D35802FE81A2FFE5519E461FB903139E41D022F82DA482585AE7D24485950A235B2EBB22EB2F3FA6B1D582968620D9405D813E'})},

            function(data){
                this.setState({token:JSON.stringify(data)});
                this.props.setTime(data.systemDate);//设置系统时间
                Tool.post('http://115.236.162.166:18081/ext_smk_activity/insurance/getCarInUrlMsg.ext',
                    {request:JSON.stringify({"userId":data.response.userId})},
                   // {request:JSON.stringify({"userId":'13666666666'})},
                    function(data){
                       var temp = data.response;
                       this.setState({links:temp});
                    }.bind(this),
                    function(){
                        alert('error');
                    })
            }.bind(this),
            function(){
               alert('error');
            })
    }
    render() {
        var data = this.props.state;
        return (
            <div className="index-list-box">
                <div className="car"></div>
            </div>
        );
    }
}

export default connect((state) => {return{state:state['User']}},action())(TabBarExample);