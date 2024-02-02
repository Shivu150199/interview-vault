import React from 'react'

const InputText = ({name,type,label,placeholder}) => {
  return (
    <label className="form-control w-full max-w-xs" htmlFor={name}>
    
        <span className="label-text mb-2 font-medium capitalize">{label}</span>
       
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      
    </label>
  )
}

export default InputText
