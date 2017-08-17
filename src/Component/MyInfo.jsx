import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { DataLoad, DataNull, Header, TipMsgSignin, UserHeadImg, TabIcon, GetData } from './common/index';

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

class ListNew extends Component {
    constructor(props) {
        super(props);
        this.state = {carType:['未知','居民身份证','护照','军官证','驾照','港澳回乡证或台胞证']}
    }
    //伸缩菜单项
    toggle_(e){
        var p = e.target.parentElement;
        p.setAttribute('class','detailList ' + (p.getAttribute('class').indexOf('true') > -1 ? 'false' : 'true'));
    }
    render() {
        var list = this.props.list;
        var {applyInfo,bizInfoList,applicationInfo,postAddress,owner,insured,carMsg,forceInfo} = list;
        return (
            <ul className="index-list">
                <li className="detailList true"><h3 data-flex="main:justify" className="true"><span>{list.title}</span>
                    <span>
                                    {
                                        this.props.time && parseInt(this.props.time.replace(/\-/g,'')) - parseInt(applyInfo.policyEndTime.replace(/\-/g,'')) > -1 ? '已失效' : '已生效'
                                    }
                    </span>
                </h3>
                    <div className="content">
                        <div className="line"></div>
                        <div className="detailLine" data-flex="dir:left">
                            <span>平安财产险承保</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>投保单号</span>
                            <span>{applyInfo.applyNo}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>保单号</span>
                            <span>{applyInfo.policyNo}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>订单号</span>
                            <span>{applyInfo.orderNo}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>投保单类型</span>
                            <span>{applyInfo.applyType == '1' ? '新保' : '续保'}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>投保日期</span>
                            <span>{applyInfo.applyTime}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>出单日期</span>
                            <span>{applyInfo.policyTime}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>起保日期</span>
                            <span>{applyInfo.policyBeginTime}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>终止日期</span>
                            <span>{applyInfo.policyEndTime}</span>
                        </div>
                        { forceInfo && <div>
                                    <div className="detailLine" data-flex="main:justify">
                                        <span>交强险保费</span>
                                        <span>{forceInfo.forcePremium}</span>
                                    </div>
                                    <div className="detailLine" data-flex="main:justify">
                                        <span>车船税保费</span>
                                        <span>{forceInfo.taxPremium}</span>
                                    </div>
                                    <div className="detailLine" data-flex="main:justify">
                                        <span>交强险总保费</span>
                                        <span>{forceInfo.forceTotalPremium}</span>
                                    </div>
                                </div>
                        }
                        { bizInfoList && bizInfoList.map(function(item,index){
                            return(
                                <div className='wrap' key={index}>
                                    <div className="detailLine" data-flex="main:justify">
                                        <span data-flex-box="0">商业险描述</span>
                                        <span>{item.bizDesc}</span>
                                    </div>
                                    <div className="detailLine" data-flex="main:justify">
                                        <span>商业险保费</span>
                                        <span>{item.bizAmount}</span>
                                    </div>
                                    <div className="detailLine" data-flex="main:justify">
                                        <span>商业险保额</span>
                                        <span>{item.bizPremium}</span>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div></li>
                <li className="detailList true"><h3 onClick={ this.toggle_.bind(this) } data-flex="main:justify" className="true"><span>投保人信息</span><span><i className="icon iconfont icon-arrow-right"></i></span></h3>
                    <div className="content">
                        <div className="line"></div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>投保人姓名</span>
                            <span>{applicationInfo.applicantName}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>性别</span>
                            <span>{applicationInfo.applicantSex == 'F' ? '女' : '男'}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>证件类型</span>
                            <span>{this.state.carType[parseInt(applicationInfo.applicantIdType)]}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>证件号码</span>
                            <span>{applicationInfo.applicantIdNo}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>手机号</span>
                            <span>{applicationInfo.applicantMobile}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>邮箱地址</span>
                            <span>{applicationInfo.applicantEmail}</span>
                        </div>
                    </div></li>
                <li className="detailList true"><h3 onClick={ this.toggle_.bind(this) } data-flex="main:justify" className="true"><span>车主信息</span><span><i className="icon iconfont icon-arrow-right"></i></span></h3>
                    <div className="content">
                        <div className="line"></div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>投保人姓名</span>
                            <span>{owner.ownerName}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>性别</span>
                            <span>{owner.ownerSex == 'F' ? '女' : '男'}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>证件类型</span>
                            <span>{this.state.carType[parseInt(owner.ownerIdType)]}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>证件号码</span>
                            <span>{owner.ownerIdNo}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>手机号</span>
                            <span>{insured.insuredMobile}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>邮箱地址</span>
                            <span>{applicationInfo.applicantEmail}</span>
                        </div>
                    </div></li>
                <li className="detailList true"><h3 onClick={ this.toggle_.bind(this) } data-flex="main:justify" className="true"><span>车辆信息</span><span><i className="icon iconfont icon-arrow-right"></i></span></h3>
                    <div className="content">
                        <div className="line"></div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>车牌号</span>
                            <span>{carMsg.licenseNo}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>城市</span>
                            <span>{carMsg.cityName}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>上牌情况</span>
                            <span>{carMsg.noLicenseFlag == '1' ? '未上牌' : '上牌'}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>车辆型号</span>
                            <span>{carMsg.vehicleModelName}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>车架号</span>
                            <span>{carMsg.vehicleFrameNo}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>发动机号</span>
                            <span>{carMsg.engineNo}</span>
                        </div>
                        { carMsg.specialCarDate &&
                            <div>
                                <div className="detailLine" data-flex="main:justify">
                                    <span>是否过户</span>
                                    <span>{carMsg.specialCarDate}</span>
                                </div>
                                <div className="detailLine" data-flex="main:justify">
                                    <span>过户日期</span>
                                    <span>{carMsg.specialCarFlag}</span>
                                </div>
                            </div>
                        }

                        <div className="detailLine" data-flex="main:justify">
                            <span>初登日期</span>
                            <span>{carMsg.firstRegisterDate}</span>
                        </div>
                    </div></li>
                <li className="detailList true"><h3 onClick={ this.toggle_.bind(this) } data-flex="main:justify" className="true"><span>寄送信息</span><span><i className="icon iconfont icon-arrow-right"></i></span></h3>
                    <div className="content">
                        <div className="line"></div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>收件人姓名</span>
                            <span>{postAddress.addresseeName}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span>手机号</span>
                            <span>{postAddress.addresseeMobile}</span>
                        </div>
                        <div className="detailLine" data-flex="main:justify">
                            <span data-flex-box="0">详细地址</span>
                            <span>{postAddress.addresseeDetails}</span>
                        </div>
                    </div></li>
            </ul>
        );
    }
}


class Main extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
            var id = this.props.params.id;
            var {data} = this.props.state
            var main = data ? <Content {...this.props}></Content> : <div>null</div>;

            return (
                <div>
                    {main}
                </div>
            );

    }
}


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {a:222};
    }
    render() {
        var {data} = this.props.state.data;
        console.log('myDetail',data);
        return (
            <div className="index-list-box" >
                <ListNew {...this.props} list={data[0]} />
            </div>
        );
    }
}





Main.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default connect((state) => { return { state: state['MyList'], time: state['User']['time'] } })(Main);



