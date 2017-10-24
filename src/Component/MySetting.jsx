import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { history,dataBrand,dataModel,dataCity,TopNavBar,dataCityNo } from './common/index';
import { Modal,List ,InputItem,Grid,NoticeBar, WhiteSpace,Toast, Icon,Menu, ActivityIndicator, NavBar,Carousel,TabBar,SearchBar,Badge, Button,WingBlank,Flex,PlaceHolder } from 'antd-mobile-web';
import ImageChoose from './ImageChoose';
import { createForm } from 'rc-form';
import { Tool, merged } from '../Tool';
const alert = Modal.alert;
import myHead from '../Images/logo.png';
/**
 * 模块入口
 *
 * @class Main
 * @extends {Component}
 */

/**
 * (循环列表)
 *
 * @class List
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {login} = this.props;
        return (
            <div className="mySetting" >
                <TopNavBar title="设置" share={true} />
                <div className="myTop">
                    <img className="myImg" src={myHead} />
                    <p>
                        <i className="iconfont icon-huo"></i>版本号：v0.1.2
                    </p>

                </div>
                <List className="my-list">
                    <List.Item extra="v0.1.2" arrow="horizontal"  onClick={() => {Toast.success('已是最新版本')}}>检查更新</List.Item>
                    <List.Item extra="" arrow="horizontal" onClick={() => {location.href='tel:15067425400'}}>联系客服</List.Item>
                    <Link  to="/help">
                        <List.Item extra="" arrow="horizontal" onClick={() => {}}>关于我们</List.Item>
                    </Link>
                </List>
                <div className="btnWrap">
                    <Button className="btn" type="warning"  onClick={() => {
                        alert('提示','确认退出登录吗？', [
                            { text: '朕再想想', onPress: () => {

                            } },
                            { text: '立即退出', onPress: () =>{
                                login('');
                                history.goBack();
                            }}
                        ])
                    }}>退出当前账号</Button>
                </div>
            </div>
        );
    }
}
const TextareaItemExampleWrapper = createForm()(Main);


export default connect((state) => { return { state: state['User'] } },action())(TextareaItemExampleWrapper);



