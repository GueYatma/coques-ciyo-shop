export type Customer = {
  id: number
  firstName: string
  lastName: string
  email: string
  city?: string
  country?: string
  createdAt: string
}

export const customers: Customer[] = [
  {
    id: 501,
    firstName: 'Lina',
    lastName: 'Martin',
    email: 'lina.martin@example.com',
    city: 'Lyon',
    country: 'FR',
    createdAt: '2025-12-20T10:00:00.000Z',
  },
  {
    id: 502,
    firstName: 'Noah',
    lastName: 'Perez',
    email: 'noah.perez@example.com',
    city: 'Paris',
    country: 'FR',
    createdAt: '2025-12-05T12:45:00.000Z',
  },
  {
    id: 503,
    firstName: 'Aya',
    lastName: 'Dubois',
    email: 'aya.dubois@example.com',
    city: 'Marseille',
    country: 'FR',
    createdAt: '2025-11-14T08:20:00.000Z',
  },
]
