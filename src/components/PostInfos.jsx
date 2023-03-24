import { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../providers/auth"
import Comments from "./Comments"
import CommentIcon from "./CommentsIcon"
import LikeButton from "./LikeButton"

export default function PostInfos({ post, userData }) {
    const [seeComments, setSeeComments] = useState(false)
    const location = useLocation()
    console.log(location.pathname)

    const { user } = useContext(AuthContext)
    return (
        <>
            {

                <>
                    <ContainerPost data-test="post">
                        <>
                            <ProfilePicDiv>

                                {!userData ?
                                    <img src={post.image_url} alt='profilepic' />
                                    :
                                    <img src={userData.image_url} alt='profilepic' />}

                                <LikeButton postId={post.id} />


                                <CommentIcon seeComments={seeComments} setSeeComments={setSeeComments} postId={post.id} />



                            </ProfilePicDiv>

                            <MainDiv  >
                                <HeaderPost>
                                    <div>
                                        {!userData ?
                                            <Link to={`/users/${post.user_id}`} data-test="username" >{post.user_name}</Link>

                                            :
                                            <Link data-test="username" >{userData.user_name}</Link>
                                        }

                                        <h3 data-test="description" >{post.description} {post.hashtags.map((h) => <StyledLink to={`/hashtag/${h.text}`}>{` #${h.text}  `}</StyledLink>)}</h3>
                                    </div>
                                    {post.user_id === user.user.id &&
                                        <ChangeButton>
                                            <ion-icon name="pencil"></ion-icon>
                                            <ion-icon name="trash"></ion-icon>
                                        </ChangeButton>

                                    }

                                </HeaderPost>
                                <PostContent data-test="link" onClick={() => window.open(`${post.link}`, "_blank")}>
                                    <div>
                                        <h1>{post.title}</h1>
                                        <h2>{post.postDescription}</h2>
                                        <a href={post.link} target="_blank">{post.link}</a>
                                    </div>
                                    <img src={post.image} />
                                </PostContent>
                            </MainDiv>
                        </>

                    </ContainerPost>
                    <DivTest seeComment={seeComments}>
                        <Comments seeComment={seeComments} post={post} />
                    </DivTest>










                </>

            }
        </>
    )
}

const DivTest = styled.div`
     display: ${props => props.seeComment ? 'block' : 'none'};

`

const ContainerPost = styled.div`
            display: flex;
            flex-direction: row;
            width: 611px;
            /* height: 278px; */
            background: #171717;
            margin: 30px;
            border-radius: 16px;


            p{
                color: #000000;
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
                margin-bottom: 20px;
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
            width: 611px;
            height: 276px;
            background: #171717;
            border-radius: 16px;
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
                display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;

            ion-icon{
                font-size: 22px;
            margin: 0px 5px;
        }
    }
            h3 {
                font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 17px;
            color: #B7B7B7
    }
 `
const ChangeButton = styled.div`
 flex-direction:row!important;

 `

const PostContent = styled.div`
display: flex;
width: 503px;
border: 1px solid #4D4D4D;
border-radius: 11px;
margin-top: 40px;
cursor: pointer;
word-wrap: break-word!important;
div {
    font-family: 'Lato';
font-style: normal;
font-weight: 400;
padding: 15px;
word-wrap: break-word!important;
display: flex;
flex-direction: column;
gap: 10px;


h1 {
    font-size: 16px;
color: #CECECE
}
h2 {
    font-size: 11px;
color: #9B9595;     

}
a {
    font-size: 11px;
color: #CECECE;

}
}

img {
    width: 153.44px;
height: inherit;
border-radius: 0px 12px 13px 0px;
}

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
const StyledLink = styled(Link)`
    margin-top: 40px;
    font-weight: bold;
    text-decoration: none;
    &:visited {
        color: white;
    }

`
