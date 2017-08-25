import React, { Component, PropTypes } from 'react';
import { SearchBar } from 'antd-mobile-web';
import { connect } from 'react-redux';
import { history } from './common/index';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            historyArr:JSON.parse(localStorage.getItem('historyArr')) || []

        };
    }
    handlerSubmit(e) {
        console.log(this)
        var temp = this.state.historyArr;
        if (e != '') {
            temp.unshift(e);
            if (temp.length > 5) {
                temp = temp.slice(0, 8)
            }
            localStorage.setItem('historyArr', JSON.stringify(temp));
            this.setState({historyArr: temp})
        }
        history.push('/?type=Buy&query=' + e);
    }
    handlerClick(e){
        history.push('/?type=Buy&query='+e);
    }
    clearHistory(){
        this.setState({historyArr:[]});
        localStorage.setItem('historyArr',JSON.stringify([]));
    }
    componentDidMount(){
        this.setState({
            focused: true,
        });
    }
    render(){
        var temp =  this.state.historyArr.map(function(item,index){
            return(
                <li key={index} onClick={() => {this.handlerClick(item)}}>{item}</li>
            );

        }.bind(this));
        return(
            <div>
                <SearchBar ref='input'  focused={this.state.focused}
                           onFocus={() => {
                               this.setState({
                                   focused: false,
                               });
                           }}
                           onSubmit={(e) => {this.handlerSubmit(e)}} autoFocus placeholder="请输入车系/车型" />
                <div className="match_subnav_his" style={{maxHeight:'auto'}}>
                    <ul>
                        {
                           temp
                        }
                    </ul>
                    <p className="clearHistory" onClick={() => {this.clearHistory()}}>清空搜索记录</p>

                </div>
            </div>
        );
    }

}

export default connect((state) => {return{a:1}})(Main);

