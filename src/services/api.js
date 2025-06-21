import axios from 'axios';

const API_URL = 'http://192.168.139.32:8000/api';

// Tạo client mặc định (application/json)
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Client riêng cho multipart/form-data (upload ảnh)
const imageApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 1. Kiểm tra kết nối backend
export const checkBackendConnection = async () => {
  try {
    const response = await apiClient.get('/du_doan_benh/');
    return response.data;
  } catch (error) {
    console.error('Lỗi kiểm tra backend:', error);
    throw error;
  }
};

// 2. Lấy thông tin bệnh từ tên
export const getDiseaseInfo = async (diseaseName) => {
  try {
    const response = await apiClient.post('/lay_thong_tin_benh/', {
      ten_benh: diseaseName,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy thông tin bệnh:', error);
    throw error;
  }
};

// 3. Gửi ảnh để dự đoán bệnh
export const predictDiseaseFromImage = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    const response = await imageApiClient.post('/du_doan_anh/', formData);

    // ✅ Log ra kết quả để bạn dễ kiểm tra JSON trả về từ backend
    console.log("📸 Kết quả từ backend:", response.data);

    return response.data;
  } catch (error) {
    console.error('❌ Lỗi dự đoán bệnh từ ảnh:', error);
    throw error;
  }
};

export default {
  checkBackendConnection,
  getDiseaseInfo,
  predictDiseaseFromImage,
};