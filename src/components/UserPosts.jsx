import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../providers/auth";

import { Oval,  } from "react-loader-spinner";

import Loading from "./Loading";
import PostInfos from "./PostInfos";

export default function UserPost({ reload }) {
  const { id } = useParams();
 
  const { user } = React.useContext(AuthContext)
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followRelation, setFollowRelation] = useState(false);
  const [followSubmitted, setFollowSubmitted] = useState(false);
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

  useEffect(() => {
    const followRelation = { followerId: user.user.id, followedId: userData.id }
    console.log(followRelation)
    axios.put(`${process.env.REACT_APP_API_URL}/find_follow`, followRelation)
      .then((res) => {
        if (res.data.length !== 0) {
          setFollowRelation(true)
        }
      })
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // useEffect(() => {
  //   if (userPosts.length) {
  //     getHashtags();
  //   }
  // }, [userPosts]);


  function follow() {
    setFollowSubmitted(true)
    const followRelation = { followerId: user.user.id, followedId: userData.id }
    axios.post(`${process.env.REACT_APP_API_URL}/follow`, followRelation)
      .then((res) => {
        setFollowRelation(true);
        setFollowSubmitted(false);
      })
      .catch((err) => {
        setFollowSubmitted(false);
        alert("Não foi possivel realizar a operação");
      })
  }

  function unfollow() {
    setFollowSubmitted(true);
    const followRelation = { followerId: user.user.id, followedId: userData.id }
    axios.post(`${process.env.REACT_APP_API_URL}/unfollow`, followRelation)
      .then((res) => {
        setFollowRelation(false);
        setFollowSubmitted(false);
      })
      .catch((err) => {
        setFollowSubmitted(false);
        alert("Não foi possivel realizar a operação");
      })
  }

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
              <FollowButton disabled={followSubmitted} onClick={() => {
                followRelation ? unfollow() : follow()
              }}>
                {followSubmitted ? <Loading /> : (followRelation ? "unfollow" : "follow")}
              </FollowButton>
            </PageTitle>
            {userPosts.map((p) => <PostInfos post={p} userData={userData} />)}

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

const FollowButton = styled.button`
  position:absolute;
  top:130px;
  right:110px;
  height: 31px;
  width: 112px;
  border:none;
  border-radius: 5px;
  background-color: #1877F2;
  color:#FFFFFF;
  cursor:pointer;
`;

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

