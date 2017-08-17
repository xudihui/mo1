import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData } from './common/index';

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
        console.log(self.props);
        return (
            <ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        return <ListItem key={index} key_={index} data={item} />
                    })
                }
            </ul>
        );
    }
}

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {toggle: true};
    }
    //判断当前元素序列位置
    getIndex(el){
        var h3_arr = el.parentNode.parentNode.querySelectorAll('h3');
        for(let i in h3_arr){
            if(h3_arr[i] == el){
                return i
            }
        }
    }
    //伸缩菜单项
    toggle_(){
        if(this.getIndex(this.refs.h3) == 0){
            return;
        }else{
            this.setState({
                toggle:!this.state.toggle
            });
        }
    }
    render() {
        let {proName,userName,time,status,id,contents,type} = this.props.data;
        let showType = (type) => {
            if(type){
                return(
                    <div className='detailLine' data-flex="dir:left" >
                        <span >{type}</span>
                    </div>
                )
            }
        }
        return (
            <li className={"detailList " + this.state.toggle }>
                <h3 data-flex="main:justify" className={status} onClick={ this.toggle_.bind(this) } ref="h3">
                    <span>{proName}</span>
                    <span>
                    { this.props.key_ == 0 ? (status ? '已生效' : '未生效'): <i className="icon iconfont icon-arrow-right"></i>}
                    </span>
                </h3>
                <div className="content">
                 <div className="line"></div>
                {showType(type)}
                {
                    contents.map((item,index) => {  //输出保单具体项目
                      return (
                          <div className='detailLine' data-flex="main:justify" key={index}>
                              <span >{item.key}</span>
                              <span >{item.value}</span>
                          </div>
                      )
                    })
                }
                </div>
            </li>
        );
    }
    shouldComponentUpdate(np) { //当setState的时候，是否触发render；
        return true;
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
        this.state = {a:222};
    }
    render() {
        console.log('myDetail',this.props);
        var data = [
            {
                "id": "58d0fb3517f61387400b7e15",
                "proName": "平安车险(商业险)",
                "userName": "徐三狗",
                "time": "2017.06.22-2018.03.11",
                "status":true,
                "type":'平安财产险承保',
                "contents":[
                    {"key":"投保单号","value":"234324324324324324"},
                    {"key":"保单号","value":"31413123213123123"},
                    {"key":"订单号","value":"123123123123312"},
                    {"key":"投保单类型","value":"新保"},
                    {"key":"投保日期","value":"2017-06-09"}
                ]
            },
            {
                "id": "58d0fb3517f61387400b7e15",
                "proName": "投保人信息",
                "userName": "徐三狗",
                "time": "2017.06.22-2018.03.11",
                "status":true,
                "contents":[
                    {"key":"投保单号","value":"234324324324324324"},
                    {"key":"保单号","value":"31413123213123123"},
                    {"key":"订单号","value":"123123123123312"},
                    {"key":"投保单类型","value":"新保"},
                    {"key":"投保日期","value":"2017-06-09"}
                ]
            }
        ];
        for(let i = 0;i < 4;i++){
            data.push(
                {
                    "id": "58d0fb3517f61387400b7e15",
                    "proName": "平安车险",
                    "userName": "徐三狗",
                    "time": "2017.06.22-2018.03.11",
                    "status":true,
                    "contents":[
                        {"key":"投保单号","value":"234324324324324324"},
                        {"key":"保单号","value":"31413123213123123"},
                        {"key":"订单号","value":"123123123123312"},
                        {"key":"投保单类型","value":"新保"},
                        {"key":"投保日期","value":"2017-06-09"}
                    ]
                })
        }
        return (
            <div className="index-list-box" >
                {
                    data.length > 0 ? <List list={data} /> : null
                }
            </div>
        );
    }
}
Main.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default GetData({
    id: 'MyDetail',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        return '/api/v1/topic/' + (props.params.id || '');
    },
    data: (props, state) => { //发送给服务器的数据
        var accesstoken = props.User ? props.User.accesstoken : '';
        return { mdrender: state.mdrender, accesstoken }
    },
    success: (state) => { return state; }, //请求成功后执行的方法
    error: (state) => { return state } //请求失败后执行的方法
});



