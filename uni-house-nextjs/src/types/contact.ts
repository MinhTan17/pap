export interface Branch {
  id: string
  name: string
  address: string
  hotline: string
}

export interface ContactInfo {
  company: {
    name: string
    address: string
    hotline: string
  }
  northBranches: Branch[]
  southBranches: Branch[]
  mapUrl: string
}
