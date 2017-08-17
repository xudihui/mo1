import React, { Component, PropTypes } from 'react';
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile-web';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile-web';
import im_ from '../Images/img_cxye.png';
const data = [
    {
        value: '1',
        label: 'Food',
        children: [
            {
                label: 'All Foods',
                value: '1',
                disabled: false,
            },
            {
                label: 'Chinese Food',
                value: '2',
            }, {
                label: 'Hot Pot',
                value: '3',
            }, {
                label: 'Buffet',
                value: '4',
            }, {
                label: 'Fast Food',
                value: '5',
            }, {
                label: 'Snack',
                value: '6',
            }, {
                label: 'Bread',
                value: '7',
            }, {
                label: 'Fruit',
                value: '8',
            }, {
                label: 'Noodle',
                value: '9',
            }, {
                label: 'Leisure Food',
                value: '10',
            }],
    }, {
        value: '2',
        label: 'Supermarket',
        children: [
            {
                label: 'All Supermarkets',
                value: '1',
            }, {
                label: 'Supermarket',
                value: '2',
                disabled: true,
            }, {
                label: 'C-Store',
                value: '3',
            }, {
                label: 'Personal Care',
                value: '4',
            }],
    },
    {
        value: '3',
        label: 'Extra',
        isLeaf: true,
        children: [
            {
                label: 'you can not see',
                value: '1',
            },
        ],
    },
];

class MenuExample extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
        };
    }
    onChange(value){
        let label = '';
        data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }
    handleClick(e){
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
            setTimeout(() => {
                this.setState({
                    initData: data,
                });
            }, 500);
        }
    }

    render() {
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                className="foo-menu"
                data={initData}
                value={['1', '3']}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.6}
            />
        );
        const loadingEl = (
            <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );
        return (
            <div className={show ? 'menu-active' : ''}>
                <div>
                    <NavBar
                        leftContent="车型"
                        mode="light"
                        //iconName={require('./menu.svg')}
                        onLeftClick={this.handleClick.bind(this)}
                        className="top-nav-bar"
                    >


                        Here is title
                    </NavBar>
                </div>
                {show ? initData ? menuEl : loadingEl : null}
            </div>
        );
    }
}

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log('onChange', key);
}
function handleTabClick(key) {
    console.log('onTabClick', key);
}
const TabExample = () => (
    <div>

        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <Tabs defaultActiveKey="2" onChange={callback} onTabClick={handleTabClick}>
            <TabPane tab={<Badge text={'3'}>First Tab</Badge>} key="1">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                    Content of First Tab
                </div>
            </TabPane>
            <TabPane tab={<Badge text={'今日(20)'}>Second Tab</Badge>} key="2">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                    Content of Second Tab
                </div>
            </TabPane>
            <TabPane tab={<Badge dot>Third Tab</Badge>} key="3">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '5rem', backgroundColor: '#fff' }}>
                    Content of Third Tab
                </div>
            </TabPane>
        </Tabs>
        <WhiteSpace />
        <div style={{width:'100%',height:'100px',background:'url('+im_+')'}}  ></div>
    </div>
);
export default TabExample;
