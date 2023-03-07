import React from "react";
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
        <LoginFormDiv>
            <form onSubmit={doLogin}>
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
                <button
                    disabled={false}
                    type="submit"
                >{submited ? <Loading /> : "Entrar"}</button>
            </form>
        </LoginFormDiv>
    );
}

const LoginFormDiv = styled.div`
    form{
        display:flex;
        flex-direction: column;
        margin-top:24px;
        input{
            height:58px;
            width:100%;
            border:none;
            border-radius:5px;
            margin-bottom:13px;
            padding:17px 15px 17px 15px;
            color:#000000;
            &::placeholder{
                font-family: 'Raleway',sans-serif;
                font-size: 20px;
                font-weight: 400;
                color:#000000;
            }
        }
        button{
            cursor:pointer;
            height: 46px;
            width: 100%;
            border:none;
            border-radius: 5px;
            background-color:#A328D6;
            color:#FFFFFF;
            font-family: 'Raleway',sans-serif;
            font-size: 20px;
            font-weight: 700;
        }
    }
`;