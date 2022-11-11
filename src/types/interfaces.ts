// Backend structures

export interface Songs {
  id: number
  name: string
  tags: number[]
}
export interface Tags {
  id: number
  name: string
}

///////////////////////////
// Props
//////////////////////////

export interface HomepageProps {
  category?: string
}