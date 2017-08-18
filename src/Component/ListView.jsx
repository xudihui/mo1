import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ListView } from 'antd-mobile-web';
import action from '../Action/Index';
import { connect } from 'react-redux';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
const data = [
    {
        img: a1,
        title: 'Meet hotel',
        des: ' 山西 临汾市  Yamaha YZF 系列 YZF-R6',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
    {
        img: a2,
        title: 'McDonald\'s invites you',
        des: ' 广东 汕尾市  Honda Dio 系列 Dio',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
    {
        img: a2,
        title: 'Eat the week',
        des: '湖南 Yamaha Vino 系列 Vino 50',
        detail:'5千-1万公里 / ≤2004年 / 250-399cc'
    },
];
const Loader  = function(){
    return(
        <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

const NUM_ROWS = 5;
let pageIndex = 0;

class Main extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.genData = (pIndex = 0) => {
            const dataBlob = {};
            for (let i = 0; i < NUM_ROWS; i++) {
                const ii = (pIndex * NUM_ROWS) + i;
                dataBlob[`${ii}`] = `row - ${ii}`;
            }
            return dataBlob;
        };

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            isLoading: true,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 200), 800); // also work
        // setTimeout(() => this.refs.lv.scrollTo(0, 200), 800); // recommend usage

        // simulate initial Ajax
        setTimeout(() => {
            this.rData = this.genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 1600);

    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    componentWillReceiveProps(nextProps) {
        console.log('nextProps',nextProps)



      if (nextProps.state.listData !== this.props.state.listData) {
            /*
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.state.listData),
        });
        */
      }
    }

    onEndReached(event){
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.props.pushData(data);
            var x = this.rData;
            var y = this.genData(++pageIndex);
            var z = {};
            for(let i in x){
                z[i] = x[i]
            }
            for(let i in y){
                z[i] = y[i]
            }
            this.rData = z;

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 5600);
    }

    doSetData(val){
        this.props.setState(val);
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`}
                 style={{
                     backgroundColor: '#F5F5F9',
                     height: '1px'
                 }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            console.log('rewData:',rowData)
            const obj = data[Math.floor(Math.random()*3)];
            return (
                <div key={rowID} className="row" onClick={()=>{}}>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
                        <img style={{ height: '1.28rem', width: '1.58rem',marginRight: '0.3rem' }} src={obj.img} alt="icon" />
                        <div className="row-text" style={{textAlign:'left'}}>
                            <div style={{  fontSize: '0.3rem',marginBottom: '0.16rem',color:'#333'  }}>{obj.des}</div>
                            <div style={{  fontSize: '0.2rem',marginBottom: '0.16rem',color:'#aaa' }}>{obj.detail}</div>
                            <div>¥<span style={{ fontSize: '0.3rem', color: '#FF6E27' }}>{Math.floor(Math.random()*20000+1000)}</span></div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <ListView ref="lv"
                      dataSource={this.state.dataSource}
                      renderHeader={() => <span>最新摩托推荐</span>}
                      renderFooter={() => (<div style={{ padding: 30, textAlign: 'center',position:'relative' }}>
                          {this.state.isLoading ? <Loader /> : ''}
                      </div>)}
                      renderRow={row}
                      renderSeparator={separator}
                      className="am-list"
                      useBodyScroll={true}
                      onScroll={() => { }}
                      scrollRenderAheadDistance={20}

                      scrollEventThrottle={10} /*scroll优化事件间断执行，越高性能越好，但是不容易出发快速的onEndReached*/
                      onEndReached={this.onEndReached.bind(this)}
                      onEndReachedThreshold={50} /*距离底部多少距离的时候触发触底方法*/
            />
        );
    }
}





export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
//export default Main;
