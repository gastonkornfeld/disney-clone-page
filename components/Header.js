import React, { useEffect } from 'react'
import styled from 'styled-components'

import { auth, provider } from "../firebase"

import { useHistory } from 'react-router-dom'

import { Link } from 'react-router-dom'

import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut
} from '../features/user/userSlice'

import { useDispatch, useSelector } from 'react-redux'


 



function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() =>{
        auth.onAuthStateChanged(async (user)=> {
            if (user){
                dispatch(setUserLogin({
                    name : user.displayName,
                    email : user.email,
                    photo : user.photoURL
                }))
                history.push('/')
            }
        })
    }, [])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user
            dispatch(setUserLogin({
                name : user.displayName,
                email : user.email,
                photo : user.photoURL
            }))
            history.push("/")
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            history.push("/login");
        })
    }

    return (
        <Nav>
            <Logo class='logo-header' src= '/images/logo.svg' />

            {
                !userName ? (
                    <LoginContainer>
                        <Login onClick = {signIn}>Login</Login>
                    </LoginContainer>
                    ):
                    <>
                        <NavMenu class='nav-menu'>
                            <a>
                                <img src= 'images/home-icon.svg'/> 
                                <Link to="/">
                                    <span>Home</span>
                                </Link>
                            </a>
                            <a>
                                <img src= 'images/search-icon.svg'/> 
                                <span>Search</span>
                            </a>
                            <a>
                                <img src= 'images/watchlist-icon.svg'/> 
                                <span>Wach List</span>
                            </a>
                            <a>
                                <img src= 'images/original-icon.svg'/> 
                                <span>Originals</span>
                            </a>
                            <a>
                                <img src= 'images/movie-icon.svg'/> 
                                <span>Movies</span>
                            </a>
                            <a>
                                <img src= 'images/series-icon.svg' alt='logo'/> 
                                <span>Series</span>
                            </a>
                        </NavMenu>
                        <UserImg onClick = {signOut} class='user-image' src = '/images/gato.jpg'/>

                    </>

            }
            
        </Nav>
    )
}

export default Header;


const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display:flex;
    align-items:center;
    padding: 0 36px;
    overflow-x: hidden;

`

const Logo = styled.img`
    width : 80px;
    
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;

    a {
        display:flex;
        align-items:center;
        padding: 0 12px;
        cursor:pointer;
        text-decoration: none;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            text-transform: uppercase;
            position: relative;

            &:after {
                content: '';
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
                
            }
        }

        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
   
`

const UserImg  = styled.img`
    width:42px;
    height : 42px;
    border-radius: 50%;
    cursor:pointer;

`

const Login = styled.div`
    border-radius: 4px;
    border: 1px solid #f9f9f9 ;
    padding: 8px 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
        

    }
`


const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`
