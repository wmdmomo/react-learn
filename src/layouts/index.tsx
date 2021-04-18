import React, { FC, useState } from 'react'
import ProLayout from '@ant-design/pro-layout'
import routes from '../../config/routes'
const Layout: FC = ({ children }) => {
  const [pathname, setPathname] = useState('/welcome')
  console.log({ ...routes})
  return (
    <>
      <div
        id="test-pro-layout"
        style={{
          height: '100vh'
        }}
      >
        <ProLayout
          location={{ pathname }}
          title="你好！"
          {...routes}
        >
          {children}
        </ProLayout>
      </div>
    </>
  )
}

export default Layout
