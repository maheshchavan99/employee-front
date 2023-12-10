import React, { useState } from 'react'
import CustomTextInput from '../components/CustomTextInput'
import { addUserServices } from '../services/apis'
import { formData } from './data'
import { fetchAllUserList } from '../stores/userListSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import CustomLoader from '../components/Loader'

const Addusers = ({ setShowAdd }) => {
    const [values, setValues] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const addusers = (payload) => {
        setLoading(true)
        addUserServices(payload).then((res) => {
            console.log(res)
            if (res) {
                setLoading(false)
                dispatch(fetchAllUserList(null))
                setShowAdd("")
            }
        }).catch((e) => {
            setLoading(false)
            console.log(e)
        })
    }

    const clcikAddUsers = (e) => {
        e.preventDefault();
        const payload = { ...values }
        addusers(payload)
    }
    return (
        <>{(loading) && <CustomLoader />}
            <form onSubmit={clcikAddUsers} className='formData'>
                <h1>Add Employee</h1>
                {formData?.map((each) => (
                    <CustomTextInput
                        values={values}
                        setValues={setValues}
                        name={each?.name}
                        placeholder={each.placeholder}
                        label={each?.label}
                        type={each?.type}
                        required={each?.required}
                    />
                ))}
                <button type='submit' className='add-btn btn'>Add Users</button>
            </form>
        </>
    )
}

export default Addusers
