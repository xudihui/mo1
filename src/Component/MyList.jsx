import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData,GetNextPage } from './common/index';

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
        console.log('MyItem0000:',this.props)
        return (
            <li>
                <Link to={`/my/info/${applyInfo.applyNo}`}>
                    <div className={`con userList status-${top}`} data-flex="main:justify">
                        <p data-flex="dir:top ">
                            <span className="name">{title}</span>
                            <span className="count">{applicationInfo.applicantName}</span>
                            <span className="time">保障期限:{applyInfo.policyBeginTime.replace(/\-/g,'.') + '-' + applyInfo.policyEndTime.replace(/\-/g,'.')}</span>
                        </p>
                        <p data-flex="main:center cross:top" data-flex-box="0">
                                <span className="status">
                                    {
                                        this.props.time && parseInt(this.props.time.replace(/\-/g,'')) - parseInt(applyInfo.policyEndTime.replace(/\-/g,'')) > -1 ? '已失效' : '已生效'
                                    }
                                </span>
                        </p>
                    </div>
                </Link>
            </li>
        );
    }
    shouldComponentUpdate(np) {
        return false;
    }
}


class ListItem_bak extends Component {
    render() {
        let {proName,userName,time,status,id} = this.props.data;
        return (
            <li>
                <Link to={`/my/info`}>
                    <div className={`con userList status-${status}`} data-flex="main:justify">
                        <p data-flex="dir:top ">
                            <span className="name">{proName}</span>
                            <span className="count">{userName}</span>
                            <span className="time">保障期限:{time}</span>
                        </p>
                        <p data-flex="main:center cross:top" data-flex-box="0">
                                <span className="status">
                                    {status ? '已生效' : '已失效'}
                                </span>
                        </p>
                    </div>
                </Link>
            </li>
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
            <div className="index-list-box">
                {
                    data.length > 0 ? <List {...this.props} list={data} /> : null
                }
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