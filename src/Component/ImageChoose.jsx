import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import {ImagePicker } from 'antd-mobile-web';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: props.files || [],
        };
    }

    onChange(files, type, index){
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    onAddImageClick(e){
       // e.preventDefault();
        console.log(e)
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
