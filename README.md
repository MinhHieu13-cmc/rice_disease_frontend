# Ứng dụng Phát hiện Bệnh Lúa

Ứng dụng di động giúp tra cứu thông tin về các bệnh lúa phổ biến. Dự án bao gồm:
- Backend Django REST API
- Frontend React Native

## Cấu trúc dự án

```
rice_disease_backend/  # Backend Django
rice_disease_frontend/ # Frontend React Native
```

## Backend (Django)

### Cài đặt và chạy Backend

1. Cài đặt các gói phụ thuộc:
```bash
cd rice_disease_backend
pip install -r requirements.txt
```

2. Chạy migrations:
```bash
python manage.py migrate
```

3. Tạo dữ liệu mẫu (nếu cần):
```bash
python manage.py shell
```

```python
from api.models import BenhLua
BenhLua.objects.create(
    ten_benh="Đạo ôn", 
    mo_ta="Bệnh đạo ôn là một trong những bệnh phổ biến nhất trên cây lúa, gây ra bởi nấm Pyricularia oryzae. Bệnh có thể tấn công tất cả các bộ phận của cây lúa như lá, thân, cổ bông và hạt.", 
    giai_phap="Sử dụng giống kháng bệnh, bón phân cân đối, phun thuốc phòng trừ như Tricyclazole, Isoprothiolane khi phát hiện bệnh."
)
BenhLua.objects.create(
    ten_benh="Khô vằn", 
    mo_ta="Bệnh khô vằn do nấm Rhizoctonia solani gây ra, thường xuất hiện ở giai đoạn lúa đứng cái và làm đòng. Triệu chứng đặc trưng là các vết bệnh hình thoi màu xám xanh trên bẹ lá.", 
    giai_phap="Vệ sinh đồng ruộng, sử dụng giống kháng bệnh, điều chỉnh mật độ gieo sạ hợp lý, sử dụng thuốc đặc hiệu như Validacin, Nativo."
)
```

4. Chạy server:
```bash
python manage.py runserver
```

Backend sẽ chạy tại địa chỉ http://127.0.0.1:8000/

### API Endpoints

- `GET /api/du_doan_benh/`: Kiểm tra kết nối đến backend
- `POST /api/lay_thong_tin_benh/`: Lấy thông tin về bệnh lúa
  - Body: `{ "ten_benh": "Tên bệnh lúa" }`

## Frontend (React Native)

### Cài đặt và chạy Frontend

1. Cài đặt các gói phụ thuộc:
```bash
cd rice_disease_frontend
npm install
```

2. Cấu hình API URL:
   - Mở file `src/services/api.js`
   - Cập nhật `API_URL` phù hợp với địa chỉ IP của máy chủ backend:
     - Cho Android Emulator: `http://10.0.2.2:8000/api`
     - Cho iOS Simulator: `http://localhost:8000/api`
     - Cho thiết bị thật: `http://<your-computer-ip>:8000/api`

3. Chạy ứng dụng:
```bash
npx expo start
```

4. Chạy trên thiết bị:
   - Quét mã QR bằng ứng dụng Expo Go trên thiết bị di động
   - Hoặc nhấn `a` để chạy trên Android Emulator
   - Hoặc nhấn `i` để chạy trên iOS Simulator

## Chức năng

1. Kiểm tra kết nối đến backend Django
2. Tìm kiếm thông tin về bệnh lúa theo tên
3. Hiển thị chi tiết về bệnh lúa bao gồm mô tả và giải pháp

## Lưu ý

- Đảm bảo backend đang chạy trước khi khởi động frontend
- Nếu sử dụng thiết bị thật, hãy đảm bảo thiết bị và máy tính đang kết nối cùng một mạng
- Cập nhật địa chỉ IP trong file `api.js` nếu cần thiết