import React, { FC, useState } from 'react'
import ProLayout from '@ant-design/pro-layout'
import routes from '../../config/routes'
import { Link } from 'umi'
const Layout: FC = ({ children }) => {
  const [pathname, setPathname] = useState('/welcome')
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
          route={[...routes][0]}
          breadcrumbRender={(routers = []) => [...routers]}
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
        >
          {children}
        </ProLayout>
      </div>
    </>
  )
}

export default Layout
