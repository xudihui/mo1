import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { history,TopNavBar } from './common/index';
import { Button,PlaceHolder } from 'antd-mobile-web';
import ListMoto from './common/ListMoto';
import { Tool} from '../Tool';

import Rows from './Rows';
/**
 * 砍价，降价，收藏，浏览，订阅记录
 *
 * @param {Object} mySeting
 * @returns
 */
//banner滚动图
class Main extends Component {
    constructor(props) {
        super(props);
        this.handlerInit.bind(this);
        this.icon = this.props.location.query.icon;
        this.type = this.props.location.query.type;

        this.state = {
            data:this.type == '浏览记录' ? this.props.state.myViewList : []
            }
    }
    queryData(url){
        var self = this;
        Tool.post(url,{rows:1000},function(data){
            if(data.code == '0'){
                var data_ = data.response.searchData;
                self.setState({data:data_});
                self.props.setOwn(data_);
            }
            else{
                Toast.offline(data.msg)
            }
        })
    }
    handlerInit(){
        var text = '';
        this.queryUrl = '';
        var id = this.type;
        console.log('aaaa:' + id);
        switch(id)
        {
            case '买到车辆':
                text = '哎呀，您还没有挑选心仪的爱车';
                break;
            case '砍价记录':
                this.queryUrl = $extEvaluateFindPageByUser;
                text = '您太忙了，还没去砍价哦';
                break;
            case '降价提醒':
                text = '暂无降价信息，快去选车吧！';
                break;
            case '收藏车辆':
                this.queryUrl = $extCollectFindPage;
                text = '暂无收藏车辆，快去选车吧！';
                break;
            case '浏览记录':
                text = '哎呀，您居然没有浏览过车辆！';
                break;
            case '订阅车源':
                text = '哎呀，您还没有订阅心仪的爱车';
                break;
            default:
                text = '****';
        }
        return(
            <span>
                <i className={'iconfont '+this.icon} ></i>
                {text}
            </span>
        ) ;

    }
    componentDidMount() {
        document.body.scrollTop = 0;
        if(this.queryUrl){
            this.queryData(this.queryUrl);
        }


    }
    render() {
        var from = 'own';
        if(this.type=='浏览记录'){
            from = 'myViewList';
        }
        return (
            <div className="my-own">
                <TopNavBar title={this.type} />
                {
                    this.state.data.length > 0 && <ListMoto from={from} showType="icon-viewlist" list={this.state.data} />
                }
                {
                    this.state.data.length == 0 && <div><p className="none">
                        {this.handlerInit()}
                    </p>
                        <div className="btnWrap">
                        <Button className="btn" type="primary"  onClick={() => {
                        sessionStorage.setItem('selectedTab','Buy');
                        history.push('/')}}>立即去逛逛</Button>
                        </div>
                    </div>
                }
                {
                    Object.keys(this.props.state.path).length > 0 && <div><div className="sub-title">为您推荐</div><ListMoto showType="icon-viewlist" list={this.props.state.path[Object.keys(this.props.state.path)[0]]['data'].slice(0,5) || []} /></div>
                }
            </div>
        );
    }
}
export default connect((state) => { return { state: state['MyList']} }, action())(Main);
