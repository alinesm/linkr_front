import styled from "styled-components"

export default function TrendCard() {
    return (
        <TrendCardContainer>
            <TitleDiv>
                <h2>trending</h2>
            </TitleDiv>
            <TrendListDiv>
                <p>#trendexample</p>
                <p>#trendexample</p>
                <p>#trendexample</p>
                <p>#trendexample</p>
                <p>#trendexample</p>
            </TrendListDiv>
        </TrendCardContainer>
    );
}

const TrendListDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 15px;
    
    p{
        display:block;
        font-family: Lato;
        font-size: 19px;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
        text-align: left;
        margin: 5px;
        
    }`
const TrendCardContainer = styled.div`
    margin-top: 30px;
    width: 31%;
    height: 278px;
    background-color: black;
    border-radius: 16px;
    margin-top: 150px;
`
const TitleDiv = styled.div`
    height: 50px;
    border-bottom: 1px solid #333333;
    display: flex;
    align-items: center;
    h2{
        color: #FFF;
        font-family: Oswald;
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
        text-align: left;
        margin-left: 15px;
    }
`