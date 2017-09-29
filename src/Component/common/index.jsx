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

/**
 * 城市区号 数据
 *
 * @export
 * @class data
 */
export const dataCity = {"北京市":"010","天津市":"022","上海市":"021","重庆市":"023","石家庄市":"0311","邯郸市":"0310","邢台市":"0319","保定市":"0312","张家口市":"0313","承德市":"0314","唐山市":"0315","秦皇岛市":"0335","沧州市":"0317","廊坊市":"0316","衡水市":"0318","福州市":"0591","厦门市":"0592","三明市":"0598","莆田市":"0594","泉州市":"0595","漳州市":"0596","南平市":"0599","宁德市":"0593","龙岩市":"0597","南昌市":"0791","景德镇市":"0798","新余市":"0790","九江市":"0792","鹰潭市":"0701","上饶市":"0793","宜春市":"0795","临川市":"0794","吉安市":"0796","赣州市":"0797","济南市":"0531","青岛市":"0532","淄博市":"0533","潍坊市":"0536","烟台市":"0535","威海市":"0631","泰安市":"0538","兖州市":"0537","日照市":"0633","德州市":"0534","郓城县":"0530","太原市":"0351","大同市":"0352","阳泉市":"0353","长治市":"0355","朔州市":"0349","榆次市":"0354","孝义市":"0358","临汾市":"0357","运城市":"0359","呼和浩特市":"0471","包头市":"0472","巴林左旗":"0476","二连浩特市":"0479","满洲里市":"0470","通辽市":"0475","准格尔旗":"0477","乌兰浩特市":"0482","郑州市":"0371","开封市":"0378","洛阳市":"0379","新乡市":"0373","濮阳市":"0393","商丘市":"0370","南阳市":"0377","周口市":"0394","汝南县":"0396","沈阳市":"024","大连市":"0411","鞍山市":"0412","抚顺市":"0413","本溪市":"0414","丹东市":"0415","锦州市":"0416","营口市":"0417","阜新市":"0418","辽阳市":"0419","铁岭市":"0410","武汉市":"027","黄石市":"0714","襄樊市":"0710","十堰市":"0719","宜昌市":"0717","荆门市":"0714","孝感市":"0712","黄冈市":"0713","恩施市":"0718","荆沙":"0716","长春市":"0431","吉林市":"0423","四平市":"0434","辽源市":"0437","通化市":"0435","临江市":"0439","大安市":"0436","敦化市":"0433","珲春市":"0440","长沙市":"0731","株州市":"0733","湘潭市":"0732","衡阳市":"0734","岳阳市":"0730","常德市":"0736","郴州市":"0735","益阳市":"0737","冷水滩":"0746","怀化市":"0745","张家界":"0744","哈尔滨市":"0451","齐齐哈尔市":"0452","大庆市":"0459","伊春市":"0458","牡丹江市":"0453","佳木斯市":"0454","缓化市":"0455","漠河县":"0457","黑河市":"0456","广州市":"020","深圳市":"0755","珠海市":"0756","汕头市":"0754","韶关市":"0751","惠州市":"0752","东莞市":"0769","中山市":"0760","佛山市":"0757","湛江市":"0759","南京市":"025","徐州市":"0516","连云港市":"0518","淮安市":"0517","宿迁市":"0527","盐城市":"0515","扬州市":"0514","南通市":"0513","镇江市":"0511","常州市":"0519","无锡市":"0510","苏州市":"0512","常熟市":"0520","治区南宁市":"0771","柳州市":"0772","桂林市":"0773","梧州市":"0774","北海市":"0779","钦州市":"0777","海口市":"0898","三亚市":"0899","儋州市":"0890","成都市":"028","攀枝花市":"0812","德阳市":"0838","绵阳市":"0816","自贡市":"0813","内江市":"0832","乐山市":"0833","泸州市":"0830","宜宾市":"0831","杭州市":"0571","宁波市":"0574","嘉兴市":"0573","湖州市":"0572","绍兴市":"0575","金华市":"0579","衢州市":"0570","舟山市":"0580","温州市":"0577","台州市":"0576","贵阳市":"0851","遵义市":"0852","安顺市":"0853","六盘水市":"0858","合肥市":"0551","淮南市":"0554","蚌埠市":"0552","马鞍山市":"0555","安庆市":"0556","黄山市":"0559","滁州市":"0550","宿州市":"0557","巢湖市":"0565","宣州市":"0563","昆明市":"0871","昭通市":"0870","曲靖市":"0874","江川市":"0877","思茅市":"0879","丽江县":"0888","开远市":"0873","楚雄市":"0878","西安市":"029","铜川市":"0919","宝鸡市":"0917","渭南市":"0913","商州市":"0914","拉萨市":"0891","日喀则市":"0892","仁布县08":"018","丁青县08":"059","阿里地区":"0897","兰州市":"0931","金昌市":"0935","天水市":"0938","平凉市":"0933","玉门市":"0937","敦煌市":"0937","西宁市":"0971","平安县":"0972","格尔木市":"0979","玛沁县":"0975","银川市":"0951","石嘴山市":"0952","青铜峡市":"0953","海原县":"0954","乌鲁木齐市":"0991","克拉玛依市":"0990","吐鲁番市":"0995","喀什市":"0998","阿图什市":"0908","库尔勒市":"0996","香港":"00852","澳门":"00853","台湾":"00886"}