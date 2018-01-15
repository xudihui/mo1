import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';
import { Tool, merged } from '../Tool';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
import ImageChoose from './ImageChoose';
import $ from './common/Jquery';
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

var makeYear = function(x){
    var min = x[0];
    var max = x[1];
    var temp = [];
    while(max > min ){
        max--;
        var n = max.toString();
        temp.push({
            label:n,
            value:n,
        })
    }
    return [temp]

}
const years = makeYear([2000,2019]);
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
            cut:a2,
            init:false
        };
    }
    handlerInit(){
        this.props.form.setFieldsValue( {area:["110000","110100"],brand: undefined, motorModel: undefined, motorType: undefined,content: undefined, mileage: undefined, oriPrice: undefined, price: undefined, productDate: undefined, tel: undefined, urgent: undefined}
        )
        var self = this;
        this.setState({
            init:!self.state.init
        })
    }
    handlerClick(){
        var self = this;
        var x = this.props.form.getFieldsValue();
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
                else if(i != 15){
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

        console.log(Object.assign({},x));

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

            else if(x[i]==undefined && i!='urgent'){
                return Toast.info('请补全信息！')
            }
        }
        if(this.refs.imgUrls.querySelectorAll('.imageChooseDone').length < 3){
            return Toast.info('请至少上传3张车辆照片！')
        }
        if(isNaN(x['mileage'])){
            return Toast.info('请输入正确的公里数！')
        }
        if(!/^1[3|4|5|7|8][0-9]{9}$/.test(x['tel'])){
            return Toast.info('请输入正确的手机号码！')
        }
        x.title =`${x.productDate.slice(0,4)} ${x.brand=='未知' ? '' : x.brand} ${x.motorModel}`;//title必须要有值，否则接口报错
        Tool.post($extMotorAdd,Object.assign({},x,images),function(data){
            if(data.code == '0'){
                self.handlerInit();
                alert('恭喜你，发布成功！', '',[
                    { text: '立即查看', onPress: () => {
                        changeTab_();
                        history.replace(`/?all`)
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
    render() {
        const { getFieldProps,getFieldError  } = this.props.form;
        let errors;
        var self = this;
        return (
            <div className="sellPanel">
                <TopNavBar title="编辑车辆信息" back={true}  />
                <List >
                    <div className="am-list-item-middle-border">
                        <table className="t_four">
                            <tr>
                                <td>
                                    <Picker
                                        {...getFieldProps('productDate')}
                                        data={years}
                                        cascade={false}
                                        extra="上市时间"
                                    >
                                        <List.Item arrow="horizontal"></List.Item>
                                    </Picker>
                                </td>
                                <td>
                                    <Picker
                                        {...getFieldProps('brand')}
                                        data={dataBrand_}
                                        cascade={false}
                                        extra="品牌名称"
                                    >
                                        <List.Item arrow="horizontal"></List.Item>
                                    </Picker>
                                </td>
                                <td style={{width:window.innerWidth-252 + 'px'}}>
                                    <div style={{borderBottom:'1px solid #ddd',marginTop:'-1px',height:'44px'}}>

                                    </div>
                                </td>
                            </tr>
                        </table>
                        <table className="t_three">
                            <tr>
                                <td>
                                    <Picker
                                        {...getFieldProps('motorType')}
                                        data={dataModel_}
                                        cascade={false}
                                        extra="车辆类型"
                                    >
                                        <List.Item arrow="horizontal">类型</List.Item>
                                    </Picker>
                                </td>
                                <td style={{width:window.innerWidth-138 + 'px'}}>
                                    <div style={{borderBottom:'1px solid #ddd',marginTop:'-1px'}}>
                                        <InputItem
                                            {...getFieldProps('motorModel')}
                                            placeholder=""
                                            maxLength="11"
                                        >型号排量</InputItem>
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Picker
                                        {...getFieldProps('area')}
                                        data={arr_dataCityNo}
                                        onOk={e => console.log('ok', e)}
                                        onDismiss={e => console.log('dismiss', e)}
                                        extra="所在城市"
                                        cols = '2'

                                    >
                                        <List.Item arrow="horizontal"></List.Item>
                                    </Picker>

                                </td>
                                <td style={{width:window.innerWidth-138 + 'px'}}>
                                    <div style={{borderBottom:'1px solid #ddd',marginTop:'-1px'}}>
                                        <InputItem
                                            {...getFieldProps('mileage')}
                                            placeholder=""
                                            maxLength="9"
                                        >行驶里程</InputItem>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                    <div className="am-list-item-middle-border" style={{marginTop:'-3px'}}>
                        <InputItem
                            {...getFieldProps('oriPrice')}
                            placeholder=""
                            maxLength="7"
                        >新车价格</InputItem>
                    <InputItem
                        {...getFieldProps('price')}
                        placeholder=""
                        maxLength="7"
                    >售卖价格</InputItem>
                    </div>
                    <div className="am-list-item-middle-border" >
                        <InputItem
                            {...getFieldProps('tel')}
                            placeholder=""
                            maxLength="11"
                        >联系电话</InputItem>

                        <List.Item
                            extra={<Switch
                                {...getFieldProps('urgent', {
                                    initialValue: false,
                                    valuePropName: 'checked',
                                })}
                                onClick={(checked) => { console.log(checked); }}
                            />}
                        >是否急售</List.Item>


                    </div>
                </List>
                <div className="am-list-item-middle-border" style={{padding:0}}>
                <List renderHeader={() => '使用状况'}>
                    <TextareaItem
                        {...getFieldProps('content', {
                            initialValue: '',
                        })}
                        autoHeight
                        rows={3}
                        count={1000}
                    />
                </List>
                </div>

                <div className="am-list-item-middle-border" style={{padding:0}}>
                <List renderHeader={() => '图片(请上传3张以上)'}>
                    <div ref="imgUrls">
                        {
                            !self.state.init &&  <ImageChoose ratio="4/3" src=',,,,,,,,,,,,,,' titles={[
                                '左侧',
                                '右侧',
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
                                '其他'
                            ]} length="16" />
                        }
                        {
                            self.state.init &&  <ImageChoose ratio="4/3" src=',,,,,,,,,,,,,,' titles={[
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
                                '其他'
                            ]} length="16" />
                        }

                    </div>


                </List>
                </div>
                <div style={{display:'none'}}>
                <List renderHeader={() => '改装件(可选)'}>
                    <div ref="License" >
                        {
                            !self.state.init &&  <ImageChoose src='' ratio="4/3" titles={['部件01','部件02','部件03','部件04']} length="4" />
                        }
                        {
                            self.state.init &&  <ImageChoose src='' ratio="4/3" titles={['部件01','部件02','部件03','部件04']} length="4" />
                        }

                    </div>
                </List>
                </div>



                <div className="btnWrap" style={{background:'#ddd',padding:'10px 10px 90px 10px',margin:'0'}}>
                    <Button className="btn" onClick={() => this.handlerClick()} type="primary">确认卖车</Button>

                </div>

            </div>
        );
    }
}

const TextareaItemExampleWrapper = createForm()(TextareaItemExample);

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
export default TextareaItemExampleWrapper;
