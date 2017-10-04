import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import ReactCrop from 'react-image-crop';
import '../Style/imageChoose.less'; //加载图片选择样式
import { List, InputItem, Toast,Button, WhiteSpace, WingBlank,ActivityIndicator,Modal } from 'antd-mobile-web';
import { Tool, merged } from '../Tool';



class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            crop: {
                width: 100,
                aspect: 16/9
            },
            keepSelection:true,
            minWidth:100,
            pixelCrop_:{},
            src:0,
            done:false,
            winWidth:window.innerWidth+'px'
        };
    }
    //重新上传
    onInit(){
        this.refs.wrap.setAttribute('class','imageChoose');
        this.refs.img.style.display = 'none';
        this.setState({
            pixelCrop_:{},
            src:0,
            done:false,
            winWidth:window.innerWidth+'px'
        })
    }
    onCropComplete(crop, pixelCrop){
        console.log('Crop move complete:', crop, pixelCrop);
        this.setState({
            pixelCrop_:pixelCrop,
            crop
        });

    }
    onDone(){
        var self = this;
        var oColorImg = this.refs.img,
            oCanvas = this.refs.c,
            wrap = this.refs.wrap,
            oCtx = oCanvas.getContext('2d');
        oCanvas.style.height = oCanvas.offsetWidth*9/16 + 'px';
        oCanvas.setAttribute('width',oCanvas.offsetWidth*2); //让绘图更加清晰
        oCanvas.setAttribute('height',oCanvas.offsetHeight*2);//让绘图更加清晰
        oColorImg.style.display= 'block';
        /*
        var x = -self.state.crop.x*oCanvas.offsetWidth/100;
        var y = -self.state.crop.y*oCanvas.offsetWidth/100

        var y = -document.querySelector('.ReactCrop__crop-selection').offsetTop
        var x = -document.querySelector('.ReactCrop__crop-selection').offsetLeft
         */
        var x = 0;
        var y = -(self.state.crop.y||0)*2*oColorImg.offsetHeight/100;//相对于y轴的比例
        oCtx.drawImage(oColorImg,x,y,oCanvas.offsetWidth/0.5,oColorImg.offsetHeight/0.5);
        var pngData = oCanvas.toDataURL('image/png');
       // oColorImg.src = oCanvas.toDataURL('image/jpeg'); //静态赋值
        var x = document.querySelectorAll('.am-list-body');
        for(let i in x){
            try{
                x[i].style.position = 'relative'
            }catch(e){
            }
        }
        Tool.post($extFileuUpload,{base64FileStr:pngData.split('base64,')[1]},function(data){
            if(data.code == '0'){
                Toast.info('图片成功上传一张！',.5);
                console.log(data.response.fileRdfUrl+data.response.fileUrl);
                wrap.setAttribute('class','imageChoose imageChooseDone');
                wrap.style.position = 'relative';
                oColorImg.src = pngData;
                wrap.setAttribute('src',data.response.fileRdfUrl+'/'+data.response.fileUrl);//从服务器拿图片
            }
            else{
                Toast.offline(data.msg);
                self.onInit();
            }
        })
        this.setState({
            done:true,
            winWidth:'100%'
        });
    }
    componentDidMount(){

        /**
         * Select an image file.
         */
        const imageType = /^image\//;
        const fileInput = this.refs.enter;

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files.item(0);
            if (!file || !imageType.test(file.type)) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (e2) => {
                var x = document.querySelectorAll('.am-list-body');
                for(let i in x){
                    try{
                        x[i].style.position = 'static'
                    }catch(e){
                    }
                }
                alert('成功了');
                this.refs.wrap.style.position = 'static';
                this.setState({
                    src:e2.target.result
                });
            };
            reader.readAsDataURL(file);
        });

    }
    render() {
        return (
            <div className="imageChoose" ref="wrap" >
                <i className="iconfont icon-shanchu" onClick={()=>{
                    Modal.alert('删除', `确定删除辛辛苦苦上传的图片吗?`, [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => this.onInit()},
                    ])

                }}></i>
                <img src={this.state.src} ref="img" style={{width:this.state.winWidth,display:'none'}} alt=""/>
                <div className="imageChooseWorkSpace" style={{display:this.state.done ? 'none' : 'block'}}>
                    <p style={{display:this.state.src == 0 ? 'none' : 'block'}}  onClick={()=>{
                        this.onDone();
                    }} >完成</p>
                    {
                         this.state.src != 0 && <ReactCrop
                            crop={this.state.crop}
                            minWidth={100}
                            src={this.state.src}
                            onComplete={this.onCropComplete.bind(this)}
                        />
                    }
                    <i className="iconfont icon-icon_pic_add"></i>
                    <input ref="enter" type="file"  />
                    <canvas ref="c" style={{width:this.state.winWidth}} />
                </div>

            </div>
        );
    }
}

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
export default Main;
