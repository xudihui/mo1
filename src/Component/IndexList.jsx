import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage } from './common/index';
import { Drawer,List ,NoticeBar, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import ListView from './ListView';
import Seller from './Sell';
import Rows from './Rows';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';



class TabBarExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: sessionStorage.getItem('selectedTab') || 'Buy',
            hidden: false
        };
    }

    renderContent(pageText,m) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>

                {
                    m=='Buy'&&<Buy />
                }

                {
                    m=='Sell'&&<Sell />
                }
                {
                    m=='My'&&<My id={this.props.state.id} login={this.props.login} />
                }
            </div>
        );
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: `url(${require('../Images/sell.svg')}) center center /  0.42rem 0.42rem no-repeat` }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: `url(${require('../Images/sell_s.svg')}) center center /  0.42rem 0.42rem no-repeat` }}
                    />
                    }
                    title="卖车"
                    key="口碑"
                    badge={'1'}
                    selected={this.state.selectedTab === 'Sell'}
                    onPress={() => {
                        sessionStorage.setItem('selectedTab','Sell');
                        this.setState({
                            selectedTab: 'Sell',
                        });
                    }}
                    data-seed="logId1"
                >
                    {this.renderContent('卖车','Sell')}
                </TabBar.Item>
                <TabBar.Item
                    title="买车"
                    key="生活"
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: `url(${require('../Images/moto.svg')}) center center /  0.42rem 0.62rem no-repeat` }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: `url(${require('../Images/moto_s.svg')}) center center /  0.42rem 0.62rem no-repeat` }}
                    />
                    }
                    selected={this.state.selectedTab === 'Buy'}
                    badge={1}
                    onPress={() => {
                        sessionStorage.setItem('selectedTab','Buy');
                        this.setState({
                            selectedTab: 'Buy',
                        });
                    }}
                    data-seed="logId"
                >
                    {this.renderContent('生活','Buy')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: `url(${require('../Images/my.svg')}) center center /  0.82rem 0.82rem no-repeat` }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: `url(${require('../Images/my_s.svg')}) center center /  0.82rem 0.82rem no-repeat` }}
                    />
                    }
                    title="我的"
                    key="我的"
                    selected={this.state.selectedTab === 'My'}
                    onPress={() => {
                        sessionStorage.setItem('selectedTab','My');
                        this.setState({
                            selectedTab: 'My',
                        });
                    }}
                >
                    {this.renderContent('我的','My')}
                </TabBar.Item>
            </TabBar>
        );
    }
}
// Buy 首页 买车
class Buy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            city:'全国'
        }
    }
    onOpenChange(...args){
        console.log(args);
        this.setState({ open: !this.state.open,city:'选择中' });
    }

    render() {
        const sidebar = (<List>
            {[...Array(20).keys()].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}

                                       multipleLine
                    >全国</List.Item>);
                }
                return (<List.Item key={index}
                                   onClick={() => {this.setState({ open: !this.state.open,city:'城市'+index });}}
                >城市{index}</List.Item>);
            })}
        </List>);
        return (
            <div>
                <div className="top" >
                    <div className="city" onClick={this.onOpenChange.bind(this)}>{this.state.city}</div>
                </div>
                <div>
                    <SearchBar placeholder="请输入车系/车型" />
                </div>
                <Banner />
                <div className="am-list am-list-view-scrollview" style={{paddingBottom:'50px'}}>
                    <div className="am-list-line" style={{height: '2em',
                        lineHeight: '2em',color:'#888',
                        fontSize: '.3rem'}}>
                        推荐车型
                    </div>
                    <div className="am-list-body">
                        <div className="list-view-section-body">
                            <Rows />
                            <Rows />
                            <Rows />
                            <Rows />
                            <Rows />
                                    <Link to="/myList" style={{display:'inline-block',marginTop:'10px',fontSize:'.25rem',marginBottom:'10px',color:'#666'}}>
                                        查看全部车辆
                                    </Link>

                        </div>
                    </div>
                </div>
                {
                    /*
                    *
                     <Drawer
                     className="my-drawer"
                     style={{ minHeight: document.documentElement.clientHeight - 200 }}
                     enableDragHandle
                     contentStyle={{ color: '#A6A6A6', textAlign: 'center', marginTop: 42 }}
                     sidebar={sidebar}
                     open={this.state.open}
                     onOpenChange={this.onOpenChange.bind(this)}
                     ><span></span>
                     </Drawer>
                    * */
                }

            </div>
        );
    }
}

// Sell 首页 卖车
class Sell extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Seller />
            </div>
        );
    }
}


