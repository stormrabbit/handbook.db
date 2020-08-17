```
// 使用 ts 标记组件
<script lang="ts">
import Vue from 'vue'
// 引入注解
import { Component, Prop, Watch } from 'vue-property-decorator'

// Component 标记 Vue 组件
@Component({
  components: {
    // 这里引入子组件
  }
})

// 
export default class VueDemo extends Vue {

    // name
    name: 'VueDemo';

    // data 中的数据定义为属性
    data1:string = '';

    // 如果有 prop 注解则表明是传入属性
    // 写法和 js 中的属性写法相同
    // object 依然要使用 () => ({}) 的方式定义默认值
    @Prop({
        type: Number, 
        required: true,
        default: 0 
    }) private target_id !:number

    // 生命周期定义为类的方法
    public mounted():void {
        this.retrieve();
    }

    // computed 属性使用 get 标记
    get computedVal(): string {
        return this.data1;
    }

    // method 定义方法
    onClick(): void {
        console.log('onclick');
    }

    // watch
    // 深度属性观察写法把 false 改成 true
    @Watch("data1",  { immediate: false, deep: false })
    onDataChange(newVal: string,oldVal: string) {
        console.log(newVal);
        console.log(oldVal);
    }
    // 忽略类型检查
    // @ts-ignore
}


```