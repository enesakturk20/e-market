import axios from 'axios';
import { getProducts, getProductDetail } from '../productService'; 

jest.mock('axios'); // axios'u mock ediyoruz

describe('Product API', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Her testten sonra mock'ları temizler
  });

  describe('getProducts', () => {
    it('should fetch products successfully from the API', async () => {
      // Mock edilen veriyi oluşturuyoruz
      const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
      const response = { data: products };
      
      // Axios get fonksiyonunun mock veriyi döndürmesini sağlıyoruz
      axios.get.mockResolvedValueOnce(response);

      const result = await getProducts(1, 12); // Fonksiyonu çağırıyoruz

      expect(result).toEqual(products); // Dönen veriyi kontrol ediyoruz
      expect(axios.get).toHaveBeenCalledWith('https://5fc9346b2af77700165ae514.mockapi.io/products?page=1&limit=12');
    });

    it('should throw an error when the API call fails', async () => {
      const errorMessage = 'Network Error';
      
      // Axios get fonksiyonunun hata fırlatmasını sağlıyoruz
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getProducts(1, 12)).rejects.toThrow(errorMessage); // Hatanın fırlatıldığını kontrol ediyoruz
      expect(axios.get).toHaveBeenCalledWith('https://5fc9346b2af77700165ae514.mockapi.io/products?page=1&limit=12');
    });
  });

  describe('getProductDetail', () => {
    it('should fetch product detail successfully from the API', async () => {
      const product = { id: 1, name: 'Product 1', description: 'A great product' };
      const response = { data: product };

      axios.get.mockResolvedValueOnce(response);

      const result = await getProductDetail(1);

      expect(result).toEqual(product); // Dönen veriyi kontrol ediyoruz
      expect(axios.get).toHaveBeenCalledWith('https://5fc9346b2af77700165ae514.mockapi.io/products/1');
    });

    it('should throw an error when the API call fails', async () => {
      const errorMessage = 'Network Error';

      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getProductDetail(1)).rejects.toThrow(errorMessage); // Hatanın fırlatıldığını kontrol ediyoruz
      expect(axios.get).toHaveBeenCalledWith('https://5fc9346b2af77700165ae514.mockapi.io/products/1');
    });
  });
});
