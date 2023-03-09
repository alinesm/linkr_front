import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { BsSearch } from 'react-icons/bs'
import { Link } from "react-router-dom"
import { DebounceInput } from 'react-debounce-input';

export default function SearchBar({ setReload }) {
    const [usersName, setUsersName] = useState([])
    const [filteredUsers, setFilteresUsers] = useState([])
    const [input, setInput] = useState("")
    useEffect((() => {
        axios.get(`${process.env.REACT_APP_API_URL}users`)
            .then(res => {
                console.log(res.data)
                setUsersName(res.data)
            }

            )

    }), [])

    function handleFilter(e) {
        setInput(e.target.value)
        const letters = (e.target.value).toLowerCase()
        const filteredUsers = usersName.filter((user) => {
            return (user.user_name).toLowerCase().includes(letters)
        })
        if (letters === "") {
            setFilteresUsers([])
        } else {

            setFilteresUsers(filteredUsers)

        }
    }

    return (
        <div>
            <Search>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    placeholder="Search for people"
                    onChange={handleFilter}
                    value={input} />
                <p><BsSearch /></p>
            </Search>

            {filteredUsers.length > 0 &&
                <UsersBox>
                    {
                        filteredUsers.map((user) =>
                            <StyledLink to={`/users/${user.id}`}>
                                <div onClick={() => {
                                    setReload([])
                                    setFilteresUsers([])
                                    setInput("")
                                }} >
                                    <img src={user.image_url} alt='user' />
                                    <p>{user.user_name}</p>
                                </div>
                            </StyledLink>
                        )
                    }

                </UsersBox>
            }
        </div>
    )
}

const StyledLink = styled(Link)`
    justify-content: left!important;
    width: 100%;

`


const Search = styled.div`
    display: flex;
    position: relative;
    width: 563px;
        input {
            width: 100%;
            height: 45px;
            border-radius: 8px;
            border-style: none;
            padding: 5px;
            &::placeholder {
                color: #C6C6C6;
            }
            &:focus-visible {
                outline: none;
            }
           
        }
        p {
            position: absolute;
            right: 10px;
            top: 13px;
            color: #C6C6C6;
        }

`

const UsersBox = styled.div`
    width: 563px;
    margin-top: -10px;
    padding-top: 15px;
    border-radius: 5px; 
    background-color: #E7E7E7;
    box-shadow: rgba(0,0,0,0.34) 0 5px 15px;
    position: absolute;
    height: 200px;
    bottom: -185px;
    flex-direction: column;
    overflow-x: scroll;
    z-index: 1;
  
   
   
        div {
            padding-top: 10px;
            padding-bottom: 10px;
            width: 100%;
            display: flex;
            gap: 15px;           
            height: 70px;     
            padding-left: 30px;
            cursor: pointer;
                &:hover {
                    background-color: white;
                }
        }
          
`