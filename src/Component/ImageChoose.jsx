import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';
import a1 from '../Images/01.jpg';
import a2 from '../Images/02.jpg';
const data = [{
    url: a1,
    id: '2121',
}, {
    url: a2,
    id: '2122',
}];

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: data,
        };
    }

    onChange(files, type, index){
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    onAddImageClick(e){
        e.preventDefault();
        console.log(e)
        this.setState({
            files: this.state.files.concat({
                url: a2,
                id: '3',
            }),
        });
    };
    onTabChange(key){
        console.log(key);
    };
    render() {
        const { files } = this.state;
        return (
            <div>
                <ImagePicker
                    files={files}
                    onChange={this.onChange.bind(this)}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 10}
                    onAddImageClick={this.onAddImageClick.bind(this)}
                />
            </div>
        );
    }
}

//export default connect((state) => { return { state: state['IndexList']} }, action())(Main);
export default Main;
