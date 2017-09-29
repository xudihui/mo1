import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import ReactCrop from 'react-image-crop';
import '../Style/imageChoose.less'; //加载图片选择样式




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
            done:false
        };
    }

    onImageLoaded(crop){
        console.log('Image was loaded. Crop:', crop);
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
        var y = -self.state.crop.y*2*oColorImg.offsetHeight/100;//相对于y轴的比例
        oCtx.drawImage(oColorImg,x,y,oCanvas.offsetWidth/0.5,oColorImg.offsetHeight/0.5);
        oColorImg.src = oCanvas.toDataURL('image/jpeg');
        this.setState({
            done:true
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
                this.setState({
                    src:e2.target.result
                });
            };
            reader.readAsDataURL(file);
        });

    }
    render() {
        return (
            <div className="imageChoose">
                <img src={this.state.src} ref="img" style={{width:'100%',display:'none'}} alt=""/>
                <div className="imageChooseWorkSpace" style={{display:this.state.done ? 'none' : 'block'}}>
                    <p style={{display:this.state.src == 0 ? 'none' : 'block'}}  onClick={()=>{
                        this.onDone();
                    }} >完成</p>
                    {
                         this.state.src != 0 && <ReactCrop
                            crop={this.state.crop}
                            minWidth={100}
                            src={this.state.src}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete.bind(this)}
                        />
                    }
                    <i className="iconfont icon-icon_pic_add"></i>
                    <input ref="enter" type="file"  />
                    <canvas ref="c" style={{width:'100%'}} />
                </div>

            </div>
        );
    }
}

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
export default Main;
