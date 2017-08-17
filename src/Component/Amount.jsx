import React, { Component, PropTypes } from 'react';
import { Button, Flex, WhiteSpace,WingBlank  } from 'antd-mobile-web';
import cxye from '../Images/img_cxye.png'
const style = `
   .amountTop {
    position: relative;
    margin-bottom: 25px;
    width: 100%;
    height: 220px;
    background: url(${cxye}) top center no-repeat;
    background-size: 100% auto;
    overflow: hidden;
}
.amountTop .mun {
    margin-top: 70px;
    color: #fff;
    text-align: center;
    font-size: 36px;
}
.det p {
    margin-left: 20px;
    color: #666;
    font-size: 12px;
    line-height: 20px;
}
.left {
    float: left;
    position: relative;
}
.wrap {
    margin: 20px 15px 10px;
}
`;



const Main = () => (
        <div>
            <style dangerouslySetInnerHTML={{ __html: style }}></style>
            <div className="page-content page_white">
                <div className="amountTop">
                    <p className="mun">1.00元</p>
                </div>
                <div className="wrap">
                    <div className="left"><i className="iconfont icon-tips"></i></div>
                    <div className="det">
                        <p className="J_typeText">您的电子公交卡正享受乘车杭州主城区乘车91折优惠。</p>
                        <p>更多优惠在逐步开放中，敬请期待！</p>
                        <p>二维码公交扣款存在延时，余额变动请以实际乘车为准。</p>
                    </div>
                </div>
            </div>
            <WhiteSpace size="lg" />
            <WingBlank size="xg">
                <Button className="btn" type="primary">充值</Button>
            </WingBlank>
        </div>
);
export default Main;
