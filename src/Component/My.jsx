import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
import ImageChoose from './ImageChoose';
import { Drawer,List ,Grid,NoticeBar, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import myHead from '../Images/myHead.gif';
const data1 = [
    {
        title:'买到车辆',
        icon:'icon-xiangqing',
    },
    {
        title:'砍价记录',
        icon:'icon-5yongjinzhekou',
    },
    {
        title:'降价提醒',
        icon:'icon-tongzhi',
    },
    {
        title:'收藏车辆',
        icon:'icon-shoucang1',
    },
    {
        title:'浏览记录',
        icon:'icon-jingdianwanfa',
    },
    {
        title:'订阅车源',
        icon:'icon-bangdan',
    }
];
const data2 = [
    {
        title:'已售车辆',
        icon:'icon-wancheng',
        url:"/help"
    },
    {
        title:'在售车辆',
        icon:'icon-weiwancheng',
        url:"/MySelling"
    }
];

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
                    <p>
                    {
                        this.props.id && this.props.id
                    }
                    {
                       !this.props.id && <Link to="/login">立即登录</Link>
                    }
                    </p>
                     <i className="iconfont icon-shezhi"></i>
                </div>
                <div className="sub-title">买家中心</div>
                <Grid data={data1}
                      columnNum={4}
                      hasLine={false}
                      renderItem={dataItem => (
                          <Link to={`/myOwn?type=${dataItem.title}&icon=${dataItem.icon}`}>
                              <div style={{ padding: '0.25rem', }}>
                                  <i className={'iconfont '+dataItem.icon} ></i>
                                  <div style={{ color: '#888', fontSize: '0.28rem', marginTop: '0.24rem' }}>
                                      <span>{dataItem.title}</span>
                                  </div>
                              </div>
                          </Link>
                      )}
                />
                <div className="sub-title">卖家中心</div>
                <Grid data={data2}
                      columnNum={4}
                      hasLine={false}
                      renderItem={dataItem => (
                          <Link to={dataItem.url}>
                              <div style={{ padding: '0.25rem', }}>
                                  <i className={'iconfont '+dataItem.icon} ></i>
                                  <div style={{ color: '#888', fontSize: '0.28rem', marginTop: '0.24rem' }}>
                                      <span>{dataItem.title}</span>
                                  </div>
                              </div>
                          </Link>
                      )}
                />

                <List className="my-list"  >
                    <List.Item  arrow="horizontal" onClick={() => {}}>优惠活动
                        <Badge text="减" hot style={{ marginLeft: 12 }} />
                        <Badge text="惠" hot style={{ marginLeft: 12 }} />
                        <Badge text="免" hot style={{ marginLeft: 12 }} />
                        <Badge text="反" hot style={{ marginLeft: 12 }} />
                        <Badge text="HOT" hot style={{ marginLeft: 12 }} />
                    </List.Item>
                    <List.Item extra="" arrow="horizontal" onClick={() => {location.href='tel:15067425400'}}>联系客服</List.Item>
                    <Link  to="/help">
                        <List.Item extra="" arrow="horizontal" onClick={() => {}}>关于我们</List.Item>
                    </Link>
                </List>
                <div className="btnWrap" style={{paddingBottom:'50px'}}>
                    {
                        this.props.id && <Button className="btn" type="primary"  onClick={() => {this.props.login('')}}>退出登录</Button>
                    }
                </div>
            </div>
        );
    }
}

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
export default My;
