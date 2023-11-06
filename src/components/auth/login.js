import React, { useEffect, useState } from 'react'
import LoginForm from './loginForm'
import { Typography, Box } from '@mui/material'
import './login.css'
import axios from 'axios'
import { ReactComponent as Quadrant } from '../../assets/images/quadrant/quadrant-logo-white-no-bottom-text.svg'
import QuadrantLogo from '../../assets/images/quadrant/quadrantLogo'
import { Blurhash } from 'react-blurhash'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/black-and-white.css'

const unsplash = 'https://api.unsplash.com'
const client_id = 'SAW_eRcw0qnCPr2ZbeW4W8vvcBSWP_SKKs5kI46wkC4'
const attributes = '&collections=10857209'

function getImageData(onImageLoad) {
  axios.get(`${unsplash}/photos/random/?client_id=${client_id}${attributes}`).then(res => {
    let data = res
    onImageLoad(
      data.urls.full,
      data.blur_hash,
      data.user.name,
      data.description,
      data.user.links.html
    )
  })
}

const Login = props => {
  const [data, setData] = useState({
    url: '',
    blurHash: 'L1TSUA?bfQ?b~qj[fQj[fQfQfQfQ',
    artist: '...',
    description: '',
    artistLink: ''
  })

  useEffect(() => {
    getImageData((url, blurHash, name, description, artistLink) => {
      setData({
        url: url,
        blurHash: blurHash,
        artist: name,
        description: description,
        artistLink: artistLink
      })
    })
  }, [])

  const [isLoaded, setLoaded] = useState(false)
  const [isLoadStarted, setLoadStarted] = useState(false)

  const handleLoadStarted = () => {
    setLoadStarted(true)
  }
  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <div
      style={{
        // backgroundColor: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 80%)',
        backgroundColor: '#2d2d2d',
        height: '100svh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative'
      }}
      id="my-element"
    >
      {data.blurHash == 'L1TSUA?bfQ?b~qj[fQj[fQfQfQfQ' ? (
        ''
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              inset: '0',
              zIndex: '20',
              transition: 'opacity 0.2s linear',
              opacity: !isLoaded && isLoadStarted ? '1' : '0'
            }}
          >
            <Blurhash
              hash={data.blurHash}
              width="100%"
              height="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </div>
          <LazyLoadImage
            src={data.url}
            height="100%"
            width="100%"
            className="zooming"
            style={{
              objectFit: 'cover',
              aspectRatio: 'auto',
              backgroundAttachment: 'scroll',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onLoad={handleLoad}
            beforeLoad={handleLoadStarted}
          />
        </>
      )}

      <Box
        sx={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          width: { xs: '236px', sm: '250px' },
          zIndex: '21'
        }}
      >
        <QuadrantLogo color="#ffffff" />
      </Box>
      <LoginForm />
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: '21'
        }}
      >
        <Typography variant="subtitle1" component="span" className="credits">
          Fotografía por{' '}
          <a
            href={`${data.artistLink}?utm_source=Quadrant_CX_Navigation&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.artist}
          </a>{' '}
          en{' '}
          <a
            href="https://unsplash.com/?utm_source=Quadrant_CX_Navigation&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </Typography>
      </Box>
    </div>
  )
}

export default Login
