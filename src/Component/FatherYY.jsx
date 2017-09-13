import React, { Component, PropTypes } from 'react';
import { Result } from 'antd-mobile-web'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage,history } from './common/index';
import { Button,PlaceHolder,Modal,Toast } from 'antd-mobile-web';
const alert = Modal.alert;

var m = [];
const footer = [
    {
        title:'返回首页',
        icon:'icon-zhuye',
        background:'#e1e1e1',
        checked:false,
        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
    },
    {
        title:'添加一行',
        icon:'icon-edit',
        background:'#eaeaea',
        checked:false,
        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
    },
    {
        title:'保存副本',
        icon:'icon-weiwancheng',
        background:'#efefef',
        checked:false,
        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
    }
    ,
    {
        title:'生成账单',
        icon:'icon-xiangqing',
        background:'#f8f8f8',
        checked:false,
        backgroundChecked:'-webkit-linear-gradient(left,#ff5b05,#d34b03)'
    }
];
class Main extends Component {
    constructor(props) {
        super(props);
        this.type = this.props.location.query.type;
        this.n = new Date().getTime();
       // this.props.location.query.id
        var temp = Object.assign({},props.state.data);
        //这真的是一个大坑啊，浅复制指针指向同一个，一定要深复制
        temp[this.type][this.n] = [...temp[this.type][this.props.location.query.id]]; //永远指向属性传递过来的state.data,更改它的同时就是修改指针，如果不是深复制，将无法区分
        this.state = {
            data:temp
        };
    }
    CurentTime() {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = 'path_';

        if(month < 10)
            clock += "0";

        clock += month + "";

        if(day < 10)
            clock += "0";

        clock += day + "";

        if(hh < 10)
            clock += "0";

        clock += hh + "";
        if (mm < 10) clock += '0';
        clock += mm;
        return(clock);
    }
    handlerAdd(){

        var a_ = this.state.data;
        console.log('before:',a_,this.n)

        a_[this.type][this.n].push({
            name:'',
            id:'',
            noId:'',
            noId_:true,
            money:''
        })
        console.log('after:',a_,this.n)
        this.setState({
            data:a_
        })
    }
    sum(){
        var temp = this.state.data[this.type][this.n];
        var total = 0;
        for(let i in temp){
            if(temp[i]['del']){
                continue;
            }
            total += parseFloat(temp[i]['money']) || 0;
        }
        return total.toFixed(2);
    }
    handlerOutPut(){
        //滚动条必须滚动到最顶部和最左边才能完整截图
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
        document.querySelector('.father').style.width = '600px';
        document.querySelector('.father').style.padding = '10px 5px';
        var x = document.querySelectorAll('.del')
        var y = document.querySelectorAll('input');
        for(let i in x){
            try{
                x[i].style.display = 'none'
            }catch(e){

            }
        }
        for(let i in y){
            try{
                y[i].style.padding = '0'
            }catch(e){

            }
        }
        var canvas = document.createElement("canvas"),
            w = document.querySelector('.father').offsetWidth,
            h = document.querySelector('.father').offsetHeight;
        canvas.width = w * 2 +50;
        canvas.height = h * 2;
        canvas.style.width = w +50 + "px";
        canvas.style.height = h + "px";
        var context = canvas.getContext("2d");
        //然后将画布缩放，将图像放大两倍画到画布上
        context.scale(2,2);
        var {setData} = this.props;
        setTimeout(() => {
            this.flag = true;
            setData(this.state.data);
            html2canvas(document.querySelector('.father'), {
                canvas: canvas,
                onrendered: function(canvas) {
                    var imgUri = canvas.toDataURL("image/png");
                    //window.location.href= imgUri; // 下载图片
                    var myWindow=window.open('','');
                    myWindow.document.write("<img width='100%' src='"+imgUri+"' />");
                }
            })
        },0)

        // html2canvas(document.querySelector('.father')).then(function(canvas) {
        //     document.body.appendChild(canvas);
        //     // var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
        //     var imgUri = canvas.toDataURL("image/png");
        //     //window.location.href= imgUri; // 下载图片
        //     var myWindow=window.open('','')
        //     myWindow.document.write("<img src='"+imgUri+"' />")
        //
        // });
    }
    componentDidMount(){
        m = this.props.state.data[this.type][this.props.location.query.id];
        console.log('m:',m)
    }
    componentWillUnmount(){
        if(!this.flag){
            delete this.props.state.data[this.type][this.n];
        }

    }
    handlerClick(index){
        var {setData} = this.props;
        switch(index)
        {   case 0:
              delete this.props.state.data[this.type][this.n];
               history.goBack();
            break;
            case 1:
                this.handlerAdd();
                break;
            case 2:
                this.flag = true;
                setData(this.state.data);
                Toast.success('恭喜您，保存成功！',1.5)
                history.replace(`/Father`)
                break;
            default:
                this.handlerOutPut()
        }
    }
    render() {
        var self = this;
        var {setData} = this.props;
        var id = this.n;
        console.log('this.state.data',this.state.data)
        return (
            <div>
            <div className="father">
                <h1>松阳县{this.type == 'yy' ? '玉岩' : '枫坪'}乐天加工处代发工资</h1>
                <table>
                    <tr>
                        <td width="15%">姓名</td>
                        <td width="35%">账号</td>
                        <td width="25%">身份证</td>
                        <td width="25%">合计</td>
                    </tr>
                    {
                        this.state.data[this.type][id].map((item, index) => {
                            console.log(item.id)
                            return (
                                <tr className={item.del ? 'del' : ''} onDoubleClick={() => {
                                    var temp_ = this.state.data;
                                    var temp = this.state.data[this.type][id];
                                    console.log(temp);
                                    temp[index].del = temp[index].del ? false : true;
                                    temp_[this.type][id] = temp;
                                    if(temp[index]['noId_']){
                                        var self = this;
                                        alert('删除', '这是您手动输入的加工者信息，删除后将直接丢失，真的要删除吗？', [
                                            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                                            { text: '确定', onPress: () => {
                                                temp.splice(index,1);
                                                temp_[self.type][id] = temp;
                                                self.setState({
                                                    data:temp_
                                                })
                                            }},
                                        ])

                                    }
                                    else{
                                        this.setState({
                                            data:temp_
                                        })
                                    }

                                        {/*
                                         alert('删除', '确定删除'+item.name +'吗？', [
                                         { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                                         { text: '确定', onPress: () => {
                                         var temp_ = this.state.data;
                                         var temp = this.state.data[this.type][id];
                                         console.log(temp);
                                         temp.splice(index,1);
                                         temp_[this.type][id] = temp;
                                         this.setState({
                                         data:temp_
                                         })
                                         }},
                                         ])
                                        */}



                                }}>
                                    {
                                        !item.noId_ && <td>{item.name}</td>
                                    }
                                    {
                                        item.noId_ && <td style={{padding:0}}>
                                            <input style={{width:'5em',padding:'20px 5px',textAlign:'center'}}
                                            defaultValue={item.name}
                                            onChange={(e) => {

                                                var temp_ = this.state.data;
                                                console.log(e.currentTarget.value);
                                                var temp = this.state.data[this.type][id];
                                                temp[index]['name'] = e.currentTarget.value;
                                                temp_[this.type][id] = temp;
                                                this.setState({
                                                    data:temp_
                                                });
                                            }
                                            }></input>
                                        </td>
                                    }
                                    {
                                        !item.noId_ && <td>{item.id}</td>
                                    }
                                    {
                                        item.noId_ && <td style={{padding:0}}>
                                            <input style={{padding:'20px 5px',textAlign:'center'}}
                                                   defaultValue={item.id}
                                                   onChange={(e) => {
                                                       var temp_ = this.state.data;
                                                       console.log(e.currentTarget.value);
                                                       var temp = this.state.data[this.type][id];
                                                       temp[index]['id'] = e.currentTarget.value;
                                                       temp_[this.type][id] = temp;
                                                       this.setState({
                                                           data:temp_
                                                       });
                                                   }
                                                   }></input>
                                        </td>
                                    }

                                    {
                                        item.noId_!=true && <td>{item.noId}</td>
                                    }
                                    {
                                        item.noId_==true && <td style={{padding:0}}>
                                            <input style={{padding:'20px 5px',textAlign:'center'}}
                                                   defaultValue={item.noId}
                                                   onChange={(e) => {
                                                       var temp_ = this.state.data;
                                                       console.log(e.currentTarget.value);
                                                       var temp = this.state.data[this.type][id];
                                                       temp[index]['noId'] = e.currentTarget.value;
                                                       temp_[this.type][id] = temp;
                                                       this.setState({
                                                           data:temp_
                                                       });
                                                   }
                                                   }></input>
                                        </td>
                                    }
                                    <td style={{padding:0}}>
                                        <input type="number" style={{width:'8em',padding:'20px 5px',fontSize:'16px'}}
                                      onChange={(e) => {
                                            var temp_ = this.state.data;
                                            console.log(e.currentTarget.value);
                                            var temp = this.state.data[this.type][id];
                                            temp[index]['money'] = e.currentTarget.value;
                                            temp_[this.type][id] = temp;
                                            this.setState({
                                                data:temp_
                                            });
                                        }
                                    }
                                   onFocus={(e) => {
                                       e.currentTarget.style.background='yellow'
                                     }
                                   }
                                   onBlur={(e) => {
                                       e.currentTarget.style.background='none'
                                   }
                                   }

                                    value={item.money || ''} ></input></td>
                                </tr>
                            )

                        })
                    }
                    <tr>
                        <td colSpan="3" style={{textAlign:'right'}}>总金额：</td>
                        <td style={{fontSize:'18px'}}>{
                            this.sum()
                        }</td>
                    </tr>
                </table>

            </div>


                <div style={{position:'fixed',width:'100%',top:'0',background:'#fff'}} data-flex="main:justify">
                    {
                        footer.map((dataItem,index) => (
                            <div onClick={
                                ()=>self.handlerClick(index)
                            } className={dataItem.checked ? 'bgWhite' : ''} data-flex-box="1"  style={{ padding: '0.15rem .05rem',textAlign:'center',background:dataItem.backgroundChecked }}>
                                <i style={{ color: '#fff',fontSize: '0.48rem',display:'block', textAlign: 'center' }} className={'iconfont '+dataItem.icon} ></i>
                                <div style={{ color: '#fff', fontSize: '0.28rem',marginTop:'3px',padding:'0 .15rem' }}>
                                    <span>{dataItem.title}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}
export default connect((state) => { return { state: state['FatherData']} }, action())(Main);


