import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory,hashHistory, Link } from 'react-router';

import { history,formatParams,getDateDiff} from './index';

import { Tool, merged } from '../../Tool';
import { Toast } from 'antd-mobile-web';

/**
 * 评论列表
 *
 * @export
 * @class Discuss
 * @extends {Component}
 */
class ListItem extends Component {
    render() {
        var {item} = this.props;
        var city = item.cityName || '';
        if(city){
            city = '[' + city + ']';
        }
        return (
            <div className="talk">
                <div className="name" data-flex="main:justify">
                    <span onClick={()=>{
                        history.push(`personcenter/${item.userId}`)
                    }}>{city}{item.tel.slice(0,3)+'****'+item.tel.slice(7,11)}说:</span>
                    <span>{getDateDiff(item.createTime)}</span>
                </div>
                <div className="text">{item.content}</div>
            </div>
        );
    }
    shouldComponentUpdate(np) {
        return true;
    }
}

export default class Discuss extends Component {
    render() {
        var self = this;
        return (
            <div>
                {
                    this.props.list.map((item, index) => {
                        return <ListItem {...this.props} key={index} item={item} />
                    })
                }
                {
                    this.props.list.length == 0 && <div style={{margin:'.2rem',color:'#bbb'}}>暂无，快来成为第一个砍价的人吧！</div>
                }
            </div>
        );
    }
}