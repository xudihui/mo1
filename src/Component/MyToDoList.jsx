import React,{ Component } from 'react';
class Counter extends Component{
    constructor(props){
        super(props);

        this.state = {
            count:0,
        }
    }

    handleClick(e){
// 阻止合成事件与最外层document上的事件间的冒泡
        e.nativeEvent.stopImmediatePropagation();

        this.setState({count:++this.state.count});
    }

    render(){
        return(
            <div ref="test">
                <p>{this.state.count}</p>
                <a ref="update" onClick={(e)=>this.handleClick(e)}>更新</a>
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            console.log('document');
        });
    }
}

export default Counter