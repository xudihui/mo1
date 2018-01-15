import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import ReactCrop from 'react-image-crop';
import '../Style/imageChoose.less'; //加载图片选择样式
import { List, InputItem, Toast,Button, WhiteSpace, WingBlank,ActivityIndicator,Modal } from 'antd-mobile-web';
import { Tool, merged } from '../Tool';

//添加水印图片
import water from '../Images/water.png';
var scrollTop = 0
/**
 * (图片裁切组件)
 *
 * @class ImageChoose
 * @extends {Component}
 * @aspect 裁切比例
 * @src 初始化图片
 * @titles 每张图片的默认标题
 * @length 长度
 */

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: {
                width: 100,
                aspect: props.aspect || 1.33 //默认4：3，通过属性取比例
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
        oColorImg.style.display = 'block';
        wrap.setAttribute('src',self.props.src);//从服务器拿图片
        this.setState({
            done:true,
            winWidth:'100%'
        });
    }
    onDone(){
        var self = this;
        var oColorImg = this.refs.img,
            water = this.refs.water,
            oCanvas = this.refs.c,
            wrap = this.refs.wrap,
            oCtx = oCanvas.getContext('2d');
        oCanvas.style.height = oCanvas.offsetWidth*1/self.state.crop.aspect + 'px';
        oCanvas.setAttribute('width',oCanvas.offsetWidth*2); //让绘图更加清晰
        oCanvas.setAttribute('height',oCanvas.offsetHeight*2);//让绘图更加清晰
        oColorImg.style.display= 'block';
        var oColorImgWidth = oColorImg.offsetWidth;//被裁切的图片宽度;
        var oColorImgHeight = oColorImg.offsetHeight;//被裁切的图片高度;
        console.log('图片宽度：',oColorImg.offsetWidth,'X轴偏移量：',self.state.crop.x)
        if(oColorImg.offsetWidth/oColorImg.offsetHeight > self.state.crop.aspect){ //高度小于传入比例
            var changeWidth = oCanvas.offsetHeight*oColorImgWidth/oColorImgHeight;//放大后的图片宽度
            var y = 0;
            var x = -(self.state.crop.x||0)*2*changeWidth/100;//相对于x 轴的比例
            oCtx.drawImage(oColorImg,x,y,changeWidth*2,oCanvas.offsetHeight*2);
        }
        else{
            var x = 0;
            var y = -(self.state.crop.y||0)*2*oColorImg.offsetHeight/100;//相对于y 轴的比例
            oCtx.drawImage(oColorImg,x,y,oCanvas.offsetWidth/0.5,oColorImg.offsetHeight/0.5);
        }
        console.log('正式比例：',oColorImgWidth,oColorImgHeight)
        console.log('XY：',x,y,changeWidth)
        console.log('XXX：',oCanvas.offsetWidth/0.5,oColorImg.offsetHeight/0.5)
        water.style.display = 'inline-block';
        //pc上传需要*2
        //  oCtx.drawImage(water,oCanvas.offsetWidth*2-220,oColorImg.offsetHeight*2-30);
        oCtx.drawImage(water,oCanvas.offsetWidth*2-220,oCanvas.offsetHeight*2-30);
        water.style.display = 'none';
        var pngData = oCanvas.toDataURL('image/jpeg');
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
        /*
         oColorImg.src = pngData;
         self.setState({
         done:true,
         winWidth:'100%'
         });
         return;
         */
        Tool.post($extFileuUpload,{base64FileStr:pngData.split('base64,')[1]},function(data){
            if(data.code == '0'){
                Toast.info('图片上传成功！',.5);
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
        self.setState({
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
            Toast.loading('图片准备裁切中...',0)
            scrollTop = document.body.scrollTop;
            document.querySelector('.am-tab-bar-tabpane-active') && document.querySelector('.am-tab-bar-tabpane-active').setAttribute('style','overflow:hidden;height:'+window.innerHeight + 'px');
            var inputs = document.querySelectorAll('input[type=file]');
            for(let i in inputs){
                if(!isNaN(i)){
                    inputs[i].style.display = 'none'
                }
            }
            const file = e.target.files.item(0);
            if (!file || !imageType.test(file.type)) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (e2) => {
                Toast.hide();
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
        var {title} = this.props;
        return (
            <div className="imageChoose" style={{display:this.props.display}} ref="wrap" >
                <i className="iconfont icon-shanchu" onClick={()=>{
                    Modal.alert('删除', `确定删除辛辛苦苦上传的图片吗?`, [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => this.onInit()},
                    ])

                }}></i>
                <img src={this.state.src} ref="img" style={{width:this.state.winWidth,display:'none'}} alt=""/>
                <img src={water} ref="water" style={{width:'100px',height:'10px',display:'none'}} alt=""/>
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
                    <i className="iconfont icon-lnicon12">
                    </i>
                    <input ref="enter" type="file"  />
                    <canvas ref="c" style={{width:this.state.winWidth}} />
                </div>

                <span className="title">{title}</span>
            </div>
        );
    }
}



class MainNative extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: {
                width: 100,
                aspect: props.aspect || 1.33 //默认4：3，通过属性取比例
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
        wrap.setAttribute('class','imageChoose imageChooseDone');
        wrap.style.position = 'relative';
        oColorImg.src = this.props.src;
        oColorImg.style.display = 'block';
        wrap.setAttribute('src',self.props.src);//从服务器拿图片
        this.setState({
            done:true,
            winWidth:'100%'
        });
    }
    onDone(){
        var self = this;
        var oColorImg = this.refs.img,
            wrap = this.refs.wrap;

        oColorImg.style.display= 'block';
        var pngData = self.state.src;
        // oColorImg.src = oCanvas.toDataURL('image/jpeg'); //静态赋值
        var x = document.querySelectorAll('.am-list-body');
        wrap.setAttribute('class','imageChoose imageChooseDone');
        wrap.style.position = 'relative';
        Tool.post($extFileuUpload,{base64FileStr:pngData.split('base64,')[1]},function(data){
            if(data.code == '0'){
                Toast.info('图片上传成功！',.5);
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
        self.setState({
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
        var targetWidth = 800;
        var targetHeight = 800/self.state.crop.aspect;
        var water = this.refs.water;
        fileInput.addEventListener('click', (e) => {
            e.preventDefault();
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            function convertImgToBase64(url, callback, outputFormat) {
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    img = new Image;
                img.crossOrigin = 'Anonymous';
                img.onload = function() {
                    canvas.height = (window.innerWidth*2*img.height)/img.width;
                    canvas.width = window.innerWidth*2;
                    ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
                    water.style.display = 'inline-block';
                    ctx.drawImage(water,canvas.width-220,canvas.height-30);
                    water.style.display = 'none';
                    var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
                    callback(dataURL);
                    canvas = null;
                };
                img.src = url;
            }
            if(isAndroid == true){
                var onSuccess = function(imageURL) {
                    var options = {
                        url: imageURL,              // required.
                        ratio: self.props.ratio || "1/1",               // optional. (here you can define your custom ration) default: 1:1
                        title: "摩一切图工具",       // optional. android only. (here you can put title of image cropper activity) default: Image Cropper
                        autoZoomEnabled: true      // optional. android only. for iOS its always true (if it is true then cropper will automatically adjust the view) default: true
                    }
                    window.plugins.k.imagecropper.open(options, function(data) {

                        convertImgToBase64(data.imgPath,function(base_){
                            self.setState({
                                src:base_
                            });
                            self.onDone();
                        })
                    }, function(error) {
                        Toast.offline('图片上传失败！');
                    })
                }
                var onFail = function(message) {
                    Toast.offline('图片上传失败');
                }
                navigator.camera.getPicture(onSuccess, onFail, { quality: 80,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: 0,
                    allowEdit:false,
                    mediaType:0
                });
            }
            else{
                var onSuccess = function(imageURL) {
                    var img = new Image();
                    img.src =  "data:image/jpeg;base64," + imageURL;
                    //先进行一次大范围的缩放
                    img.onload = function(){
                        var canvas = document.createElement("canvas");
                        var ctx=canvas.getContext("2d");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img,0,0, img.width, img.height);
                        water.style.display = 'inline-block';
                        ctx.drawImage(water,img.width-220,img.height-30);
                        water.style.display = 'none';
                        var pngData = canvas.toDataURL('image/jpeg');
                        self.setState({
                            src:pngData
                        });
                        self.onDone();
                    }
                }
                var onFail = function(message) {
                    Toast.offline('图片上传失败');
                }
                navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: 0,
                    allowEdit:true,
                    mediaType:0,
                    targetWidth: targetWidth,
                    targetHeight: targetHeight
                });

            }

        });
    }
    render() {
        var {title} = this.props;
        return (
            <div className="imageChoose" style={{display:this.props.display}} ref="wrap" >
                <i className="iconfont icon-shanchu" onClick={()=>{
                    Modal.alert('删除', `确定删除辛辛苦苦上传的图片吗?`, [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => this.onInit()},
                    ])

                }}></i>
                <img src={this.state.src} ref="img" style={{width:this.state.winWidth,display:'none'}} alt=""/>
                <img src={water} ref="water" style={{width:'100px',height:'10px',display:'none'}} alt=""/>
                <div className="imageChooseWorkSpace" style={{display:this.state.done ? 'none' : 'block'}}>
                    <i className="iconfont icon-lnicon12">
                    </i>
                    <input ref="enter" type="file"  />
                    <canvas ref="c" style={{width:this.state.winWidth}} />
                </div>

                <span className="title">{title}</span>
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
        this.setState({
            src:src_
        });
        if(!window.__Native){
            document.querySelector('.am-tab-bar-tabpane-active') && document.querySelector('.am-tab-bar-tabpane-active').setAttribute('style','overflow:auto;height:auto');
            document.body.scrollTop = scrollTop;
            var inputs = document.querySelectorAll('input[type=file]');
            for(let i in inputs){
                if(!isNaN(i)){
                    inputs[i].style.display = 'block'
                }
            }
        }
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
        var titles = this.props.titles;
        var arr = [];
        for(let i = 0;i<length;i++){
            arr.push(
                {
                    display:'',
                    src:'',
                    title:''
                }
            )
        }
        for(let i in arr){
            arr[i]['src'] = src[i] || '';
            if(src[i] == 'null'){
                arr[i]['src'] = '';
            }
            arr[i]['title'] = titles[i] || '';
        }

        return (
            <div className="cropWrap"  >
                {
                   window.__Native && arr.map((i,index)=><MainNative key={index} ratio={this.props.ratio} aspect={this.props.aspect} src={i.src} index={index} title={i.title} onDone={this.onDone.bind(this)} onDel={this.onDel.bind(this)} display={i.display} />)
                }
                {
                    !window.__Native && arr.map((i,index)=><Main key={index} aspect={this.props.aspect} src={i.src} index={index} title={i.title} onDone={this.onDone.bind(this)} onDel={this.onDel.bind(this)} display={i.display} />)
                }

            </div>
        );
    }
}
