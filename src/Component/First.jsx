import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { history } from './common/index';
import { Drawer,List ,NoticeBar, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import Rows from './Rows';
import a1 from '../Images/banner01.jpg';
import a2 from '../Images/banner02.jpg';

/**
 * 买车模块入口
 *
 * @param {Object} mySeting
 * @returns
 */
//banner滚动图
class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['', ''],
            initialHeight: '85px',
        }
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: [a1,a2],
            });
        }, 100);
    }
    render() {
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        console.log(hProp)
        var self = this;
        return (
            <div >

                <Carousel
                    className="my-carousel"
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    swipeSpeed={25}
                >
                    {this.state.data.map((ii,index) => (
                        <Link to="/" key={ii} style={hProp}>
                            <img
                                src={ii}
                                alt="icon"
                                onLoad={(e) => {
                                    console.log(e.currentTarget.offsetHeight)
                                    window.dispatchEvent(new Event('resize'));
                                    self.setState({
                                       // initialHeight: e.currentTarget.naturalHeight,
                                        initialHeight: e.currentTarget.offsetHeight
                                    });
                                }}
                            />
                        </Link>
                    ))}
                </Carousel>
            </div>
        );
    }
}



class Main extends Component {
    constructor(props) {
        super(props);
        this.handleCheck.bind(this);
        this.state = {
            open: false,
            city:'全国',
            matchIndex:-1,
            matchContent:[
                <ul>
                    <li data-query="123321" onClick={this.handleCheck}>12</li>
                    <li data-query="123321" onClick={this.handleCheck}>12</li>
                    <li data-query="123321" onClick={this.handleCheck}>12</li>
                    <li data-query="123321" onClick={this.handleCheck}>1</li>
                </ul>,
                <ul>
                    <li>12</li>
                    <li>12</li>
                    <li>12</li>
                    <li>1</li>
                </ul>,
                <ul>
                    <li>134</li>
                    <li>14</li>
                    <li>14</li>
                    <li>1</li>
                </ul>
            ]
        }
    }
    handlerSetMatch(e,index){
        var index_ = this.state.matchIndex;
        if(index_ != -1){
            index = -1;
        }
        console.log(index,index_)
        this.setState({matchIndex:index});
        if(e){
            e.nativeEvent.stopImmediatePropagation();
        }
    }
    handleCheck(e){
        var el = e.currentTarget;
        var queryData = el.getAttribute('data-query');
        var el_all = el.parentNode.childNodes;
        for(let i in el_all){
            if(!isNaN(i)){
                el_all[i].style.color = '#555';
            }
        }
        el.style.color = '#f30';
        this.handlerSetMatch(false,-1);
        //doQuery width queryData

    }
    handleClick(e){
// 阻止合成事件与最外层document上的事件间的冒泡
        e.nativeEvent.stopImmediatePropagation();
    }
    componentDidMount(){
        var self = this;
        document.addEventListener('click', () => { //遮罩类的组件最好把事件都绑定在doc上进行阻止冒泡
            console.log('document');
            self.handlerSetMatch(false,-1);
        });
    }

    render() {
        return (
            <div>
                <div className='topWrap'>
                    <div className="top" onClick={(e) => {this.handleClick(e)}} data-flex="dir:left box:justify" >
                        <div className="logo"></div>
                        <div>
                            <SearchBar onFocus={() => {
                                history.push('/SearchHistory');
                            }} placeholder="请输入车系/车型" />
                        </div>
                        <div className="city"  data-flex="main:center cross:center" onClick={() => {}}>{this.state.city}
                            <i className="iconfont icon-shouhuodizhi"></i>
                        </div>
                    </div>
                </div>
                <div style={{paddingTop:'40px'}}>
                    <Banner />
                </div>

                <div className="sub-title">为您推荐</div>
                <div className="am-list am-list-view-scrollview" style={{paddingBottom:'50px'}}>
                    <div className="am-list-body">
                        <div className="list-view-section-body">
                            <Rows />
                            <Rows />
                            <Rows />
                            <Rows />
                            <Rows />
                            <div onClick={this.props.changeTab} style={{display:'inline-block',marginTop:'10px',fontSize:'.25rem',marginBottom:'10px',color:'#666'}}>
                                查看全部车辆
                            </div>



                        </div>
                    </div>
                </div>

            </div>
        );
    }
}





export default Main;
