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
        console.log('this',this)
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
        return(
            <div>
                <SearchBar ref='input'  focused={this.state.focused}
                           onFocus={() => {
                               this.setState({
                                   focused: false,
                               });
                           }}
                           onCancel={() => {
                               history.goBack();
                           }}
                           onSubmit={(e) => {this.handlerSubmit(e)}} autoFocus placeholder="请输入车系/车型" />
                <div className="match_subnav_his" style={{maxHeight:'auto'}}>
                    <ul>
                        {
                            //在数据遍历中绑定事件，方法1是通过bind(this),并且onClick={() => {this.handlerClick()}}匿名函数才行,否则this指向还是会变化
                            //方法2，在函数外把this指向其它变量，比如self，然后在遍历内部onClick={() => {self.handlerClick()}} 即可
                            //仅仅在函数遍历内部使用onClick={self.handlerClick}或者onClick={self.handlerClick},定义函数变量名的话，this永远指向null
                            this.state.historyArr.map(function(item,index){
                                return(
                                    <li key={index} onClick={() => {this.handlerClick(item)}}>{item}</li>
                                );

                            }.bind(this))
                        }
                    </ul>
                    <p className="clearHistory" onClick={() => {this.clearHistory()}}>清空搜索记录</p>

                </div>
            </div>
        );
    }

}

export default connect((state) => {return{a:1}})(Main);

