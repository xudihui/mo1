import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';

import MyHotList from './common/MyHotList';
import { history,TopNavBar,dataCityNo,getDateDiff } from './common/index';
import Discuss from './common/Discuss';
import { Toast ,List ,NoticeBar,Grid, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,Modal,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
const alert = Modal.alert;
var talks = [];


/**
 * 摩托详情
 *
 * @class Main
 * @extends {Component}
 */
class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialHeight: window.innerWidth/1.33,
            transparent: 0
        }
    }
    componentDidMount() {
        var resizeWaiter = false;
        var self = this;
        this.scroll = () =>{
            if(!resizeWaiter){
                resizeWaiter = true;
                setTimeout(function(){

                    if(document.body.scrollTop > 200){
                        self.setState({
                            transparent: 'none'
                        });
                    }
                    else if(document.body.scrollTop < 200){
                        self.setState({
                            transparent: 1/200*document.body.scrollTop
                        });
                    }
                    resizeWaiter = false;
                }, 30);
            }
        }
        window.addEventListener('scroll',this.scroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
    }
    render() {
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        var data = this.props.data;
        if(data.length == 1){
            data[1] = data[0];
        }
        var data_ = [];
        for(let i in data){
            if(!isNaN(i)){
                if(data[i] !=  '' && data[i] !=  'null'){
                    data_.push(data[i]);
                }
            }
        }
        return (
            <div >
                <TopNavBar title='车辆详情' transparent={this.state.transparent} share={true} />
                <Carousel
                    className="my-carousel"
                    autoplay={true}
                    easing="easeInQuad"

                    infinite
                    selectedIndex={1}
                    swipeSpeed={25}
                >
                    {data_.map((ii,index) => (
                        <Link  key={ii} style={hProp}>
                            <img
                                src={ii}
                                onLoad={(e) => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({
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
        this.id = props.location.query.id;
        this.isHot = props.location.query.isHot;
        var data_moto = {};
        const footer = [
            {
                title:'降价提醒',
                icon:'icon-tongzhi',
                background:'#e1e1e1',
                checked:data_moto.isCollect == 1 ? true : false,
                backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
            },
            {
                title:'立即收藏',
                icon:'icon-shoucang1',
                background:'#f1f1f1',
                checked:data_moto.isCollected == 1 ? true : false,
                backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
            },
            {
                title:'联系车主',
                icon:'icon-iconfonta',
                background:'#f8f8f8',
                checked:false,
                backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
            }
        ];
        this.state = {
            motoData:data_moto,
            talks:talks,
            footer:footer
        };
    }
    handlerChecked(index,bk){
        var self = this;
        var footer_ = this.state.footer;

        //降价提醒 方法
        if(index == 0){
            Tool.post(this.state.motoData.isCollect == 1 ? $extCollectDelete : $extCollectAdd,{pid:this.state.motoData.id},function(data){
                if(data.code == '0'){

                    Toast.success(self.state.motoData.isCollect == 1 ? '取消降价提醒！':'成功加入降价提醒！','1.5');
                    footer_[index].checked = !footer_[index].checked;
                    var motoData = self.state.motoData;
                    motoData.isCollect = self.state.motoData.isCollect == 1 ? 0 : 1
                    self.setState({
                        footer:footer_,
                        motoData:motoData
                    })
                }
                else{
                    Toast.offline(data.msg)
                }
            })
            return;
        }
        if(index == 1){
            alert('提示','确认收藏该车吗？', [
                { text: '朕再想想', onPress: () => {

                } },
                { text: '确认', onPress: () =>{
                   // location.href = 'build/index.html?user=test&pass=test';
                }}
            ])

            return;
        }if(index == 2){
            alert('提示',`确定给手机号为${self.state.motoData.tel}的车主打电话吗？`, [
                { text: '朕再想想', onPress: () => {

                } },
                { text: '确认', onPress: () =>{
                    location.href = 'tel:' + self.state.motoData.tel;
                }}
            ])

            return;
        }
        footer_[index].checked = !footer_[index].checked;
        this.setState({
            footer:footer_
        })
    }
    componentDidMount() {
        var self = this;
        document.body.scrollTop = 0;
        Tool.post($extEvaluateFindPageByMo,{pid:self.id},function(data){
            if(data.code == '0'){
                Toast.info('评论载入成功', .5);
                var talks_ = data.response.searchData;
                self.setState({talks:talks_ || []});
            }
            else if(data.code == '-1001'){
                Toast.offline(data.msg);
                history.replace('/login');
            }
            else{
                Toast.offline(data.msg)
            }
        })


        //请求用户在售车辆
        Tool.post($extMotorFindPage,{id:self.id},function(data){
            if(data.code == '0'){
                var data_moto = data.response.searchData[0];
                var footer = [
                    {
                        title:'降价提醒',
                        icon:'icon-tongzhi',
                        background:'#e1e1e1',
                        checked:data_moto.isCollect == 1 ? true : false,
                        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
                    },
                    {
                        title:'立即收藏',
                        icon:'icon-tongzhi',
                        background:'#f1f1f1',
                        checked:data_moto.isCollected == 1 ? true : false,
                        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
                    },
                    {
                        title:'联系车主',
                        icon:'icon-iconfonta',
                        background:'#f8f8f8',
                        checked:false,
                        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
                    }
                ];
                self.setState({
                    motoData:data_moto,
                    footer:footer
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
        var self = this;
        var motoData = this.state.motoData;
        if(JSON.stringify(motoData)=="{}"){
            return(
                <div className="data-load data-load-true"><div className="msg">正在加载中...</div></div>
            );
        }
        var imgUrls = this.state.motoData.imgUrls.split(',');
        var data_ = [];
        for(let i in imgUrls){
            if(!isNaN(i)){
                if(imgUrls[i] !=  '' && imgUrls[i] !=  'null'){
                    data_.push(imgUrls[i]);
                }
            }
        }

        var data1 = [

            {
                title:'所在地区',
                value:dataCityNo[this.state.motoData.area.split(',')[1]],
            },
            {
                title:'出厂时间',
                value:this.state.motoData.productDate.slice(0,4),
            },
            {
                title:'品牌车型',
                value:this.state.motoData.brand,
            },
            {
                title:'型号排量',
                value:(this.state.motoData.motorModel || '未知'),
            },
            {
                title:'行驶里程',
                value:this.state.motoData.mileage+'公里',
            },
            {
                title:'车型',
                value:(this.state.motoData.motorType || '未知车型'),
            }

        ];
        console.log('热热热：',self.isHot)
        return (
            <div className="moto-detail" >
                <TopNavBar title='车辆详情'  share={true} />

                <div className="detail-wrap">
                    <div className="rowMotoTextDetail" >
                        <div >
                            {this.state.motoData.title}
                            {
                                this.state.motoData.status == 'pass' && <i className="iconfont icon-yirenzheng" style={{color:'#ff5b05',padding:'0 5px',position:'relative',top:'3px'}}></i>
                            }
                            {
                                this.state.motoData.status == 'edit' && <i className="iconfont icon-process"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 认证中</i>
                            }
                            {
                                this.state.motoData.status == 'unpass' && <i className="iconfont icon-process"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 认证不通过</i>
                            }
                            {
                                this.state.motoData.status == 'off' && <i className="iconfont icon-process"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 已下架</i>
                            }
                        </div>
                        <div style={{textAlign:'right'}}>
                            <span ><i className="iconfont icon-lichengdixian"></i>{this.state.motoData.price/100}元</span>
                        </div>
                        <div style={{marginTop:'-22px'}}><span>新车含税{(this.state.motoData.oriPrice/1000000).toFixed(1)}万</span>
                            <i onClick={()=>{
                                Toast.info('新车含税价=厂家公布的指导价+购置税。结果仅供参考。')
                            }} className="iconfont icon-information"></i>

                        </div>
                    </div>
                </div>
                <div className="content">
                    {
                        data_.map(i =>{
                            return <img src={i} />
                        })
                    }
                </div>
                <div className="am-list-header">车况概述</div>
                <div className="content">
                    <pre>{this.state.motoData.content}</pre>
                </div>

                <div className="am-list-header">大家在说
                    <Button className="btn" type="primary" onClick={() => Modal.prompt('留言/砍价', '',
                        [
                            { text: '取消' },
                            { text: '留言/砍价',
                                onPress: value => new Promise((resolve) => {
                                    if(value == ''){
                                        return Toast.fail('不能发布空内容！', 1);
                                    }
                                    Tool.post($extEvaluateAdd,{pid:self.state.motoData.id,content:value,tel:self.props.tel,cityName:self.props.city},function(data){
                                        if(data.code == '0'){
                                            Toast.success('恭喜您，发布成功', 1);
                                            var talks_ = self.state.talks;
                                            talks_.unshift(data.response);
                                            self.setState({talks:talks_});
                                        }
                                        else{
                                            Toast.offline(data.msg)
                                        }
                                        resolve(); //关闭对话框
                                    })

                                }),
                            },
                        ], 'default', null, ['请输入您想说的话'])}>留言/砍价</Button>
                </div>
                <div className="content">
                    <Discuss list={ this.state.talks} />
                </div>
                <div className="am-list-header">配置参数</div>
                <div>
                    <List >
                        {
                            data1.map((dataItem,index) => {
                                return <List.Item key={index} extra={dataItem.value}>{dataItem.title}</List.Item>
                            })
                        }

                    </List>
                </div>
                {
                    self.isHot=='false' && <MyHotList {...this.props} data={this.props.state.myHotList}  paddingBottom="50px"/>
                }
                <div style={{position:'fixed',width:'100%',bottom:'0',background:'#fff'}} data-flex="main:justify">
                    {
                        this.state.footer.map((dataItem,index) => (
                                <div className={dataItem.checked ? 'bgWhite' : ''} data-flex-box="1" onClick={() => {
                                    self.handlerChecked(index,dataItem.background);
                                }} style={{ padding: '0.25rem .05rem',textAlign:'center',background:(dataItem.checked ? dataItem.backgroundChecked : dataItem.background) }}>
                                    <i style={{ color: '#ff3300',fontSize: '0.25rem',display:'block', textAlign: 'center' }} className={'iconfont '+dataItem.icon} >
                                        {' '+dataItem.title}
                                    </i>
                                </div>
                        ))
                    }
                </div>



            </div>
        );
    }
}



export default connect((state) => { return { state: state['MyList'],tel:state['User']['userInfo']['tel'],city:state['User']['city']} }, action())(Main);




