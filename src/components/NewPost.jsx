import styled from "styled-components"
import { useState } from "react"
import axios from "axios"

export default function NewPost({imageUrl, headers}) {
    // const { user } = useContext(AuthContext);
    const [link, setLink] = useState("")
    const [description, setDescription] = useState("")

    function handleForm(event) {
        event.preventDefault()
        if (!link) {
            alert("You must have a link")
        } else {
            publishPost()
        }
    }

    async function publishPost() {
        try {
            axios.post('/posts/new', )
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

                <input data-test="description" placeholder="Awesome article about #javascript" onChange={e => setDescription(e.target.value)} value={description} />

                <ContainerButton>
                    <button data-test="publish-btn"></button>
                </ContainerButton>

            </FormPost>
        </NewPostContainer>
    )
}

const NewPostContainer = styled.div`
    width: 611px;
    height: 210px;
`
const ProfilePicDiv = styled.div`
    
  img {
    width: 50px;
    border-radius: 50%;
    margin: 18px;
  }
`

const FormPost = styled.div`
    width: 500px;
    background-color: #44aa09;
`

const Title = styled.h2`
    font-family: Lato;
    font-size: 20px;
    font-weight: 300;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
`
const ContainerButton = styled.div`
    width: 500px;`