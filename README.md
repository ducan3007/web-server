# WEB CUỐI KỲ

### Node, React, Mongodb

ĐỀ BÀI : https://itest.com.vn/lects/webappdev/mockproj/healthy-first.htm

Client: https://github.com/ducan3007/web-client

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

````
  - Mã cơ sở (business_id)

  - Lịch trình (bắt đầu / kết thúc) (schedule) (start ) (end)

  - Trạng thái (thực hiện hay chưa) : status ("done", "no","canceled")

  - Mẫu thực phẩm [] (sample)
    - mã giám định (id)
    - ảnh mẫu giám định (image)
    - bên giám định (inspector)
    - kết quả (result)
    - ngày gửi (send_date)
    - ngày nhận (receive_date)
  - Kết luận ( đạt hay không đạt) (result)
  - Quyết định xử lý (penalty)

```javascripts

 {
    business_id: "20123456",
    shedule: {
      start: "20/02/2020",
      end: "26/02/2020",
    },
    status:"upcoming",
    result: "Đạt",
    penalty: "N/A",
    samples: [
      {
        id: "A1",
        image: "https://res.cloudinary.com/dtzindhuc/image/upload/v1650799247/no_images_sc1t5e.png",
        inspector: "Cong ty B",
        result: "Mẫu đạt an toàn",
        send_at: "20/02/2020",
        receive_at: "20/02/2020",
      },
      {
        id: "A1",
        image: "https://res.cloudinary.com/dtzindhuc/image/upload/v1650799247/no_images_sc1t5e.png",
        inspector: "Cong ty B",
        result: "Mẫu đạt an toàn",
        send_at: "20/02/2020",
        receive_at: "20/02/2020",
      },
    ],
  },

````


