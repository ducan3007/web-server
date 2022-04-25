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
  - tài khoản (account)
  - mật khẩu  (password)
  - họ tên  (fullname)
  - ngày sinh (birth)
  - avatar (image)
  - khu vực hoạt động (work_area) : { city[], district:[] }
    {
      city:[{"Hà Nội","TP HCM"}
      ]
      district:[
        {
          title:"Quận Nam từ Liêm",
          code:"0130"
        },
        {
          title:"Quận Bắc từ Liêm,
          code:"0131"
        }
      ]

    }
  - vai trò (role) "admin" || "staff"
```

### collection Cơ sở kinh doanh (Business)

```
  - Mã (business_id) : (mã tạo bằng mã thành phố + mã quận + random) (Hà nội/nam từ liêm 0130-1a25ce)
  - Tên (brandname)
  - Loại hình kinh doanh (type)
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
  - Tình trạng chứng chỉ (certificate_status)
  - Số cấp Chứng chỉ (certificate_id)
  - Danh sách thực phẩm ([foods])
    - Ảnh (image)
    - Tên (name)
    - Tình trạng (đạt/ko đạt) (status)
```

### collection Giấy chứng nhận: (Certificate)

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

###  Nếu mảng chỉ chứa các chuỗi thì dùng find({field:"value"}) như bình thường