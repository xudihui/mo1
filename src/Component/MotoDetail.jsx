import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { history,TopNavBar } from './common/index';
import { Drawer,List ,NoticeBar,Grid, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
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
        title:'买到车辆',
        icon:'icon-xiangqing',
    },
    {
        title:'砍价记录',
        icon:'icon-5yongjinzhekou',
    },
    {
        title:'降价提醒',
        icon:'icon-tongzhi',
    },
    {
        title:'收藏车辆',
        icon:'icon-shoucang1',
    },
    {
        title:'浏览记录',
        icon:'icon-jingdianwanfa',
    },
    {
        title:'订阅车源',
        icon:'icon-bangdan',
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
                            motoData.tags.map((i) => {
                                return(
                                    <span>{i}</span>
                                )
                            })
                        }
                    </div>
                    <div className="rowMotoText" >
                        <div >
                            {motoData.infos.title}
                        </div>
                        <div>
                            ￥<span >{motoData.infos.price}</span>
                        </div>
                    </div>
                </div>


                <div className="sub-title">配置参数</div>
                <Grid data={data1}
                      columnNum={4}
                      hasLine={true}
                      renderItem={dataItem => (
                          <Link to={`/myOwn?type=${dataItem.title}&icon=${dataItem.icon}`}>
                              <div style={{ padding: '0.25rem', }}>
                                  <i className={'iconfont '+dataItem.icon} ></i>
                                  <div style={{ color: '#888', fontSize: '0.28rem', marginTop: '0.24rem' }}>
                                      <span>{dataItem.title}</span>
                                  </div>
                              </div>
                          </Link>
                      )}
                />

            </div>
        );
    }
}


export default connect((state) => { return { state: state['MyList']} }, action())(Main);




