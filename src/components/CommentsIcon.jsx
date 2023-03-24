import axios from "axios"
import { useEffect, useState } from "react"
import { AiOutlineComment } from "react-icons/ai"
import styled from "styled-components"

export default function CommentIcon({ postId, seeComments, setSeeComments  }) {
    const [comments, setComments] = useState([])
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/comments/${postId}`)
            .then(res => {
                setComments(res.data)

            })
    }, [])
    
    return (
        <>
            {comments.length > 0 ?
                <Icon  onClick={() => {
                    setSeeComments(!seeComments)
                    
                    
                    }}>
                    <AiOutlineComment size={'25px'}  />
                    {comments.length} comments
                </Icon>
                :
                <Icon  onClick={() => {
                    setSeeComments(!seeComments)
                    
                    
                    }}>
                    <AiOutlineComment size={'25px'}  />
                    0 comments
                </Icon>

            }


        </>



    )
}

const Icon = styled.div`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    cursor: pointer;
    flex-direction: column!important;
    display: flex;
    justify-content: center;
    align-items: center;

`

