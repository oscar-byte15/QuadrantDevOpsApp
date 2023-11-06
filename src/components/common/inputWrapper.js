import React from 'react'
/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/

const DataInput = ({ handleFile }) => {
  const handleChange = e => {
    const files = e.target.files
    if (files && files[0]) handleFile(files[0])
  }

  return (
    <form className="form-inline">
      <div className="form-group">
        <label htmlFor="file">Drag or choose a spreadsheet file</label>
        <br />
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

export default DataInput

/* list of supported file types */
const SheetJSFT = [
  'xlsx',
  'xlsb',
  'xlsm',
  'xls',
  'xml',
  'csv',
  'txt',
  'ods',
  'fods',
  'uos',
  'sylk',
  'dif',
  'dbf',
  'prn',
  'qpw',
  '123',
  'wb*',
  'wq*',
  'html',
  'htm'
]
  .map(x => `.${x}`)
  .join(',')
