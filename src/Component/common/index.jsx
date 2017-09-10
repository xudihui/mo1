import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory,hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../../Action/Index';
import { Tool, merged } from '../../Tool';
import GetData from './GetData';
import GetNextPage from './GetNextPage';
import { Toast } from 'antd-mobile-web';

export { GetData, GetNextPage }
/**
 * (加载动画)
 *
 * @class DataLoad
 * @extends {Component}
 */
export class Empty extends Component {
    render() {
        return (
            <div className="none">
                {this.props.text}
            </div>
        );
    }
}
export class DataLoad extends Component {
    render() {
        let {loadAnimation, loadMsg} = this.props;
        return (
        <div>
            <div className={'data-load data-load-' + loadAnimation}>
                <div className="msg">{loadMsg}</div>
            </div>

        </div>
        );
    }
}
DataLoad.defaultProps = {
    loadAnimation: true, //默认显示加载动画
    loadMsg: '正在加载中'
}

/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */
export class Header extends Component {
    render() {
        let {title, leftTo, leftIcon, rightTo, rightIcon, rightClick } = this.props;
        let left = null;

        if (leftTo && leftIcon) {
            left = (
                <Link to={leftTo}>
                    <i className={'iconfont icon-' + leftIcon}></i>
                </Link>
            );
        } else if (leftIcon === 'fanhui') { //返回上一页
            left = (
                <a onClick={this.context.router.goBack}>
                    <i className={'iconfont icon-' + leftIcon}></i>
                </a>
            );
        }

        let right = null;
        if (rightTo && rightIcon) {
            right = (
                <Link to={rightTo}>
                    <i className={'iconfont icon-' + rightIcon}></i>
                </Link>
            );
        } else if (rightClick && rightIcon) {
            right = (
                <div onClick={rightClick}>
                    <i className={'iconfont icon-' + rightIcon}></i>
                </div>
            );
        }
        return (
            <header className="common-header" data-flex>
                <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    {left}
                </div>
                <h2 className="title" data-flex-box="1">{title}</h2>
                <div className="icon" data-flex="main:center cross:center" data-flex-box="0">
                    {right}
                </div>
            </header>
        );
    }
}
Header.contextTypes = {
    router: React.PropTypes.object.isRequired
}


/**
 * 暂无记录
 *
 * @export
 * @class DataNull
 * @extends {Component}
 */
export class DataNull extends Component {
    render() {
        return (
            <div>暂无记录</div>
        );
    }
}

/**
 * 底部导航菜单
 *
 * @export
 * @class Footer
 * @extends {Component}
 */
class FooterInit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageCount: 0
        };

        this.getMessageCount = () => {
            var accesstoken = this.props.User ? this.props.User.accesstoken : '';
            if (accesstoken) {
                Tool.get('/api/v1/message/count', { accesstoken }, (res) => {
                    this.setState({
                        messageCount: res.data
                    });
                });
            }
        }
    }
    render() {
        var myUrl = this.props.User && this.props.User.loginname ? '/user/' + this.props.User.loginname : '/signin';
        var arr = [];
        arr[this.props.index] = 'on';
        return (
            <footer className="common-footer">
                <div className="zhanwei"></div>
                <ul className="menu" data-flex="box:mean">
                    <li className={arr[0]}>
                        <Link to="/">
                            <i className="iconfont icon-shouye"></i>首页
                        </Link>
                    </li>
                    <li className={arr[1]}>
                        <Link to="/topic/create">
                            <i className="iconfont icon-fabu"></i>发表
                        </Link>
                    </li>
                    <li className={arr[2]}>
                        <Link to="/my/messages">
                            <i className="iconfont icon-xiaoxi"></i>消息{this.state.messageCount > 0 ? <em>{this.state.messageCount}</em> : ''}
                        </Link>
                    </li>
                    <li className={arr[3]}>
                        <Link to={myUrl}>
                            <i className="iconfont icon-wode"></i>我的
                        </Link>
                    </li>
                </ul>
            </footer>
        );
    }
    componentDidMount() {
        this.getMessageCount();
    }
    shouldComponentUpdate(np, ns) {
        return this.props.index !== np.index || this.state.messageCount !== ns.messageCount; //防止组件不必要的更新
    }
    componentDidUpdate() {
        this.getMessageCount();
    }
}
FooterInit.defaultProps = {
    index: 0
};

