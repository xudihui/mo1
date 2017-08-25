import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData,GetNextPage,TopNavBar } from './common/index';
import a2 from '../Images/02.jpg';
import {Icon,NavBar,PlaceHolder } from 'antd-mobile-web';

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
    constructor(props) {
        super(props);

    }
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
                <div className="index-list-box" style={{paddingTop:'40px'}}>
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