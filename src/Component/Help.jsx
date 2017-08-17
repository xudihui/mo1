import React, { Component, PropTypes } from 'react';
import { WingBlank, WhiteSpace, Button, NoticeBar, Icon, Accordion, List  } from 'antd-mobile-web'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage } from './common/index';
const style = `
    .collapse-anim {
      transition: height .3s ease-out;
    }
    .am-accordion .am-accordion-item .am-accordion-content .am-accordion-content-box    {
      padding:.3rem;
    }

`;
const data = [
    {
        title:'什么是杭州通电子公交卡？',
        content:'杭州通电子公交卡是在线电子钱包账户，区别于传统的线下卡电子钱包账户，可以实现在线充值，实时到账，并通过二维码方式实现公交扫码乘车。'
    },
    {
        title:'什么是先乘车后付款？',
        content:'先乘车后付款是支付宝为公交场景定制的一种刷二维码乘车的服务。开通后用户无需充值，可先刷码上车，之后再由公交公司进行扣款。'
    },
    {
        title:'杭州哪些区域支持杭州通电子公交卡扫码乘车？',
        content:'仅限杭州市主城区使用，但是公交车刷码机具是按批次、按城区逐步更新，未更新机具区域的用户还请耐心等待。'
    },
    {
        title:'杭州通电子公交卡有什么使用门槛？',
        content:'开通杭州通电子公交卡需要在线完成实名认证，一位用户只可领取一张杭州通电子公交卡，该卡关联个人实名信息。'
    },
    {
        title:'如果不想用了可以退卡和退款吗？',
        content:'用户可以在市民卡APP客户端或支付宝客户端发起退卡申请，10个工作日内待系统审核完用户账单后完成退款。'
    },
    {
        title:'注意事项',
        content:'用户使用杭州通电子公交卡乘坐公交时应遵循《杭州城市公共客运管理条例》。在使用过程中遇到问题，可与杭州市民卡服务中心联系，客服热线：96225。'
    }
];
class Main extends Component {
    render() {
        return (
            <div >
                <style dangerouslySetInnerHTML={{ __html: style }}></style>
                <Accordion defaultActiveKey="0" accordion  openAnimation={{}} className="my-accordion" >
                    {
                        data.map((i,index) => {
                            return(
                                <Accordion.Panel header={index+1+'、'+i.title} key={index}>
                                    {i.content}
                                </Accordion.Panel>
                            )
                        })
                    }
                </Accordion>
            </div>
        );
    }
}

export default Main;
//export default Main;
