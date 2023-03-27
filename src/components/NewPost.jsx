import styled from "styled-components";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/auth";
import axios from "axios";

export default function NewPost({imageUrl, headers}) {
    const { user } = useContext(AuthContext);

    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [submited, setSubmited] = useState(false);

    function handleForm(event) {
        event.preventDefault()
        if (!link) {
            alert("You must have a link")
        } else {
            publishPost()
        }
    }



    async function publishPost() {
        console.log(user);
        const postData = {
            userId: user.user.id,
            link,
            description
        }
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/posts/new`, postData, headers)
                .then(() => {
                    setSubmited(true);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NewPostContainer data-test="publish-box">
            <ProfilePicDiv>
                <img src={imageUrl} alt="alt" />
            </ProfilePicDiv>

            <FormPost onSubmit={handleForm}>

                <Title>What are you going to share today?</Title>

                <input data-test="link" placeholder="http://..." onChange={e => setLink(e.target.value)} value={link} />

                <textarea data-test="description" placeholder="Awesome article about #javascript" onChange={e => setDescription(e.target.value)} value={description} />

                <ContainerButton>
                    <button data-test="publish-btn">Publish</button>
                </ContainerButton>

            </FormPost>
        </NewPostContainer>
    )
}

const NewPostContainer = styled.div`
    width: 100%;
    height: 210px;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    flex-direction: row;
    display: flex;
`
const ProfilePicDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`

const FormPost = styled.div`
    width: 550px;

    input{
        width: 100%;
        height: 30px;
        border: none;
        border-radius: 5px;
        background-color: #EFEFEF;
        margin: 5px 0px;
        padding: 10px;
    }
    textarea{
        height: 66px;
        width: 100%;
        text-align: left;
        padding: 10px;
        resize: none;
        border: none;
        border-radius: 5px;
        background-color: #EFEFEF;
    }


`

const Title = styled.h2`
    font-family: Lato;
    margin-top: 22px;
    font-size: 20px;
    font-weight: 300;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #707070;
`
const ContainerButton = styled.div`
    margin-top: 8px;
    width: 550px;
    align-items: left;
    display: flex;
    justify-content: flex-end;
    button{
        width: 112px;
        height: 31px;
        font-family: Lato;
        font-size: 14px;
        font-weight: 700;
        text-align: center;

        color: #FFFFFF;
        background-color: #1877F2;
        border: none;
        border-radius: 5px;
    }
    `