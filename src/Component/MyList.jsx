import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import ListMoto from './common/ListMoto';
import { history,dataBrand,dataModel,formatParams,dataCityNo } from './common/index';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, GetData,GetNextPage,TopNavBar } from './common/index';
import a2 from '../Images/02.jpg';
import { SearchBar,Badge, Button,Toast,Picker,PlaceHolder,Tag } from 'antd-mobile-web';

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

var keys_dataCityNo = Object.keys(dataCityNo);
var arr_dataCityNo = [];
var m = 0;
for(let i in keys_dataCityNo){
    if(isNaN(i)){
        continue;
    }
    var temp = {
        label:dataCityNo[keys_dataCityNo[i]],
        value:keys_dataCityNo[i],
        children:[]
    }
    if(keys_dataCityNo[i].indexOf('0000') > -1){
        if(m != 0){
            arr_dataCityNo.push(m);
        }
        m = {
            label:dataCityNo[keys_dataCityNo[i]],
            value:keys_dataCityNo[i],
            children:[]
        }
    }else{
        var temp = {
            label:dataCityNo[keys_dataCityNo[i]],
            value:keys_dataCityNo[i]
        }
        m.children.push(temp)
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
            showType:'icon-viewlist',
            visible:false
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
        var {setCity} = this.props;
        var query = this.props.location.query;
        var queryKeys = Object.keys(query);
        console.log('queryKeys,',queryKeys,'query,',query)
        var self = this;
        return (
            <div>
                <div className='topWrap'>
                    <div>
                        <div className="top"  data-flex="dir:left box:last" >
                            <div>
                                <SearchBar onFocus={() => {
                                    var target = Object.assign({},query);
                                    history.push(`/SearchHistory?${formatParams(target)}`);
                                }} placeholder="请输入车系/车型" />
                            </div>
                            <Picker
                                visible={this.state.visible}
                                data={arr_dataCityNo}
                                value={['110000', '110100']}
                                onChange={v =>{
                                    setCity(dataCityNo[v[1]]);
                                    Toast.success('已切换至'+dataCityNo[v[1]],1)
                                } }
                                onOk={() =>{
                                    this.setState({ visible: false });
                                }}
                                onDismiss={() => this.setState({ visible: false })}
                                extra="请选择(可选)"
                                cols = '2'
                            >
                                <div className="city"  data-flex="main:center cross:center" onClick={() => this.setState({ visible: true })}>{this.props.city||'全国'}
                                    <i className="iconfont icon-shouhuodizhi"></i>
                                </div>
                            </Picker>
                        </div>
                        <div className="match" data-flex="dir:left box:last">
                            <div onClick={(e)=>{this.handlerSetMatch(e,0)}}>排序<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{this.handlerSetMatch(e,1)}}>品牌<i className="iconfont icon-xiangxiajiantou"></i></div>
                            <div onClick={(e)=>{this.handlerSetMatch(e,2)}}>车型<i className="iconfont icon-xiangxiajiantou"></i></div>
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
                                        <li onClick={()=>{
                                            var target = Object.assign({},query,{motorType:item})
                                            history.replace(`/?${formatParams(target)}`)
                                        }}>{item}</li>
                                    ))
                                }
                            </ul>


                        </div>
                    </div>
                </div>
                {

                }
                <div style={{height:(queryKeys.indexOf('brand')>-1 || queryKeys.indexOf('title')>-1 || queryKeys.indexOf('motorType')>-1 || queryKeys.indexOf('isHot')>-1  || queryKeys.indexOf('urgent')>-1  || queryKeys.indexOf('maxMileage')>-1  ) ? '90px' : '48px'}}></div>
                <div className="tag-container">
                    {
                        queryKeys.map(i =>{
                            console.log('queryKeys',i);

                            return(
                                i == 'brand' || i == 'title' || i == 'motorType'|| i == 'isHot' || i == 'urgent' || i == 'maxMileage' ?
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
                                            i == 'brand' && '品牌' + ':'+query[i]
                                        }
                                        {
                                            i == 'title' && '关键字' + ':'+query[i]
                                        }
                                        {
                                            i == 'motorType' && '车型' + ':'+query[i]
                                        }
                                        {
                                            i == 'urgent' && '降价急售'
                                        }
                                        {
                                            i == 'isHot' && '好车推荐'
                                        }
                                        {
                                            (i == 'maxMileage' && query[i]==3000) && '准新车'
                                        }

                                    </Tag> : ''
                            );
                        })
                    }
                </div>
                <div className="index-list-box" style={{paddingTop:'34px'}}>
                    {
                        data.length > 0 ? <ListMoto {...this.props} showType={this.state.showType} list={data} /> : null
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
        var {orderKey,brand,title,area,maxPrice,minPrice,userId,motorType,urgent,isHot,maxMileage} = props.location.query;
        var obj = {rows,page,orderKey,brand,title,area,maxPrice,minPrice,userId,motorType,urgent,isHot,maxMileage};
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