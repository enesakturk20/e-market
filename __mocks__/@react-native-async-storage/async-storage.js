const mockAsyncStorage = {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve(null)), // Default olarak null döndür
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
    // Diğer metodları burada mock'layabilirsiniz.
  };
  
  export default mockAsyncStorage;
  