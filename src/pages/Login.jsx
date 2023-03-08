import styled from 'styled-components';
import TitleText from "../components/TitleText";
import LoginForms from "../components/LoginForms";
import LikeButton from "../components/LikeButton";
import LinkrIntro from "../components/LinkrIntro";


export default function Login() {
    /*return (
        <LoginDiv>
            <TitleText />
            <LoginForms />
            <StyledLink to="/cadastro">
                <p>
                    Primeira vez? Cadastre-se! <LikeButton/>
                </p>
            </StyledLink>
        </LoginDiv>
    );*/
    return(
        <LoginDiv>
            <LinkrIntro/>
            <LoginForms/>
        </LoginDiv>
    )
}

const LoginDiv = styled.div`
    display:flex;
    width:100vw;
    height:100vh;
    min-height:100vh;
`;
