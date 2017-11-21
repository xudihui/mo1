import React, { Component, PropTypes } from 'react';
import { Steps, WhiteSpace, Button, NoticeBar, Icon, Accordion, List  } from 'antd-mobile-web'
import { TopNavBar} from './common/index';
const Step = Steps.Step;
const steps = [{
    title: 'APP选车',
    description: '在APP中查看心仪车型',
}, {
    title: '交付定金',
    description: 'This is description',
}, {
    title: '线下交易',
    description: 'This is description',
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

class Main extends Component {
    render() {
        return (
            <div >
                <TopNavBar title="卖车进度"/>
                <div style={{padding:'.5rem .1rem'}}>
                    <Steps size="small" current={1}>
                        <Step title="APP选车" description="我们的初衷是撮合个人直接卖给个人，没有中间商赚差价。
在摩一平台上，车源均为8年15万公里以内的个人二手车，并通过摩一专业评估师的五维立体检测，从源头保障车况" />
                        <Step title="交付定金" description="销售陪同看车、协助议价," />
                        <Step title="线下交易" description="14天可退2年质保,无忧" />
                    </Steps>
                </div>

            </div>
        );
    }
}

export default Main;
//export default Main;
