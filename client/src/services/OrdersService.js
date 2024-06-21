import { backendApi } from 'api/requests';

export default class OrdersService {
  static async getOrders() {
    const [error, { data }] = await backendApi.get('/orders');

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }

  static async createOrder(order) {
    const [error, { orderId }] = await backendApi.post('/orders/new', order);

    if (error) {
      return { result: null, error };
    }

    return { result: orderId, error: null };
  }

  static async deleteOrder(id) {
    const [error, { data }] = await backendApi.delete(`/orders/${id}`);

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }
}
