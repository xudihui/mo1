import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ListView } from 'antd-mobile-web';
import action from '../Action/Index';
import { connect } from 'react-redux';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
const data = [
    {
        img: a1,
        title: 'Meet hotel',
        des: ' 山西 临汾市  Yamaha YZF 系列 YZF-R6',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
    {
        img: a2,
        title: 'McDonald\'s invites you',
        des: ' 广东 汕尾市  Honda Dio 系列 Dio',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
    {
        img: a2,
        title: 'Eat the week',
        des: '湖南 Yamaha Vino 系列 Vino 50',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
];
const Main  = function(){
    return(
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
        <div style={{background:'#eee',height:'1px'}}></div>
        </Link>
    )
}


export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
//export default Main;
