import { Tool, merged } from '../Tool';
/**
 * 存储的用户信息
 * 
 * @param {Object} [state={}]
 * @param {Object} action
 * @returns Object
 */
var userDefault = {
    userInfo:JSON.parse(localStorage.getItem('userInfo'))||'',
    city:localStorage.getItem('city') || '全国'
}
const User = (state = userDefault, action) => {
    switch (action.type) {
        case 'setCity':
            localStorage.setItem('city',action.target);
            return Object.assign({},state,{city:action.target});
        case 'setState':
            return Object.assign({},state,{tuy:action.target});
        case 'login': //从App获取userId
            if(action.target){
                localStorage.setItem('userInfo',JSON.stringify(action.target))
                return Object.assign({},state,{userInfo:action.target});
            }
            else{
                localStorage.setItem('userInfo','')
                return Object.assign({},state,{userInfo:''});
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
                myViewList:JSON.parse(localStorage.getItem('myViewList')||'[]'),
                myHotList:[],
                path: {}
            };
        },
        //ajax请求数据拿到之后直接dispatch一个type为setState的action，然后重新渲染被redux绑定在一起的容器组件
        setState: (state, target) => {
            state.path[target.path] = target;
            state.data = target;
            return merged(state);
        },
        setOwn: (state, target) => {
            state.myown = target;
            return merged(state);
        },
        setHotList:(state, target) => {
            state.myHotList = target;
            return merged(state);
        },
        setViewList:(state, target) => {
            state.myViewList.unshift(target);
            state.myViewList = state.myViewList.unique();

            localStorage.setItem('myViewList',JSON.stringify(state.myViewList))
            return merged(state);
        },
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

const MyList = DB('MyList', { page:  1, nextBtn: true, mdrender: false, data: [],page:  1, rows: 10, }); //保单列表,含翻页
export default { MyList,User }