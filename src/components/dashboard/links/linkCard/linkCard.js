import React, { Component } from 'react'
import {
  Card,
  Button,
  IconButton,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Popper,
  Grow,
  MenuItem,
  Menu,
  Grid,
  Typography
} from '@mui/material'
import { MoreVertical as MoreVertIcon } from 'react-feather'
import QRCode from 'qrcode.react'
import ExcelBulkDialog from '../linkList/common/excelBulkDialog/index'

class LinkCard extends Component {
  constructor(props) {
    super(props)
    this.linkInputRef = React.createRef()
    this.dynamicLinkInputRef = React.createRef()
    this.copyToClipBoard = this.copyToClipBoard.bind(this)
    this.getQR = this.getQR.bind(this)
    this.openContextMenu = this.openContextMenu.bind(this)
    this.closeContextMenu = this.closeContextMenu.bind(this)
    this.linkUrl = (process.env.REACT_APP_SURVEYS_URL || '/') + this.props.link.shortUrl
    this.state = {
      anchorEl: null,
      contextMenuOpen: false,
      contextMenuAnchorEl: null,
      dynamicLinkModalOpen: false,
      dynamicUrl: `${this.linkUrl}?cfunq=`,
      excelModalOpen: false
    }
    this.open = Boolean(this.state.anchorEl)
  }

  closeContextMenu() {
    this.setState({
      contextMenuOpen: false,
      contextMenuAnchorEl: null
    })
  }

  openContextMenu(event) {
    this.setState({
      contextMenuOpen: true,
      contextMenuAnchorEl: event.currentTarget
    })
  }

  render() {
    let { survey, evaluationGroup } = this.props.link
    const { contact, traceability, rating } = survey
    const canCreateDynamicLink =
      (contact?.enabled && contact?.questionList.length) ||
      (traceability?.enabled && traceability?.questionList.length) ||
      (contact?.enabled && contact?.contactFields?.length) ||
      (rating?.enabled && rating?.dynamicProducts)
    let excelTemplateName = survey.name + '_' + evaluationGroup.name + '_TMPL.xlsx'

    return (
      <React.Fragment>
        <Card variant="outlined">
          <CardHeader
            disableTypography
            title={
              <Typography variant="body1" title="Encuesta">
                {survey.name}
              </Typography>
            }
            subheader={
              <Typography title="Punto de evaluación" variant="body2">
                {evaluationGroup.name}
              </Typography>
            }
            action={
              <>
                <IconButton size="small" aria-label="more" onClick={this.openContextMenu}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={this.state.contextMenuAnchorEl}
                  keepMounted
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={this.state.contextMenuOpen}
                  onClose={this.closeContextMenu}
                  PaperProps={{ style: { minWidth: 150 } }}
                  MenuListProps={{ style: { padding: 0 } }}
                >
                  <MenuItem onClick={() => window.open(this.linkUrl, '_blank')}>
                    Abrir en nueva pestaña
                  </MenuItem>
                  <MenuItem
                    disabled={!canCreateDynamicLink}
                    onClick={() => this.props.handleOpenDynamicLinkDialog(this.props.link)}
                  >
                    Link Trazable
                  </MenuItem>
                  <MenuItem
                    disabled={!this.props.mailingAvailable}
                    onClick={() => this.setState({ excelModalOpen: true })}
                  >
                    Email Masivo
                  </MenuItem>
                  <MenuItem onClick={this.props.handleEditSurvey}>Editar Encuesta</MenuItem>
                  <MenuItem onClick={this.props.handleEditGroup}>
                    Editar Punto de Evaluación
                  </MenuItem>
                </Menu>
              </>
            }
          />
          <CardContent sx={{ padding: '0 15px' }}>
            <Popper
              open={Boolean(this.state.anchorEl)}
              anchorEl={this.state.anchorEl}
              transition
              placement="top"
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps} timeout={150}>
                  <Box className="tooltip-popup">
                    <Typography variant="body2" color="inherit">
                      Link copiado
                    </Typography>
                  </Box>
                </Grow>
              )}
            </Popper>
            <Grid container style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Grid item>
                <Typography
                  variant="body2"
                  component="span"
                  ref={this.linkInputRef}
                  sx={{ backgroundColor: 'secondary.main' }}
                  className="select-all survey-link"
                >
                  {this.linkUrl}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className="card-actions">
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={e => this.copyToClipBoard(e, this.linkInputRef)}
            >
              Copiar link
            </Button>
            <Button size="small" color="primary" onClick={this.getQR}>
              Generar QR
            </Button>
            <Box display="none">
              <QRCode
                id={'qr_' + this.props.link.id}
                value={`${this.linkUrl}?via=CR0C3`}
                size={1500}
              />
            </Box>
          </CardActions>
        </Card>
        {this.state.excelModalOpen && (
          <ExcelBulkDialog
            open={this.state.excelModalOpen}
            onBackdropClick={() => this.setState({ excelModalOpen: false })}
            surveySlug={this.props.link.shortUrl}
            contact={survey.contact}
            templateName={excelTemplateName}
          />
        )}
      </React.Fragment>
    )
  }

  copyToClipBoard(e, ref) {
    var el = document.createElement('textarea')
    el.value = ref.current.innerHTML
    el.setAttribute('readonly', '')
    el.style = { position: 'absolute', left: '-9999px' }
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    this.setState(
      {
        anchorEl: e.currentTarget
      },
      () => {
        setTimeout(() => {
          this.setState({
            anchorEl: null
          })
        }, 2000)
      }
    )
  }

  getQR() {
    const canvas = document.getElementById('qr_' + this.props.link.id)
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `qr_${this.props.link.evaluationGroup.name}_${this.props.link.survey.name}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}

export default LinkCard
