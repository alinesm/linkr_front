import { useState } from "react";
import styled from "styled-components";
import UserPost2 from "./UserPosts2";

export default function PostList() {
  
    return (
        <PostListContainer>
            <UserPost2 />
        </PostListContainer>
    );
}

const PostListContainer = styled.div`
    height: 100%;
    background-color: #333333;
`