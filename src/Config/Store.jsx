import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducer from '../Reducer/Index';
import thunk from 'redux-thunk';
import { Tool, merged } from '../Tool';
import action from '../Action/Index';
//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
var store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk)
);
let next = store.dispatch;


//日志打印
store.dispatch = function (action) {
    console.log('dispatching', action);
    next(action);
    console.log('next state', store.getState());
}

store.subscribe(function(){

})

//action 中间件，主要用户ajax请求，同时发送多个异步action
const fetchPosts = opt => (dispatch, getState) => {
    store.dispatch(action().login(1));
    Tool.post(opt.url, opt.query,
        function(data){
            store.dispatch(action().login(2213132));
        }.bind(this))
};

var ajaxFetch = (i) => {
    store.dispatch(fetchPosts(i));
}
//数据请求 action 使用方法
//store.dispatch(fetchPosts());

export {ajaxFetch};
export default store;
