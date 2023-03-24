import axios from "axios"
import { useContext, useState } from "react"
import { IoPaperPlaneOutline } from "react-icons/io5"
import styled from "styled-components"
import { AuthContext } from "../providers/auth"
import Comment from "./Comment"

export default function Comments({ post, seeComment, setReloadComments, setUpdateCommentsIcon, followRelation, userData }) {
    const { user } = useContext(AuthContext)
    const [comment, setComment] = useState('')

    const user_id = user.user.id

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }


    const [postComment, setPostComment] = useState([...post.comments])

    function commentPost(post_id) {
        const postComments = [...postComment, { user_avatar: user.user.image_url, user_id: user.user.id, comment, user_name: user.user.user_name }]
        setPostComment(postComments)

        const message = { user_id, comment, post_id }
        axios.post(`${process.env.REACT_APP_API_URL}/comments/${post_id}`, { message }, config)
            .then((res) => {
                setReloadComments([])
                setComment("")
                setUpdateCommentsIcon([])

            })

    }


    return (
        <CommentsContainer seeComment={seeComment}>
            {postComment.map((c) => <Comment followRelation={followRelation} post={post} postComments={c} userData={userData} />)}




            <WriteCommentDiv>
                <img src={user.user.image_url} alt='userPic' />
                <div>
                    <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="write a comment..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                commentPost(post.id)
                            }
                        }}

                    />
                    <SendIcon onClick={() => commentPost(post.id)} />
                </div>
            </WriteCommentDiv>



        </CommentsContainer>

    )
}

const CommentsContainer = styled.div`
    margin-top: -30px;
    background: #1E1E1E;
    width: 611px;
    margin-left: 30px;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    padding-left: 30px;
    padding-right: 30px;
    display: ${props => props.seeComment ? 'block' : 'none'};
    
    
    
    
`

const WriteCommentDiv = styled.div`
    display: flex;
    width: 100%;  
    min-height: 70px;
    align-items: center;
    gap: 10px;
    position: relative;
  

    
            img {
                width: 39px;
                height: 39px;
                border-radius: 100%;

            }
            input {
                width: 505px;
                height: 40px;
                background: #252525;
                border-radius: 8px;
                border-style: none;
                padding: 10px;
                color: white;
                
                

            }
    
    
`


const SendIcon = styled(IoPaperPlaneOutline)`
    position: absolute;
    right: 5px;
    bottom: 25px;
    cursor: pointer;
`
