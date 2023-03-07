import styled from 'styled-components';

export default function TitleText() {
    return (
        <>
            <Text>MyWallet</Text>
        </>
    );
}

const Text = styled.p`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:50px;
    font-family:'Saira Stencil One',sans-serif;
    color:#ffffff;
    font-size: 32px;
    font-weight: 400;
`;