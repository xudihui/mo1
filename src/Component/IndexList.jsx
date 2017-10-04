import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { history } from './common/index';
import { Drawer,List ,NoticeBar, WhiteSpace,Modal,Toast, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import Seller from './Sell';
import My from './My';
import First from './First';
import MyList from './MyList';
var alert = Modal.alert;





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
        sessionStorage.setItem('selectedTab',el || 'Buy');
    }
    renderContent(pageText,m) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {
                    m=='First'&&<First changeTab_={(el) => {this.changeTab(el);}}/>
                }
                {
                    m=='Buy'&&<MyList  {...this.props} />
                }

                {
                    m=='Sell'&&<Seller changeTab_={(el) => {this.changeTab(el); }} />
                }
                {
                    m=='My'&&<My userInfo={this.props.state.userInfo} login={this.props.login} />
                }
            </div>
        );
    }
    componentDidMount(){
        var {myHotList} = this.props;
        var self = this;
        console.log('冷却成都',myHotList)
        if(myHotList.length == 0){
            Tool.post($extMotorFindPage,{isHot:'y',rows:3},function(data){
                if(data.code == '0'){
                    var data_ = data.response.searchData || [];
                    self.props.setHotList(data_);
                    self.setState({
                        open:true
                    })
                }
                else{
                    Toast.offline(data.msg)
                }
            })
        }
        if(sessionStorage.getItem('city') == 'done'){
            return;
        }
        var geolocation;
        var MGeocoder;
        var geocoder;
        var map;
        var {setCity} = this.props;
        //初始化地图
        map = new AMap.Map('amap', {
            resizeEnable: true,
            mapStyle:'fresh',
            zooms: [15, 15],
            //缩放范围
            view: AMap.View2D({
                zoom: 15
            }) //center: [120.195805, 30.231164]
        });
        var onError = function(){
            Toast.offline('定位失败',1)
            sessionStorage.setItem('city','done');
        }

        var onComplete = function(data) {
            var str = ['定位成功'];
            var lnglatXY = new AMap.LngLat(data.position.getLng(), data.position.getLat());
            AMap.service('AMap.Geocoder',function(){//回调函数
                //实例化Geocoder
                geocoder = new AMap.Geocoder({
                    // city: "010"//城市，默认：“全国”
                });
                geocoder.getAddress(lnglatXY, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        var x = result.regeocode.formattedAddress;
                        if(x.indexOf('省') > -1){
                            var y = x.split('省');
                            var city = y[1].split('市')[0] + '市'
                        }
                        else{
                            var city = y[1].split('市')[0] + '市'
                        }
                        if(localStorage.getItem('city') != city){
                            alert('定位提示', '我们发现您正在'+city+'是否立即切换', [
                                { text: '不用了', onPress: () => console.log('cancel')},
                                { text: '立即切换', onPress: () => {
                                    setCity(city)
                                }},
                            ])
                        }
                        sessionStorage.setItem('city','done');
                    }

                });
            })

        }


        let getLocation = function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                //是否使用高精度定位，默认:true
                timeout: 10000,
                //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),
                //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,
                //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'LB'
            });
            map.addControl(geolocation); //不加的话，不能执行zoomToAccuracy
            geolocation.getCurrentPosition(); //触发获取定位的方法
            AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
            AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
        }
        map.plugin('AMap.Geolocation', getLocation);

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

export default connect((state) => {return{state:state['User'],myHotList:state['MyList']['myHotList']}},action())(TabBarExample);