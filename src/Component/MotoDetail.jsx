import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';

import MyHotList from './common/MyHotList';
import { history,TopNavBar,dataCityNo,getDateDiff } from './common/index';
import { Toast ,List ,NoticeBar,Grid, WhiteSpace, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,Modal,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import Rows from './Rows';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';

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
            initialHeight: 200,
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

    }
    render() {
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        var data = this.props.data;
        if(data.length == 1){
            data[1] = data[0];
        }
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
                    {data.map((ii,index) => (
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
        this.from = props.location.query.from;
        var data_ = props['state'][this.from];
        if(this.from == 'data'){
            data_ = props['state']['data']['data'];
        }

        var data_moto = {};
        for(let i in data_){
            data_[i]['id'] == this.id ? data_moto = data_[i] : {}
        }
        props.setViewList(data_moto);
        console.log('MMMWWW,',data_moto);

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
                checked:data_moto.isCollect == 1 ? true : false,
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
            a:222,
            talks:talks,
            footer:footer
        };
    }
    handlerChecked(index,bk){
        var self = this;
        var footer_ = this.state.footer;

        //收藏 方法
        if(index == 1){
            Tool.post(this.state.motoData.isCollect == 1 ? $extCollectDelete : $extCollectAdd,{pid:this.state.motoData.id},function(data){
                if(data.code == '0'){

                    Toast.success(self.state.motoData.isCollect == 1 ? '取消收藏！':'成功收藏！','1.5');
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
        if(index == 2){
            location.href = 'tel:'+this.state.motoData.tel;
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
        var self = this;
        document.body.scrollTop = 0;
        Tool.post($extEvaluateFindPageByMo,{pid:self.state.motoData.id},function(data){
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

    }
    render() {
        var self = this;
        console.log('火焰山',this.props.state.myHotList)
        var data1 = [
            {
                title:'出厂时间',
                value:this.state.motoData.productDate.slice(0,4),
            },
            {
                title:'所在地区',
                value:dataCityNo[this.state.motoData.area.split(',')[1]],
            },
            {
                title:'品牌车型',
                value:this.state.motoData.brand,
            },
            {
                title:'行驶里程',
                value:this.state.motoData.mileage+'公里',
            }
        ];
        return (
            <div className="moto-detail" >
                <Banner data={this.state.motoData.imgUrls.split(',')} />
                <div className="detail-wrap">
                    <div className="rowMotoTextDetail" >
                        <div >
                            {this.state.motoData.title}
                            {
                                this.state.motoData.status == !'edit' ?  <i className="iconfont icon-yirenzheng" style={{color:'#ff5b05',padding:'0 5px',position:'relative',top:'3px'}}></i> : <i className="iconfont icon-process"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 认证中</i>
                            }
                        </div>
                        <div data-flex="main:justify">
                            <span ><i className="iconfont icon-lichengdixian"></i>{this.state.motoData.price/100}元</span>
                            <Button className="btn" type="primary" onClick={() => Modal.prompt('留言/砍价', '',
                                [
                                    { text: '取消' },
                                    { text: '留言/砍价',
                                        onPress: value => new Promise((resolve) => {
                                            if(value == ''){
                                                return Toast.fail('不能发布空内容！', 1);
                                            }
                                            Tool.post($extEvaluateAdd,{pid:self.state.motoData.id,content:value,tel:self.props.tel},function(data){
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
                        <div><span>新车含税{this.state.motoData.oriPrice/1000000}万</span>
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
                    <p>{this.state.motoData.content}</p>
                    {
                        this.state.motoData.imgUrls.split(',').map(i =>{
                            return <img src={i} />
                        })
                    }
                </div>

                <div className="sub-title">大家在说</div>
                <div className="content">

                    {
                        this.state.talks.map((item,index) =>{
                            return(
                                <div className="talk">
                                    <div className="name" data-flex="main:justify">
                                        <span>{item.tel}说:</span>
                                        <span>{getDateDiff(item.createTime)}</span>

                                    </div>
                                    <div className="text">{item.content}</div>
                                </div>
                            )
                        })
                    }
                    {
                        this.state.talks.length == 0 && <div style={{margin:'.2rem',color:'#bbb'}}>暂无，快来成为第一个砍价的人吧！</div>
                    }
                </div>
                <MyHotList {...this.props} data={this.props.state.myHotList}  paddingBottom="50px"/>

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


export default connect((state) => { return { state: state['MyList'],tel:state['User']['userInfo']['tel']} }, action())(Main);




