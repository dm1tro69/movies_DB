import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({show: false, msg: ''})

  const fetchMovie = async (url) => {
      const response = await fetch(url)
      const data = await response.json()
      if(data.Response === 'False'){
        setError({error: true, msg: data.Error})
        setIsLoading(false)
      }else {
        setMovie(data)
        setIsLoading(false)

      }

  }

  useEffect(()=> {
    fetchMovie(`${API_ENDPOINT}&i=${id}`)

  }, [id])
  if (isLoading){
    return <div className={'isLoading'}></div>
  }
  if (error.show){
    return <div className={'page-error'}>
      <h1>{error.msg}</h1>
      <Link className={'btn'} to={'/'}>back to movies</Link>
    </div>
  }
  const {Poster: poster, Title: title, Plot: plot, Year: year} = movie

  return <section className={'single-movie'}>
    <img src={poster} alt="img"/>
    <div className={'single-movie-info'}>
      <h2>{title}</h2>
      <p>{plot}</p>
      <h4>{year}</h4>
      <Link className={'btn'} to={'/'}>back to movies</Link>
    </div>
  </section>
}

export default SingleMovie
