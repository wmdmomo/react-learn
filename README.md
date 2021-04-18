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