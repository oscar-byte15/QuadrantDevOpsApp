import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList
} from '@mui/material'

import { toJpeg } from 'html-to-image'
import { Download, MoreVert } from '@mui/icons-material'

const CustomCard = props => {
  const { children, gridProps = {}, outlined, headerProps = {}, contentProps = {} } = props

  const [anchor, setAnchor] = useState(null)
  const openMenu = event => {
    setAnchor(event.currentTarget)
  }

  const createImg = () => {
    const node = document.getElementById(`custom-card-${titleid}`)

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
      link.download = `CSAT Mensual - ${headerProps.title} - ${Date.now()}`
      link.href = dataUrl
      link.click()
      link.remove()
    })
  }

  const titleid = headerProps.title.replace(/\s/g, '')

  if (outlined)
    return (
      <Grid item {...gridProps}>
        <Card
          variant={'outlined'}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          id={`custom-card-${titleid}`}
        >
          {headerProps.title && (
            <CardHeader
              {...headerProps}
              action={
                <>
                  <IconButton size="small" onClick={openMenu}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    onClose={() => setAnchor(null)}
                    keepMounted
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{ style: { minWidth: 150 } }}
                    MenuListProps={{ style: { padding: 0 } }}
                  >
                    <MenuList>
                      <MenuItem onClick={createImg}>
                        <ListItemIcon>
                          <Download />
                        </ListItemIcon>
                        <ListItemText>Exportar jpeg</ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              }
            />
          )}
          <CardContent {...contentProps} style={{ flexGrow: '2' }}>
            {children}
          </CardContent>
        </Card>
      </Grid>
    )
  else
    return (
      <Grid item {...gridProps}>
        {headerProps.title && <CardHeader {...headerProps} />}
        <CardContent {...contentProps}>{children}</CardContent>
      </Grid>
    )
}
export default CustomCard
