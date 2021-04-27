import RenderAuthorize from '@/components/Authorized'
import { getAuthority } from './authority'
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
const authorityObj = getAuthority()
let Authorized = RenderAuthorize(
  authorityObj && authorityObj.mPerms ? authorityObj.mPerms : []
)
// let Authorized = RenderAuthorize(getAuthority());
// Reload the rights component
const reloadAuthorized = (): void => {
  const authorityObj = getAuthority()
  Authorized = RenderAuthorize(
    authorityObj && authorityObj.mPerms ? authorityObj.mPerms : []
  )
  // Authorized = RenderAuthorize(getAuthority());
}
/**
 * hard code
 * block need it。
 */
window.reloadAuthorized = reloadAuthorized
export { reloadAuthorized }
export default Authorized
