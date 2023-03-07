import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../providers/auth";
import Loading from "./Loading";

export default function LoginForms() {
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    })
    const { setToken } = React.useContext(AuthContext)
    const navigate = useNavigate()
    const [submited, setSubmited] = React.useState(false)

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function failedLogin(e) {
        alert(e.response.data)
        setSubmited(false)
    }

    function didLogin(a) {
        setToken(a.data)
        navigate("/home")
    }

    function doLogin(e) {
        alert("oi")
        setSubmited(true)
        e.preventDefault();
        const postLogin = axios.post(`${process.env.REACT_APP_API_URL}sign-in`, {
            email: form.email,
            password: form.password
        })
        // se der tudo certo com a requisição, vai para a página home
        postLogin.then((answer) => didLogin(answer))
        postLogin.catch((error) => failedLogin(error))
    }
    return (
        <RightSideDiv>
            <LoginFormDiv>
                <form onSubmit={doLogin}>
                    <input
                        disabled={false}
                        name="email"
                        type="email"
                        required
                        placeholder="e-mail"
                        onChange={handleForm}
                        value={form.email}
                    />
                    <input
                        disabled={false}
                        name="password"
                        type="password"
                        required
                        placeholder="password"
                        onChange={handleForm}
                        value={form.password}
                    />
                    <button
                        disabled={false}
                        type="submit"
                    >{submited ? <Loading /> : "Log in"}</button>
                </form>
                <StyledLink to="/sign-up">
                    <p>
                        First time? Create an account!
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