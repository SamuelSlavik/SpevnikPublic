// Backend structures

export interface Songs {
  id: number
  name: string
  tags: Tags[]
}
export interface SongInterface {
  id: number
  name: string
  hash: string
  songParts?: SongParts[]
  tags: Tags[]
}
export interface SongParts {
  order: number
  type: string
  label: string
  image: number
  containsChords: boolean
  lines?: SongLine[]
  text: string
}
export interface SongLine {
  tokens: SongToken[]
}

export interface SongToken {
  chord: string
  text: string
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


/////////////////////////
// TO DO
/////////////////////////

export interface Playlist {
  id: number
  name: string
  mass: string
  date: string
  place?: string
  time?: string|number // probably string
  dirigent?: string // conductor ??
  songs: Songs[] // vise versa bude treba pridať aj playlist do Song{...}
  // asi všetky možné omše, alebo to urobiť cez niaku vnorenä štruktúru / array ?
  introit?: Songs
  // .....
  ending?: Songs
}