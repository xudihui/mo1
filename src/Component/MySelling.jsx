import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { history } from './common/index';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData,GetNextPage,TopNavBar } from './common/index';
import { SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder,Modal } from 'antd-mobile-web';

import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
const data = [1,2,3,4]
/**
 * 正在出售车辆
 *
 * @param {Object} mySeting
 * @returns
 */


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    title:"雅马哈666",
                    props:'2343290898',
                    id:'1'
                },
                {
                    title:"托雷斯666",
                    props:'2343290898',
                    id:'2'
                },
                {
                    title:"曼哈顿666",
                    props:'2343290898',
                    id:'3'
                }
            ]
        }
    }
    handleCheck(e){


    }
    handleClick(e){
// 阻止合成事件与最外层document上的事件间的冒泡
        e.nativeEvent.stopImmediatePropagation();
    }
    componentDidMount(){
    }
    handlerDel(id){
        var arr = this.state.data;

        for(let i in this.state.data){
            if(this.state.data[i]['id'] == id){
                console.log(i);
                arr.splice(i,1);
                this.setState({
                    data:arr
                })
            }
        }
    }
    render() {
        return (
            <div>
                <TopNavBar title="在售车辆" handlerClick={() => {
                    sessionStorage.setItem('selectedTab','My');
                    history.push('/')
                }} />
                <div className="navMargin"></div>
                <div>
                    {
                        this.state.data.map(i => {
                            return(
                                <div>
                                    <div className="rowMoto">
                                        <div data-flex="dir:left main:left">
                                            <img src={a2} alt="icon" data-flex-box="0"/>
                                            <div className="rowMotoText" data-flex-box="1" >
                                                <div >
                                                    {i.title}
                                                </div>
                                                <div >
                                                    {i.props}
                                                </div>
                                                    <p onClick={() => {
                                                        history.push('/SellEdit')
                                                    }}><i className="iconfont icon-edit" />编辑</p>
                                                    <p onClick={() =>{Modal.alert('删除', `确定删除${i.title}么???`, [
                                                        { text: '取消', onPress: () => console.log('cancel') },
                                                        { text: '确定', onPress: () => this.handlerDel(i.id)},
                                                    ])}}><i className="iconfont icon-delete" />删除</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{background:'#eee',height:'1px'}}></div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default connect((state) => { return { state: state['MyList']} }, action())(Main);
