import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import styled from 'styled-components'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { AuthContext } from '../providers/auth';



export default function LikeButton({ postId, setPostHashtags }) {


    const { user } = useContext(AuthContext)

    const [postLikes, setPostLikes] = useState([])
    const [users, setUsers] = useState([])
    const [liked, setLiked] = useState(false)
    const [reload, setReload] = useState([])



    const userName = user.user.user_name

    const userId = user.user.id

    useEffect(() => {
        getPostLikes()
    }, [reload]) 


    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
   
    function likePost(liked) {
        if (liked === 'liked') {
            setLiked(false)
        }
        axios.post(`${process.env.REACT_APP_API_URL}/like/${postId}`, { userId }, config)
            .then(() => setReload([]))
    }

    function getPostLikes() {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}`)
            .then((res) => {
                const posts = res.data

               

               
                setPostLikes(posts)
                getUsersThatLikedPost(posts)

            })
    }

    function getUsersThatLikedPost(posts) {

        const usersLikes = posts.map((item) => item.user_name)
        const checkIfLiked = usersLikes.map((user, i) => {
            if (user === userName) {
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
        if (checkIfLiked.length > 0) {
            if(checkIfLiked.length === 1) {
                text = `${checkIfLiked} deu like`
            }
           
            if (checkIfLiked.length >=2) {
                const firstTwoUsers = checkIfLiked.slice(0, 2).join(', ')
                const getRemainingUsers = checkIfLiked.length - 2
               
                if(checkIfLiked.length === 2) {
                    text = `${firstTwoUsers}`
                }
                if (checkIfLiked.length === 3) {
                    text = `${firstTwoUsers} e outra ${getRemainingUsers} pessoa deu like`
                } else {
                    if( getRemainingUsers == 0) {
                        text = `${firstTwoUsers}  deram like`
                    } else {

                        text = `${firstTwoUsers} e outras ${getRemainingUsers} pessoas deram like`
                    }
                }
            }

        } else {
            text = 'Ninguém deu like'
        }

        setUsers(text)
    }

    


    return (
        <>  
            {
                <Tooltip content={users} placement='bottom' data-test="tooltip">
                    <Likes>
                        {liked ? <AiFillHeart color='red' data-test="like-btn" size={'25px'} onClick={() => likePost('liked')} cursor={'pointer'} /> : <AiOutlineHeart data-test="like-btn" size={'25px'}  onClick={() => likePost('notLiked')} cursor={'pointer'} />
                        }
                        <p data-test="counter" >{postLikes.length } likes</p>
                        
                    </Likes>

                </Tooltip >
            }
        </>


    )
}

const Likes = styled.div`
   width: inherit;
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   margin-top: 10px;
   gap: 5px;
   width: 50px;
    p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        cursor: pointer;

        }
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
        color: rgba(255, 255, 255, 0.9);
    }

`

