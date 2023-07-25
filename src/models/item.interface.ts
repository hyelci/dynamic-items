export interface Item {
  id: number
  name: string
  description: string
  image: string
}

export interface CreateItemRequest {
  name: string
  description: string
  image: string
}

export interface FilterRequest {
  query: string
  order: string
}
