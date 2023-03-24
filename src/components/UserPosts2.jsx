import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../providers/auth"
import { Oval, } from "react-loader-spinner"
import PostInfos from "./PostInfos"


export default function UserPost({ reload }) {

    const { user } = useContext(AuthContext)
    const {loadingComments} = useContext(AuthContext)
    console.log(loadingComments)
    const [posts, setPosts] = useState([])
    const [friends, setFriends] = useState(false)
    const [loading, setLoading] = useState(true)

    const [reloadComments, setReloadComments] = useState([])


    useEffect(() => {
        console.log(user)
        axios.get(`${process.env.REACT_APP_API_URL}/timeline/${user.user.id}`)
            .then(res => {
                setPosts(res.data.posts)
                setFriends(res.data.friends)
                setLoading(false)
            })
            .catch(err =>{
                alert(err.response.data)
            })
    }, [reload, reloadComments])

    return (
        <>
            {loading ?
                <StyledLoading>
                    <Oval
                        height={"250"}
                        width={"200"}
                        color="white"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#rgb(21, 21, 21)"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </StyledLoading>
                :
                friends ?
                    posts ?
                        <>
                          <PageTitle>
                            timeline
                          </PageTitle>
                          {posts.map((p) => <PostInfos post={p} setReloadComments={setReloadComments}/>)}
                        </>
                        :
                        <>
                            <Text>No posts found from your friends</Text>
                            <StyledLink to={"/timeline"}>
                                Volta para home
                            </StyledLink>
                        </>
                    :
                    <>
                        <Text>You don't follow anyone yet. Search for new friends!</Text>
                        <StyledLink to={"/timeline"}>
                            Volta para home
                        </StyledLink>
                    </>
            }

        </>
    )
}

const StyledLink = styled(Link)`
    margin-top: 40px;
    font-weight: bold;
    text-decoration: none;
    &:visited {
        color: white;
    }

`

const Text = styled.h1`
   color: rgb(255, 255, 255);
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    margin-top: 300px;
    margin-right: 200px;
    margin-bottom: 20px;
`

const StyledLoading = styled.div`
    width: 50px;
    margin-top: 200px;
    margin-right: 400px;
    margin-left: 200px;
`

const PageTitle = styled.div`
            margin-top: 60px;
            margin-bottom: 40px;
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 700;
            font-size: 43px;
            margin-left: 50px;
            display: flex;
            gap: 30px;
            img {
                width: 50px;
            height: 50px;
            border-radius: 26.5px;
    }

`






