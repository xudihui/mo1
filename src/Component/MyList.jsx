import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';

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
        let {title,status,price,mileage,id,createTime,imgUrls,hasAbs} = this.props.data;
        let {showType} = this.props;
        var imgS = showType != 'icon-viewlist' ? {width:'100%',height:'100%',margin:'0',marginBottom:'4px'} : {}
        return (
            <div>
                <Link to={`motoDetail?id=${id}`}>
                    <div className="rowMoto">
                        <div data-flex={`dir:${showType == 'icon-viewlist' ? 'left' : 'top'} main:left`}>
                            <img src={imgUrls.split(',')[0]} alt="icon" data-flex-box="0" style={imgS}/>
                            <div className="rowMotoText" >
                                <div >
                                    {title}
                                    {
                                        status == !'edit' ? <i className="iconfont icon-yirenzheng" style={{color:'#ff5b05',padding:'0 5px',position:'relative',top:'3px'}}></i> : <i className="iconfont icon-information"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 认证中</i>
                                    }
                                </div>
                                <div>
                                    {`${mileage}公里/${createTime}年/${hasAbs!='false'?'ABS':''}`}
                                </div>
                                <div>
                                    ￥<span >{price/100}</span>
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
        return true;
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
                <TopNavBar handlerClick={() => {alert(1)}} />
                <div className='topWrap'>
                    <div>
                        <div className="top"  data-flex="dir:left box:justify" >
                            <div className="logo"></div>
                            <div>
                                <SearchBar onFocus={() => {
                                    var target = Object.assign({},query);
                                    history.push(`/SearchHistory?${formatParams(target)}`);
                                }} placeholder="请输入车系/车型" />
                            </div>
                            <div className="city"  data-flex="main:center cross:center" onClick={() => {}}>{this.props.city || '全国'}
                                <i className="iconfont icon-shouhuodizhi"></i>
                            </div>
                        </div>
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
                                    history.replace(`/?${formatParams(target)}`)
                                }}>最新上架</li>
                                <li data-query="priceup" onClick={()=>{
                                    var target = Object.assign({},query,{orderKey:'priceup'})
                                    history.replace(`/?${formatParams(target)}`)
                                }}>价格升序</li>
                                <li data-query="pricedown" onClick={()=>{
                                    var target = Object.assign({},query,{orderKey:'pricedown'})
                                    history.replace(`/?${formatParams(target)}`)
                                }}>价格降序</li>

                            </ul>
                            <ul style={{display:this.state.matchIndex == 1 ? 'block' : 'none'}}>
                                {
                                    dataBrand.map((item) =>(
                                        <li onClick={()=>{
                                            var target = Object.assign({},query,{brand:item})
                                            history.replace(`/?${formatParams(target)}`)
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
                                             history.replace(`/?${formatParams(target)}`);
                                             location.reload();
                                         }}>
                                        {
                                            query[i]
                                        }
                                    </Tag> : ''
                            );
                        })
                    }
                </div>
                <div className="index-list-box" style={{paddingTop:'104px'}}>
                    {
                        data.length > 0 ? <List {...this.props} showType={this.state.showType} list={data} /> : null
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
        var {orderKey,brand,title,area,maxPrice,minPrice} = props.location.query;
        var obj = {rows,page,orderKey,brand,title,area,maxPrice,minPrice};
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