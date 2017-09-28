import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import ReactCrop from 'react-image-crop';
class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            crop: {
                width: 90,
                aspect: 16/9
            },
            keepSelection:true,
            minWidth:90,
            pixelCrop_:{},
            cut:0
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
        var oColorImg = this.refs.img,
            oCanvas = document.createElement('canvas'),
            oCtx = oCanvas.getContext('2d');
        oCanvas.width = 300;
        oCanvas.height = 100;
        oCtx.drawImage(oColorImg, 0, 0);
        var oImgData = oCtx.getImageData(0, 0, 300, 100);
        oCtx.putImageData(oImgData, 0, 0);
        var oGrayImg = new Image();
        oGrayImg.src = oCanvas.toDataURL();
        oColorImg.parentNode.insertBefore(oGrayImg, oColorImg);
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
                    cut:e2.target.result
                });
            };
            reader.readAsDataURL(file);
        });
    }
    render() {
        return (
            <div>
                <img src={this.state.cut} ref="img" alt=""/>
                <p  onClick={()=>{
                    alert('完成')
                    this.setState({
                        cut:0
                    })
                }} style={{position:'absolute',zIndex:'2',width:'200px','height':'50px',top:'20px',right:'20px',color:'#fff'}}>宽度:{this.state.pixelCrop_.width}高度:{this.state.pixelCrop_.height}</p>
                {
                    this.state.cut != 0 && <ReactCrop
                        crop={this.state.crop}
                        minWidth={90}
                        src={this.state.cut}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete.bind(this)}
                    />
                }

                <input type="file" ref="enter" />
            </div>
        );
    }
}

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
export default Main;
