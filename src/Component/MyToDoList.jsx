import React, { Component, PropTypes } from 'react';
class TodoList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {todolist : [121,23432,3333,444,666]};
    }
    handleChange(rows){
        this.setState ({ todolist : rows});
    }
    render(){
        console.log('myToDoList',this.props);
        return (
            <div style={{background:'#fff'}}>
                <TypeNew onAdd ={this.handleChange.bind(this)} todo = {this.state.todolist} />
                <ListTodo onDel = {this.handleChange.bind(this)} todo = {this.state.todolist} />
            </div>
        )
    }

};

class TypeNew extends React.Component{
    handleAdd(e){
        e.preventDefault();
        var newthing = this.refs.inputnew.value.trim();
        var rows = this.props.todo;
        if ( newthing != '' ){
            rows.push (newthing);
            this.props.onAdd (rows) ;
        }
        this.refs.inputnew.value = '';
        this.refs.inputnew.focus();
        //alert('success')
    }

    render(){
        return (
                <form className="pure-form"  onSubmit={this.handleAdd.bind(this)}>
                    <fieldset>
                        <input ref = "inputnew" type = "text"  placeholder="请输入待办事项" id="new-todo"  />
                    </fieldset>
                </form>
        )
    }
};

class ListTodo extends React.Component{
    handleDel(e){
        var delindex = e.target.getAttribute("data-key");
        this.props.todo.splice(delindex,1);
        this.props.onDel(this.props.todo);
    }

    render(){
        return (
            <table className="pure-table pure-table-horizontal">
                <thead>
                <tr>
                    <th>#</th>
                    <th>任务名</th>
                    <th>操作</th>
                </tr>
                </thead>

                <tbody>
                {
                    this.props.todo.map(function(item,i){
                        return (
                        <tr key = {i} className={i%2 == 0 ? 'pure-table-odd' : ''}>
                            <td>{i}</td>
                            <td>{item}</td>
                            <td><button className="pure-button" onClick = {this.handleDel.bind(this)} data-key = {i} >delete</button></td>
                        </tr>
                        )
                    }.bind(this))
                }
                </tbody>
            </table>
        )
    }
};
export default TodoList