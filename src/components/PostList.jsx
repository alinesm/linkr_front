import styled from "styled-components";
import NewPost from "./NewPost";
import UserPost2 from "./UserPosts2";

export default function PostList() {
    return (
        <PostListContainer>
            <NewPost />
            <UserPost2 />
        </PostListContainer>
    );
}

const PostListContainer = styled.div`
    height: 100%;
    background-color: #333333;
`