import React from 'react'

const CustomTextInput = ({
    values,
    setValues,
    name,
    placeholder,
    label,
    type,
    onChange,
    required,
    afterhandleChange
}) => {
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setValues({ ...values, [name]: value })
        afterhandleChange&&afterhandleChange(e)
    }
    
    return (
        <div className='custom_input'> 
            <p className='label'>{label}</p>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={values?.[name]||''}
                onChange={onChange ? onchange : handleChange}
                required={required}

            />
        </div>
    )
}

export default CustomTextInput
