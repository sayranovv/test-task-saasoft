export interface Tag {
  text: string
}

export interface Account {
  id: string
  tags: Tag[]
  type: 'local' | 'ldap' | null
  login: string
  password: string | null
}
