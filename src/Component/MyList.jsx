import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';

import { history } from './common/index';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData,GetNextPage,TopNavBar } from './common/index';
import a2 from '../Images/02.jpg';
import { SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */

/**
 * (循环列表)
 *
 * @class List
 * @extends {Component}
 */
class List extends Component {
    render() {
        var self = this;
        return (
            <ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        return <ListItem {...this.props} key={index} data={item} />
                    })
                }
            </ul>
        );
    }
}

class ListItem extends Component {
    render() {
        let {title,applicationInfo,top,applyInfo,id} = this.props.data;
        console.log('MyList99999999999:',this.props)
        return (
            <div>
                <div className="rowMoto">
                    <div data-flex="dir:left main:left">
                        <img src={a2} alt="icon" data-flex-box="0"/>
                        <div className="rowMotoText" >
                            <div >
                                广东 汕尾市 Honda Dio 系列 Dio
                            </div>
                            <div >
                                5千-1万公里 / ≤2004年 / 250-399cc
                            </div>
                            <div>
                                ￥<span >16956</span>
                            </div>
                        </div>
                    </div>


                </div>
                <div style={{background:'#eee',height:'1px'}}></div>
            </div>
        );
    }
    shouldComponentUpdate(np) {
        return false;
    }
}

class Main extends Component {
    render() {
        var {data, loadAnimation, loadMsg, id} = this.props.state;
        var main = data ? <Content {...this.props}></Content> : <DataLoad loadAnimation={loadAnimation} loadMsg={loadMsg} />;
        return (
            <div>
                {main}
            </div>
        );
    }
}



class Content extends Component {
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
        var self = this;
        var queryData = el.getAttribute('data-query');
        var el_all = el.parentNode.childNodes;
        for(let i in el_all){
            if(!isNaN(i)){
                el_all[i].style.color = '#555';
            }
        }
        el.style.color = '#f30';
        console.log(self)
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
        var {data,loadAnimation} = this.props.state;
        for(let i = 0;i < data.length; i++){
            var keys = Object.keys(data[i]);
            var title = '平安车险';
            if(keys.indexOf('forceInfo') > -1){
                title += '(交强险)';
            }
            else{
                title += '(商业险)';

            }
            var temp = data[i];
            data[i]['title'] = title;
        }
        return (
            <div>
                <TopNavBar handlerClick={() => {alert(1)}} />
                <div className='topWrap'>
                    <div>
                        <div className="top" onClick={(e) => {this.handleClick(e)}} data-flex="dir:left box:justify" >
                            <div className="logo"></div>
                            <div>
                                <SearchBar onFocus={() => {
                                    history.push('/SearchHistory');
                                }} placeholder="请输入车系/车型" />
                            </div>
                            <div className="city"  data-flex="main:center cross:center" onClick={() => {}}>{this.state.city}
                                <i className="iconfont icon-shouhuodizhi"></i>
                            </div>
                        </div>
                        <div className="match" data-flex="dir:left box:last">
                            <div onClick={(e)=>{this.handlerSetMatch(e,0)}}>排序<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{this.handlerSetMatch(e,1)}}>品牌<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{this.handlerSetMatch(e,2)}}>价格<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div><i className="iconfont icon-viewgallery"></i></div>
                        </div>
                        <div className="match_subnav" >
                            <ul style={{display:this.state.matchIndex == 0 ? 'block' : 'none'}}>
                                <li data-query="123321" onClick={this.handleCheck}>12</li>
                                <li data-query="123321" onClick={this.handleCheck}>12</li>
                                <li data-query="123321" onClick={this.handleCheck}>12</li>
                                <li data-query="123321" onClick={this.handleCheck}>1</li>
                            </ul>
                            <ul style={{display:this.state.matchIndex == 2 ? 'block' : 'none'}}>
                                <li data-query="123321" onClick={this.handleCheck}>12</li>
                                <li data-query="123321" onClick={this.handleCheck}>12</li>
                                <li data-query="123321" onClick={this.handleCheck}>12</li>
                                <li data-query="123321" onClick={this.handleCheck}>1</li>
                            </ul>
                            <ul style={{display:this.state.matchIndex == 1 ? 'block' : 'none'}}>

                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="1" data-pinyin="国产">
                                    国产          </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="2" data-pinyin="Aprilia">
                                    Aprilia            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="3" data-pinyin="Benelli">
                                    Benelli            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="4" data-pinyin="BMW">
                                    BMW            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="5" data-pinyin="Buell">
                                    Buell            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="6" data-pinyin="Cagiva">
                                    Cagiva            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="7" data-pinyin="Can-Am">
                                    Can-Am            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="8" data-pinyin="Ducati">
                                    Ducati            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="9" data-pinyin="GASGAS">
                                    GASGAS            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="10" data-pinyin="Harley-Davidson">
                                    Harley-Davidson            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="11" data-pinyin="Honda">
                                    Honda            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="12" data-pinyin="Husaberg">
                                    Husaberg            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="13" data-pinyin="Husqvarna">
                                    Husqvarna            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="14" data-pinyin="Indian">
                                    Indian            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="15" data-pinyin="Kawasaki">
                                    Kawasaki            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="16" data-pinyin="KTM">
                                    KTM            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="17" data-pinyin="Moto Guzzi">
                                    Moto Guzzi            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="18" data-pinyin="MV Agusta">
                                    MV Agusta            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="19" data-pinyin="Piaggio">
                                    Piaggio            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="20" data-pinyin="Suzuki">
                                    Suzuki            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="21" data-pinyin="Triumph">
                                    Triumph            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="22" data-pinyin="Vespa">
                                    Vespa            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="23" data-pinyin="Yamaha">
                                    Yamaha            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="24" data-pinyin="其他">
                                    其他            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="25" data-pinyin="汽车">
                                    汽车            </li>
                                <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" className="carbrand" data-query="26" data-pinyin="VICTORY">
                                    VICTORY            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="index-list-box" style={{paddingBottom:'50px',paddingTop:'76px'}}>
                    {
                        data.length > 0 ? <List {...this.props} list={data} /> : null
                    }
                </div>
            </div>
        );
    }
}
Main.contextTypes = {
    router: React.PropTypes.object.isRequired
}



export default GetNextPage({
    id: 'MyList',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    //url: '/api/v1/topics',
    url:'http://115.236.162.166:18081/ext_smk_activity/insurance/select.ext',
    data: (props, state) => { //发送给服务器的数据

        var {rows,pageNumber } = state;
        var {phone } = props;
        var obj = {"phone":phone,rows,pageNumber};
        return {
            "request":JSON.stringify(obj),
            pageNumber
        }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});

/*
 GetData({
 id: 'MyList',  //应用关联使用的redux
 component: Main, //接收数据的组件入口
 url: '/api/v1/topics',
 data: (props, state) => { //发送给服务器的数据
 var accesstoken = props.User ? props.User.accesstoken : '';
 return { mdrender: state.mdrender, accesstoken }
 },
 success: (state) => { return state; }, //请求成功后执行的方法
 error: (state) => { return state } //请求失败后执行的方法
 });
* */