import { reloadAuthorized } from './Authorized'
export interface Authority {
  role?: string | string[]
  name?: string
  token?: string
  mPerms?: string[]
  bPerms?: string[]
}
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): Authority {
  const authorityString =
    typeof str === 'undefined' && localStorage
      ? localStorage.getItem('utterance-authority')
      : str
  // authorityString could be admin, "admin", ["admin"]
  let authority: Authority
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString)
    }
    if (typeof authority.role === 'string') {
      authority.role = [authority.role]
    }
  } catch (e) {
    authority = authorityString
  }
  return authority
}
export function setAuthority(authority: Authority): void {
  const { name, role, token, mPerms, bPerms } = authority
  const roleList = typeof role === 'string' ? [role] : role
  const authorityObj = { token, name, role: roleList, mPerms, bPerms }
  localStorage.setItem('utterance-authority', JSON.stringify(authorityObj))
  // auto reload
  reloadAuthorized()
}
export function removeAuthority(): void {
  localStorage.removeItem('utterance-authority')
  localStorage.removeItem('redirectRouter')
  reloadAuthorized()
}
