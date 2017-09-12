import React, { Component, PropTypes } from 'react';
import { Result } from 'antd-mobile-web'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage,history } from './common/index';
import { Drawer,List ,Grid,NoticeBar, Modal,WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import myHead from '../Images/myHead.gif';
const alert = Modal.alert;
class Main extends Component {
    constructor(props) {
        super(props);
        console.log('init:',props.state.data);
        var temp = props.state.data;
        function comP(x,y){
            if(JSON.stringify(x) == JSON.stringify(y)){
                return true
            }
            else{
                return false
            }
        }
        for(let i in temp['yy']){
            for(let j in temp['yy']){

                if(i!=j && comP(temp['yy'][i],temp['yy'][j])){
                       // delete temp['yy'][i > j ? j : i]
                }
            }
        }

        this.state = {
            data:props.state.data
        };
    }
    getDateDiff(dateTimeStamp){
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var result = '';
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - dateTimeStamp;
            if(diffValue < 0){return;}
            var monthC =diffValue/month;
            var weekC =diffValue/(7*day);
            var dayC =diffValue/day;
            var hourC =diffValue/hour;
            var minC =diffValue/minute;
            if(monthC>=1){
                result="" + parseInt(monthC) + "月前";
            }
            else if(weekC>=1){
                result="" + parseInt(weekC) + "周前";
            }
            else if(dayC>=1){
                result=""+ parseInt(dayC) +"天前";
            }
            else if(hourC>=1){
                result=""+ parseInt(hourC) +"小时前";
            }
            else if(minC>=1){
                result=""+ parseInt(minC) +"分钟前";
            }else
                result= parseInt(diffValue/minute*60) +"秒前";
            return result;
    }
    componentDidMount(){

    }
    render() {
        var self = this;
        var fp = Object.keys(self.state.data.fp).sort(function(a,b){
            return b-a;
        });
        var yy = Object.keys(self.state.data.yy).sort(function(a,b){
            return b-a;
        });
        var {setData} = this.props;
        var rep = function(el){
            /.*(\d{2})(\d{2})(\d{2})(\d{2})/.test(el);
             return RegExp.$1+'月'+RegExp.$2+'日'+RegExp.$3+'点'+RegExp.$4+'分'
        }
        return (
            <div style={{paddingBottom:'2px'}} className="moto-detail">
                <div className="myTop">
                    <img className="myImg" src={myHead} />
                    <p>
                        欢迎使用乐天对账系统
                    </p>
                </div>
                <div className="sub-title">玉岩账单中心</div>
                <Grid data={yy}
                      columnNum={2}
                      hasLine={true}
                      renderItem={dataItem => (
                              <div style={{ padding: '0.25rem', }} >
                                  <div onClick={() =>{
                                     history.push(`/Fatheryy?type=yy&id=${dataItem}`)
                                  }} >
                                      <i className={'iconfont icon-wodedingdan'}  style={{ fontSize:dataItem == 'base' ? '1.6rem' : '0.8rem' }}></i>
                                      <div style={{ color: '#888', fontSize: '0.38rem', marginTop: '0.04rem' }}>
                                          <span style={{ fontSize: '0.27rem' }}>{dataItem == 'base' ? '基础版本' : this.getDateDiff(dataItem)}</span>
                                      </div>
                                  </div>
                                  <div className="btnWrap" >
                                      {
                                          dataItem != 'base' && <Button className="btn" type="primary"  onClick={() => {
                                              Modal.alert('删除', `确定删除${this.getDateDiff(dataItem)}的版本么???`, [
                                                  { text: '取消', onPress: () => console.log('cancel') },
                                                  { text: '确定', onPress: () => {
                                                      var temp = self.state.data;
                                                      delete temp['yy'][dataItem];
                                                      setData(temp);
                                                  }},
                                              ])

                                          }}>删除账单</Button>
                                      }
                                  </div>
                              </div>

                      )}
                />
                <div className="sub-title">枫坪账单中心</div>
                <Grid data={fp}
                      columnNum={2}
                      hasLine={true}
                      renderItem={dataItem => (
                          <div style={{ padding: '0.25rem', }} >
                              <div onClick={() =>{
                                  history.push(`/Fatheryy?type=fp&id=${dataItem}`)
                              }} >
                                  <i className={'iconfont icon-jingdianwanfa'}  style={{ fontSize:dataItem == 'base' ? '1.6rem' : '0.8rem' }}></i>
                                  <div style={{ color: '#888', fontSize: '0.38rem', marginTop: '0.04rem' }}>
                                      <span style={{ fontSize: '0.27rem' }}>{dataItem == 'base' ? '基础版本' : this.getDateDiff(dataItem)}</span>
                                  </div>
                              </div>
                              <div className="btnWrap" >
                                  {
                                      dataItem != 'base' && <Button className="btn" type="primary"  onClick={() => {
                                          Modal.alert('删除', `确定删除${this.getDateDiff(dataItem)}的版本么???`, [
                                              { text: '取消', onPress: () => console.log('cancel') },
                                              { text: '确定', onPress: () => {
                                                  var temp = self.state.data;
                                                  delete temp['fp'][dataItem];
                                                  setData(temp);
                                              }},
                                          ])

                                      }}>删除账单</Button>
                                  }
                              </div>
                          </div>

                      )}
                />


            </div>
        );
    }
}

export default connect((state) => { return { state: state['FatherData']} }, action())(Main);
