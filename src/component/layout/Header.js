import React, { useEffect, useState } from 'react'
import {AppBar, Toolbar, Grid,
    Typography} from "@mui/material";

import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

import { isLogin, getLoginUserInfo } from '../../util/login-util';
import { API_BASE_URL, USER } from '../../config/host-config';

const Header = () => {

    const profileRequestURL = `${API_BASE_URL}${USER}/load-s3`;

    const redirection = useNavigate();

    // 프로필 이미지 url 상태변수
    const [profileUrl, setProfileUrl] = useState(null);

    // 로그인 상태를 나타내는 상태변수를 추가
    const [isLoggedIn, setIsLoggedIn] = useState(isLogin());

    // 로그아웃 핸들러
    const logoutHandler = e => {

        localStorage.clear();
        setProfileUrl(null);
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

    // 로그인 상태 변화를 감지하는 useEffect를 추가
    useEffect(() => {
        setIsLoggedIn(isLogin());
    }, [isLogin()]);

    useEffect(() => {

        isLoggedIn &&
        (async() => {
            const res = await fetch(profileRequestURL, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + getLoginUserInfo().token }
            });

            if (res.status === 200) {
                const imgUrl = await res.text();
                setProfileUrl(imgUrl);
                /*
                // 서버에서 직렬화된 이미지가 응답된다.
                const profileBlob = await res.blob();
                // 해당 이미지를 imgUrl로 변경
                const imgUrl = window.URL.createObjectURL(profileBlob);
                setProfileUrl(imgUrl);
                 */
            } else {
                const err = await res.text();
                setProfileUrl(null);
            }
        })();

    }, [isLoggedIn]);

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
                            <img
                                src={profileUrl ? profileUrl : require('../../assets/img/anonymous.jpeg')}
                                // src={profileUrl ? profileUrl : require('../../assets/img/anonymous.jpg')}
                                alt='프사프사'
                                style={
                                    {
                                        marginLeft: 20,
                                        width: 30,
                                        height: 30,
                                        borderRadius: '50%'
                                    }
                                }
                            />
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