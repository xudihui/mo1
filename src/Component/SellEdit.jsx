import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import ImageChoose from './ImageChoose';
import { history,dataBrand,dataModel,dataCity,TopNavBar,dataCityNo } from './common/index';
import { List, Toast, WhiteSpace,InputItem,Picker,Checkbox,Button,Modal,Switch,TextareaItem } from 'antd-mobile-web';
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
            label: '2010',
            value: '2010',
        },
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
        },
        {
            label: '2017',
            value: '2017',
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

var keys_dataCityNo = Object.keys(dataCityNo);
var arr_dataCityNo = [];
var m = 0;
for(let i in keys_dataCityNo){
    if(isNaN(i)){
        continue;
    }
    var temp = {
        label:dataCityNo[keys_dataCityNo[i]],
        value:keys_dataCityNo[i],
        children:[]
    }
    if(keys_dataCityNo[i].indexOf('0000') > -1){
        if(m != 0){
            arr_dataCityNo.push(m);
        }
        m = {
            label:dataCityNo[keys_dataCityNo[i]],
            value:keys_dataCityNo[i],
            children:[]
        }
    }else{
        var temp = {
            label:dataCityNo[keys_dataCityNo[i]],
            value:keys_dataCityNo[i]
        }
        m.children.push(temp)
    }
}
class TextareaItemExample extends Component {
    constructor(props) {
        super(props);
        var queryKeys = Object.keys(props.state.path);
        var id = props.location.query.id;
        var current = '';
        for(let i in queryKeys){
            if(queryKeys[i].indexOf('MySellList') > -1){
                current = queryKeys[i];
                break;
            }
        }
        this.normal = props.state.path[current];
        var temp = this.normal['data'];
        var temp_ = {};
        for(let i in temp){
            if(temp[i]['id'] == id ){
                  temp_ = Object.assign({},temp[i]);
                  this.current = i;
                  break;
            }
        }
        console.log('中期数据',temp_)
        /*数据改造*/
        temp_['oriPrice'] = temp_['oriPrice']/100;
        temp_['price'] = temp_['price']/100;
        temp_['area'] = temp_['area'].split(',');
        temp_['brand'] = this.makeArr(temp_['brand']);
       // temp_['mileage'] = this.makeArr(temp_['mileage']);
        temp_['motorType'] = this.makeArr(temp_['motorType']);
        temp_['productDate'] = this.makeArr(temp_['productDate'].slice(0,4));
        temp_['License'] = [];
        temp_['License'].push(temp_['driLicense'])
        temp_['License'].push(temp_['invoice'])
        temp_['License'].push(temp_['certificate'])
        temp_['License'] = temp_['License'].join(',');
        console.log('最终数据:,',temp_)
        this.state = {
            focused: false,
            data:temp_
        };

    }
    makeArr(el){
        var arr = [];
        arr.push(el.toString());
        return arr
    }
    handlerClick(){
        var x = this.props.form.getFieldsValue();
        //console.log(this.state);

        var images = {
            imgUrls:'',//车辆图片
            driLicense:'',//行驶证
            invoice:'',//购车发票
            certificate:''//合格证

        };
        var imgUrls = this.refs.imgUrls.querySelectorAll('.imageChoose');
        var License = this.refs.License.querySelectorAll('.imageChoose');
        console.log('License',License)
        var changeTab_ = this.props.changeTab_;
        for(let i in imgUrls){
            if(!isNaN(i)){
                if(i == 0){
                    images['imgUrls'] = imgUrls[i].getAttribute('src');
                }
                else{
                    images['imgUrls'] = images['imgUrls'] +','+ imgUrls[i].getAttribute('src');
                }
            }
        }
        for(let i in License){
            if(!isNaN(i)){
                if(i == 0){
                    images['driLicense'] = License[i].getAttribute('src');
                }
                if(i == 1){
                    images['invoice'] = License[i].getAttribute('src');
                }
                if(i == 2){
                    images['certificate'] = License[i].getAttribute('src');
                }
            }
        }

        console.log(Object.assign({},x,images));

        //数组转字符串;
        for(let i in x){
            if(i == 'hasAbs'){
                continue;
            }
            else if(i == 'oriPrice' || i == 'price'){
                if(isNaN(x[i])){
                    return Toast.info('请输入正确的价格！')
                }
                else{
                    x[i] = x[i]*100;//元转换为分;
                }

            }
            if(x[i] instanceof Array){
                if(i == 'productDate'){
                    x[i] = x[i].join()+'-01-01';
                }
                else{
                    x[i] = x[i].join();
                }
            }
            else if(!x[i] && i!='brand_'){
                return Toast.info('请补全信息！')
            }
        }
        if(this.refs.imgUrls.querySelectorAll('.imageChooseDone').length ==0){
            return Toast.info('请至少上传一张车辆照片！')
        }
        if(isNaN(x['mileage'])){
            return Toast.info('请输入正确的公里数！')
        }
        if(isNaN(x['displacement'])){
            return Toast.info('请输入正确的排量！')
        }
        if(!/^1[3|4|5|7|8][0-9]{9}$/.test(x['tel'])){
            return Toast.info('请输入正确的手机号码！')
        }
        if(x['brand'] == '未知' && x['brand_'] == ''){
            return Toast.info('没有找到您的爱车品牌，请在输入框中填入！',3)
        }
        x.title =`${x.productDate.slice(0,4)}年 ${x.brand=='未知' ? x.brand_ : x.brand} ${x.motorType} ${x.motorModel}`;//title必须要有值，否则接口报错



        var self = this;
        x.lastPrice = self.state.data.price*100;
        //直接修改state数据，谨慎使用
        self.normal['data'][self.current] = Object.assign({},x,images,{id:this.state.data.id,status:'edit'})
      //  return;
        Tool.post($extMotorUpdate,Object.assign({},x,images,{id:this.state.data.id}),function(data){
            if(data.code == '0'){
                console.log(data);
                alert('恭喜您，更新成功！', '',[
                    { text: '返回在售车辆', onPress: () => {

                        history.goBack();
                    }},
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
    componentDidMount(){
        this.props.form.setFieldsValue(this.state.data)
    }

    render() {
        const { getFieldProps,getFieldError } = this.props.form;
        let errors;
        return (
            <div style={{overflowX:'hidden'}}>
                <TopNavBar title="编辑车辆信息"  />
                <List renderHeader={() => '完善车辆信息能增加价格哦'}>
                    <Picker
                        {...getFieldProps('productDate')}
                        data={years}
                        cascade={false}
                        extra="请选择(可选)"
                    >
                        <List.Item arrow="horizontal">出厂年份</List.Item>
                    </Picker>
                    <Picker
                        {...getFieldProps('motorType')}
                        data={dataModel_}
                        cascade={false}
                        extra="请选择(可选)"
                    >
                        <List.Item arrow="horizontal">车型类别</List.Item>
                    </Picker>
                    <Picker
                        {...getFieldProps('brand')}
                        data={dataBrand_}
                        cascade={false}
                        extra="请选择(可选)"
                    >
                        <List.Item arrow="horizontal">品牌</List.Item>
                    </Picker>
                    <InputItem
                        {...getFieldProps('brand_')}
                        clear
                        placeholder="没有找到，请在此输入"
                        maxLength="11"
                    >其它品牌</InputItem>
                    <InputItem
                        {...getFieldProps('motorModel')}
                        clear
                        placeholder="请输入所选品牌的型号"
                        maxLength="11"
                    >型号</InputItem>
                    <List.Item
                        extra={<Switch
                            {...getFieldProps('urgent', {
                                initialValue: false,
                                valuePropName: 'checked',
                            })}
                            onClick={(checked) => { console.log(checked); }}
                        />}
                    >是否急售</List.Item>
                    <InputItem
                        {...getFieldProps('displacement')}
                        clear
                        placeholder="排量"
                        extra="CC"
                        maxLength="7"
                    >排量</InputItem>
                    <InputItem
                        {...getFieldProps('mileage')}
                        clear
                        placeholder="请输入具体公里数"
                        extra="KM"
                        maxLength="9"
                    >行驶里程</InputItem>
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
                    <Picker
                        {...getFieldProps('area', {
                            initialValue: ['110000', '110100'],
                        })}
                        data={arr_dataCityNo}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                        extra="请选择(可选)"
                        cols = '2'

                    >
                        <List.Item arrow="horizontal">车牌所在地区</List.Item>
                    </Picker>
                </List>
                <List renderHeader={() => '车辆图片(请您裁切成4:3的图片上传哦)'}>
                    <div ref="imgUrls">
                        <ImageChoose src={this.state.data.imgUrls} titles={[
                            '左侧车身',
                            '右侧车身',
                            '仪表盘',
                            '车把',
                            '车头',
                            '车尾',
                            '坐垫',
                            '减震',
                            '排气',
                            '底部',
                            '发动机',
                            '发动机左',
                            '发动机右',
                            '前轮胎',
                            '后轮胎',
                        ]} length="15" />
                    </div>
                </List>
                <List renderHeader={() => '基本证件(可选)'}>
                    <div ref="License" >
                        <ImageChoose src={this.state.data.License} titles={['车辆行驶证','购车发票','合格证']} length="3" />
                    </div>
                </List>
                <List renderHeader={() => '请在下方简单地介绍下购买时间、使用状况等'}>
                    <TextareaItem
                        {...getFieldProps('content', {
                            initialValue: '',
                        })}
                        rows={5}
                        count={100}
                    />
                </List>
                <WhiteSpace />
                <div className="btnWrap">
                    <Button className="btn" onClick={() => this.handlerClick()} type="primary">确认更新</Button>
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
export default connect((state) => { return { state: state['MyList']} }, action())(TextareaItemExampleWrapper);
