import styled from "styled-components";

import UserPost from "./UserPosts";

export default function UserPostList({reload ,setReload}) {
    return (
        <PostListContainer>
            <UserPost reload={reload} setReload={setReload} />
       </PostListContainer>
    );
}

const PostListContainer = styled.div`
    height: 100%;
    background-color: #333333;
`