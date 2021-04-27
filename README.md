# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```
#### antd 学习记录

- ``Table`` 
  
``` ts
<Table dataSource={products} columns={columns} />
这里的 columns 代表着每一列

title 对应着 名字
dataIndex 对应着 dataSource 的字段属性
render 的话 就是把这一列重新渲染 不单单只是显示字段属性的值

这样的形式也是可以的
render: (text: string) => <a>{text}</a>
or
它在格式化的时候 如果return后面只有一个节点 就不加()

render: (text: string) => {
    return <a>{text}</a>
}

const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Actions',
      render: (text: any, record: { id: string }) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        )
      }
    }
]
```
##### routes
``routes``
里面 ``path`` 不以``/``开始的话 就是从它的父亲的路径后面继续往后加
如果是以``/``开始的话 就是从这个路径开始的意思
在 ``config``下面建``routes.ts``在``.umirc.ts``进行配置的
相对路径是从 ``src/pages``页面进行引进的
绝对路径 可以使用``@``来代替``src``

##### ProLayout使用的方法
读取的是 ``props`` 中的 ``route`` ``location`` 两个属性 是umi默认注入的
是在 ``.umirc.ts``进行配置的
``` ts
把配置的路由名字进行引入 可以显示菜单的名字了
这是因为 在routes里面设置的时候他是一个[{}]数组对象
route={[...routes][0]}

对每个路由进行设置 当被点击的时候 就跳转到对应的 路由组件
并且设置当前的选中的pathname 为点中的path
          menuItemRender={(item, dom) => {
            if (item.isUrl || item.children || !item.path) return dom
            else {
              return (
                <Link
                  to={item.path}
                  onClick={() => {
                    if (item.path) {
                      setPathname(item.path)
                    }
                  }}
                >
                  {dom}
                </Link>
              )
            }
          }}
```
#### 项目记录
https://blog.csdn.net/qq_40044912/article/details/108751121
##### 1. route的配置
ProLayout 其实是读取的 props 中的 route 和 location这两个属性是 umi 默认注入的
 它是配置在 .umirc.ts里面的 要把 路由那些信息 引进来
相对路径是从 ``src/pages``
指向``src``目录的文件  可以用``@``或者``../``
推荐用 ``@``
还有就是父组件 这边的话 需要渲染一下 然后她下面的子组件就都会带上这个样式
##### 2. proLayout的使用
#####  设置了路由的重定向之类的 basiclayout 里面的代码
网址上的地址  还是没法直接进去 相应的网页？？
因为只对点击进行了设置
###### 3.proTable的使用
如果不要显示上面的搜索框 就直接 在``proTable``加上``search={false}``
``columns``的东西不要在``proTable``里面显示，设置``hideInTable: true``
``toolBarRender={false}``是 不显示 右上角的工具栏
PageHeaderWrapper如何去掉 title，只保留面包屑
设置``<PageHeaderWrapper title={false}>``
在页面A点击 某一行 进去这一行的详情页B
可以在面包屑里面 对这个详情页进行 ``hideInMenu: true``
对这一行的``ProColumns``里面重新设置``render``里面设置``Link``
#### antd Space
``Space``就是组件里面 用来设置间距的
##### React里面的Hook还需要再学习
##### useRef\<ActionType> 记录一下这个的使用
这个的用法还不是很清楚
现在要完成的一个需求
就是可以新增 修改 删除
新增和删除 都是用同一个组件 这个时候 该怎么实现
并且 新增的时候就是 新增的key为当前的key最大值+1
修改的时候只能修改某几个字段 其它字段默认带上 不能修改
####

1. antd Modal的使用``error``
devScripts.js:6523 Warning: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?
问题产生原因：
使用ant design在Modal中使用Form表单，并且通过Form.useForm() 但出现如上警告，这是因为Modal组件会在Form表单之前创建，因此当页面初始化时form对象会找不到可关联的Form表单，于是出现上述警告
可以在Modal 上面加上一句 ``getContainer={false}``
2. Math.max(...data.map((item) => item.key))
那个一个数组对象中某个属性的最大值
3. 这里要注意的点
Modal 里面嵌套了 Form 对于Form 表单要设置一个初始值 
本来设置了 Input 里面的 ``defaultvalue``
警告说受控组件 要用``initialValues``
但是这样的话 就会 Modal 只加载一次 然后form 那个表单的内容一直都是初始化的值 不会更新
所以 解决方案是
- 但其实 Modal 自身里面已经有 ``visible``属性了
```JS
{visible && <OperationModal/>}
```
- 另外一种解决方法 ``initialValues``不设置
用以下的形式 在useEffect里面进行设置
```JS
form.setFieldsValue({
  user: current.name
})
```