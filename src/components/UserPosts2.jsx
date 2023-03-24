import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../providers/auth"
import { Oval,  } from "react-loader-spinner"
import PostInfos from "./PostInfos"


export default function UserPost({ reload }) {

    const { user } = useContext(AuthContext)

    const [posts, setPosts] = useState([])
  

    const [loading, setLoading] = useState(true)


    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/timeline`)
            .then(res => {
             
                setPosts(res.data)   
                setLoading(false)
              
                
                
            })
    }, [reload])

    






    console.log(user)
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
                posts ?
                    <>

                        <PageTitle>

                            timeline
                        </PageTitle>
                        {posts.map((p) => <PostInfos post={p} />)}
                        
                       

                    </>
                    :
                    <>
                        <Text>Este usuário não possuí nenhum post</Text>
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

  




