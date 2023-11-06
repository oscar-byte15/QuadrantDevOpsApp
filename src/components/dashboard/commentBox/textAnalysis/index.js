import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Stack,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Switch,
  FormControlLabel
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentBoxAnalysis } from 'services/web_services/commentBox'
import '../commentbox.css'
import commentBoxConstants from 'constants/commentBox'

import Tippy from '@tippyjs/react'

import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import { TagCloud } from 'react-tagcloud'

import Indicators from '../util/indicators'
import Summary from './summary'
import { cleanFilterVisibility, filterInTextAnalysis } from 'redux/actions/filter/actionDispatcher'
import { Download, MoreVert } from '@mui/icons-material'

import { toJpeg } from 'html-to-image'
import BodyCard from 'components/common/bodyCard'
import WordTreemap from 'components/charts/wordTreemap'

const options = {
  fontFamily: 'roboto',
  fontSizes: [30, 80],
  rotations: 2,
  rotationAngles: [0, 90],
  deterministic: true,
  padding: 2,
  enableOptimizations: true,
  scale: 'log',
  spiral: 'rectangular',
  transitionDuration: 200,
  enableTooltip: true
}

const callbacks = {
  getWordColor: word => commentBoxConstants[word.type]?.color || '#6b6b6b'
}

const CommentBox = () => {
  const [words, setWords] = useState([])
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const [anchor, setAnchor] = useState(null)
  const openMenu = event => {
    setAnchor(event.currentTarget)
  }

  const createImg = () => {
    const node = document.getElementById(`word-cloud`)

    const filter = node => {
      if (node.classList === undefined) {
        return true
      } else {
        if (node.classList.contains('no-img-export') === true) {
          return false
        } else {
          return true
        }
      }
    }

    toJpeg(node, {
      filter: filter
    }).then(dataUrl => {
      const link = document.createElement('a')
      link.download = `Wordcloud - ${Date.now()} `
      link.href = dataUrl
      link.click()
      link.remove()
    })
  }

  const newRes = []
  const [treemapData, setTreemapData] = useState({
    data: [
      { name: 'Felicitación', data: [] },
      { name: 'Sugerencia', data: [] },
      { name: 'Reclamo', data: [] },
      { name: 'General', data: [] }
    ],
    loading: false
  })

  useEffect(() => {
    setTreemapData({
      data: [
        { name: 'Felicitación', data: [{ x: '', y: 0 }] },
        { name: 'Sugerencia', data: [{ x: '', y: 0 }] },
        { name: 'Reclamo', data: [{ x: '', y: 0 }] },
        { name: 'General', data: [{ x: '', y: 0 }] }
      ],
      loading: true
    })

    getCommentBoxAnalysis({
      startDate: filter.startDate,
      endDate: filter.endDate,
      evaluationGroups: filter.selectedGroups,
      surveys: filter.selectedSurveys
    })
      .then(res => {
        if (res.data.length === 0) {
          setTreemapData(prevState => ({
            ...prevState,
            loading: false
          }))
        }
        res.data.map((word, index) => {
          if (word.type === 'Felicitación') {
            setTreemapData(prevState => ({
              ...prevState,
              data: [
                {
                  ...prevState.data[0],
                  name: 'Felicitaciones',
                  data: [...prevState.data[0].data, { x: word.text, y: word.value }]
                },
                {
                  ...prevState.data[1]
                },
                {
                  ...prevState.data[2]
                },
                {
                  ...prevState.data[3]
                }
              ]
            }))
          }
          if (word.type === 'Sugerencia') {
            setTreemapData(prevState => ({
              ...prevState,
              data: [
                {
                  ...prevState.data[0]
                },
                {
                  ...prevState.data[1],
                  name: 'Sugerencias',
                  data: [...prevState.data[1].data, { x: word.text, y: word.value }]
                },
                {
                  ...prevState.data[2]
                },
                {
                  ...prevState.data[3]
                }
              ]
            }))
          }
          if (word.type === 'Reclamo') {
            setTreemapData(prevState => ({
              ...prevState,
              data: [
                {
                  ...prevState.data[0]
                },
                {
                  ...prevState.data[1]
                },
                {
                  ...prevState.data[2],
                  name: 'Reclamos',
                  data: [...prevState.data[2].data, { x: word.text, y: word.value }]
                },
                {
                  ...prevState.data[3]
                }
              ]
            }))
          }
          if (word.type === 'General') {
            setTreemapData(prevState => ({
              ...prevState,
              data: [
                {
                  ...prevState.data[0]
                },
                {
                  ...prevState.data[1]
                },
                {
                  ...prevState.data[2]
                },
                {
                  ...prevState.data[3],
                  name: 'General',
                  data: [...prevState.data[3].data, { x: word.text, y: word.value }]
                }
              ]
            }))
          }
          if (res.data.length === 0 || res.data.length === index + 1) {
            setTreemapData(prevState => ({
              ...prevState,
              loading: false,
              show: false
            }))
          }

          newRes.push({ id: index, value: word.text, count: word.value, type: word.type })
        })
        return newRes
      })
      .then(newRes => {
        setWords(newRes)
      })

    dispatch(filterInTextAnalysis())
    return () => dispatch(cleanFilterVisibility())
    //eslint-disable-next-line
  }, [filter.startDate, filter.endDate, filter.selectedGroups, filter.selectedSurveys])

  const renderer = (tag, size) => {
    const color = commentBox => {
      switch (commentBox) {
        case 'Felicitación':
          return '#47bb5c'
        case 'Sugerencia':
          return '#ffc814'

        case 'Reclamo':
          return '#ff7750'
        default:
          return '#6b6b6b'
      }
    }

    return (
      <Tippy
        key={tag.id + tag.type}
        allowHTML={true}
        content={
          <>
            <Typography sx={{ textTransform: 'uppercase' }}>
              <strong>{tag.value}</strong>
            </Typography>
            <Typography variant="caption">
              Repetido <strong>{tag.count}</strong> veces
            </Typography>
          </>
        }
        placement="top"
        animation="shift-toward-subtle"
      >
        <Typography
          display={'inline-block'}
          component={'span'}
          sx={{
            fontSize: `${size / 2}rem`,
            margin: '0 2px',
            padding: '0 2px',
            color: () => color(tag.type),
            lineHeight: '0.9',
            userSelect: 'none',
            cursor: 'default'
          }}
        >
          {tag.value}
        </Typography>
      </Tippy>
    )
  }

  const [disabled, setDisabled] = useState(true)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (words.length > 0) {
      setDisabled(false)
    }
  }, [words])

  return (
    <BodyCard>
      <CardHeader title="Análisis de texto" subheader="Con las 50 palabras más frecuentes" />
      <CardContent>
        <Stack spacing={3}>
          <Card variant="outlined" id="word-cloud">
            <CardHeader
              title="Frecuencia de palabras"
              action={
                <>
                  <IconButton onClick={openMenu}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    elevation={0}
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    onClose={() => setAnchor(null)}
                    keepMounted
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    slotProps={{
                      paper: { sx: { minWidth: 150 }, variant: 'outlined' }
                    }}
                    MenuListProps={{ style: { padding: 0 } }}
                  >
                    <MenuList disablePadding>
                      <MenuItem onClick={createImg}>
                        <ListItemIcon>
                          <Download />
                        </ListItemIcon>
                        <ListItemText>Exportar JPEG</ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              }
            />
            <CardContent>
              <Stack alignItems="stretch" spacing={3}>
                <Card>
                  <CardContent>
                    <Stack direction={'row'} justifyContent={'flex-end'} sx={{ width: '100%' }}>
                      <FormControlLabel
                        labelPlacement="start"
                        control={
                          <Switch
                            size="small"
                            checked={checked}
                            disabled={disabled}
                            onClick={() => {
                              checked === false ? setChecked(true) : setChecked(false)
                            }}
                          />
                        }
                        label="Nube de palabras"
                      />
                    </Stack>
                    {checked ? (
                      <>
                        <TagCloud
                          disableRandomColor={true}
                          tags={words}
                          minSize={2.5}
                          maxSize={20}
                          renderer={renderer}
                          style={{ height: '100%', textAlign: 'center' }}
                        />
                        <Indicators />
                      </>
                    ) : (
                      <WordTreemap data={treemapData} />
                    )}
                  </CardContent>
                </Card>
              </Stack>
            </CardContent>
          </Card>
          <Summary words={words} loading={treemapData.loading} />
        </Stack>
      </CardContent>
    </BodyCard>
  )
}

export default CommentBox
