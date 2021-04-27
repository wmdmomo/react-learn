import routes from '../../config/routes'
import { getAuthority } from './authority'
const authArr = []
/**
 *根据当前用户拥有权限决定重定向路由的权限
 *
 * @param {*} authority 本来要跳转的路由的权限值
 * @returns 经过权限鉴定后，将要跳转的路由的权限值
 */
function hasPathAuth(authority) {
  const userAuthArr = getAuthority().mPerms
  // 防止通过undefined调接口，重定向到其父页面
  const tempArr = authority.split(':')
  if (tempArr.length > 2) {
    authority = tempArr.slice(0, 2).join(':')
  }
  // 当前用户为全权限时且在访问根路径时，直接定位到话术库管理页面
  if (userAuthArr.includes('*') && (authority === '' || authority === '/')) {
    return 'm:base'
  }
  if (
    (userAuthArr.includes('*') && authority !== '' && authority !== '/') ||
    userAuthArr.includes(authority)
  ) {
    return authority
  }
  for (let i = 0; i < authArr.length; i += 1) {
    if (userAuthArr.indexOf(authArr[i]) !== -1) {
      return authArr[i]
    }
  }
  // 当前用户没有任何页面权限时
  // 当前不被权限控制的authority有3个，根据login.ts变化
  if (userAuthArr.length === 2) {
    return 'm:base'
  }
  // if (userAuthArr.length === 1 && userAuthArr[0] === 'm:nocar') {
  //   return 'm:nocar';
  // }
  return authority
}
function checkPathAuth() {
  const authToPath = {} // 根据权限值存放对应路径
  const basicRoutes = routes[1].routes[0].routes
  const routeStack = []
  for (let i = 0; i < basicRoutes.length; i += 1) {
    routeStack.push(basicRoutes[i])
  }
  while (routeStack.length !== 0) {
    const thisRoute = routeStack.shift()
    if (!thisRoute.redirect && thisRoute.authority && thisRoute.authority[0]) {
      authToPath[thisRoute.path] = thisRoute.authority[0]
      if (
        thisRoute.authority[0] !== '/' &&
        thisRoute.authority[0] !== '*' &&
        authArr.indexOf(thisRoute.authority[0]) === -1 &&
        thisRoute.authority[0].split(':').length < 3
      ) {
        authArr.push(thisRoute.authority[0])
      }
      if (thisRoute.routes) {
        for (let i = 0; i < thisRoute.routes.length; i += 1) {
          const currentRoute = thisRoute.routes[i]
          routeStack.push(currentRoute)
          if (
            currentRoute.authority &&
            authArr.indexOf(currentRoute.authority[0]) === -1 &&
            currentRoute.authority[0].split(':').length < 3
          ) {
            authArr.push(currentRoute.authority[0])
          }
        }
      }
    }
  }
  /**
   * 根据当前当前用户的权限决定重定向到哪个路由
   *
   * @param {*} pathname 本来要重定向的路由
   * @returns 经过权限鉴定后重定向的路由
   */
  function redirectPathByAuth(pathname) {
    let authTo
    let currentPath = pathname
    while (currentPath) {
      if (authToPath[currentPath]) {
        authTo = hasPathAuth(authToPath[currentPath])
        break
      } else {
        currentPath = currentPath.slice(0, currentPath.lastIndexOf('/'))
      }
    }
    if (authTo === undefined) {
      authTo = hasPathAuth('')
    }
    let redirectTo
    for (const [key, value] of Object.entries(authToPath)) {
      if (authTo === value) {
        redirectTo = key
      }
    }
    if (authTo === '*') {
      redirectTo = '/speech'
    }
    if (redirectTo === undefined) {
      redirectTo = '/'
    }
    return redirectTo
  }
  return {
    redirectPathByAuth
  }
}
export const checkAuth = checkPathAuth()
// 页面权限重定向重置
export const redirectRouter = function () {
  const authority = getAuthority().mPerms // 当前权限
  const route = routes[1].routes[0].routes // 路由菜单
  const module = ['speech', 'label', 'scene', 'system', 'noncar']
  const baiscAuthority = [
    'm:base',
    'm:baseRel',
    'm:label',
    'm:user',
    'm:role',
    'm:fc:recRule',
    'm:fc:recProd',
    'm:fc:nonMotor'
  ] // 指定重定向页面权限
  const redirect = {}
  if (authority.indexOf('*') === -1) {
    route.map((item, index) => {
      if (item.path !== '/' && item.component !== './404') {
        item.routes.map((data, i) => {
          const root = data.path.split('/')[1]
          const key = `${root}`
          // 判断该页面拥有权限控制且是制定的侧边菜单页面
          if (
            data.authority &&
            baiscAuthority.filter((val) => data.authority.indexOf(val) !== -1)
              .length > 0
          ) {
            // 判断当前用户拥有该页面权限，则将该页面设置为重定向页面且不是根模块路径，也没有存储过路径
            if (
              authority.filter((val) => data.authority.indexOf(val) !== -1)
                .length > 0 &&
              data.path !== `/${root}` &&
              !redirect[key]
            ) {
              redirect[key] = data.path // 设置重定向路径
            }
          }
        })
      }
    })
  }
  // 如果当前用户拥有全部权限，则重定向到模块中拥有权限第一个页面
  else {
    route.map((item, index) => {
      if (item.path !== '/' && item.component !== './404') {
        item.routes.map((data, i) => {
          const root = data.path.split('/')[1]
          const key = `${root}`
          if (data.authority && data.path !== `/${root}` && !redirect[key]) {
            redirect[key] = data.path // 设置重定向路径
          }
        })
      }
    })
  }
  localStorage.setItem('redirectRouter', JSON.stringify(redirect))
}
