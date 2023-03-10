import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import LikeButton from "./LikeButton";

export default function FilteredPostsByHashtag() {
  const { hashtag } = useParams();
  console.log(hashtag);

  const [filteredPosts, setFilteredPosts] = useState([]);

  const [withHashtags, setWithHashtags] = useState([]);

  console.log("with", withHashtags);

  async function getHashtags() {
    try {
      let hashtagByPost = [];

      for (let i = 0; i < filteredPosts.length; i++) {
        let currentPostId = filteredPosts[i].post_id;
        let response = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }hashtag/posts/${currentPostId.toString()}`
        );
        hashtagByPost.push({
          postId: currentPostId,
          hashtags: response.data,
        });
      }

      console.log(`hashtags: `, hashtagByPost);

      const newPosts = filteredPosts.map((post) => {
        const matchingHashtags = hashtagByPost.find(
          (hashtagPost) => hashtagPost.postId === post.post_id
        );
        if (matchingHashtags) {
          return {
            ...post,
            hashtags: matchingHashtags.hashtags,
          };
        }
        return post;
      });

      setWithHashtags(newPosts);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`)
      .then((res) => {
        setFilteredPosts(res.data);
        console.log("data", res.data);
      });
  }, []);
  console.log("filteredposts", filteredPosts);

  useEffect(() => {
    if (filteredPosts.length) {
      getHashtags();
    }
  }, [filteredPosts]);

  return (
    <>
      {withHashtags.map((post) => (
        <ContainerPost>
          <>
            <ProfilePicDiv>
              <img src={post.image_url} alt="profilepic" />
              <LikeButton postId={post.id} />
            </ProfilePicDiv>

            <MainDiv>
              <HeaderPost>
                <div>
                  <h2>{post.user_name}</h2>
                  <h3>{post.description}</h3>
                  <span>
                    {post.hashtags.map((h) => (
                      <Link to={`/hashtag/${h}`}>
                        <span>#{h}</span>
                      </Link>
                    ))}
                  </span>
                </div>
                <ChangeButton>
                  <ion-icon name="pencil"></ion-icon>
                  <ion-icon name="trash"></ion-icon>
                </ChangeButton>
              </HeaderPost>
              <PostContent
                onClick={() => window.open(`${post.link}`, "_blank")}
              >
                <div>
                  <h1>{post.title}</h1>
                  <h2>{post.postDescription}</h2>
                  <a href={post.link} target="_blank">
                    {post.link}
                  </a>
                </div>
                <img src={post.image} />
              </PostContent>
            </MainDiv>
          </>
        </ContainerPost>
      ))}
    </>
  );
}

const StyledLink = styled(Link)`
  margin-top: 40px;
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

const ContainerPost = styled.div`
  display: flex;
  flex-direction: row;
  width: 611px;
  /* height: 278px; */
  background: #171717;
  margin: 30px;
  border-radius: 16px;

  p {
    color: #000000;
  }
`;

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

  h2 {
    padding-left: 3px;
  }
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;

    ion-icon {
      font-size: 22px;
      margin: 0px 5px;
    }
  }
  h3 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    color: #b7b7b7;
  }
`;
const PostContent = styled.div`
  display: flex;
  width: 503px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  margin-top: 40px;
  cursor: pointer;
  word-wrap: break-word !important;
  div {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    padding: 15px;
    word-wrap: break-word !important;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
      font-size: 16px;
      color: #cecece;
    }
    h2 {
      font-size: 11px;
      color: #9b9595;
    }
    a {
      font-size: 11px;
      color: #cecece;
    }
  }

  img {
    width: 153.44px;
    height: inherit;
    border-radius: 0px 12px 13px 0px;
  }

  p {
    width: 500px;
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    color: #ffffff;
    margin: 10px 0px;
    padding-left: 3px;
  }
`;
const ProfilePicDiv = styled.div`
  display: flex;
  align-items: center;
  width: 96px;
  flex-direction: column;

  img {
    width: 50px;
    border-radius: 50%;
    margin: 18px;
  }

  ion-icon {
    font-size: 30px;
  }
  p {
    font-family: Lato;
    font-size: 11px;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
  }
`;
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 611px;
  height: 276px;
  background: #171717;
  border-radius: 16px;
`;

const ChangeButton = styled.div`
  flex-direction: row !important;
`;
