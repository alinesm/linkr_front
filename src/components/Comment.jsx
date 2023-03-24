import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { AuthContext } from "../providers/auth"

export default function Comment({ post, postComments, userData }) {
    const { user } = useContext(AuthContext)
    const[followRelation, setFollowRelation] = useState(false)
    console.log(post)
    console.log(followRelation)
    useEffect(() => {
        const followRelation = { followerId: user.user.id, followedId: postComments.user_id }
        console.log(followRelation)
        axios.put(`${process.env.REACT_APP_API_URL}/find_follow`, followRelation)
          .then((res) => {
            if (res.data.length !== 0) {
              setFollowRelation(true)
            }
          })
           // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <>


           
                <CommentDiv>
                    <img src={postComments.user_avatar} alt='userPic' />
                    <div>
                        <CommentInfo>

                            <span>{postComments.user_name}</span>
                            <span>{postComments.user_id === post.user_id ? <p> • post's author</p> : followRelation? <p>• following</p>: <p></p>}</span>
                        </CommentInfo>
                        <p>{postComments.comment}</p>
                    </div>
                </CommentDiv>

           

        </>


    )
}



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

const CommentInfo = styled.div`
    
    display: flex;
    gap: 3px;
        p {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            color: #565656;
        }
`