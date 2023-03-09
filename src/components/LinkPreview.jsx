import styled from "styled-components";

export default function LinkPreview() {
    return (
        <LinkPreviewContainer>
            <LinkPreviewText>
                <h2>Link preview title</h2>
                <p>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</p>
                <a href="https://medium.com/@pshrmn/a-simple-react-router">https://medium.com/@pshrmn/a-simple-react-router</a>
            </LinkPreviewText>
            <LinkPreviewImage>
                <img src="https://picsum.photos/200/300" alt="link preview"/>
            </LinkPreviewImage>
        </LinkPreviewContainer>
    );
}

const LinkPreviewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #333333;
    border-radius: 10px;
    flex-direction: row;
    width: 500px;
    height: 155px;
    margin: 0px 20px 20px 0px;
    `

const LinkPreviewImage = styled.div`
overflow: hidden;
    img{
        width: 155px;
        height: 155px;
        border-radius: 0px 10px 10px 0px;
    }
    `

const LinkPreviewText = styled.div`
    display: flex;
    width: 305px;
    flex-direction: column;
    margin: 20px;
    justify-content: space-between;
    h2{
        font-family: Lato;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        text-align: left;
        color: #CECECE;
    }
    p{
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        text-align: left;
        color: #9B9595;
        max-width:fit-content;
    }
    a{
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        text-align: left;
        color: #9B9595;
    }`
    