var Footer = connect((state) => { return { User: state.User }; }, action('User'))(FooterInit);

export { Footer }
/**
 * 提示登录
 *
 * @export
 * @class TipMsgSignin
 * @extends {Component}
 */
export class TipMsgSignin extends Component {
    render() {
        return (
            <div className="tip-msg-signin">
                你还未登录，请先<Link to="/signin">登录</Link>
            </div>
        );
    }
}

/**
 * 用户头像
 *
 * @export
 * @class UserHeadImg
 * @extends {Component}
 */
export class UserHeadImg extends Component {
    render() {
        return (<div className="user-headimg" style={{ backgroundImage: 'url(' + this.props.url + ')' }}></div>)
    }
}

/**
 * 生成主题类型小图标
 *
 * @export
 * @class tabIcon
 * @extends {Component}
 */
export class TabIcon extends Component {
    render() {
        var {tab, top, good} = this.props;

        if (top) {
            tab = 'top';
        } else if (good) {
            tab = 'good';
        }

        return (
            <i className={'iconfont icon-' + tab}></i>
        );
    }
}


/**
 * 生成头部返回菜单
 *
 * @export
 * @class topNavBar
 * @extends {Component}
 */
export class TopNavBar extends Component {
    constructor(props) {
        super(props);
    }
    handlerShare(){
        var options = {
            message: 'share this', // not supported on some apps (Facebook, Instagram)
            subject: 'the subject', // fi. for email
            files: ['http://icon.nipic.com/BannerPic/20170829/original/20170829132344_1.jpg'], // an array of filenames either locally or remotely
            url: 'https://segmentfault.com/a/1190000002933971',
            chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
        }

        var onSuccess = function(result) {
            Toast.info('成功！')
        }

        var onError = function(msg) {
            Toast.info('分享失败')
        }
        try{
            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        }catch(e){
            Toast.info('请在APP中进行分享！')
        }

    }
    render() {
        const { title,handlerClick,transparent,share } = this.props;
        const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory
        var self = this;
        return (
            <div data-flex="dir:left box:first cross:center" className={`topNavBar ${transparent == '0' ? 'transparent' : ''}`}  style={{background:`rgba(255,255,255,${transparent == 'none' ? 1 : transparent})`}}>
                    <span data-flex="dir:left" onClick={() => {
                        !handlerClick ?  history.goBack() : handlerClick()
                    }}>
                        <i className="iconfont icon-xiangzuojiantou"></i>
                        <b></b>
                    </span>
                <span>{title || '暂无标题'}</span>
                {
                   share && <i onClick={self.handlerShare} className="iconfont icon-lingcunwei" style={{position:'absolute',right:'10px',width:'25px'}}></i>
                }
            </div>
        );
    }
}


/**
 * history 开发环境用浏览器地址，生产发布使用hash路由
 *
 * @export
 * @class history
 */
export const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;


/**
 * 摩托车型 数据
 *
 * @export
 * @class data
 */
export const dataModel = ["公路", "街车", "越野", "拉力", "踏板", "弯梁", "巡航", "太子", "复古", "三轮", "ATV", "攀爬", "迷你", "电摩", "拖车", "汽车", "其他"];

/**
 * 摩托品牌 数据
 *
 * @export
 * @class data
 */
export const dataBrand = ["国产", "Aprilia", "Benelli", "BMW", "Buell", "Cagiva", "Can-Am", "Ducati", "GASGAS", "Harley-Davidson", "Honda", "Husaberg", "Husqvarna", "Indian", "Kawasaki", "KTM", "Moto Guzzi", "MV Agusta", "Piaggio", "Suzuki", "Triumph", "Vespa", "Yamaha", "其他", "汽车", "VICTORY"];

