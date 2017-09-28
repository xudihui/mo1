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
 * 微信分享
 *
 * @export
 * @class data
 * SHARE(1,'send-link-thumb-remote')
 */
var SHARE_ = function (scene, id) {
    if (typeof Wechat === "undefined") {
        alert("暂不支持微信分享！");
        return false;
    }
    var params = {
        scene: scene //0是会话，1是朋友圈，2是收藏
    };

    if (id == 'send-text') {
        params.text = "人文的东西并不是体现在你看得到的方面，它更多的体现在你看不到的那些方面，它会影响每一个功能，这才是最本质的。但是，对这点可能很多人没有思考过，以为人文的东西就是我们搞一个很小清新的图片什么的。”综合来看，人文的东西其实是贯穿整个产品的脉络，或者说是它的灵魂所在。";
    } else {
        params.message = {
            title: "[TEST]" + id,
            description: "[TEST]Sending from test application",
            mediaTagName: "TEST-TAG-001",
            messageExt: "这是第三方带的测试字段",
            messageAction: "<action>dotalist</action>",
            media: {}
        };

        switch (id) {
            case 'check-installed':
                Wechat.isInstalled(function (installed) {
                    alert("Wechat installed: " + (installed ? "Yes" : "No"));
                });
                return true;

            case 'send-photo-local':
                params.message.media.type = Wechat.Type.IMAGE;
                params.message.media.image = "www/img/res1.jpg";
                break;

            case 'send-photo-remote':
                params.message.media.type = Wechat.Type.IMAGE;
                params.message.media.image = "https://cordova.apache.org/images/cordova_256.png";
                params.message.media.image = "https://cordova.apache.org/images/cordova_256.png";
                params.message.media.image = "https://cordova.apache.org/images/cordova_256.png";
                break;

            case 'send-link-thumb-local':
                params.message.title = "1";
                params.message.description = "2";
                params.message.thumb = "www/img/res2.png";
                params.message.media.type = Wechat.Type.LINK;
                params.message.media.webpageUrl = "http://tech.qq.com/";
                break;

            case 'send-link-thumb-remote':
                params.message.title = "摩一二手车";
                params.message.description = "最好最全的二手摩托车平台";
                params.message.thumb = "https://mmbiz.qlogo.cn/mmbiz_png/QbXdibkhIGqM7grEg1icHTU3cuoeicmkCufbgOvS5gZE7jWfByYh4OvX18sP2gZsn5mopS592wVWY3uJKM3pSq6Yw/0?wx_fmt=jpg";
                params.message.media.type = Wechat.Type.LINK;
                params.message.media.webpageUrl = "http://tech.qq.com/";
                break;

            case 'send-music':
                params.message.title = "一无所有";
                params.message.description = "崔健";
                params.message.thumb = "www/img/res3.jpg";
                params.message.media.type = Wechat.Type.MUSIC;
                params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D";
                params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
                break;

            case 'send-video':
                params.message.title = "乔布斯访谈";
                params.message.description = "饿着肚皮，傻逼着。";
                params.message.thumb = "www/img/res7.png";
                params.message.media.type = Wechat.Type.VIDEO;
                params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
                break;

            case 'send-app':
                params.message.title = "App消息";
                params.message.description = "这种消息只有App自己才能理解，由App指定打开方式！";
                params.message.thumb = "www/img/res2.jpg";
                params.message.media.type = Wechat.Type.APP;
                params.message.media.extInfo = "<xml>extend info</xml>";
                params.message.media.url = "http://weixin.qq.com";
                break;

            case 'send-nongif':
                params.message.thumb = "www/img/res5thumb.png";
                params.message.media.type = Wechat.Type.EMOTION;
                params.message.media.emotion = "www/img/res5.jpg";
                break;

            case 'send-gif':
                params.message.thumb = "www/img/res6thumb.png";
                params.message.media.type = Wechat.Type.EMOTION;
                params.message.media.emotion = "www/img/res6.gif";
                break;

            case 'send-file':
                params.message.title = "iphone4.pdf";
                params.message.description = "Pro CoreData";
                params.message.thumb = "www/img/res2.jpg";
                params.message.media.type = Wechat.Type.FILE;
                params.message.media.file = "www/resources/iphone4.pdf";
                break;

            case 'auth':
                Wechat.auth("snsapi_userinfo", function (response) {
                    // you may use response.code to get the access token.
                    alert(JSON.stringify(response));
                }, function (reason) {
                    alert("Failed: " + reason);
                });
                return true;

            default:
                alert(id + " can not be recognized!");
                return false;
        }
    }

    Wechat.share(params, function () {
        alert("Success");
    }, function (reason) {
        alert("Failed: " + reason);
    });
    return true;
};

export const SHARE = SHARE_;

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
        SHARE_(1,'send-link-thumb-remote');
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
