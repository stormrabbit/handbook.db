# 魔兽世界怀旧服 WA 字符串与宏研究

## 敌方xx | 友方则友方的目标 xx | xx

```
#showtooltip
/cast [harm,@target] 技能;[help,@targettarget] 技能; 技能
```


## 战士宏

### 宏1

```
#showtooltip
/target mouseover
/cast [help]援护;[combat]拦截;冲锋
/cast [help]防御姿态;[combat]狂暴姿态;战斗姿态
/cast [help]援护;断筋
/cast [harm,combat]血性狂暴
```

> 鼠标指向选定友方目标自动切入防御姿态并释放援护；如果鼠标指向选定是敌方目标，不在战斗中则自动切入战斗姿态释放冲锋加断筋；如果鼠标指向选定是敌方目标，在战斗中则自动切入狂暴姿态释放拦截加断筋加血性狂暴（为保障无怒时涨怒拦截）

### 宏2

```
#showtooltip
/cast [target=mouseover,harm,nodead][]缴械
/cast 防御姿态
/equipslot 16 剑
/equipslot 17 盾牌
```

## 术士宏
### 狂按不打断吸血/吸蓝效果

```
#showtooltip 吸取生命
/cast [nochanneling] 吸取生命
```
### 宠物攻击

```
#showtooltip
/petattack
```
### 切换不同宠物的时候，显示宠物技能图标CD(你百度你都找不到能显示图标的宏 因为他们没有加[pet:宠物名字])

```
#showtooltip
/cast [pet:地狱猎犬]法术封锁
/cast [pet:魅魔]诱惑
/cast [pet:虚空行者]受难
```
### 宠物跟随并且驱散自己魔法

```
#showtooltip
/petfollow
/cast [pet:地狱猎犬,@player]吞噬魔法
```

## 设置血条显示距离

```
/run SetCVar("nameplateMaxDistance", "4e1")
```


## 猎人宏

### 假死收宝宝

```
#showtooltip
/PetPassiveMode
/petpassive
/施放 假死
```

### 切换守护

```
#showtooltips
/castsequence 雄鹰守护,猎豹守护

```

### 宠物万能

```
#showtooltip 治疗宠物
/cast [modifier:shift]解散野兽
/cast [modifier:alt,pet,nocombat]喂养宠物
/use [modifier:alt,pet,nocombat]烤鹌鹑
/stopmacro [modifier:shift][modifier:alt]
/castsequence [@pet,dead] 复活宠物;[nopet]reset=2 召唤宠物,复活宠物;治疗宠物
```

### 鼠标指向照明弹

```
#showtooltip
/cast [@cursor] 照明弹
```
[这里](https://bbs.nga.cn/read.php?tid=18370262&rand=500)
## 参考

[[宏指南] 从入门到精通，授人以鱼不如授人以渔](https://nga.178.com/read.php?tid=17098451)