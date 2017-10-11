import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import MyHotList from './common/MyHotList';
import { history,formatParams} from './common/index';
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
                        <div className="city"  data-flex="main:center cross:center" onClick={() => {}}>{this.props.state.city||'全国'}
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
                        var target = Object.assign({},{maxPrice:2000000})
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        2万以下
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{maxPrice:4000000,minPrice:2000000})
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        2~4万
                    </Link>
                    <Link className="p1" onClick={() => {

                        var target = Object.assign({},{maxPrice:6000000,minPrice:4000000})
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        4~6万
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{minPrice:6000000})
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        6万以上
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'Indian'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        Indian
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'Buell'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        Buell
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'Cagiva'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        Cagiva
                    </Link>
                    <Link className="p1" onClick={() => {
                        var target = Object.assign({},{brand:'GASGAS'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        GASGAS
                    </Link>
                </div>
                <div className="btnWrap">
                    <Button className="btn" type="primary"  onClick={() =>{
                        history.replace(`/`);
                        this.props.changeTab_('Buy')
                    } }>查看全部优质车源</Button>
                </div>
                <div className="btnWrap">
                    <Button className="btn" type="primary"  onClick={() => this.props.changeTab_('Sell')}>立即免费卖车</Button>
                </div>
                <MyHotList data={this.props.state.myHotList} paddingBottom="50px"/>
            </div>
        );
    }
}
export default connect((state) => {return{state:state['MyList']}},action())(Main);
