import styled from 'styled-components';
import LoginForms from "../components/LoginForms";
import LikeButton from "../components/LikeButton";
import LinkrIntro from "../components/LinkrIntro";
import Header from '../components/Header';


export default function Login() {
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
