import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import styled from 'styled-components'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional


export default function LikeButton() {
    const [postLikes, setPostLikes] = useState([])
    const [users, setUsers] = useState([])
    const [liked, setLiked] = useState(false)

    const Postid = 3 // pegar depois na página dos posts o post id

    const userToken = 'danniel4' // trocar depois para o que vier do login

    useEffect(() => {
        getPostLikes()


    }, [])

    function getPostLikes() {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${Postid}`)
            .then((res) => {
                const posts = res.data
                setPostLikes(posts)
                getUsersThatLikedPost(posts)
                console.log(res.data)
            })
    }

    function getUsersThatLikedPost(posts) {

        const usersLikes = posts.map((item) => item.user_name)
        const checkIfLiked = usersLikes.map((user, i) => {
            if (user === userToken) {
                setLiked(true)
                return "Você"
            } else {
                return user
            }
        })
        if (checkIfLiked.includes('Você')) {
            const index = checkIfLiked.indexOf('Você')
            const temp = checkIfLiked[0]
            checkIfLiked[0] = checkIfLiked[index]
            checkIfLiked[index] = temp
        }
        let text = ''
        if (checkIfLiked.length >= 2) {
            const firstTwoUsers = checkIfLiked.slice(0, 2).join(', ')
            const getRemainingUsers = checkIfLiked.length - 2
            if (checkIfLiked.length === 2) {
                text = `${firstTwoUsers} deram like`
            } else if (checkIfLiked.length === 3) {
                text = `${firstTwoUsers} e outra ${getRemainingUsers} pessoa deu like`
            } else {
                text = `${firstTwoUsers} e outras ${getRemainingUsers} pessoas deram like`
            }

        }
        console.log(text)
        setUsers(text)
    }


    return (
        <>
            {users.length > 0 &&
                <Tooltip content={users} placement='bottom'>
                    <Likes>
                        {liked ? <AiFillHeart/>   : <AiOutlineHeart />
                        }
                          {postLikes.length} likes
                    </Likes>

                </Tooltip>
            }
        </>


    )
}

const Likes = styled.div`
    color: red,

`

const Tooltip = styled(Tippy)`
    background: rgba(255, 255, 255, 0.9);
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    color:#505050;
    border-radius: 3px;
    .tippy-arrow {
        color: rgba(255, 255, 255, 0.9)
    }

`

