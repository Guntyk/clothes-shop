import { backendApi } from 'api/requests';

export default class UsersService {
  static async registerUser(newUser) {
    const [error, response] = await backendApi.post('/users/register', newUser);

    if (error) {
      return { result: null, error: error.data };
    }

    return { result: response.data, error: null };
  }

  static async loginUser(userData) {
    const [error, response] = await backendApi.post('/users/login', userData);

    if (error) {
      return { result: null, error: error.data };
    }

    return { result: response.data, error: null };
  }

  static async addOrderToUser({ orderId, userId }) {
    const [error, response] = await backendApi.post('/users/update', { userId, orderId });

    if (error) {
      return { result: null, error: error.data };
    }

    return { result: response.data, error: null };
  }
}
