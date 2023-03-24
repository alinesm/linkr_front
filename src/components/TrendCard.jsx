import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import styled from "styled-components";
import Loading from "./Loading";
import { AuthContext } from "../providers/auth";

export default function TrendCard() {
  const [hashtags, setHashtags] = useState([]);
  const { id } = useParams();
  const { user } = React.useContext(AuthContext)
  const [followRelation, setFollowRelation] = useState(false);
  const [followSubmitted, setFollowSubmitted] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hashtag/trending`)
      .then((res) => {
        console.log(res.data);
        setHashtags(res.data);
      });
  }, []);

  useEffect(() => {
    if (id) {
      const followRelation = { followerId: user.user.id, followedId: id }
      console.log(followRelation)
      axios.put(`${process.env.REACT_APP_API_URL}/find_follow`, followRelation)
        .then((res) => {
          if (res.data.length !== 0) {
            setFollowRelation(true)
          }
        })
    }
  }, []);

  function follow() {
    setFollowSubmitted(true)
    const followRelation = { followerId: user.user.id, followedId: id }
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
    const followRelation = { followerId: user.user.id, followedId: id }
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
    <RightDiv>
      <FollowButton 
        disabled={followSubmitted} 
        visibility={typeof id === "string"? "": "hidden"} 
        onClick={() => {
          followRelation ? unfollow() : follow()
        }}
      >
        {followSubmitted ? <Loading /> : (followRelation ? "unfollow" : "follow")}
      </FollowButton>
      <TrendCardContainer data-test="trending">
        <TitleDiv>
          <h2>trending</h2>
        </TitleDiv>
        <TrendListDiv>
          {hashtags.map((h) => (
            <p data-test="hashtag">
              #<ReactTagify>{h}</ReactTagify>
            </p>
          ))}
        </TrendListDiv>
      </TrendCardContainer>
    </RightDiv>
  );
}

const RightDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-end;
  width:31%;
`;

const FollowButton = styled.button`
  margin-top: 80px;
  height: 31px;
  width: 112px;
  border:none;
  border-radius: 5px;
  background-color: #1877F2;
  color:#FFFFFF;
  cursor:pointer;
  visibility:${props => props.visibility};
`;

const TrendListDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  p {
    display: block;
    font-family: Lato;
    font-size: 19px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0.05em;
    text-align: left;
    margin: 5px;
  }
`;
const TrendCardContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 278px;
  background-color: black;
  border-radius: 16px;
`;
const TitleDiv = styled.div`
  height: 50px;
  border-bottom: 1px solid #333333;
  display: flex;
  align-items: center;
  h2 {
    color: #fff;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    text-align: left;
    margin-left: 15px;
  }
`;
