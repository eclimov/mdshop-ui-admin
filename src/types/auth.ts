export interface AuthTypeCreate {
  email: string
  password: string
}

export interface AuthTypeView {
  company_id: number
  company_name: string
  refresh_token: string
  token: string
  user_id: number
}

export interface AuthTypeRefreshTokenCreate {
  refresh_token: string | null
}

export interface AuthTypeRefreshTokenView {
  token: string
}
