import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { history } from './common/index';
import { Toast,List ,Grid,NoticeBar, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import myHead from '../Images/head.svg';
const data1 = [
    /*
    {
        title:'买到车辆',
        icon:'icon-xiangqing',
    },
    */
    {
        title:'砍价记录',
        icon:'icon-5yongjinzhekou',
    },
    {
        title:'降价提醒',
        icon:'icon-tongzhi',
    },
    {
        title:'浏览记录',
        icon:'icon-jingdianwanfa',
    },
    {
        title:'收藏车源',
        icon:'icon-bangdan',
    }
];
const data2 = [
    /*
    {
        title:'已售车辆',
        icon:'icon-wancheng',
        url:"/steps"
    },
    */
    {
        title:'在售车辆',
        icon:'icon-weiwancheng',
        url:`/MySellList`
    }
];

// My 首页 我的个人中心
class My extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        var {userInfo} = this.props;
        return (
            <div style={{paddingBottom:'2px'}}>
                <div className="myTop">
                     <img className="myImg animated jackInTheBox" src={userInfo.headUrl || myHead} style={{marginTop:!userInfo ? '.45rem' : '.3rem' }} />
                    <p>

                    {
                        userInfo && <span>
                            <p style={{marginLeft:'1.5em'}} onClick={()=>{
                                history.push('/mycenter');
                            }}>{(JSON.parse(localStorage.userInfo).userName) || '未取名'}<i style={{paddingLeft:'.5em'}}  className="iconfont icon-edit"></i></p>
                            {JSON.parse(localStorage.userInfo).sign || JSON.parse(localStorage.userInfo).tel}
                        </span>
                    }
                    {
                       !userInfo && <Link to="/login">立即登录</Link>
                    }
                    </p>
                        <i className="iconfont icon-shezhi" onClick={
                            ()=>{
                                if(!userInfo){
                                    return Toast.offline('请先点击头像下方的登录按钮，进行登录/注册！',4)
                                }
                                history.push('/mysetting');
                            }
                        }></i>

                </div>
                <div className="sub-title sub-title-no">买家中心</div>
                <Grid data={data1}
                      columnNum={4}
                      hasLine={false}
                      renderItem={dataItem => (
                          <Link to={`/myown?type=${dataItem.title}&icon=${dataItem.icon}`}>
                              <div style={{ padding: '0.25rem', }}>
                                  <i className={'iconfont '+dataItem.icon} ></i>
                                  <div style={{ color: '#888', fontSize: '0.28rem', marginTop: '0.24rem' }}>
                                      <span>{dataItem.title}</span>
                                  </div>
                              </div>
                          </Link>
                      )}
                />
                <div style={{marginTop:'.5rem'}} className="sub-title sub-title-no">卖家中心</div>
                <Grid data={data2}
                      columnNum={4}
                      hasLine={false}
                      renderItem={dataItem => (
                          <Link to={dataItem.url+`?userId=${this.props.state.userInfo.id}`}>
                              <div style={{ padding: '0.25rem', }}>
                                  <i className={'iconfont '+dataItem.icon} ></i>
                                  <div style={{ color: '#888', fontSize: '0.28rem', marginTop: '0.24rem' }}>
                                      <span>{dataItem.title}</span>
                                  </div>
                              </div>
                          </Link>
                      )}
                />
            </div>
        );
    }
}

export default connect((state) => { return { state: state['User']} }, action())(My);
