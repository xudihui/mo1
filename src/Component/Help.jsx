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
        title:'什么是摩易二手车平台？',
        content:'*******。'
    },
    {
        title:'如果不想用了可以退车退款？',
        content:'*******。'
    },
    {
        title:'注意事项',
        content:'服务中心联系，客服热线：123456。'
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
