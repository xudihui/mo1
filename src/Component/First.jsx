import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import MyHotList from './common/MyHotList';
import { history,formatParams} from './common/index';
import { Drawer,List ,NoticeBar, Toast,WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import Rows from './Rows';

import bmw from '../Images/bmw.jpg';
import honda from '../Images/honda.jpg';
import cq from '../Images/cq.jpg';
import ducati from '../Images/ducati.jpg';
import ktm from '../Images/ktm.jpg';
import halei from '../Images/halei.jpg';
import benelli from '../Images/benelli.jpg';
import cf from '../Images/cf.jpg';

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
            data: [],
            initialHeight: window.innerWidth*171/640+'px',
        }
    }
    componentDidMount() {
        var arr = [];
        var self = this;
        Tool.post($extGetAdvert,{},function(data){ //广告位更新
            if(data.code == '0'){
                for(let i in data.response){
                    if(data.response[i]['status'] == 'on'){
                        arr.push('http://www.mo1.cn/'+data.response[i]['imgUrl'])
                    }
                    self.setState({
                        data: arr,
                    });
                }
            }
            else{
                Toast.info('公告图获取失败！');
            }
        })
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
                                alt="摩一广告图"
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
            matchIndex:-1
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
                    <div className="top" onClick={(e) => {this.handleClick(e)}} data-flex="dir:left box:last" >
                        <div>
                            <SearchBar onFocus={() => {
                                history.push('/SearchHistory');
                            }} placeholder="请输入车系/车型" />
                        </div>
                        <div className="city"  data-flex="main:center cross:center" onClick={() => {}}>{this.props.city||'全国'}
                            <i className="iconfont icon-shouhuodizhi"></i>
                        </div>
                    </div>
                </div>
                <div style={{paddingTop:'40px'}}>
                    <Banner />
                </div>

                <div className="sub-title">快速选车</div>
                <div className="content">
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{maxPrice:5000000})
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        5万以下
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{maxPrice:10000000,minPrice:5000000})
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        5~10万
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{maxPrice:15000000,minPrice:10000000})
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        10~15万
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{minPrice:15000000})
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        15万以上
                    </Link>

                    <Link className="p1" onClick={() => {
                        Toast.info('周总新需求，正在迁移数据和重构数据接口，敬请期待！',4)
                    }
                    }>
                        跑车
                    </Link>
                    <Link className="p1" onClick={() => {
                        Toast.info('周总新需求，正在迁移数据和重构数据接口，敬请期待！',4)
                    }
                    }>
                        拉力
                    </Link>
                    <Link className="p1" onClick={() => {
                        Toast.info('周总新需求，正在迁移数据和重构数据接口，敬请期待！',4)
                    }
                    }>
                        街车
                    </Link>
                    <Link className="p1" onClick={() => {
                        Toast.info('周总新需求，正在迁移数据和重构数据接口，敬请期待！',4)
                    }
                    }>
                        巡航
                    </Link>

                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'BMW'});
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        <img src={bmw} />
                        <span>宝马</span>
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'Honda'});
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        <img src={honda} />
                        <span>本田</span>
                    </Link>
                    <Link className="p1" onClick={() => {

                        var target = Object.assign({},{brand:'Kawasaki'});
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        <img src={cq} />
                        <span>川崎</span>
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'Ducati'});
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        <img src={ducati} />
                        <span>杜卡迪</span>
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'KTM'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={ktm} />
                        <span>KTM</span>
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'Harley-Davidson'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={halei} />
                        <span>哈雷</span>
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'Benelli'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={benelli} />
                        <span>贝纳利</span>
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'Cf'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={cf} />
                        <span>春风</span>
                    </Link>
                </div>
                <div className="btnWrap">
                    <Button className="btn" type="primary"  onClick={() =>{
                        history.replace(`/`);
                        this.props.changeTab_('Buy')
                    } }>查看全部优质车源</Button>
                </div>
                <div className="btnWrap">
                    <Button className="btn" type="primary"  onClick={() => {
                        if (!localStorage.getItem('userInfo')) {
                            history.push({ pathname: '/Login' });
                            Toast.info('只有登录才能卖车哦！',1)
                        }
                        else{
                            this.props.changeTab_('Sell')
                        }
                    }}>立即免费卖车</Button>
                </div>
                <MyHotList data={this.props.state.myHotList} paddingBottom="50px"/>
            </div>
        );
    }
}
export default connect((state) => {return{state:state['MyList'],city:state['User']['city']}},action())(Main);
