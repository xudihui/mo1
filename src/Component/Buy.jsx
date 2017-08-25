import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { history } from './common/index';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData,GetNextPage,TopNavBar } from './common/index';
import { SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import Rows from './Rows';
import MyList from './MyList';
/**
 * 买车模块入口
 *
 * @param {Object} mySeting
 * @returns
 */


class Main extends Component {
    constructor(props) {
        super(props);
        this.handleCheck.bind(this);
        this.state = {
            open: false,
            city:'全国',
            matchIndex:-1,
            matchContent:[
                <ul>
                    <li data-query="123321" onClick={this.handleCheck}>12</li>
                    <li data-query="123321" onClick={this.handleCheck}>12</li>
                    <li data-query="123321" onClick={this.handleCheck}>12</li>
                    <li data-query="123321" onClick={this.handleCheck}>1</li>
                </ul>,
                <ul>
                    <li>12</li>
                    <li>12</li>
                    <li>12</li>
                    <li>1</li>
                </ul>,
                <ul>
                    <li>134</li>
                    <li>14</li>
                    <li>14</li>
                    <li>1</li>
                </ul>
            ]
        }
    }
    handlerSetMatch(e,index){
        var index_ = this.state.matchIndex;
        if(index_ != -1){
            index = -1;
        }
        console.log(index,index_)
        this.setState({matchIndex:index});
        if(e){
            e.nativeEvent.stopImmediatePropagation();
        }
    }
    handleCheck(e){
        var el = e.currentTarget;
        var queryData = el.getAttribute('data-query');
        var el_all = el.parentNode.childNodes;
        for(let i in el_all){
            if(!isNaN(i)){
                el_all[i].style.color = '#555';
            }
        }
        el.style.color = '#f30';
        this.handlerSetMatch(false,-1);
        //doQuery width queryData

    }
    handleClick(e){
// 阻止合成事件与最外层document上的事件间的冒泡
        e.nativeEvent.stopImmediatePropagation();
    }
    componentDidMount(){
        var self = this;
        document.addEventListener('click', () => { //遮罩类的组件最好把事件都绑定在doc上进行阻止冒泡
            console.log('document');
            self.handlerSetMatch(false,-1);
        });
    }

    render() {
        return (
            <div>
                <div className='topWrap'>
                <div className="top" onClick={(e) => {this.handleClick(e)}} >
                    <div className="logo"></div>
                    <div>
                    </div>
                    <div className="city"  data-flex="main:center cross:center" onClick={() => {}}>{this.state.city}
                        <i className="iconfont icon-shouhuodizhi"></i>
                    </div>
                </div>
                <div>
                    <SearchBar onFocus={() => {
                        history.push('/MyList');
                    }} placeholder="请输入车系/车型" />
                    <div className="match" data-flex="dir:left box:last">
                        <div onClick={(e)=>{this.handlerSetMatch(e,0)}}>排序<i className="iconfont icon-xiangxiajiantou"></i></div>
                        <div onClick={(e)=>{this.handlerSetMatch(e,1)}}>品牌<i className="iconfont icon-xiangxiajiantou"></i></div>
                        <div onClick={(e)=>{this.handlerSetMatch(e,2)}}>价格<i className="iconfont icon-xiangxiajiantou"></i></div>
                        <div><i className="iconfont icon-viewgallery"></i></div>
                    </div>

                    <div className="match_subnav" onClick={(e) => {this.handleClick(e)}} >
                        <ul style={{display:this.state.matchIndex == 0 ? 'block' : 'none'}}>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>1</li>
                        </ul>
                        <ul style={{display:this.state.matchIndex == 1 ? 'block' : 'none'}}>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>1</li>
                        </ul>
                        <ul style={{display:this.state.matchIndex == 2 ? 'block' : 'none'}}>

                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="1" data-pinyin="国产">
                                国产          </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="2" data-pinyin="Aprilia">
                                Aprilia            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="3" data-pinyin="Benelli">
                                Benelli            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="4" data-pinyin="BMW">
                                BMW            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="5" data-pinyin="Buell">
                                Buell            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="6" data-pinyin="Cagiva">
                                Cagiva            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="7" data-pinyin="Can-Am">
                                Can-Am            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="8" data-pinyin="Ducati">
                                Ducati            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="9" data-pinyin="GASGAS">
                                GASGAS            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="10" data-pinyin="Harley-Davidson">
                                Harley-Davidson            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="11" data-pinyin="Honda">
                                Honda            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="12" data-pinyin="Husaberg">
                                Husaberg            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="13" data-pinyin="Husqvarna">
                                Husqvarna            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="14" data-pinyin="Indian">
                                Indian            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="15" data-pinyin="Kawasaki">
                                Kawasaki            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="16" data-pinyin="KTM">
                                KTM            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="17" data-pinyin="Moto Guzzi">
                                Moto Guzzi            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="18" data-pinyin="MV Agusta">
                                MV Agusta            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="19" data-pinyin="Piaggio">
                                Piaggio            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="20" data-pinyin="Suzuki">
                                Suzuki            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="21" data-pinyin="Triumph">
                                Triumph            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="22" data-pinyin="Vespa">
                                Vespa            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="23" data-pinyin="Yamaha">
                                Yamaha            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="24" data-pinyin="其他">
                                其他            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="25" data-pinyin="汽车">
                                汽车            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="26" data-pinyin="VICTORY">
                                VICTORY            </li>
                        </ul>
                    </div>
                </div>
                </div>
                <div  style={{paddingBottom:'50px',paddingTop:'120px'}}>

                </div>

            </div>
        );
    }
}
export default connect((state) => { return { state: state['MyList']} }, action())(Main);
