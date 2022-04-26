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


