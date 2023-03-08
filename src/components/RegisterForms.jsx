import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Loading from "./Loading";

export default function RegisterForms() {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
        user_name: '',
        image_url: ''
    })
    const navigate = useNavigate()
    const [submited, setSubmited] = React.useState(false)

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    function failedRegister(e) {
        alert(e.response.data)
        setSubmited(false)
    }
    function doRegister(e) {
        setSubmited(true)
        e.preventDefault();
        const registerPost = axios.post(`${process.env.REACT_APP_API_URL}sign-up`, {
            email: form.email,
            password: form.password,
            user_name: form.user_name,
            image_url: form.image_url
        })
        registerPost.then(() => navigate("/"))
        registerPost.catch((e) => failedRegister(e))
    }
    return (
        <RightSideDiv>
            <LoginFormDiv>
                <form onSubmit={doRegister}>
                    <input
                        disabled={false}
                        name="email"
                        type="email"
                        required
                        placeholder="E-mail"
                        onChange={handleForm}
                        value={form.email}
                    />
                    <input
                        disabled={false}
                        name="password"
                        type="password"
                        required
                        placeholder="Senha"
                        onChange={handleForm}
                        value={form.password}
                    />
                    <input
                        disabled={false}
                        name="user_name"
                        type="text"
                        required
                        placeholder="username"
                        onChange={handleForm}
                        value={form.user_name}
                    />
                    <input
                        disabled={false}
                        name="image_url"
                        type="url"
                        required
                        placeholder="picture url"
                        onChange={handleForm}
                        value={form.image_url}
                    />
                    <button
                        disabled={false}
                        type="submit"
                    >{submited ? <Loading /> : "Sign Up"}</button>
                </form>
                <StyledLink to="/">
                    <p>
                        Switch back to log in
                    </p>
                </StyledLink>
            </LoginFormDiv>
        </RightSideDiv>
    );
}

const RightSideDiv = styled.div`
    display:flex;
    flex-direction: column;
    background-color: #333333;
    width:40vw;
    height:100vh;
`;

const LoginFormDiv = styled.div`
    margin:auto;
    width:80%;
    form{
        display:flex;
        flex-direction: column;
        margin-top:24px;
        margin-bottom:22px;
        input{
            height:65px;
            width:100%;
            border:none;
            border-radius:5px;
            margin-bottom:13px;
            padding:17px 15px 17px 15px;
            color:#000000;
            &::placeholder{
                font-family: 'Oswald';
                font-size: 27px;
                font-weight: 700;
                color:#9F9F9F; 
            }
        }
        button{
            cursor:pointer;
            height: 65px;
            width: 100%;
            border:none;
            border-radius: 5px;
            background-color:#1877F2;
            color:#FFFFFF;
            font-family: 'Raleway',sans-serif;
            font-size: 20px;
            font-weight: 700;
        }
    }
`;

const StyledLink = styled(Link)`
    color:#ffffff;
    width:100%;
    text-decoration: underline;
    font-family: 'Raleway',sans-serif;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
`;