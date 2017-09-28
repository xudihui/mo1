import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
import ImageChoose from './ImageChoose';
import $ from './common/Jquery';
import { history,dataBrand,dataModel } from './common/index';
import { List, Toast, WhiteSpace,InputItem,Picker,Checkbox,Button,Modal,Switch } from 'antd-mobile-web';
import { createForm } from 'rc-form';

const alert = Modal.alert;
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

const dataBrand_ = [dataBrand.map(i => {
    var temp = {};
    temp.label = i;
    temp.value = i;
    return temp;
})];

const dataModel_ = [dataModel.map(i => {
    var temp = {};
    temp.label = i;
    temp.value = i;
    return temp;
})];

class TextareaItemExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            cut:a2
        };
    }
    handlerClick(){
        var x = this.props.form.getFieldsValue();
        console.log(this.state);
        console.log(x);
        for(let i in x){
            console.log(i)
            if(!x[i]){
                return Toast.info('请补全信息！')
            }
        }
        console.log(JSON.stringify(x))
        alert('恭喜你，发布成功！', '',[
            { text: '立即查看', onPress: () => history.replace('/MySelling') },
        ])
    }
    onChange(val){
        console.log(val);
    }
    autoFillInput(){
        var x = this.props.form.getFieldsValue();

        for(let i in x){
            x[i] = '111';
        }
        this.props.form.setFieldsValue(
            {"title":"12321","weight":"80KG","Switch1":"true","desc":"一般般啦","newPrice":"213213","year":["2011"],"provinces":["缙云 "],"model":["公路"],"brand":["国产"],"mile":["2011"],"time":["请在晚22点以前联系我 "],"sellPrice":"123213","name":"阿辉","mobile":"15067425400"}
        );
    }

    render() {
        const { getFieldProps,getFieldError  } = this.props.form;
        console.log('jQuery',$('body'))
        let errors;
        return (
            <div>

                <List renderHeader={() => '完善车辆信息能增加价格哦'}>
                    <InputItem
                        {...getFieldProps('title')}
                        clear
                        placeholder="请输入标题"
                    >车辆标题</InputItem>
                    <InputItem
                        {...getFieldProps('desc')}
                        clear
                        placeholder="请输入文字简介"
                    >车辆简介</InputItem>
                    <List.Item
                        extra={<Switch
                            {...getFieldProps('Switch1', {
                                initialValue: false,
                                valuePropName: 'checked',
                            })}
                            onClick={(checked) => { console.log(checked); }}
                        />}
                    >是否含有ABS</List.Item>
                    <InputItem
                        {...getFieldProps('weight')}
                        clear
                        placeholder="车重"
                    >车重</InputItem>
                    <InputItem
                        {...getFieldProps('newPrice')}
                        clear
                        placeholder="请输入新车价格"
                    >新车含税价</InputItem>
                    <InputItem
                        {...getFieldProps('sellPrice')}
                        clear
                        placeholder="请输入想要卖的价格"
                    >售卖价格</InputItem>
                    <InputItem
                        {...getFieldProps('mobile')}
                        clear
                        placeholder="联系方式"
                    >联系方式</InputItem>

                </List>
                <List renderHeader={() => '车辆图片(最多上传10张)'}>
                    <ImageChoose />
                </List>
                <List renderHeader={() => '车辆行驶证(可选)'}>
                    <ImageChoose />
                </List>
                <List renderHeader={() => '购车发票(可选)'}>
                    <ImageChoose />
                </List>
                <List renderHeader={() => '基本信息'}>
                  
                    <Picker
                        {...getFieldProps('year')}
                        data={years}
                        cascade={false}
                        extra="请选择(可选)"
                    >
                        <List.Item arrow="horizontal">出厂年份</List.Item>
                    </Picker>
                    <Picker
                        {...getFieldProps('provinces')}
                        data={provinces}
                        cascade={false}
                        extra="请选择(可选)"
                    >
                        <List.Item arrow="horizontal">所在地区</List.Item>
                    </Picker>
                    <Picker
                        {...getFieldProps('brand')}
                        data={dataBrand_}
                        cascade={false}
                        extra="请选择(可选)"
                    >
                        <List.Item arrow="horizontal">品牌车型</List.Item>
                    </Picker>
                    <Picker
                        {...getFieldProps('mile')}
                        data={years}
                        cascade={false}
                        extra="请选择(可选)"
                    >
                        <List.Item arrow="horizontal">行驶里程</List.Item>
                    </Picker>
                </List>
                <WhiteSpace />
                <div className="btnWrap">
                    <Button className="btn" onClick={() => this.handlerClick()} type="primary">确认卖车</Button>
                </div>
                <div className="btnWrap">
                    <Button className="btn" onClick={() => this.autoFillInput()} type="primary">自动填充表单</Button>
                </div>
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
