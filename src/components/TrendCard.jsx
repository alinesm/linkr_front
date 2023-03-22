import axios from "axios";
import { useEffect, useState } from "react";
import { ReactTagify } from "react-tagify";
import styled from "styled-components";

export default function TrendCard() {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hashtag/trending`)
      .then((res) => {
        console.log(res.data);
        setHashtags(res.data);
      });
  }, []);

  return (
    <RightSide>
      <FollowButton>
        Follow
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
    </RightSide>
  );
}
const RightSide = styled.div`
  display:flex;
  flex-direction: column;
  width: 31%;
  align-items: flex-end;
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
  margin-top: 50px;
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

const FollowButton = styled.button`
  margin-top: 70px;
  height: 31px;
  width: 112px;
  border:none;
  border-radius: 5px;
  background-color: #1877F2;
  color:#FFFFFF;
`;