// My 首页 我的个人中心
class My extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{paddingBottom:'2px'}}>
                <List className="my-list" >
                    <Item extra="" arrow="horizontal" onClick={() => {}}>设置</Item>
                    <Item  arrow="horizontal" onClick={() => {}}>买家中心
                        <Badge text="减" hot style={{ marginLeft: 12 }} />
                        <Badge text="惠" hot style={{ marginLeft: 12 }} />
                        <Badge text="免" hot style={{ marginLeft: 12 }} />
                        <Badge text="反" hot style={{ marginLeft: 12 }} />
                        <Badge text="HOT" hot style={{ marginLeft: 12 }} />
                    </Item>
                    <Item extra="" arrow="horizontal" onClick={() => {}}>卖家中心</Item>
                    {
                        this.props.id && <Item extra={this.props.id} arrow="horizontal" onClick={() => {this.props.login('')}}>退出登录</Item>

                    }
                    {
                        !this.props.id && <Link to="/login"><Item extra="" arrow="horizontal" onClick={() => {}}>登录</Item></Link>
                    }

                </List>
            </div>
        );
    }
}

//banner滚动图
class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ['', ''],
            initialHeight: 200,
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
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({
                                        initialHeight: '196px',
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


const data = [
    {
        value: '1',
        label: 'Food',
        children: [
            {
                label: 'All Foods',
                value: '1',
                disabled: false,
            },
            {
                label: 'Chinese Food',
                value: '2',
            }, {
                label: 'Hot Pot',
                value: '3',
            }, {
                label: 'Buffet',
                value: '4',
            }, {
                label: 'Fast Food',
                value: '5',
            }, {
                label: 'Snack',
                value: '6',
            }, {
                label: 'Bread',
                value: '7',
            }, {
                label: 'Fruit',
                value: '8',
            }, {
                label: 'Noodle',
                value: '9',
            }, {
                label: 'Leisure Food',
                value: '10',
            }],
    }, {
        value: '2',
        label: 'Supermarket',
        children: [
            {
                label: 'All Supermarkets',
                value: '1',
            }, {
                label: 'Supermarket',
                value: '2',
                disabled: true,
            }, {
                label: 'C-Store',
                value: '3',
            }, {
                label: 'Personal Care',
                value: '4',
            }],
    },
    {
        value: '3',
        label: 'Extra',
        children: [
            {
                label: 'you can not see',
                value: '1',
            },
        ],
    },
];

class MenuExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initData: '',
            show: false,
        };
    }
    onChange(value){
        let label = '';
        data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }
    handleClick(e){
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
            setTimeout(() => {
                this.setState({
                    initData: data,
                });
            }, 500);
        }
    }

    render() {
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                className="foo-menu"
                data={initData}
                value={['1', '3']}
                onChange={this.onChange.bind(this)}
                height={document.documentElement.clientHeight * 0.6}
            />
        );
        const loadingEl = (
            <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );
        return (
            <div className={show ? 'menu-active' : ''}>
                <div>
                    <NavBar
                        leftContent="Menu"
                        mode="light"
                        iconName={require('../Images/menu.svg')}
                        onLeftClick={this.handleClick.bind(this)}
                        className="top-nav-bar"
                    >
                        Here is title
                    </NavBar>
                </div>
                {show ? initData ? menuEl : loadingEl : null}
            </div>
        );
    }
}
const Item = List.Item;
const Brief = Item.Brief;

const NoticeBarExample = () => (
    <div>
        <WhiteSpace size="lg" />
        <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
            欢迎来到杭州虚拟公交卡！
        </NoticeBar>
    </div>
);

class Main_ extends Component {
    constructor(props) {
        super(props);
        this.state = {token:'',token_:Tool.getQueryString('token'),'links':{}}
    }
    componentDidMount(){
        Tool.post('http://115.236.162.166:18081/ext_smk_activity/baseUser/getUserIdByToken.ext',
            //{request:JSON.stringify({accessToken:Tool.getQueryString('token')})},
            {request:JSON.stringify({accessToken:'0AE2BD2CB088451D188970E48733BE066B2A6A82B5D35802FE81A2FFE5519E461FB903139E41D022F82DA482585AE7D24485950A235B2EBB22EB2F3FA6B1D582968620D9405D813E'})},

            function(data){
                this.setState({token:JSON.stringify(data)});
                this.props.setTime(data.systemDate);//设置系统时间
                Tool.post('http://115.236.162.166:18081/ext_smk_activity/insurance/getCarInUrlMsg.ext',
                    {request:JSON.stringify({"userId":data.response.userId})},
                   // {request:JSON.stringify({"userId":'13666666666'})},
                    function(data){
                       var temp = data.response;
                       this.setState({links:temp});
                    }.bind(this),
                    function(){
                        alert('error');
                    })
            }.bind(this),
            function(){
               alert('error');
            })
    }
    render() {
        var data = this.props.state;
        return (
            <div className="index-list-box">
                <div className="car"></div>
            </div>
        );
    }
}

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
//export default TabBarExample;
export default connect((state) => {return{state:state['User']}},action())(TabBarExample);