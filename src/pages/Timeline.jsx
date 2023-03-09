import styled from "styled-components"
import TrendCard from "../components/TrendCard"
import PostList from "../components/PostList"

export default function Timeline(){
    return (
        <TimelineContainer>
            <TimelineContent>
                <PostList />
                <TrendCard />
            </TimelineContent> 
        </TimelineContainer>
    )
}

const TimelineContainer = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
    background-color: #333333;
    overflow: scroll;
`
const TimelineContent = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
    height:100vh;
    color:#FFF;
`