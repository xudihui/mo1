import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import ReactCrop from 'react-image-crop';
import '../Style/imageChoose.less'; //加载图片选择样式
import { List, InputItem, Toast,Button, WhiteSpace, WingBlank,ActivityIndicator,Modal } from 'antd-mobile-web';
import { Tool, merged } from '../Tool';



class Main extends React.Component {
    constructor(props) {
        super(props);
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
        var {index,onDel} = this.props;
        onDel(index);
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
    onImgDone(){
        var self = this;
        var oColorImg = this.refs.img;
        var wrap = this.refs.wrap;
        var x = document.querySelectorAll('.am-list-body');
        for(let i in x){
            try{
                x[i].style.position = 'relative'
            }catch(e){
            }
        }
        wrap.setAttribute('class','imageChoose imageChooseDone');
        wrap.style.position = 'relative';
        oColorImg.src = this.props.src;
        oColorImg.style.display = 'inline-block';
        wrap.setAttribute('src',self.props.src);//从服务器拿图片
        this.setState({
            done:true,
            winWidth:'100%'
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
        var pngData_png = oCanvas.toDataURL('image/png');
        var pngData = oCanvas.toDataURL('image/jpeg');
        console.log('png长度：',pngData_png.length+'；jpg长度:'+pngData.length)
       // oColorImg.src = oCanvas.toDataURL('image/jpeg'); //静态赋值
        var x = document.querySelectorAll('.am-list-body');
        for(let i in x){
            try{
                x[i].style.position = 'relative'
            }catch(e){
            }
        }
        wrap.setAttribute('class','imageChoose imageChooseDone');
        wrap.style.position = 'relative';
        Tool.post($extFileuUpload,{base64FileStr:pngData.split('base64,')[1]},function(data){
            if(data.code == '0'){
                Toast.info('图片成功上传一张！',.5);
                console.log(data.response.fileRdfUrl+data.response.fileUrl);
                oColorImg.src = pngData;
                wrap.setAttribute('src',data.response.fileRdfUrl+'/'+data.response.fileUrl);//从服务器拿图片
                self.props.onDone(data.response.fileRdfUrl+'/'+data.response.fileUrl)
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
       if(this.props.src){
           this.onImgDone();
       }
        /**
         * Select an image file.
         */
        const imageType = /^image\//;
        const fileInput = this.refs.enter;
        var self = this;
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
                this.refs.wrap.style.position = 'static';
                var img = document.createElement("img");
                document.body.appendChild(img);
                img.setAttribute('src',e2.target.result);

                //先进行一次大范围的缩放
                img.onload = function(){
                    var canvas = document.createElement("canvas");
                    var ctx=canvas.getContext("2d");
                    var w = img.offsetWidth;
                    var h = img.offsetHeight;
                    canvas.setAttribute('width',window.innerWidth*2);
                    canvas.setAttribute('height',window.innerWidth*2*h/w);
                    canvas.style.width = window.innerWidth + 'px';
                    canvas.style.height = window.innerWidth*h/w + 'px';
                    ctx.drawImage(img,0,0,window.innerWidth*2,window.innerWidth*2*h/w);
                    var pngData = canvas.toDataURL('image/jpeg');
                    document.body.removeChild(img);
                    self.setState({
                        src:pngData
                    });
                }
            };
            reader.readAsDataURL(file);
        });

    }
    render() {
        return (
            <div className="imageChoose" style={{display:this.props.display}} ref="wrap" >
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
export default class ImageChoose extends Component {
    constructor(props) {
        super(props);
        var src = props.src || '';
        src = src.split(',');
        this.state = {
            length:props.length,
            arr:[],
            src:src
        };
    }
    onDone(el){
        var src_ = this.state.src;
        src_.push(el);
        console.log('上传图片',src_)
        this.setState({
            src:src_
        })
    }
    onDel(index){

        var src_ = this.state.src;
        console.log(index+'删除前的src',JSON.stringify(src_))
        src_[index] = 'empty';
        //src_.splice(index,1,'');
        console.log('删除后的src',JSON.stringify(src_))
        this.setState({
            src:src_
        })
    }
    render() {
        var self = this;
        var {src,length} = this.state;
        var arr = [];
        for(let i = 0;i<length;i++){
            arr.push(
                {
                    display:'',
                    src:''
                }
            )
        }
        for(let i in arr){
            arr[i]['src'] = src[i] || '';
            if(arr[i]['src'] =='' && i!=src.length){
                arr[i]['display'] = 'none'
            }
        }
        if(length == 1){
            arr[0]['display'] = '';
            arr = arr.slice(0,1)
        }
        else if(src.length < length){
            arr[src.length]['display'] = '';
        }
        return (
            <div className="cropWrap"  >
                {
                    arr.map((i,index)=><Main src={i.src} index={index} onDone={this.onDone.bind(this)} onDel={this.onDel.bind(this)} display={i.display} />)
                }
            </div>
        );
    }
}
