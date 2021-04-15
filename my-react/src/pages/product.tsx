// import { useModel } from 'umi'
import ProductList from '../components/ProudList'

const Products = () => {
  const dataSource = [
    { id: '1', name: 'wmd', key: '1' },
    { id: '2', name: 'aaa', key: '2' }
  ]
  const del = (id: string) => console.log('111')
  return (
    <div>
      <p>testets</p>
      <ProductList products={dataSource} onDelete={del} />
    </div>
  )
}

export default Products
