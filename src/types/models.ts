export interface Tag {
  text: string
}

export interface Account {
  id: string
  tags: Tag[]
  type: 'local' | 'ldap'
  login: string
  password: string
}
