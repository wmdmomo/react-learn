import Authorized from './Authorized'
import Secured from './Secured'
import check from './CheckPermissions'
import renderAuthorize from './renderAuthorize'
import authorizedRoute from './AuthorizedRoute'
Authorized.Secured = Secured
Authorized.check = check
Authorized.AuthorizedRoute = authorizedRoute
const RenderAuthorize = renderAuthorize(Authorized)
export default RenderAuthorize
