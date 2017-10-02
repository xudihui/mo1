import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import ListMoto from './common/ListMoto';
import { history,dataBrand,dataModel,formatParams } from './common/index';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, GetData,GetNextPage,TopNavBar } from './common/index';
import a2 from '../Images/02.jpg';
import { SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder,Tag } from 'antd-mobile-web';
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
            city:props.city || '全国',
            matchIndex:-1,
            showType:'icon-viewlist'
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
    handlerChange(){
        var temp = this.state.showType;
        this.setState({
            showType:temp == 'icon-viewlist' ? 'icon-viewgallery' : 'icon-viewlist'
        })
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
        var query = this.props.location.query;
        var queryKeys = Object.keys(query);
        console.log('queryKeys,',queryKeys,'query,',query)
        var self = this;
        return (
            <div>
                <TopNavBar title="出售中的车辆"  />
                <div className='topWrap' style={{top:'39px'}}>
                    <div>
                        <div className="match" data-flex="dir:left box:last">
                            <div onClick={(e)=>{this.handlerSetMatch(e,0)}}>排序<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{this.handlerSetMatch(e,1)}}>品牌<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{
                                var target = Object.assign({},query);
                                history.push(`/Choose?${formatParams(target)}`);
                            }}>筛选<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{this.handlerChange()}}><i className={`iconfont ${this.state.showType}`}></i></div>
                        </div>
                        <div className="match_subnav" >
                            <ul style={{display:this.state.matchIndex == 0 ? 'block' : 'none'}}>
                                <li data-query="time" onClick={()=>{
                                    var target = Object.assign({},query,{orderKey:'time'})
                                    history.replace(`/MySellList?${formatParams(target)}`)
                                }}>最新上架</li>
                                <li data-query="priceup" onClick={()=>{
                                    var target = Object.assign({},query,{orderKey:'priceup'})
                                    history.replace(`/MySellList?${formatParams(target)}`)
                                }}>价格升序</li>
                                <li data-query="pricedown" onClick={()=>{
                                    var target = Object.assign({},query,{orderKey:'pricedown'})
                                    history.replace(`/MySellList?${formatParams(target)}`)
                                }}>价格降序</li>

                            </ul>
                            <ul style={{display:this.state.matchIndex == 1 ? 'block' : 'none'}}>
                                {
                                    dataBrand.map((item) =>(
                                        <li onClick={()=>{
                                            var target = Object.assign({},query,{brand:item})
                                            history.replace(`/MySellList?${formatParams(target)}`)
                                        }}>{item}</li>
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
                <div className="tag-container">
                    {
                        queryKeys.map(i =>{
                            console.log('queryKeys',i);

                            return(
                                i == 'brand' || i == 'title' ?
                                    <Tag closable
                                         onClose={() => {
                                             console.log('onClose');
                                         }}
                                         afterClose={(selected) => {
                                             var target = Object.assign({},query);
                                             delete target[i];
                                             history.replace(`/MySellList?${formatParams(target)}`);
                                             location.reload();
                                         }}>
                                        {
                                            (i == 'brand' ? '品牌：' : '关键字：') +  query[i]
                                        }
                                    </Tag> : ''
                            );
                        })
                    }
                </div>
                <div className="index-list-box" style={{paddingTop:queryKeys.join('').indexOf('brand')>-1 || queryKeys.join('').indexOf('title')>-1 ? '104px' : '74px'}}>
                    {
                        data.length > 0 ? <ListMoto {...this.props} edit={true} showType={this.state.showType} list={data} /> : null
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
    url:$extMotorFindPage,
    data: (props, state) => { //发送给服务器的数据
        console.log('$$$$',props)
        var {rows,page } = state;
        var {orderKey,brand,title,area,maxPrice,minPrice,userId} = props.location.query;
        var obj = {rows,page,orderKey,brand,title,area,maxPrice,minPrice,userId};
        return {
            "request":JSON.stringify(obj),
            page
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