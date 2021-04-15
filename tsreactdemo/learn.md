### react 学习记录
```
在公司碰到一个问题：是react生命周期的问题，父组件因为是 网络请求 得到的数据 所以这个数组存在延迟
在子组件中无法获得到

要实现一个
下拉框的选择功能 下拉框的数据是父组件传值进来的
所以 默认 下拉框要有一个初始值

但是 下拉框 选择好 发送给后端的时候 是发送的下拉框的id内容

为解决上面的问题 使用了一个load标志
也就是
在useEffect的时候 第一个是mounted渲染 后来是当传进来的数据发生变化的话 就会触发useEffect里面的函数
我们可以判断 拿到的数据的是否为空 为空的话 就是渲染触发的但此时数据并还没有真正传入过来 所以 此时load为false 下面的Form不显示

useEffect 的使用？？？
```


###4.13 学习react的总结
#####1. ts的一些简单书写 定义接口
   如果没有写 interface这种 的
   就直接像下面一样写
``` js
   function Speech(props: { handleChange?: any; dataList?: any })

   or

   interface NameProp {
    name: String
    age: Number
    }
    const Chils: FC<NameProp> = (props) => {

```
#####2. ``useState``的使用方法
    与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象
    [link]: (https://blog.csdn.net/wu_xianqiang/article/details/105181044)

    接口的写法
``` js
想写成一个数组里面 对象的形式
interface ArrInfo {
    id: number
    value: number
}
const [arr, setarr] = useState<ArrInfo[]>([])

类似于 arr=[{id:1,value:100},{id:2,value:200}]
```


``` js
{dataList.map((item: any, index: number) => (
    <Option key={item.type} value={item.type}>
        {item.name}
    </Option>
))}

or

{dataList.map((item: any, index: number) => {
    return (
        <Option key={item.type} value={item.type}>
            {item.name}
        </Option>
    )
})}
```
#####3. ``useEffect``的使用方法
useEffect 第二个参数不加 就是说 不管什么参数更新 都会触发useEffect
如果是 [] 就是 这个函数只在渲染和卸载的时候触发 其它任何参数的更新都不会触发它
[num] 渲染+卸载+num的值发生变化的时候
这里要注意的是 它是个``浅比较``那种的方式 就是说 只有数组对象的地址发生变化 他才会观察到 对象的值改变 他不会观察到
``` js
var obj = { a: 8 }
const [cnt, setCnt] = useState(obj)
obj.a = Math.random() * 100
setCnt(obj)
改变的话 是不会触发这个useEffect

下面的更新方式是会触发useEffect
obj = { a: Math.random() * 100 }
setCnt(obj)

对于一个数组对象的更新
setarr([
            ...arr,
            {
                id: 5,
                value: Math.random() * 100
            }
        ])
```

#####4. ``antd``的使用方法

###4.13 学习react的总结

函数组件要用大写的字母开头 不然会报错

1. ts的学习
   ```ts
   let {a,b}:{a:string,b:number}=o
   用这样的形式来对o.a o.b进行解构

   声明函数
   let mySearch=function(source:string,sub:string):boolean{

   }
   意思就是 传进去的参数 source sub都是string类型
   函数返回的类型是boolean值
   ```
2. antd 的学习
   得引入 antd的css 样式
   但是公司代码可以直接~ 从node_moudules中引入
   今天使用的是 Form
    ``` js
   <Form form={form} initialValues={{ fruit: 'banana' }}>
        <Form.Item label="水果" name="fruit">
            <Select placeholder="请选择水果" style={{ width: 300 }}>
                {dataList.map((item: any, index: number) => (
                    <Option key={item.type} value={item.type}>
                        {item.name}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    </Form>
    ```
    这里的话 Form的``initialValues``的优先级是最高的
    这里传的是一个对象 因为 Form.Item的``name``为``fruit``
    如果还有另外一个Form.Item 的 ``name``为``age``
    那么就可以设置为
    ```js
    initialValues={{ fruit: 'banana' , age:'val'}}
    这个 banana 是和下面的 option中的value对应的
    ```
    Form.Item里面用的是 ``initialValue``
3. 条件渲染
   ```js
   ``show``为真的时候 就显示组件名
   {show && <div>组件名</div>}
   {show ? (一个组件):<></>}
   ```

#####4. ``useRef``的使用方法

```
场景：本来有一个值val=0 按钮A让val每次自增1 连续按5次 这时按钮B setTimeout alert val值，马上点击A

alert出来的值 是最新的val 还是当时那个val？？？
答案是当时那个 val
```

说明 ``useState``具有 ``capture value``的属性
如果想拿到最新的值
可以把 ``useState``改为
```js
const mess=useRef('')
mess.current=XXXX
这样子的形式来写
```

``` js
每次render 不仅是对象 函数 在每次render时也是独立的 就是 ``capture value``特性

const App = () => {
  const [temp, setTemp] = React.useState(5);

  const log = () => {
    setTimeout(() => {
      console.log("3 秒前 temp = 5，现在 temp =", temp);
    }, 3000);
  };

  return (
    <div
      onClick={() => {
        log();
        setTemp(3);
        // 3 秒前 temp = 5，现在 temp = 5
      }}
    >
      xyz
    </div>
  );
};

``setTemp(3)` 的时候会交由一个全新的Render渲染
所以 第一次打印出来的是5
```