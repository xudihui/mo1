import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import MyHotList from './common/MyHotList';
import ListMoto from './common/ListMoto';

import { history,formatParams,DataLoad,dataCityNo} from './common/index';
import { Tabs, WhiteSpace, Toast, Icon,Menu, ActivityIndicator, Picker,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';

import bmw from '../Images/logo/bmw.jpg';
import dkd from '../Images/logo/dkd.jpg';
import hl from '../Images/logo/hl.jpg';
import cq from '../Images/logo/cq.jpg';
import ktm from '../Images/logo/ktm.jpg';
import bt from '../Images/logo/bt.jpg';
import ymh from '../Images/logo/ymh.jpg';
import lm from '../Images/logo/lm.jpg';
import bnl from '../Images/logo/bnl.jpg';
import cf from '../Images/logo/cf.jpg';

var keys_dataCityNo = Object.keys(dataCityNo);
var arr_dataCityNo = [];
var m = 0;
for(let i in keys_dataCityNo){
    if(isNaN(i)){
        continue;
    }
    var temp = {
        label:dataCityNo[keys_dataCityNo[i]],
        value:keys_dataCityNo[i],
        children:[]
    }
    if(keys_dataCityNo[i].indexOf('0000') > -1){
        if(m != 0){
            arr_dataCityNo.push(m);
        }
        m = {
            label:dataCityNo[keys_dataCityNo[i]],
            value:keys_dataCityNo[i],
            children:[]
        }
    }else{
        var temp = {
            label:dataCityNo[keys_dataCityNo[i]],
            value:keys_dataCityNo[i]
        }
        m.children.push(temp)
    }
}

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
            initialHeight: window.innerWidth*84.8/320+'px',
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
                }
                self.setState({
                    data: arr
                });
            }
            else{
                Toast.info('公告图获取失败！');
            }
        })
    }
    render() {
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        var self = this;
        if(this.state.data.length == 0){
            return(<DataLoad />)
        }
        return (
            <div >
                {
                    this.state.data.length == 1 && <img
                            src={this.state.data[0]}
                            style={hProp}
                            alt="摩一广告图"
                        />
                }
                {
                    this.state.data.length > 1 && <Carousel
                        className="my-carousel"
                        autoplay={true}
                        selectedIndex={0}
                        infinite
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
                }

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
            matchIndex:-1,
            urgent:[],
            visible:false
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
    makePrice(datas){
        return(
            <div>
                {
                    datas.map((i,index)=>{
                      return <Link key={index} className="p2" onClick={() => {
                          var target = Object.assign({},datas[index]['search'])
                          this.props.changeTab_('Buy')
                          history.replace(`/?${formatParams(target)}`)
                      }
                      }>
                          {
                              datas[index]['title']
                          }
                      </Link>
                    })
                }
            </div>
        )
    }
    makeModel(datas){
        return(
            <div>
                {
                    datas.map((i,index)=>{
                        return <Link key={index} className="p1" onClick={() => {
                            var target = Object.assign({},datas[index]['search'])
                            this.props.changeTab_('Buy')
                            history.replace(`/?${formatParams(target)}`)
                        }
                        }>
                            {
                                datas[index]['title']
                            }
                        </Link>
                    })
                }
            </div>
        )
    }
    handleClick(e){
// 阻止合成事件与最外层document上的事件间的冒泡
        e.nativeEvent.stopImmediatePropagation();
    }
    componentDidMount(){
        document.body.scrollTop = 0;
        var self = this;
        document.addEventListener('click', () => { //遮罩类的组件最好把事件都绑定在doc上进行阻止冒泡
            console.log('document');
            self.handlerSetMatch(false,-1);
        });

        //请求急售车辆
        Tool.post($extMotorFindPage,{urgent:true,rows:3},function(data){
            if(data.code == '0'){
                self.setState({
                    urgent:data.response.searchData
                });
            }
            else if(data.code == '-1001'){
                Toast.offline(data.msg);
            }
            else{
                Toast.offline(data.msg)
            }
        })

    }

    render() {
        var {setCity} = this.props;
        return (
            <div style={{paddingBottom:'50px'}}>
                <div className='topWrap'>
                    <div className="top" onClick={(e) => {this.handleClick(e)}} data-flex="dir:left box:last" >
                        <div>
                            <SearchBar onFocus={() => {
                                history.push('/SearchHistory');
                            }} placeholder="请输入车系/车型" />
                        </div>
                        <Picker
                            visible={this.state.visible}
                            data={arr_dataCityNo}
                            value={['110000', '110100']}
                            onChange={v =>{
                                console.log('所选城市：',dataCityNo[v[1]]);
                                setCity(dataCityNo[v[1]]);
                                Toast.success('已切换至'+dataCityNo[v[1]],1)
                            } }
                            onOk={() =>{
                                this.setState({ visible: false });
                            }}
                            onDismiss={() => this.setState({ visible: false })}
                            extra="请选择(可选)"
                            cols = '2'
                        >
                            <div className="city"  data-flex="main:center cross:center" onClick={() => this.setState({ visible: true })}>{this.props.city||'全国'}
                                <i className="iconfont icon-shouhuodizhi"></i>
                            </div>
                        </Picker>

                    </div>
                </div>
                <div className="content" style={{display:'none'}}>
                    {
                        this.makePrice([
                            {
                                search:{maxPrice:5000000},
                                title:'5万以下'
                            },
                            {
                                search:{maxPrice:10000000,minPrice:5000000},
                                title:'5~10万'
                            },
                            {
                                search:{maxPrice:15000000,minPrice:10000000},
                                title:'10~15万'
                            },
                            {
                                search:{minPrice:15000000},
                                title:'15万以上'
                            },
                        ])
                    }
                    {
                        this.makeModel([
                            {
                                search:{motorType:'跑车'},
                                title:'跑车'
                            },
                            {
                                search:{motorType:'拉力'},
                                title:'拉力'
                            },
                            {
                                search:{motorType:'街车'},
                                title:'街车'
                            },
                            {
                                search:{motorType:'巡航'},
                                title:'巡航'
                            },,
                            {
                                search:{motorType:'踏板'},
                                title:'踏板'
                            }
                        ])
                    }


                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'BMW'});
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        <img src={bmw} />
                        <span>宝马</span>
                    </Link>
                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'Ducati'});
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        <img src={dkd} />
                        <span>杜卡迪</span>
                    </Link>
                    <Link className="p1 animated " onClick={() => {

                        var target = Object.assign({},{brand:'Harley-Davidson'});
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        <img src={hl} />
                        <span>哈雷</span>
                    </Link>
                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'Kawasaki'});
                        this.props.changeTab_('Buy')
                        history.replace(`/?${formatParams(target)}`)
                    }
                    }>
                        <img src={cq} />
                        <span>川崎</span>
                    </Link>
                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'KTM'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={ktm} />
                        <span>KTM</span>
                    </Link>
                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'Honda'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={bt} />
                        <span>本田</span>
                    </Link>
                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'YAMAHA'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={ymh} />
                        <span>雅马哈</span>
                    </Link>


                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'Suzuki'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={lm} />
                        <span>铃木</span>
                    </Link>
                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'Benelli'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={bnl} />
                        <span>贝纳利</span>
                    </Link>
                    <Link className="p1 animated " onClick={() => {
                        var target = Object.assign({},{brand:'CFMOTO'});
                        this.props.changeTab_('Buy');
                        history.replace(`/?${formatParams(target)}`);
                    }
                    }>
                        <img src={cf} />
                        <span>春风</span>
                    </Link>
                </div>
                <div style={{paddingTop:'48px'}}>
                    <div style={{overflowX:'auto'}}>
                        <div className="sub-title sub-title-no" style={{width:window.innerWidth*2.8+'px'}}>好车推荐
                            <Link  onClick={() => {
                                var target = Object.assign({},{isHot:'y'});
                                this.props.changeTab_('Buy');
                                history.replace(`/?${formatParams(target)}`);
                            }
                            }>
                                <span>查看全部</span>
                            </Link>
                        </div>

                        <ListMoto showType="icon-viewlistHot" from='new' isHot='true' list={this.props.state.myHotList} />

                    </div>


                    <div className="sub-title sub-title-no">降价急售
                        <Link  onClick={() => {
                            var target = Object.assign({},{urgent:'true'});
                            this.props.changeTab_('Buy');
                            history.replace(`/?${formatParams(target)}`);
                        }
                        }>
                            <span>查看全部</span>
                        </Link>
                    </div>

                    <ListMoto showType="icon-viewlist" from='new' isHot='true' list={this.state.urgent} />
                    <div className="sub-title sub-title-no" >准新车
                        <Link  onClick={() => {
                            var target = Object.assign({},{maxMileage:'3000'});
                            this.props.changeTab_('Buy');
                            history.replace(`/?${formatParams(target)}`);
                        }
                        }>
                            <span>查看全部</span>
                        </Link>
                    </div>
                    <ListMoto showType="icon-viewlist" from='new' isHot='true' list={this.props.state.myHotList} />
                </div>

                <div className="btnWrap flex" data-flex="main:justify dir:left">
                    <Button className="btn" type="primary"  onClick={() =>{
                        history.replace(`/`);
                        this.props.changeTab_('Buy')
                    } }>查看全部车源</Button>
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

            </div>
        );
    }
}
export default connect((state) => {return{state:state['MyList'],city:state['User']['city']}},action())(Main);

