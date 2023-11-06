import { TextField, Autocomplete, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import httpModule from 'services/httpModule'

export const AddTag = ({ handleAddTag, excludedTags }) => {
  const [open, setOpen] = useState(false)
  const [allTags, setAllTags] = useState([])

  useEffect(() => {
    if (open)
      httpModule.get('/v1/tags').then(res => {
        const filteredTags = res.data.filter(tag => !excludedTags.includes(tag))
        setAllTags(filteredTags)
      })
  }, [open])

  const handleFocus = () => setOpen(true)

  const handleAdd = async () => {
    const newtag = document.getElementById('new-tag')

    if (newtag.value && !excludedTags.includes(newtag.value)) {
      await httpModule.post('/v1/tags', { tag: newtag.value })
      handleAddTag(newtag.value)
    }
  }

  return (
    <div>
      <Autocomplete
        freeSolo
        options={allTags}
        onFocus={handleFocus}
        id="new-tag"
        renderInput={params => <TextField {...params} label="Tag" />}
      />
      <Button onClick={handleAdd}>Agregar etiqueta</Button>
    </div>
    /*
		<>
			<Button title="Agregar etiqueta" onClick={openDialog} size="small">+</Button>
			<Dialog open={open} onClose={handleOnClose} fullWidth>
					<DialogTitle>Selecciona una etiqueda o agrega una</DialogTitle>
					<DialogContent>
						<form onSubmit={handleSubmit}>
							/>
						</form>
					</DialogContent>
			</Dialog>
		</>
		*/
  )
}

export default AddTag

export const Tag = ({ handleRemove, tag }) => {
  const remove = () => handleRemove(tag)
  return (
    <div style={{ padding: '0.5rem', backgroundColor: 'gray' }}>
      <span>{tag}</span>
      <button title="Click para remover" onClick={remove}>
        x
      </button>
    </div>
  )
}
