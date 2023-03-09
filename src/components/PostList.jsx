import styled from "styled-components";
import Post from "./Post";

export default function PostList() {
    return (
        <PostListContainer>
            <Post />
            <Post />
            <Post />
        </PostListContainer>
    );
}

const PostListContainer = styled.div`
    height: 100%;
    background-color: #333333;
`