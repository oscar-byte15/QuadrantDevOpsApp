import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import DynamicLinkDialog from './dynamicLinkDialog'
import ExcelBulkDialog from './excelBulkDialog'

const Actions = props => {
  const history = useHistory()
  let link = props.link
  let mailing = props.mailing
  let uniqueLinks = props.uniqueLinks

  let excelTemplateName = link.survey.name + '_' + link.evaluationGroup.name + '_TMPL.xlsx'

  const canCreateDynamicLink =
    (link?.survey.contact?.enabled && link?.survey.contact?.questionList.length) ||
    (link?.survey.traceability?.enabled && link?.survey.traceability?.questionList.length) ||
    (link?.survey.contact?.enabled && link?.survey.contact?.contactFields?.length) ||
    (link?.survey.rating?.enabled && link?.survey.rating?.dynamicProducts)

  const [open, setOpen] = useState({ anchor: null, state: false })
  const openMenu = event => {
    setOpen({ anchor: event.currentTarget, state: true })
  }
  const closeMenu = () => {
    setOpen({ anchor: null, state: false })
  }

  function goToEditSurvey(id) {
    history.push(`/quadrant/surveys/edit/${id}`)
  }

  function goToEditPoint(id) {
    history.push(`/quadrant/groups/edit/${id}`)
  }

  //////

  const [traceableLinkDialog, setTraceableLinkDialog] = useState(false)
  const [bulkMailingDialog, setBulkMailingDialog] = useState(false)
  const [selectedLink, setSelectedLink] = useState(null)

  const openTraceableLinkDialog = link => {
    setSelectedLink(link)
    setTraceableLinkDialog(true)
  }

  const closeTraceableLinkDialog = () => {
    setTraceableLinkDialog(false)
    setSelectedLink(null)
  }

  const openBulkMailingDialog = () => {
    setBulkMailingDialog(true)
  }

  const closeBulkMailingDialog = () => {
    setBulkMailingDialog(false)
  }

  return (
    <>
      <IconButton size="small" aria-label="more" onClick={openMenu}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={open.anchor}
        open={open.state}
        onClose={closeMenu}
        // keepMounted
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        // transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ style: { minWidth: 150 } }}
        MenuListProps={{ style: { padding: 0 } }}
      >
        <MenuItem onClick={() => window.open(link.linkUrl, '_blank')}>
          Abrir en nueva pestaña
        </MenuItem>
        <MenuItem disabled={!canCreateDynamicLink} onClick={() => openTraceableLinkDialog(link)}>
          Link Trazable
        </MenuItem>
        <MenuItem disabled={!mailing} onClick={() => openBulkMailingDialog()}>
          Email Masivo
        </MenuItem>
        <MenuItem onClick={() => goToEditSurvey(link.survey.id)}>Editar Encuesta</MenuItem>
        <MenuItem onClick={() => goToEditPoint(link.evaluationGroup.id)}>
          Editar Punto de Evaluación
        </MenuItem>
      </Menu>

      <DynamicLinkDialog
        canCreateUniqueLinks={uniqueLinks}
        open={traceableLinkDialog}
        link={selectedLink}
        onClose={closeTraceableLinkDialog}
      />

      <ExcelBulkDialog
        open={bulkMailingDialog}
        handleCloseDialog={closeBulkMailingDialog}
        contact={link.survey.contact}
        templateName={excelTemplateName}
        surveySlug={link.shortUrl}
        onClose={closeBulkMailingDialog}
      />
    </>
  )
}
export default Actions
