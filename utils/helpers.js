const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

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

export const gen_business_id = () => {
  const num = "0123456789";
  let date = new Date();
  let output = date.getFullYear().toString();
  for (let i = 0; i < 6; ++i) {
    output += num.charAt(Math.floor(Math.random() * num.length));
  }
  output.toString;
  return output;
};

export const gen_certificate_id = () => {
  const num = "0123456789";
  let date = new Date();
  let output = date.getFullYear().toString() + months[date.getMonth()];
  for (let i = 0; i < 5; ++i) {
    output += num.charAt(Math.floor(Math.random() * num.length));
  }
  output.toString;
  return output;
};
