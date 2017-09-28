import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { history,TopNavBar } from './common/index';
import { Toast ,List ,NoticeBar,Grid, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,Modal,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import Rows from './Rows';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';

var talks = [
    {
        name:'150****5400',
        text:'这辆车车很不错哦！'
    },
    {
        name:'130****4500',
        text:'老板，600元卖不卖，我过来自提！'
    }
];
const motoData = {
    images:[a1,a2],
    tags:['0过户','有发票','有合格证','有车牌','大贸车'],
    infos:{
        title:'丽水 遂昌县 Yamaha YZF 系列 YZF-R6',
        props:'5千-1万公里 / ≤2004年 / 250-399cc',
        price:'16956',
        newPrice:'999999'
    }
}
const data1 = [
    {
        title:'新车含税价',
        value:'25万',
    },
    {
        title:'上牌时间',
        value:'2005',
    },
    {
        title:'所在地区',
        value:'丽水',
    },
    {
        title:'车型类别',
        value:'公路',
    },
    {
        title:'品牌车型',
        value:'雅马哈',
    },
    {
        title:'行驶里程',
        value:'3000',
    },

    {
        title:'总排气量',
        value:'600毫升',
    }
];
const footer = [
    {
        title:'降价提醒',
        icon:'icon-tongzhi',
        background:'#e1e1e1',
        checked:false,
        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
    },
    {
        title:'收藏车辆',
        icon:'icon-shoucang1',
        background:'#eaeaea',
        checked:false,
        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
    },
    {
        title:'订阅车源',
        icon:'icon-bangdan',
        background:'#efefef',
        checked:false,
        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
    }
    ,
    {
        title:'联系车主',
        icon:'icon-iconfonta',
        background:'#f8f8f8',
        checked:false,
        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
    }
];

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
            data: ['', ''],
            initialHeight: 100,
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
                }, 70);
            }
        }
        window.addEventListener('scroll',this.scroll);
        setTimeout(() => {
            this.setState({
                data: [a1,a2],
            });
        }, 100);
    }
    componentWillUnmount(){

    }
    render() {
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        return (
            <div >
                <TopNavBar title='车辆详情' transparent={this.state.transparent} share={true} />
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
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({
                                        initialHeight: '200px',
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
        this.state = {
            a:222,
            talks:talks,
            footer:footer
        };
    }
    handlerChecked(index,bk){
        var footer_ = this.state.footer;
        if(index == 3){
            location.href = 'tel:15067425400';
            return;
        }
        if(!footer_[index].checked){
            Toast.success(footer_[index]['title'] + '成功！','1');
        }
        else{
            Toast.info( '取消' + footer_[index]['title'],'1' );
        }
        footer_[index].checked = !footer_[index].checked;
        this.setState({
            footer:footer_
        })
    }
    componentDidMount() {
        document.body.scrollTop = 0
    }
    render() {
        var self = this;
        return (
            <div className="moto-detail" >
                <Banner />
                <div className="detail-wrap">
                    <div className="rowMotoTextDetail" >
                        <div >
                            {motoData.infos.title}
                            {
                                Math.random()>0.5 ? <i className="iconfont icon-yirenzheng" style={{color:'#ff5b05',padding:'0 5px',position:'relative',top:'3px'}}></i> : <i className="iconfont icon-information"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 认证中</i>
                            }
                        </div>
                        <div data-flex="main:justify">
                            <span ><i className="iconfont icon-lichengdixian"></i>{motoData.infos.price}</span>
                            <Button className="btn" type="primary" onClick={() => Modal.prompt('留言/砍价', '',
                                [
                                    { text: '取消' },
                                    { text: '留言/砍价',
                                        onPress: value => new Promise((resolve) => {
                                            if(value == ''){
                                                return Toast.fail('不能发布空内容！', 1);
                                            }
                                            Toast.success('恭喜您，发布成功', 1);
                                            var talks_ = self.state.talks;
                                            talks_.unshift({
                                                name:'游客'+Math.floor(Math.random()*10000),
                                                text:value
                                            });
                                            self.setState({talks:talks_});
                                            resolve(); //关闭对话框
                                        }),
                                    },
                                ], 'default', null, ['请输入您想说的话'])}>留言/砍价</Button>
                        </div>
                        <div><span>新车含税{motoData.infos.newPrice}万</span>
                            <i onClick={()=>{
                            Toast.info('新车含税价=厂家公布的指导价+购置税。结果仅供参考。')
                            }} className="iconfont icon-information"></i>

                        </div>
                    </div>
                </div>


                <div className="sub-title">配置参数</div>
                <Grid data={data1}
                      columnNum={4}
                      hasLine={true}
                      renderItem={dataItem => (
                              <div style={{ padding: '0.25rem', }}>
                                  <div style={{ color: '#333', fontSize: '0.26rem', marginTop: '0.24rem' }}>{dataItem.value}</div>
                                  <div style={{ color: '#aaa', fontSize: '0.2rem', marginTop: '0.14rem' }}>
                                      <span>{dataItem.title}</span>
                                  </div>
                              </div>
                      )}
                />

                <div className="sub-title">详细内容</div>
                <div className="content">
                    <p>09年本田CBR600（F5）原国外改装Jardine（贾丁）排气  其余原装原版 实际3116公里</p>
                    <img src={a1} />
                    <img src={a2} />
                </div>

                <div className="sub-title">大家在说</div>
                <div className="content">

                    {
                        this.state.talks.map((item,index) =>{
                            return(
                                <div className="talk">
                                    <div className="name">{item.name} 说:</div>
                                    <div className="text">{item.text}</div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="sub-title">猜您喜欢</div>
                <div className="am-list am-list-view-scrollview" style={{paddingBottom:'50px'}}>
                    <div className="am-list-body">
                        <div className="list-view-section-body">
                            <Rows />
                            <Rows />
                            <Rows />
                            <Rows />
                        </div>
                    </div>
                </div>

                <div style={{position:'fixed',width:'100%',bottom:'0',background:'#fff'}} data-flex="main:justify">
                    {
                        this.state.footer.map((dataItem,index) => (

                                <div className={dataItem.checked ? 'bgWhite' : ''} data-flex-box="1" onClick={() => {
                                    self.handlerChecked(index,dataItem.background);
                                }} style={{ padding: '0.15rem .05rem',textAlign:'center',background:(dataItem.checked ? dataItem.backgroundChecked : dataItem.background) }}>
                                    <i style={{ color: '#ff3300',fontSize: '0.48rem',display:'block', textAlign: 'center' }} className={'iconfont '+dataItem.icon} ></i>
                                    <div style={{ color: '#888', fontSize: '0.28rem',marginTop:'3px',padding:'0 .15rem' }}>
                                        <span>{dataItem.title}</span>
                                    </div>
                                </div>
                        ))
                    }
                </div>



            </div>
        );
    }
}


export default connect((state) => { return { state: state['MyList']} }, action())(Main);




