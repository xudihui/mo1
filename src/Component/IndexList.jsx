import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { history } from './common/index';
import { Drawer,List ,NoticeBar, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

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
                    icon={<i className="iconfont icon-tuikuan"></i>}
                    selectedIcon={<i className="iconfont icon-tuikuan"></i>}
                    title="卖车"
                    key="口碑"
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
                    icon={
                        <i className="iconfont icon-zuche"></i>
                    }
                    selectedIcon={
                        <i className="iconfont icon-zuche"></i>
                    }
                    selected={this.state.selectedTab === 'Buy'}
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

                    icon={<i className="iconfont icon-geren"></i>}
                    selectedIcon={<i className="iconfont icon-geren"></i>}
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
                <div className="top" onClick={(e) => {this.handleClick(e)}} >
                    <div className="city"  data-flex="main:center cross:center" onClick={() => {}}>{this.state.city}
                        <i className="iconfont icon-shouhuodizhi"></i>
                    </div>
                </div>
                <div>
                    <SearchBar onFocus={() => {
                        history.push('/MyList');
                    }} placeholder="请输入车系/车型" />
                    <div className="match" data-flex="dir:left box:last">
                        <div onClick={(e)=>{this.handlerSetMatch(e,0)}}>排序<i className="iconfont icon-xiangxiajiantou"></i></div>
                        <div onClick={(e)=>{this.handlerSetMatch(e,1)}}>品牌<i className="iconfont icon-xiangxiajiantou"></i></div>
                        <div onClick={(e)=>{this.handlerSetMatch(e,2)}}>价格<i className="iconfont icon-xiangxiajiantou"></i></div>
                        <div><i className="iconfont icon-viewgallery"></i></div>
                    </div>

                    <div className="match_subnav" onClick={(e) => {this.handleClick(e)}} >
                        <ul style={{display:this.state.matchIndex == 0 ? 'block' : 'none'}}>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>1</li>
                        </ul>
                        <ul style={{display:this.state.matchIndex == 1 ? 'block' : 'none'}}>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>12</li>
                            <li data-query="123321" onClick={this.handleCheck}>1</li>
                        </ul>
                        <ul style={{display:this.state.matchIndex == 2 ? 'block' : 'none'}}>

                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="1" data-pinyin="国产">
                                国产          </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="2" data-pinyin="Aprilia">
                                Aprilia            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="3" data-pinyin="Benelli">
                                Benelli            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="4" data-pinyin="BMW">
                                BMW            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="5" data-pinyin="Buell">
                                Buell            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="6" data-pinyin="Cagiva">
                                Cagiva            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="7" data-pinyin="Can-Am">
                                Can-Am            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="8" data-pinyin="Ducati">
                                Ducati            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="9" data-pinyin="GASGAS">
                                GASGAS            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="10" data-pinyin="Harley-Davidson">
                                Harley-Davidson            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="11" data-pinyin="Honda">
                                Honda            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="12" data-pinyin="Husaberg">
                                Husaberg            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="13" data-pinyin="Husqvarna">
                                Husqvarna            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="14" data-pinyin="Indian">
                                Indian            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="15" data-pinyin="Kawasaki">
                                Kawasaki            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="16" data-pinyin="KTM">
                                KTM            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="17" data-pinyin="Moto Guzzi">
                                Moto Guzzi            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="18" data-pinyin="MV Agusta">
                                MV Agusta            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="19" data-pinyin="Piaggio">
                                Piaggio            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="20" data-pinyin="Suzuki">
                                Suzuki            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="21" data-pinyin="Triumph">
                                Triumph            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="22" data-pinyin="Vespa">
                                Vespa            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="23" data-pinyin="Yamaha">
                                Yamaha            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="24" data-pinyin="其他">
                                其他            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="25" data-pinyin="汽车">
                                汽车            </li>
                            <li onClick={this.handleCheck} data-url="" data-relation="cartype-sub" data-role="aside" class="carbrand" data-query="26" data-pinyin="VICTORY">
                                VICTORY            </li>
                        </ul>
                    </div>
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
            initialHeight: 100,
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
                                        initialHeight: '100px',
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