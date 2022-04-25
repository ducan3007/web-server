# WEB CUỐI KỲ

ĐỀ BÀI : https://itest.com.vn/lects/webappdev/mockproj/healthy-first.htm
### Chức năng

- Tạo tài khoản cho chuyên viên
- Thêm một cơ sở
- Thêm chứng nhận
- Thêm kế hoạch thanh tra

## Các collection

### collection Quản lý và Chuyên viên (User)
```
  - tài khoản (account)
  - mật khẩu  (password)
  - họ tên  (fullname)
  - ngày sinh (birth)
  - avatar (image)
  - khu vực hoạt động (work_area : { id , name })
    - tên khu vực (thành phố/quận) (name)
    - mã khu vực () (mã thành phố + mã quận) (Vd: Hà nội/Nam từ Liêm : 0130)
  - vai trò (role) "admin" || "staff"
```  

### collection Cơ sở kinh doanh (Business)
```
  - Mã (id) : (mã tạo bằng mã thành phố + mã quận + random) (Hà nội/nam từ liêm 0130-1a25ce)
  - Tên (brandname)
  - Loại hình kinh doanh (type)
  - Ảnh (image)
  - Địa chỉ (address)
  - Phường (ward)
  - Quận (district)
  - Thành phố (city)
  - Chủ sở hữu (owner)
    - Tên         (name)
    - Ngày sinh   (birth)
    - CMND        (cmnd)
  - Điện thoại (phone)
  - Tình trạng chứng chỉ (certificate_status)
  - Số cấp Chứng chỉ (certificate_id)
  - Danh sách thực phẩm ([foods])
    - Ảnh (image)
    - Tên (name)
    - Tình trạng (đạt/ko đạt) (status)
```

### collection  Giấy chứng nhận: (Certificate)
```
   - ref đến cơ sở kinh doanh 

   - mã chứng chỉ (certificate_id)

   - Tình trạng chứng nhận (status)
      - Hết hạn("expired") || Bị thu hồi("revoked") || Còn hạn("valid") || Chưa cấp ("N/A")     
   - Hiệu lực ( từ ngày ... đến ngày) (duration)
                                        -(start)
                                        -(end)
```    

### collection Kế hoạch kiểm tra (Plan)
```
  - ref đến cơ sở kinh doanh

  - Thời gian (bắt đầu / kết thúc) (duration)

  - Mẫu thực phẩm [] (sample)
    - mã giám định (id)
    - ảnh mẫu giám định (image)
    - bên giám định (third_party)
    - kết quả (result)
    - ngày gửi (send_date)
    - ngày nhận (receive_date)
  - Kết luận ( đạt hay không đạt) (result)
  - Quyết định xử lý (penalty)
```











