import styled from "styled-components"
import TrendCard from "../components/TrendCard"
import UserPostList from "../components/UserPostList"
import Header from "../components/Header"

export default function Timeline() {
    return (
        <>
            <Header />
            <TimelineContainer>
                <TimelineContent>
                    <UserPostList />
                    <TrendCard />
                </TimelineContent>
            </TimelineContainer>
        </>
    )
}

const TimelineContainer = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
    background-color: #333333;
    overflow-y: scroll;
    margin-top: 55px;
`
const TimelineContent = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
    height:100vh;
    color:#FFF;
`