import { Tool, merged } from '../Tool';
/**
 * 存储的用户信息
 * 
 * @param {Object} [state={}]
 * @param {Object} action
 * @returns Object
 */
const User = (state = {id:'18868342556',time:''}, action) => {
    switch (action.type) {
        case 'setTime': //设置服务器时间
            return Object.assign({},state,{time:action.target});
        case 'setState':
            return Object.assign({},state,{tuy:action.target});
        case 'login': //从App获取userId
            if(action.target){
                return Object.assign({},state,{id:action.target});
            }
            else{
                return Object.assign({},state,{id:''});
            }

        default:
            return state;
    }
}


const indexData = [
    {
        "id": "58d0fb3517f61387400b7e15",
        "discount": "3折",
        "desc": "买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠买车险享立减优惠",
        "name": "平安车险",
        "type":"S" //商业险，J为交强险
    }
];
/**
 * 存储的首页保险信息，暂时只有一个平安保险，只做静态呈现，不从服务器获取。
 *
 * @param {Array} [state=[{},{},{}]]
 * @param {Object} action
 * @returns Object
 */
const IndexList = (state = indexData, action) => {
    switch (action.type) {
        case 'pushData': //列表页面内容
            var temp = state.listData || [];
            return Object.assign({},state,{listData:temp.concat( action.target )});
        case 'clearData': //清空
            return [];
        default:
            return state;
    }
}


const DB = (_ID = '', seting = {}) => {
    const cb = {
        setDefaut: () => {
            var defaults = merged({
                path: '', //当前页面的href
                loadAnimation: true, //true显示加载动画，false 不显示加载动画
                loadMsg: '加载中', //加载提示
                data: null, //页面的数据
                scrollX: 0, //滚动条X
                scrollY: 0 //滚动条Y
            }, seting);
            return {
                defaults,
                path: {}
            };
        },
        //ajax请求数据拿到之后直接dispatch一个type为setState的action，然后重新渲染被redux绑定在一起的容器组件
        setState: (state, target) => {
            state.path[target.path] = target;
            state.data = target;
            console.log('传给store的action[target]:',target);
            console.log('输出的state:',merged(state))
            return merged(state);
        }
    }
    return (state = {}, action = {}) => {
        if (action._ID && action._ID !== _ID || action.type=='setTime' ) {
            return state;
        } else if (cb[action.type]) {
            console.log(`进入${_ID}数据处理reducer，动作类型：`,action.type)
            return cb[action.type](state, action.target);
        }
        else {
            return cb.setDefaut();

        }
    }
}
const MyList = DB('MyList', { page:  1, nextBtn: true, limit: 10, mdrender: false, data: [],pageNumber:  1, rows: 10, }); //保单列表,含翻页
export default { IndexList,MyList,User }