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
            } else {
                const err = await res.text();
                setProfileUrl(null);
            }
        })();

    }, [isLoggedIn]);

    return (
        <AppBar position="fixed" style={{
            background: '#38d9a9',
            padding : '10px 0',
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
                            <Typography variant="h5">
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