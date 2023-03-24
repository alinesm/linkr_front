import { useContext } from "react"
import { IoPaperPlaneOutline } from "react-icons/io5"
import styled from "styled-components"
import { AuthContext } from "../providers/auth"

export default function Comments({post, seeComment}) {
    const {user} = useContext(AuthContext)
    console.log(post)
   
    return (
        <CommentsContainer  seeComment={seeComment}>
        {post.comments.map((c) =>
            <CommentDiv>
                <img src={c.user_avatar} />
                <div>
                    {c.user_name} <span>test</span>
                    <p>{c.comment}</p>
                </div>
            </CommentDiv>

        )}
        <WriteCommentDiv>
            <img src={user.user.image_url} />
            <div>
                <input placeholder="write a comment..." />
                <SendIcon />
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

const CommentDiv = styled.div`
    width: 100%;
    background-color: blue;
    min-height: 70px;
    display: flex;
    gap: 20px;
    align-items: center;
    border-bottom: 1px solid #353535;
    background: #1E1E1E;
  
    
  
    

        img {
            width: 39px;
            height: 39px;
            border-radius: 100%;

        }
      
 

`

const SendIcon = styled(IoPaperPlaneOutline)`
    position: absolute;
    right: 5px;
    bottom: 25px;
`
