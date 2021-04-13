### react 学习记录
```
在公司碰到一个问题：是react生命周期的问题，父组件因为是 网络请求 得到的数据 所以这个数组存在延迟
在子组件中无法获得到

要实现一个
下拉框的选择功能 下拉框的数据是父组件传值进来的
所以 默认 下拉框要有一个初始值

但是 下拉框 选择好 发送给后端的时候 是发送的下拉框的id内容

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

#####4. ``antd``的使用方法