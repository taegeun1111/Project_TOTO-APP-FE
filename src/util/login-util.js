//토큰 및 로그인 유저 데이터를 저장하는 함수
export const setLoginUserInfo = ({ token, userName, role }) => {
  localStorage.setItem('ACCESS_TOKEN', token);
  localStorage.setItem('LOGIN_USERNAME', userName);
  localStorage.setItem('USER_ROLE', role);
};



// 로그인한 유저의 데이터객체를 반환하는 함수
export const getLoginUserInfo = () => {
  return {
    token: localStorage.getItem('ACCESS_TOKEN'),
    username: localStorage.getItem('LOGIN_USERNAME'),
    role: localStorage.getItem('USER_ROLE')
  };
};

// 로그인 여부를 확인하는 함수
// const isLogin = () => {
//   const token = localStorage.getItem('ACCESS_TOKEN');
//   if (token === null) return false;
//   return true;
// };

export const isLogin = () => !!localStorage.getItem('ACCESS_TOKEN');