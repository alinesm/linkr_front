import styled from "styled-components"
import LinkPreview from "./LinkPreview"

export default function Post({likesNumber}) {
    return (
            <ContainerPost>

                <ProfilePicDiv>
                    <img src="data:image/png;base64,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" alt='profilepic' />
                    <ion-icon name="heart-outline"></ion-icon>
                    <p>123 likes</p>
                </ProfilePicDiv>

                <MainDiv>
                    <HeaderPost>
                        <h2>Banco do Brasil</h2>
                        <div>
                            <ion-icon name="pencil"></ion-icon>
                            <ion-icon name="trash"></ion-icon>
                        </div>
                    </HeaderPost>
                    <PostContent>
                        <p>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</p>
                        <LinkPreview />
                    </PostContent>
                </MainDiv>

            </ContainerPost>
    )
}

const ContainerPost = styled.div`
    display: flex;
    flex-direction: row;
    /* width: 615px; */
    /* height: 278px; */
    background-color: black;
    margin: 30px;
    border-radius: 16px;

    p{
        color: #000000;
    }
`


const HeaderPost = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    height: 30px;
    color: white;
    margin-top: 20px;
    font-family: Lato;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    h2{
        padding-left: 3px;
    }
    div{
        ion-icon{
            font-size: 22px;
            margin: 0px 5px;
        }
    }
`
const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    
    p{
        width: 500px;
        font-family: Lato;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        text-align: left;
        color: #FFFFFF;
        margin: 10px 0px;
        padding-left: 3px;
    }
`
const ProfilePicDiv = styled.div`
    display: flex;
    align-items: center;
    width: 96px;
    flex-direction: column;

    img{
        width: 50px;
        border-radius: 50%;
        margin: 18px;
    }

    ion-icon{
        font-size: 30px;
    }
    p{
        font-family: Lato;
        font-size: 11px;
        font-weight: 400;
        text-align: center;
        color: #FFFFFF;
    }
`
const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    `