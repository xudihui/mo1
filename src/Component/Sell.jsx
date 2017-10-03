import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';
import { Tool, merged } from '../Tool';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
import ImageChoose from './ImageChoose';
import $ from './common/Jquery';
import { history,dataBrand,dataModel,dataCity } from './common/index';
import { List, Toast, WhiteSpace,InputItem,Picker,Checkbox,Button,Modal,Switch } from 'antd-mobile-web';
import { createForm } from 'rc-form';
import { district} from 'antd-mobile-demo-data';
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

var keys = Object.keys(dataCity);
var dataCity_ = [];
for(let i in keys ){
    var temp = {};
    temp.label = keys[i];
    temp.value = dataCity[keys[i]]
    dataCity_.push(temp)

}
dataCity_ = [dataCity_];


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
        //console.log(this.state);

        var images = {
            imgUrls:'',//车辆图片
            driLicense:'',//行驶证
            invoice:'',//购车发票

        };
        var imgUrls = this.refs.imgUrls.querySelectorAll('.imageChooseDone');
        var invoice = this.refs.invoice.querySelector('.imageChooseDone');
        var driLicense = this.refs.driLicense.querySelector('.imageChooseDone');
        var changeTab_ = this.props.changeTab_;
        for(let i in imgUrls){
            if(!isNaN(i)){
                if(i == 0){
                    images['imgUrls'] = imgUrls[i].getAttribute('src');
                }
                else{
                    images['imgUrls'] = images['imgUrls'] +','+imgUrls[i].getAttribute('src');
                }
            }
        }
        if(invoice){
            images['invoice'] = invoice.getAttribute('src')
        }
        if(driLicense){
            images['driLicense'] = driLicense.getAttribute('src')
        }

        console.log(Object.assign({},x,images));

        //数组转字符串;
        for(let i in x){
            if(i == 'hasAbs'){
                continue;
            }
            else if(i == 'oriPrice' || i == 'price'){
                x[i] = x[i]*100;//元转换为分;
            }
            if(x[i] instanceof Array){
                if(i == 'productDate'){
                    x[i] = x[i].join()+'-01-01';
                }
                else{
                    x[i] = x[i].join();
                }
            }
            if(!x[i]){
                return Toast.info('请补全信息！')
            }
        }
        if(images['imgUrls'] == ''){
            return Toast.info('请至少上传一张车辆照片！')
        }
        console.log(Object.assign({},x,images));

        Tool.post($extMotorAdd,Object.assign({},x,images),function(data){
            if(data.code == '0'){
                console.log(data);
                alert('恭喜你，发布成功！', '',[
                    { text: '立即查看', onPress: () => {changeTab_();
                        location.href = location.origin;
                } },
                ])
            }
            else{
                Toast.offline(data.msg)
            }
        })



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
            {
                "title": "丽水小霸王",
                "weight": "80",
                "hasAbs": "true",
                "content": "TTR 系，动力强，高速稳高速稳高速稳高速稳",
                "oriPrice": "88883",
                "productDate": [
                    "2011"
                ],
                "area": [
                    "330000",
                    "331100"
                ],
                "brand": [
                    "国产"
                ],
                "mileage": [
                    "2011"
                ],
                "price": "123213",
                "tel": "15067425400"
            }
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
                        {...getFieldProps('content')}
                        clear
                        placeholder="请输入文字简介"
                    >车辆简介</InputItem>
                    <List.Item
                        extra={<Switch
                            {...getFieldProps('hasAbs', {
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
                        extra="KG"
                        maxLength="9"
                    >车重</InputItem>
                    <InputItem
                        {...getFieldProps('oriPrice')}
                        clear
                        placeholder="请输入新车价格"
                        extra="元"
                        maxLength="7"
                    >新车含税价</InputItem>
                    <InputItem
                        {...getFieldProps('price')}
                        clear
                        placeholder="请输入想要卖的价格"
                        maxLength="7"
                        extra="元"
                    >售卖价格</InputItem>
                    <InputItem
                        {...getFieldProps('tel')}
                        clear
                        placeholder="联系方式"
                        maxLength="11"
                    >联系方式</InputItem>

                </List>
                <List renderHeader={() => '车辆图片(最多上传10张)'}>
                    <div className="cropWrap"  ref="imgUrls">
                        <ImageChoose />
                        <ImageChoose />
                        <ImageChoose />
                        <ImageChoose />
                        <ImageChoose />
                    </div>


                </List>
                <List renderHeader={() => '车辆行驶证(可选)'}>
                    <div className="cropWrap" ref="driLicense">
                        <ImageChoose />
                    </div>
                </List>
                <List renderHeader={() => '购车发票(可选)'}>
                    <div className="cropWrap" ref="invoice">
                        <ImageChoose />
                    </div>
                </List>
                <List renderHeader={() => '基本信息'}>
                  
                    <Picker
                        {...getFieldProps('productDate')}
                        data={years}
                        cascade={false}
                        extra="请选择(可选)"
                    >
                        <List.Item arrow="horizontal">出厂年份</List.Item>
                    </Picker>
                    <Picker
                        {...getFieldProps('area', {
                            initialValue: ['340000', '341500'],
                        })}
                        data={district}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                        extra="请选择(可选)"
                        cols = '2'

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
                        {...getFieldProps('mileage')}
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
