import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory,hashHistory, Link } from 'react-router';
import ListMoto from './ListMoto';


/**
 * 推荐列表列表
 *
 * @export
 * @class myHotList
 * @extends {Component}
 */

/**
 * 通过MyHotList的isHot字段设置为false，可以让详情页展示热门车型，否则不显示
 */

export default class MyHotList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.data.length > 0 && <div style={{paddingBottom:this.props.paddingBottom || 0}}><div className="sub-title">{this.props.title || '为您推荐'}</div><ListMoto showType="icon-viewlist" from={this.props.from || 'new'} isHot={this.props.isHot || 'true'} list={this.props.data} /></div>
                }
            </div>
        );
    }
}

