/** * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from 'umi-request'
import { notification, message } from 'antd'
import { history } from 'umi'
import { stringify } from 'querystring'
import { getAuthority, removeAuthority } from '@/utils/authority'
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户登录失效',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
let errFlag = false
/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    const urlParams = new URL(window.location.href)
    if (status !== 401) {
      errFlag = false
    }
    if (status === 401 && urlParams.pathname !== '/user/login') {
      message.warning(errorText)
      removeAuthority()
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href
        })
      })
    } else if (!errFlag) {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText
      })
      if (status === 401) {
        errFlag = true
      }
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    })
  }
  return response
}
request.use(
  async (ctx, next) => {
    const { req } = ctx
    const { url, options } = req
    const au = getAuthority()
    if (au && au.token) {
      options.headers['biu-token'] = au.token
    } else {
      // props.location.query.sceneCode
      // history.replace({
      //   pathname: '/user/login',
      //   search: stringify({
      //     redirect: window.location.href,
      //   }),
      // });
    }
    await next()
    const { res } = ctx
    if (res.code === 'B0000') {
      notification.error({
        message: `请求: ${url}`,
        description: `返回code：${res.code}，msg：${res.msg}，请联系后端`
      })
    }
    return res.data
  },
  { global: true }
)
/**
 * 配置request请求时的默认参数
 */
const extendRequest = extend({
  headers: {
    'Cache-Control': 'no-cache'
  },
  errorHandler, // 默认错误处理
  credentials: 'include' // 默认请求是否带上cookie
})
export default extendRequest
