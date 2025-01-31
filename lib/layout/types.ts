export type NavigationItem = {
  label: string
  icon?: string
  to?: string
  children?: NavigationItem[]
}

export type NavigationSection = {
  items: NavigationItem[]
}
