import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';

import { history,dataBrand,dataModel } from './common/index';
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
var tempFun = null;
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
                <Link to={`motoDetail`}>
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
                </Link>
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
        e && e.nativeEvent.stopImmediatePropagation();
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
    componentDidMount(){
        tempFun = () => {
            this.handlerSetMatch(false,-1);
        };
        document.addEventListener('click',tempFun);

    }
    componentWillUnmount(){
        document.removeEventListener("click",tempFun);
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
                        <div className="top"  data-flex="dir:left box:justify" >
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
                            <div onClick={(e)=>{this.handlerSetMatch(e,2)}}>车型<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{this.handlerSetMatch(e,1)}}>品牌<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{
                                history.push('/Choose')
                            }}>筛选<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div><i className="iconfont icon-viewgallery"></i></div>
                        </div>
                        <div className="match_subnav" >
                            <ul style={{display:this.state.matchIndex == 0 ? 'block' : 'none'}}>
                                <li data-query="1" onClick={this.handleCheck}>智能排序</li>
                                <li data-query="2" onClick={this.handleCheck}>最新上架</li>
                                <li data-query="3" onClick={this.handleCheck}>价格升序</li>
                                <li data-query="4" onClick={this.handleCheck}>价格降序</li>
                            </ul>
                            <ul style={{display:this.state.matchIndex == 1 ? 'block' : 'none'}}>
                                {
                                    dataBrand.map((item) =>(
                                        <li data-query="123321" onClick={this.handleCheck}>{item}</li>
                                        ))
                                }
                            </ul>

                            <ul style={{display:this.state.matchIndex == 2 ? 'block' : 'none'}}>
                                {
                                    dataModel.map((item) =>(
                                        <li data-query="123321" onClick={this.handleCheck}>{item}</li>
                                    ))
                                }
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="index-list-box" style={{paddingTop:'76px'}}>
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
    url:'https://api.github.com/search/repositories?q=javascript&sort=stars',
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