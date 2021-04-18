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
##### ProTable

