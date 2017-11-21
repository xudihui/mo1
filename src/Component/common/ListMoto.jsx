import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory,hashHistory, Link } from 'react-router';

import { history,formatParams,dataCityNo} from './index';

import { Tool, merged } from '../../Tool';
import { Toast } from 'antd-mobile-web';

/**
 * 摩托车列表
 *
 * @export
 * @class ListMoto
 * @extends {Component}
 */
class ListItem extends Component {
    render() {
        let {title,status,price,mileage,id,createTime,imgUrls,hasAbs,productDate,area,lastPrice} = this.props.data;
        let {from,showType,location,setState,state} = this.props;
        let edit = this.props.edit || false;
        var {pathname, search} = location || {};
        var path = pathname + search;
        var imgS = showType != 'icon-viewlist' ? {width:'100%',height:'100%',margin:'0',marginBottom:'4px'} : {}
        var img_show = '';
        var img_source = imgUrls.split(',');
        for(let i in img_source){
            if(!isNaN(i)){
                if(img_source[i] !=  '' && img_source[i] !=  'null'){
                    img_show = img_source[i];
                    break;
                }
            }
        }
        return (
            <div className="index-list-panel">
                <div style={{background:'#f1f1f1',height:'7px'}} className="blank"></div>
                <Link to={`/motoDetail?id=${id}&from=${from||'data'}`} onClick={(e)=>{
                    if(edit){
                        e.preventDefault()
                        return
                    }
                    if(from == 'myHotList'){
                        e.preventDefault();
                        history.push(`/motoDetailHot?id=${id}&from=${from}`)
                    }else if(from == 'new'){
                        e.preventDefault();
                        history.push(`/motoDetailNew?id=${id}&from=${from}`)
                    }

                }}>
                    <div className="rowMoto">
                        <div data-flex={`dir:${showType == 'icon-viewlist' ? 'left' : 'top'} main:left cross:center`}>
                            <img src={img_show} alt="icon" data-flex-box="0" style={imgS}/>
                            <div className="rowMotoText" data-flex="main:justify dir:top">
                                <div >
                                    {title}
                                    {
                                        status == 'pass' && <i className="iconfont icon-yirenzheng" style={{color:'#ff5b05',padding:'0 5px',position:'relative',top:'3px'}}></i>
                                    }
                                    {
                                        status == 'edit' && <i className="iconfont icon-process"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 认证中</i>
                                    }
                                    {
                                        status == 'unpass' && <i className="iconfont icon-process"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 认证不通过</i>
                                    }
                                    {
                                        status == 'off' && <i className="iconfont icon-process"  style={{color:'#aaa',fontSize:'8px',padding:'0 5px',position:'relative',top:'-2px'}}> 已下架</i>
                                    }
                                </div>
                                <div>
                                    {
                                        !edit && <div style={{display:'none'}}>

                                        </div>
                                    }
                                    {
                                        edit && <div data-flex="dir:left">
                                            <p onClick={() => {
                                                history.push(`selledit?id=${id}&from=${from||'data'}`)
                                            }}><i className="iconfont icon-bianji" />编辑</p>
                                            {
                                                status == 'off' &&  <p onClick={() => {
                                                    Tool.post($extMotorOn,{id},function(data){
                                                        if(data.code == '0'){
                                                            Toast.info('上架成功', .5);
                                                            var temp = state;
                                                            for(let i in temp['data']){
                                                                if(temp['data'][i]['id'] == id){
                                                                    temp['data'][i]['status'] = 'edit';
                                                                }
                                                            }
                                                            setState(temp);
                                                        }
                                                        else{
                                                            Toast.offline(data.msg)
                                                        }
                                                    })
                                                }}><i className="iconfont icon-ccgl-shangjiajilu-8" />上架</p>
                                            }
                                            {
                                                status != 'off' &&  <p onClick={() => {
                                                    Tool.post($extMotorOff,{id},function(data){
                                                        if(data.code == '0'){
                                                            Toast.info('下架成功', .5);
                                                            var temp = state;
                                                            for(let i in temp['data']){
                                                                if(temp['data'][i]['id'] == id){
                                                                    temp['data'][i]['status'] = 'off';
                                                                }
                                                            }
                                                            setState(temp);
                                                        }
                                                        else{
                                                            Toast.offline(data.msg)
                                                        }
                                                    })
                                                }}><i className="iconfont icon-icon1" />下架</p>
                                            }



                                        </div>
                                    }
                                </div>
                                <div  data-flex="main:justify">
                                    <span>￥{price/100}元</span>
                                    <span style={{color:'#aaa',fontSize:'.25rem'}}><i className="iconfont icon-shouhuodizhi"></i>{dataCityNo[area.split(',')[1]]}</span>

                                </div>
                                {

                                    lastPrice-price > 0 && <span className="animated lightSpeedIn"  style={{color:'#ff3300',textAlign:'right',fontSize:'.25rem',paddingTop:'.1rem'}}>
                                        <i className="iconfont icon-jiangjia"></i>
                                        {lastPrice!=price ? `${(lastPrice-price)/100000}千` : ''}
                                        </span>
                                }
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
    shouldComponentUpdate(np) {
        return true;
    }
}

export default class ListMoto extends Component {
    render() {
        var self = this;
        return (
            <ul className="index-list">
                {
                    this.props.list.map((item, index) => {
                        if(JSON.stringify(item)!="{}"){
                            return <ListItem {...this.props} key={index} data={item} />
                        }

                    })
                }
            </ul>
        );
    }
}