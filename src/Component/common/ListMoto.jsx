import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory,hashHistory, Link } from 'react-router';

import { history,formatParams} from './index';


/**
 * 摩托车列表
 *
 * @export
 * @class ListMoto
 * @extends {Component}
 */
class ListItem extends Component {
    render() {
        let {title,status,price,mileage,id,createTime,imgUrls,hasAbs} = this.props.data;
        let {from} = this.props;
        let edit = this.props.edit || false;
        let {showType} = this.props;
        var imgS = showType != 'icon-viewlist' ? {width:'100%',height:'100%',margin:'0',marginBottom:'4px'} : {}
        return (
            <div>
                <Link to={`motoDetail?id=${id}&from=${from||'data'}`} onClick={(e)=>{
                    if(edit){
                        return e.preventDefault();
                    }
                    if(from == 'myHotList'){
                        e.preventDefault();
                        history.push(`motoDetailHot?id=${id}&from=${from||'data'}`)
                    }

                }}>
                    <div className="rowMoto">
                        <div data-flex={`dir:${showType == 'icon-viewlist' ? 'left' : 'top'} main:left`}>
                            <img src={imgUrls.split(',')[0]} alt="icon" data-flex-box="0" style={imgS}/>
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
                                        !edit && <div>
                                            {`${mileage}公里/${createTime}年/${hasAbs!='false'?'ABS':''}`}
                                        </div>
                                    }
                                    {
                                        edit && <div data-flex="main:justify">
                                            <p onClick={() => {
                                                history.push('/Sell')
                                            }}><i className="iconfont icon-bianji" />编辑</p>
                                            <p onClick={() => {
                                                history.push('/Sell')
                                            }}><i className="iconfont icon-ccgl-shangjiajilu-8" />上架</p>
                                            <p onClick={() => {
                                                history.push('/Sell')
                                            }}><i className="iconfont icon-icon1" />下架</p>

                                        </div>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div style={{background:'#eee',height:'1px'}}></div>
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
                        return <ListItem {...this.props} key={index} data={item} />
                    })
                }
            </ul>
        );
    }
}