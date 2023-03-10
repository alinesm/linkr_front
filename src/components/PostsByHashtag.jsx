import { useState } from "react";
import styled from "styled-components";
import FilteredPostsByHashtag from "./FilteredPostsByHashtag";
import Header from "./Header";
import TrendCard from "./TrendCard";

export default function Timeline() {
  const [reload, setReload] = useState([]);
  return (
    <>
      <Header setReload={setReload} />
      <TimelineContainer>
        <TimelineContent>
          <PostListContainer>
            <FilteredPostsByHashtag />
          </PostListContainer>
          <TrendCard />
        </TimelineContent>
      </TimelineContainer>
    </>
  );
}

const TimelineContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #333333;
  overflow-y: scroll;
  margin-top: 55px;
`;
const TimelineContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  color: #fff;
`;
const PostListContainer = styled.div`
  height: 100%;
  background-color: #333333;
`;
