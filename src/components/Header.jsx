import styled from "styled-components"
import { SlArrowUp } from 'react-icons/sl'
import { useContext, useState } from "react"
import { AuthContext } from "../providers/auth"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom"

export default function Header({setReload}) {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const { user } = useContext(AuthContext)
    console.log(user)
    function logout() {
        localStorage.removeItem('userSessionInfoLinkr')
        navigate('/')
    }
    return (
        <HeaderStyle>
            <h1>linkr</h1>
                <SearchBar setReload={setReload}/>
            <div>
                <SlArrowUp onClick={() => setMenu(!menu)} color="white" size={'25'} cursor="pointer" />
                <LogOut onClick={() => logout()} open={menu} data-test="menu">
                    <p data-test="logout">Logout</p>
                </LogOut>
                <img src={user.user.image_url} onClick={() => setMenu(!menu)} data-test="avatar" />
            </div>
        </HeaderStyle>
    )
}


const HeaderStyle = styled.div`
    width: 100vw;
    background-color: #151515;
    position: absolute;
    top: 0;
    left: 0;
    height:72px;
    padding-left: 10px;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
   
        h1 {
            font-family: 'Passion One';
            font-style: normal;
            font-weight: 700;
            font-size: 49px;
            color: #FFFFFF;
           

        }
        div {
            display: flex;          
            align-items: center;
            gap: 10px;
            
        }
        img {
            cursor:pointer;
            width: 53px;
            height: 53px;
            border-radius: 26.5px
        }

`

const LogOut = styled.div`
    width: 150px;
    height: 47px;
    background-color: #151515;
    border-radius: 0px 0px 0px 20px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    position: absolute;
    bottom: -45px;
    cursor: pointer;
    color: #FFFFFF;
    right: 0;
    padding-left: 40px;
    display: ${props => !props.open ? 'none!important' : 'block'}
`

