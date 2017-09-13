import { Tool, merged } from '../Tool';
/**
 * 存储的用户信息
 * 
 * @param {Object} [state={}]
 * @param {Object} action
 * @returns Object
 */
const User = (state = {id:localStorage.getItem('id')||'',time:''}, action) => {
    switch (action.type) {
        case 'setTime': //设置服务器时间
            return Object.assign({},state,{time:action.target});
        case 'setState':
            return Object.assign({},state,{tuy:action.target});
        case 'login': //从App获取userId
            if(action.target){
                localStorage.setItem('id',action.target)
                return Object.assign({},state,{id:action.target});
            }
            else{
                localStorage.setItem('id','')
                return Object.assign({},state,{id:''});
            }

        default:
            return state;
    }
}


var data_ = {
    yy:{
        'base':[
            {name:"王兆利",id:"101008401348320",noId:"332528195205295012"},
            {name:"李枝源",id:"101013895666802",noId:"332528196603055211"},
            {name:"杨昌盛",id:"6230910999010403011",noId:"332528196603104810"},
            {name:"陈根兰",id:"6230910999008340000"},
            {name:"何冬珠",id:"6228580999003247394"},
            {name:"何光宝",id:"6228580999007843602"},
            {name:"何星文",id:"6228580999008859912"},
            {name:"洪冬梅",id:"101004983842941"},
            {name:"洪月兰",id:"6230910999000430000"},
            {name:"季根英",id:"6228580999020290000"},
            {name:"金爱连",id:"6230910999000420000"},
            {name:"金香",id:"6230910999010402575"},
            {name:"金岳梅",id:"101010423889063"},
            {name:"李冬华",id:"6228580999013948981"},
            {name:"李会",id:"6230910999001384709"},
            {name:"李慧鑫",id:"6230910999006599822"},
            {name:"李增发",id:"101010358329580"},
            {name:"龙布休",id:"6230910999006580000"},
            {name:"罗春艳",id:"6230910999006584501"},
            {name:"毛婵娟",id:"101011760015268"},
            {name:"王夏弟",id:"101010507633651"},
            {name:"王作花",id:"6230910999001384337"},
            {name:"吴彩英",id:"101010991490609"},
            {name:"吴家香",id:"101010094242196"},
            {name:"徐根弟",id:"6230910999008350000"},
            {name:"徐妙弟",id:"101003749686261"},
            {name:"徐秋生",id:"101001336691465"},
            {name:"徐霞香",id:"101008658823981"},
            {name:"徐信妹",id:"101001335210494"},
            {name:"杨昌汉",id:"6228580999009476203"},
            {name:"杨菊敏",id:"101011201018645"},
            {name:"叶春火",id:"6228580981300004801"},
            {name:"叶芳红",id:"101008473311895"},
            {name:"叶海林",id:"101009969355213"},
            {name:"叶洪妹",id:"6228580999003240000"},
            {name:"叶建飞",id:"101001334929931"},
            {name:"叶建美",id:"101009875590445"},
            {name:"叶兰英",id:"101010443841726"},
            {name:"叶南连",id:"6230910999008350000"},
            {name:"叶青钗",id:"101010547109454"},
            {name:"叶文香",id:"6228580999007844881"},
            {name:"叶香梅",id:"6230910999006580000"},
            {name:"叶小琴",id:"6228580999002804609"},
            {name:"张兴元",id:"101003028455056"},
            {name:"章水英",id:"6230910999008368440"},
            {name:"周陈兰",id:"101010115260055"},
            {name:"周陈明",id:"101010115260055"},
            {name:"周兰妹",id:"6230910999005000814"},
            {name:"周岳珠",id:"101010585843548"},
            {name:"周哲明",id:"101001335430127"},
            {name:"王坎董",id:"6230910999008368374"}
        ]
    },
    fp:{
        'base':[
            {name:"邝菊兰",id:"6228580999020338903",noId:"332528196509195429"},
            {name:"周晓军",id:"6228580999013730884",noId:"332528198709135411"},
            {name:"白腊松",id:"6230910999001402618"},
            {name:"傅火兰",id:"6230910999006589252"},
            {name:"何李弟",id:"6228580999020318152"},
            {name:"华夏英",id:"101007923746709"},
            {name:"李火爱",id:"101011810920477"},
            {name:"王继岳",id:"6230910999006919954"},
            {name:"吴建平",id:"6217360999000651811"},
            {name:"吴美英",id:"101001335392950"},
            {name:"吴水娟",id:"6230910999006919798"},
            {name:"徐妙英",id:"101010006144675"},
            {name:"徐香波",id:"6230910999006905334"},
            {name:"叶南兴",id:"6228580999009476088"},
            {name:"叶庆定",id:"101001328933100"},
            {name:"周葱弟",id:"6228580999020308435"},
            {name:"洪昌秀",id:"101009502325976"}
        ]
    }
}
var data = {};
try{
    data = JSON.parse(localStorage.getItem('data'));
}catch(e){

}
if(!data){
    data = data_;
}

const FatherData = (state = {data:data}, action) => {
    switch (action.type) {
        case 'setData': //设置服务器时间
            localStorage.setItem('data',JSON.stringify(action.target));
            return Object.assign({},state,{data:action.target});
        case 'setState':
            return Object.assign({},state,{tuy:action.target});
        case 'login': //从App获取userId
            if(action.target){
                localStorage.setItem('id',action.target)
                return Object.assign({},state,{id:action.target});
            }
            else{
                localStorage.setItem('id','')
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
export default { IndexList,MyList,User,FatherData }