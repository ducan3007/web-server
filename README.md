# WEB CUỐI KỲ

ĐỀ BÀI : https://itest.com.vn/lects/webappdev/mockproj/healthy-first.htm

### Chức năng

- Tạo tài khoản cho chuyên viên
- Thêm một cơ sở
- Thêm chứng nhận
- Thêm kế hoạch thanh tra
  ..................

## Các collection

### collection Quản lý và Chuyên viên (User)

```
  - tài khoản (id)
  - hoạt động (active)
  - mật khẩu  (password)
  - họ tên  (fullname)
  - ngày sinh (birth)
  - email (email)
  - số điện thoại (phone)
  - avatar (image)
  - khu vực hoạt động (work_area) : [ city, district,code ]
    [{
      city:"Ha Noi",
      district:"Nam tu Liem",
      code:"01D019"
    }
    ]
  - vai trò (role) "admin" || "user"
```

### collection Cơ sở kinh doanh (Business)

```
  - Mã (id) : (mã tạo bằng mã thành phố + mã quận + random) (Hà nội/nam từ liêm 0130-1a25ce)
  - Tên (brandname)
  - Loại hình kinh doanh ([types])
  - Ảnh (image)
  - Mã khu vực (dùng cho lọc và tìm kiếm) (address_code ) = (district_code) || (city_code)
  - Địa chỉ (address)
  - Phường (ward)
  - Quận (district)
  - Thành phố (city)
  - Chủ sở hữu (owner)
    - Tên         (name)
    - Ngày sinh   (birth)
    - CMND        (cmnd)
  - Điện thoại (phone)

  - Chứng chỉ (certificate)
    - Mã chứng chỉ (certificate_id)
    - Tình trạng (status):
        Hết hạn("expired") || Bị thu hồi("revoked") || Còn hạn("valid") || Chưa cấp ("N/A")
    - Hiệu lực ( từ ngày ... đến ngày) (time)
                                        -(start)
                                        -(end)
  - Đồ ăn [foods]
  [{
      image: "https://res.cloudinary.com/dtzindhuc/image/upload/v1650799247/no_images_sc1t5e.png",
      name: "Cơm rang",
      status: "Đạt an toàn vệ sinh",
    }],
```

<!-- ### collection Giấy chứng nhận: (Certificate)

```
   -

   -
   - mã chứng chỉ (certificate_id)
   - Tình trạng chứng nhận (status)
      - Hết hạn("expired") || Bị thu hồi("revoked") || Còn hạn("valid") || Chưa cấp ("N/A")
   - Hiệu lực ( từ ngày ... đến ngày) (duration)
                                        -(start)
                                        -(end)
``` -->

### collection Kế hoạch kiểm tra (Plan)

```
  - Mã cơ sở (business_id)

  - Lịch trình (bắt đầu / kết thúc) (schedule) (start ) (end)
  - Trạng thái (thực hiện hay chưa) : status ("done", "pendin","cancel")
  - Mẫu thực phẩm [] (sample)
    - mã giám định (id)
    - ảnh mẫu giám định (image)
    - bên giám định (inspector)
    - kết quả (result)
    - ngày gửi (send_date)
    - ngày nhận (receive_date)
  - Kết luận ( đạt hay không đạt) (result)
  - Quyết định xử lý (penalty)

```

### Query

### Tìm một đối tượng trong một trường là Array : sử dụng $elemMatch.

```
 work_area:{
     city:[
       {
         title:'hanoi',
         code:'001'
       }
     ],
     district:[
       {
         title:'nam tu liem'
         code:'001030
       }
     ]
}

db.col.find({work_area.city:{$elemMatch:{code:'001}}})

```

### Nếu mảng chỉ chứa các chuỗi thì dùng find({field:"value"}) như bình thường
