import React from 'react'

const FormBtn = ({btnText}) => {
  return (
    <button className="btn btn-wide my-2 bg-slate-400 text-xl" onChange={onchange}>{btnText}</button>
  )
}

export default FormBtn
