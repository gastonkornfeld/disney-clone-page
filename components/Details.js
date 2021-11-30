
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import db from '../firebase'
import { selectMovies } from '../features/movie/movieSlice'
import { useSelector } from 'react-redux'



function Details() {
   
    const { id } = useParams();

    // set the background image
    const [ movie, setMovie ] = useState()

    useEffect(() =>{
        // grab the movie info from the database
        db.collection("movies")
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exists){
                // save the movie data
                setMovie(doc.data());
                
            } else {
                //redirect to homepage
                

            }
        })
    }, [])


    
    

    return (
        <Container>
            {movie && (
            <>
                <Background>
                <img src={movie.backgroundImg} alt = "hola" />
                </Background>
                <ImageTitle>
                    <img src={movie.titleImg} />
                </ImageTitle>
                <Controls>
                    <PlayButton>
                        <a href={movie.movie} target="_blank">
                            <img src = "/images/play-icon-black.png" />
                            <span>PLAY</span>
                        </a>

                    </PlayButton>
                    <TrailerButton>
                        <a href={movie.youtube} target="_blank">
                            <img src = "/images/play-icon-white.png" />
                            <span>TRAILER</span>
                        </a>

                    </TrailerButton>
                    <AddButton>
                        <span>+</span>
                    </AddButton>
                    <GroupButton>
                        <img src='/images/group-icon.png' />
                    </GroupButton>
                </Controls>
                <Subtitle>
                    {movie.subTitle}
                </Subtitle>
                <Description>
                    {movie.description}
                </Description>
            </>
            )}
            
        </Container>

    )
}

export default Details


const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
`

const Background = styled.div`
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    opacity: 0.6;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const ImageTitle = styled.div`
    height: 30vh;
    width: 35vw;
    min-height: 170px;
    min-widht: 200px;
    margin-bottom: 20px;
    margin-top: 60px;

    

    img {
        width:100%;
        height: 100%;
        object-fit: contain;
            
    }
`

const Controls = styled.div`
    display: flex;
    align-items: center;
`
const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    display: flex;
    align-items: center;
    height: 56px;
    background: rgb(249, 249, 249);
    border: none;
    padding: 0 24px;
    margin-right: 22px;
    letter-spacing: 1.8px;
    cursor: pointer;

    a {
        color: black;
    }

    &:hover {
        background: rgb(198, 198, 198);
    }

`

const TrailerButton = styled(PlayButton)`
   
    background: rgba(0, 0, 0, 0.3);
    color: rgb(249, 249, 249);
    border: 1px solid rgb(249, 249, 249); 
    text-decoration: none;

    a {
        text-decoration: none;
        color: white;
    }


    
`

const AddButton = styled.button`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: white;
    background-color: rgba(0, 0, 0, 0.6);
    margin-right: 16px; 

    span {
        font-size: 30px;
        color: white;
        cursor: pointer;

    }
`
const GroupButton = styled(AddButton)`
    background: rgb(0, 0, 0);
    cursor: pointer;
`


const Subtitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 760px;
`

