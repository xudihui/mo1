import React, { Component, PropTypes } from 'react';
import { Result } from 'antd-mobile-web'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import action from '../Action/Index';
import { Tool, merged } from '../Tool';
import { DataLoad, Footer, UserHeadImg, TabIcon, GetNextPage } from './common/index';
import { Button,PlaceHolder,Modal } from 'antd-mobile-web';

const alert = Modal.alert;
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {name:"陈根兰",id:6230910999008349184},
                {name:"何东珠",id:6228580999003247394},
                {name:"何光宝",id:6228580999007843602},
                {name:"洪月兰",id:6230910999000431147},
                {name:"华夏英",id:101007923746709},
                {name:"季根英",id:6228580999020298305},
                {name:"金爱连",id:6230910999000424449},
                {name:"金岳梅",id:101003749686261},
                {name:"李会",id:6230910999001384709},
                {name:"李增发",id:101010358329580},
                {name:"龙布休",id:6230910999006584519},
                {name:"罗春艳",id:6230910999006584501},
                {name:"毛婵娟",id:101011760015268},
                {name:"王夏弟",id:101010507633651},
                {name:"王作花",id:6230910999001384337},
                {name:"吴彩英",id:101010991490609},
                {name:"吴家香",id:101010094242196},
                {name:"徐根弟",id:6230910999008350349},
                {name:"徐妙弟",id:101003749686261},
                {name:"徐妙英",id:101010006144675},
                {name:"徐秋生",id:101001336691465},
                {name:"徐霞香",id:101008658823981},
                {name:"杨昌汉",id:6228580999009476203},
                {name:"杨菊敏",id:101011201018645},
                {name:"叶芳红",id:101008473311895},
                {name:"叶海林",id:101009969355213},
                {name:"叶洪妹",id:6228580999003247634},
                {name:"叶建飞",id:101001334929931},
                {name:"叶建美",id:101009875590445},
                {name:"叶兰英",id:101010443841726},
                {name:"叶南连",id:6230910999008350356},
                {name:"叶南兴",id:6228580999009476088},
                {name:"叶青钗",id:101010547109454},
                {name:"叶庆定",id:101001328933100},
                {name:"叶文香",id:6228580999007844881},
                {name:"叶香梅",id:6230910999006584709},
                {name:"叶小琴",id:6228580999002804609},
                {name:"叶英兰",id:101010443841726},
                {name:"周陈兰",id:101010115260055},
                {name:"周陈明",id:101010115260055},
                {name:"周岳珠",id:101010585843548},
                {name:"周哲明",id:101001335430127}
            ]
        };
    }
    handlerAdd(){
        var temp = this.state.data;
        temp.push({
            name:'',
            id:'',
            noId:true,
            money:''
        });
        this.setState({
           data:temp
        })
    }
    sum(){
        var temp = this.state.data;
        var total = 0;
        for(let i in temp){
            total += parseFloat(temp[i]['money']) || 0;
        }
        return total.toFixed(2);
    }
    handlerOutPut(){
        //滚动条必须滚动到最顶部和最左边才能完整截图
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
        document.querySelector('.father').style.width = '500px';
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
        html2canvas(document.querySelector('.father'), {
            canvas: canvas,
            onrendered: function(canvas) {
                    var imgUri = canvas.toDataURL("image/png");
                    //window.location.href= imgUri; // 下载图片
                    var myWindow=window.open('','');
                    myWindow.document.write("<img width='100%' src='"+imgUri+"' />");
            }
        })
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

    }
    render() {
        return (
            <div>
            <div className="father">
                <h1>松阳县玉岩乐天加工处代发工资</h1>
                <table>
                    <tr>
                        <td width="25%">姓名</td>
                        <td width="25%">账号</td>
                        <td width="25%">身份证</td>
                        <td width="25%">合计</td>
                    </tr>
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <tr className={index%2 == 0 ? 'l' : 'r'} onDoubleClick={() => {
                                    alert('删除', '确定删除'+item.name +'吗？', [
                                        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                                        { text: '确定', onPress: () => {
                                            var temp = this.state.data;
                                            console.log(temp)
                                            temp.splice(index,1);
                                            this.setState({
                                                data:temp
                                            })
                                        }},
                                    ])

                                }}>
                                    {
                                        !item.noId && <td>{item.name}</td>
                                    }
                                    {
                                        item.noId && <td style={{padding:0}}>
                                            <input style={{width:'5em',padding:'10px 5px',textAlign:'center'}}
                                            defaultValue={item.name}
                                            onChange={(e) => {
                                                console.log(e.currentTarget.value)
                                                var temp = this.state.data;
                                                temp[index]['name'] = e.currentTarget.value;
                                                this.setState({
                                                    data:temp
                                                })
                                            }
                                            }></input>
                                        </td>
                                    }
                                    {
                                        !item.noId && <td>{item.id}</td>
                                    }
                                    {
                                        item.noId && <td style={{padding:0}}>
                                            <input style={{padding:'10px 5px',textAlign:'center'}}
                                                   defaultValue={item.name}
                                                   onChange={(e) => {
                                                       console.log(e.currentTarget.value)
                                                       var temp = this.state.data;
                                                       temp[index]['id'] = e.currentTarget.value;
                                                       this.setState({
                                                           data:temp
                                                       })
                                                   }
                                                   }></input>
                                        </td>
                                    }
                                    <td>{item.noId}</td>
                                    <td style={{padding:0}}><input type="number" style={{width:'8em',padding:'10px 5px',fontSize:'16px'}} onChange={
                                        (e) => {
                                            console.log(e.currentTarget.value)
                                            var temp = this.state.data;
                                            temp[index]['money'] = e.currentTarget.value;
                                            this.setState({
                                                data:temp
                                            })
                                        }
                                    } value={item.money || ''} ></input></td>
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
                <div className="btnWrap">
                <Button className="btn" type="primary"  onClick={() => {
                this.handlerAdd()
                  }}>再加一行</Button>
            </div>
            <div className="btnWrap">
                <Button className="btn" type="primary"  onClick={() => {
                this.handlerOutPut()
                 }}>完成账表</Button>
            </div>
            </div>
        );
    }
}

export default Main;
