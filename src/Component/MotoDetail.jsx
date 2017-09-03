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
const motoData = {
    images:[a1,a2],
    tags:['0过户','有发票','有合格证','有车牌','大贸车'],
    infos:{
        title:'丽水 遂昌县 Yamaha YZF 系列 YZF-R6',
        props:'5千-1万公里 / ≤2004年 / 250-399cc',
        price:'16956'
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
const data2 = [

    {
        title:'降价提醒',
        icon:'icon-tongzhi',
        background:'#e1e1e1'
    },
    {
        title:'收藏车辆',
        icon:'icon-shoucang1',
        background:'#eaeaea'
    },
    {
        title:'订阅车源',
        icon:'icon-bangdan',
        background:'#efefef'
    }
    ,
    {
        title:'联系车主',
        icon:'icon-iconfonta',
        background:'#f8f8f8'
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
                <TopNavBar title='车辆详情' transparent={true} />
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
        this.state = {a:222};
    }
    render() {
        return (
            <div className="moto-detail" >
                <Banner />
                <div className="detail-wrap">
                    <div className="tag-wrap">
                        {
                            motoData.tags.map((i,index) => {
                                return(
                                    <span key={index}>{i}</span>
                                )
                            })
                        }
                    </div>
                    <div className="rowMotoTextDetail" >
                        <div >
                            {motoData.infos.title}
                        </div>
                        <div data-flex="main:justify">
                            <span >￥{motoData.infos.price}</span>
                            <Button className="btn" type="primary" onClick={() => Modal.prompt('砍价', '',
                                [
                                    { text: '取消' },
                                    { text: '立即砍价',
                                        onPress: value => new Promise((resolve) => {
                                            Toast.info(value, 1);
                                            resolve();
                                        }),
                                    },
                                ], 'default', null, ['请输入您的心理价位'])}>立即砍价</Button>
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
                <div className="sub-title">猜您喜欢</div>
                <div className="am-list am-list-view-scrollview" >
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
                        data2.map(dataItem => (
                            <Link to="/help" data-flex-box="1">
                                <div style={{ padding: '0.15rem .05rem',background:dataItem.background }}>
                                    <i style={{ color: '#ff3300',fontSize: '0.48rem',display:'block', textAlign: 'center' }} className={'iconfont '+dataItem.icon} ></i>
                                    <div style={{ color: '#888', fontSize: '0.28rem',marginTop:'3px',padding:'0 .15rem' }}>
                                        <span>{dataItem.title}</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>



            </div>
        );
    }
}


export default connect((state) => { return { state: state['MyList']} }, action())(Main);




