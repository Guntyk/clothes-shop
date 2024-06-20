import { backendApi } from 'api/requests';

export default class ClothesService {
  static async getClothes() {
    const [error, { data }] = await backendApi.get('/clothes');

    if (error) {
      return { result: null, error };
    }

    return { result: data, error: null };
  }
}
