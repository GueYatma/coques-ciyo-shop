export type Order = {
  id: number
  orderNumber: string
  customerId: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  createdAt: string
}

export const orders: Order[] = [
  {
    id: 9001,
    orderNumber: 'CIYO-2025-1001',
    customerId: 501,
    status: 'delivered',
    total: 84.9,
    createdAt: '2025-12-28T16:30:00.000Z',
  },
  {
    id: 9002,
    orderNumber: 'CIYO-2026-1002',
    customerId: 502,
    status: 'paid',
    total: 49.0,
    createdAt: '2026-01-03T09:00:00.000Z',
  },
  {
    id: 9003,
    orderNumber: 'CIYO-2026-1003',
    customerId: 503,
    status: 'pending',
    total: 29.0,
    createdAt: '2026-01-18T11:10:00.000Z',
  },
]
