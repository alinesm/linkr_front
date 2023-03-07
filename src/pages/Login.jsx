import { Link } from "react-router-dom";
import styled from 'styled-components';
import TitleText from "../components/TitleText";
import LoginForms from "../components/LoginForms";

export default function Login() {
    return (
        <LoginDiv>
            <TitleText />
            <LoginForms />
            <StyledLink to="/cadastro">
                <p>
                    Primeira vez? Cadastre-se!
                </p>
            </StyledLink>
        </LoginDiv>
    );
}

const LoginDiv = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width:100%;
    height:100%;
    min-height:100vh;
    padding:0px 25px 0px 25px;
    background-color:#8c11be;
`;

const StyledLink = styled(Link)`
    color:#ffffff;
    width:100%;
    margin-top:36px;
    text-decoration: none;
    font-family: 'Raleway',sans-serif;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;
`;