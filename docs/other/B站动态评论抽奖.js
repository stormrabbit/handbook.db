var lotteryFunc = () => {
    let str = '==>开始抽奖<==\n'
    const _names = Array.from(document.getElementsByClassName('name'))
    const names = _names.map((_name, index) => ({name: _name.innerText, index})).reduce( (resultNames, currentName) => {
        const target = (resultNames.find(tar => tar.name === currentName.name))
        if(!target) {
            resultNames.push(currentName)
        } 
        return resultNames
    }, [])

    if(!names || !names.length) {
        str = '很可惜，未能找到候选者名单，~(￣0￣)/'
    } else {
        
        str += `当前动态下用户数量为：${names.length}\n`
        str += '他们是：\n'
        str += '==>分割线<==\n'
        
        names.forEach( (name, index) => {
            str += `第 ${index +1} 位（${name.index + 1} 层）：${name.name}\n`
        } )
        str += '==>分割线<==\n'
        str += '以此名单为准\n'
        str += '让我们揭晓谁会收到随机之神的青睐吧～\n'
        str += '锵锵～'
        const index = Math.floor(Math.random() * names.length);
        const target = names[index]
        str += '有请我们今日的幸运儿～\n'
        str += `他是第 ${index + 1}位（${target.index +1}）层：${target.name}`
        const lottery = document.getElementById('lottery')
        const temp = document.getElementById('result')
        if(temp){
            temp.remove(temp)
        }
        var result = document.createElement("div"); //创建一个标签
        
        result.id = 'result'
        result.innerText = str
        result.style.width = "auto";
        result.style.height = "auto";
        result.style.color = "#000";
        result.style.textAlign = 'left'
        result.style.fontSize = "14px";
        result.style.border = "1px solid #000";
        result.style.padding = '16px';
        lottery.appendChild(result)
    }
}
var init = () => {
    const lottery = document.getElementById('lottery')
    if(lottery) {
        lottery.remove(lottery)
    }
    const frameDiv = document.createElement("div"); //创建一个标签
    frameDiv.id = "lottery";
    frameDiv.style.width = "auto";
    frameDiv.style.height = "auto";
    frameDiv.style.color = "#000";
    frameDiv.style.textAlign = 'center'
    frameDiv.style.fontSize = "14px";
    frameDiv.style.border = "1px solid #000";
    frameDiv.style.padding = '16px';
    const bodyFa = document.getElementsByClassName("comment-send ")[0]; //通过id号获取frameDiv 的父类（也就是上一级的节点）
    bodyFa.appendChild(frameDiv); //把创建的节点frameDiv 添加到父类body 中；
    const btn = document.createElement("button"); //创建一个标签
    btn.innerText = '点我抽奖'
    btn.onclick = lotteryFunc
    frameDiv.appendChild(btn)
}

init()