import React, { useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid,
    Typography, Button} from "@mui/material";
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

import { isLogin, getLoginUserInfo } from '../../util/login-util';

const Header = () => {

    const redirection = useNavigate();

//   const [userInfo, setUserInfo] = useState(getLoginUserInfo());

//   const { token, username, role } = userInfo;

    // 로그아웃 핸들러
    const logoutHandler = e => {

        localStorage.clear();
        redirection('/login');
    };


    // 첫 렌더링이 끝난 후 실행되는 함수
    /*
       useEffect의 2번째 파라미터 (의존성 배열)

       - 생략할 경우 매 리렌더링될때마다 useEffect를 호출함
       - 빈배열을 넣을 경우 첫 렌더링할때만 단 1번 useEffect를 호출
       - 배열에 상태변수를 넣을 경우 상태값이 변경될때마다
         리렌더링함
    */
//   useEffect(() => {
//     setUserInfo(getLoginUserInfo());
//   }, []);

    return (
        <AppBar position="fixed" style={{
            background: '#38d9a9',
            width: '100%'
        }}>
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <div style={
                            {
                                display:'flex',
                                alignItems: 'center'
                            }
                        }>
                            <Typography variant="h4">
                                {
                                    isLogin()
                                        ? getLoginUserInfo().username + '님'
                                        : '오늘'
                                }
                                의 할일
                            </Typography>
                        </div>
                    </Grid>

                    <Grid item>
                        <div className='btn-group'>
                            {isLogin()
                                ?
                                (
                                    <button
                                        className="logout-btn"
                                        onClick={logoutHandler}
                                    >로그아웃</button>
                                )
                                :
                                (
                                    <>
                                        <Link to='/login'>로그인</Link>
                                        <Link to='/join'>회원가입</Link>
                                    </>
                                )
                            }
                        </div>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header