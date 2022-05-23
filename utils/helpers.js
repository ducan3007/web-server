export const date_format = (params) => {};


export const gen_user_id = (role) => {
  const num = "0123456789";
  let output = role;
  let len = role == "admin" ? 5 : 7;
  for (let i = 0; i < len; ++i) {
    output += num.charAt(Math.floor(Math.random() * num.length));
  }
  return output;
};


//Tạo mới cơ sở kinh doanh bằng cách lấy năm + 1 số tự nhiên có 5 chữ số bất kì
export const gen_business_id = () => {
  let date = new Date();
  let output = date.getFullYear().toString();
  for(let i = 0; i < 5; i++) {
    output += Math.floor(Math.random() * 10);
  }
  return output;
};


