//action 生成机器
export default (_ID) => {
    var action = {};
    var arr = [
        'login', //登录成功
        'setState', //设置状态
        'setTime',//设置时间
        'pushData',
        'setData',
        'setCity',//切换城市
        'setOwn',//设置收藏等信息
        'setViewList',//设置浏览记录
        'setHotList',
    ];
    for (let i = 0; i < arr.length; i++) {
        action[arr[i]] = (target) => {
            return { _ID: _ID, target: target, type: arr[i] };
        }
    }
    return action;
}