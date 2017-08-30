import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
import ImageChoose from './ImageChoose';
import { Drawer,List ,Grid,NoticeBar, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import myHead from '../Images/myHead.gif';
const data1 = Array.from(new Array(4)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));
const data2 = Array.from(new Array(1)).map(() => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));

// My 首页 我的个人中心
class My extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{paddingBottom:'2px'}}>
                <div className="myTop">
                     <img className="myImg" src={myHead} />
                     <p>15067555555</p>
                     <i className="iconfont icon-shezhi"></i>
                </div>
                <div className="sub-title">买家中心</div>
                <Grid data={data1}
                      columnNum={4}
                      hasLine={false}
                      renderItem={dataItem => (
                          <div style={{ padding: '0.25rem', }}>
                              <i className="iconfont icon-lichengdixian" ></i>
                              <div style={{ color: '#888', fontSize: '0.28rem', marginTop: '0.24rem' }}>
                                  <span>标题</span>
                              </div>
                          </div>
                      )}
                />
                <div className="sub-title">卖家中心</div>
                <Grid data={data2}
                      columnNum={4}
                      hasLine={false}
                      renderItem={dataItem => (
                          <div style={{ padding: '0.25rem', }}>
                              <i className="iconfont icon-process" ></i>
                              <div style={{ color: '#888', fontSize: '0.28rem', marginTop: '0.24rem' }}>
                                  <span>卖车进度</span>
                              </div>
                          </div>
                      )}
                />

                <List className="my-list"  renderHeader={() => '买家中心'}>

                    <List.Item extra="" arrow="horizontal" onClick={() => {}}>设置</List.Item>
                    <List.Item  arrow="horizontal" onClick={() => {}}>买家中心
                        <Badge text="减" hot style={{ marginLeft: 12 }} />
                        <Badge text="惠" hot style={{ marginLeft: 12 }} />
                        <Badge text="免" hot style={{ marginLeft: 12 }} />
                        <Badge text="反" hot style={{ marginLeft: 12 }} />
                        <Badge text="HOT" hot style={{ marginLeft: 12 }} />
                    </List.Item>
                    <List.Item extra="" arrow="horizontal" onClick={() => {}}>卖家中心</List.Item>
                    {
                        this.props.id && <List.Item extra={this.props.id} arrow="horizontal" onClick={() => {this.props.login('')}}>退出登录</List.Item>

                    }
                    {
                        !this.props.id && <Link to="/login"><List.Item extra="" arrow="horizontal" onClick={() => {}}>登录</List.Item></Link>
                    }

                </List>
                <List className="my-list"  renderHeader={() => '卖家中心'}>
                    <List.Item extra="" arrow="horizontal" onClick={() => {}}>卖车进度</List.Item>
                </List>
                <List className="my-list" >

                    {
                        this.props.id && <List.Item extra={this.props.id} arrow="horizontal" onClick={() => {this.props.login('')}}>退出登录</List.Item>

                    }
                    {
                        !this.props.id && <Link to="/login"><List.Item extra="" arrow="horizontal" onClick={() => {}}>登录</List.Item></Link>
                    }

                </List>
            </div>
        );
    }
}

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
export default My;
