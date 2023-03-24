import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../providers/auth";

import { Oval,  } from "react-loader-spinner";

import Loading from "./Loading";
import PostInfos from "./PostInfos";

export default function UserPost({ reload, setReload }) {
  const { id } = useParams();
  const [reloadComments, setReloadComments] = useState([])
 
  const { user } = React.useContext(AuthContext)
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [userPostsWithHashtags, setUserPostsWithHashtags] = useState([]);

  // console.log("userPostsWithHashtags: ", userPostsWithHashtags);

  // async function getHashtags() {
  //   try {
  //     setLoading(true);
  //     let hashtagByPost = [];

  //     for (let i = 0; i < userPosts.length; i++) {
  //       let currentPostId = userPosts[i].id;
  //       let response = await axios.get(
  //         `${process.env.REACT_APP_API_URL
  //         }hashtag/posts/${currentPostId.toString()}`
  //       );
  //       hashtagByPost.push({
  //         postId: currentPostId,
  //         hashtags: response.data,
  //       });
  //     }

  //     console.log(`hashtags: `, hashtagByPost);

  //     const newUserPosts = userPosts.map((post) => {
  //       const matchingHashtags = hashtagByPost.find(
  //         (hashtagPost) => hashtagPost.postId === post.id
  //       );
  //       if (matchingHashtags) {
  //         return {
  //           ...post,
  //           hashtags: matchingHashtags.hashtags,
  //         };
  //       }
  //       return post;
  //     });

  //     setUserPostsWithHashtags(newUserPosts);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
      .then((res) => {
       
        setUserPosts(res.data.posts);
        setUserData(res.data);
        setLoading(false);
       
      });
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // useEffect(() => {
  //   if (userPosts.length) {
  //     getHashtags();
  //   }
  // }, [userPosts]);

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
        userPosts ?
          <>

            <PageTitle>

              <img src={userData.image_url} alt='userPic' />
              {`${userData.user_name}'s post`}
            </PageTitle>
            {userPosts.map((p) => <PostInfos setReload={setReload} setReloadComments={setReloadComments}  post={p} userData={userData} />)}

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
`;

const Text = styled.h1`
  color: rgb(255, 255, 255);
  font-family: Oswald;
  font-size: 27px;
  font-weight: 700;
  margin-top: 300px;
  margin-right: 200px;
  margin-bottom: 20px;
`;

const StyledLoading = styled.div`
  width: 50px;
  margin-top: 200px;
  margin-right: 400px;
  margin-left: 200px;
`;

const PageTitle = styled.div`
  margin-top: 60px;
  margin-bottom: 40px;
  font-family: "Oswald";
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
`;

