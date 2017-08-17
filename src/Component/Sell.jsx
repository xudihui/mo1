import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
import ImageChoose from './ImageChoose';
import { List, TextareaItem, WhiteSpace,InputItem,Picker,Checkbox } from 'antd-mobile-web';
import { createForm } from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const data = [
    { value: 0, label: '有发票' },
    { value: 1, label: '有合格证' },
    { value: 2, label: '有牌照' },
    { value: 3, label: '大贸车' },
];
const years = [
    [
        {
            label: '2011',
            value: '2011',
        },
        {
            label: '2012',
            value: '2012',
        },
        {
            label: '2013',
            value: '2013',
        },
        {
            label: '2014',
            value: '2014',
        },
        {
            label: '2015',
            value: '2015',
        },
        {
            label: '2016',
            value: '2016',
        }
    ]
];

const times = [
    [
        {
            label: '请在晚22点以前联系我 ',
            value: '请在晚22点以前联系我 ',
        },
        {
            label: '请在工作时间联系我 ',
            value: '请在工作时间联系我 ',
        },
        {
            label: '随时联系我 ',
            value: '随时联系我 ',
        }
    ]
];
const provinces = [
    [
        {
            label: '缙云',
            value: '缙云 ',
        },
        {
            label: '松阳 ',
            value: '松阳 ',
        },
        {
            label: '云和 ',
            value: '云和 ',
        }
    ]
];
class TextareaItemExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <List renderHeader={() => '车辆图片(最多上传10张)'}>
                    <ImageChoose />
                </List>
                <List renderHeader={() => '完善车辆信息能增加价格哦'}>
                    <InputItem

                        clear
                        placeholder="请输入标题"
                    >车辆标题</InputItem>
                    <Picker
                        data={years}
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue}
                        onChange={v => this.setState({ sValue: v })}
                    >
                        <List.Item arrow="horizontal">出厂年份</List.Item>
                    </Picker>
                    <Picker
                        data={provinces}
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue1}
                        onChange={v => this.setState({ sValue1: v })}
                    >
                        <List.Item arrow="horizontal">所在地区</List.Item>
                    </Picker>
                    <Picker
                        data={years}
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue2}
                        onChange={v => this.setState({ sValue2: v })}
                    >
                        <List.Item arrow="horizontal">车型类别</List.Item>
                    </Picker>
                    <Picker
                        data={years}
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue3}
                        onChange={v => this.setState({ sValue3: v })}
                    >
                        <List.Item arrow="horizontal">品牌车型</List.Item>
                    </Picker>
                    <Picker
                        data={years}
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue4}
                        onChange={v => this.setState({ sValue4: v })}
                    >
                        <List.Item arrow="horizontal">行驶里程</List.Item>
                    </Picker>
                    <Picker
                        data={times}
                        cascade={false}
                        extra="请选择(可选)"
                        value={this.state.sValue5}
                        onChange={v => this.setState({ sValue5: v })}
                    >
                        <List.Item arrow="horizontal">联系时间</List.Item>
                    </Picker>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '车辆手续'}>
                    {data.map(i => (
                        <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>
                <List renderHeader={() => '价格/车主'}>
                    <InputItem
                        clear
                        placeholder="请输入想要卖的价格"
                    >预售价格</InputItem>
                    <InputItem
                        clear
                        placeholder="联系姓名"
                    >联系姓名</InputItem>
                    <InputItem
                        clear
                        placeholder="联系方式"
                    >联系方式</InputItem>
                </List>
                <WhiteSpace />
                <List renderHeader={() => '卖家有话说'}>
                    <TextareaItem
                        {...getFieldProps('卖家有话说', {
                            initialValue: '请输入您对爱车的寄语...',
                        })}
                        rows={5}
                        count={100}
                    />
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
            </div>
        );
    }
}

const TextareaItemExampleWrapper = createForm()(TextareaItemExample);

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
export default TextareaItemExampleWrapper;
