import React, { useEffect, useState } from 'react'
import Table from '../components/Table/Table'
import { deleteUserServices } from '../services/apis'
import Addusers from './Addusers'
import CustomTextInput from '../components/CustomTextInput'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUserList } from '../stores/userListSlice'
import CustomLoader from '../components/Loader'
import { utils, writeFile } from 'xlsx'

const PersonList = () => {
  const [loading, setLoading] = useState(false)
  const [showAdd, setShowAdd] = useState("")
  const [values, setValues] = useState({})
  const { data, isLoading } = useSelector(((state) => state?.userList))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUserList(null))
  }, [])

  const deleteUserRow = (each) => {
    setLoading(true)
    deleteUserServices(each._id).then((res) => {
      if (res) {
        setLoading(false)
        dispatch(fetchAllUserList(null))
        toast.success("Deleted user successfully..")
      }
    }).catch((e) => {
      setLoading(false)
      toast.success("something went to wrong")

    })
  }

  const clcikAddHandler = () => {
    setShowAdd("add")
  }

  const filterUserDetails = (value) => {
    return value?.toLowerCase()?.includes(values?.search?.toLowerCase())
  }
  const filterData = data?.filter((each) => {
    if (!values?.search) {
      return each; // Include all items if search is empty
    } else if (filterUserDetails(each.firstName) || filterUserDetails(each.lastName) || filterUserDetails(each.city)) {
      return each;
    }
  });


  const exportData = () => {
    const headings = [[
      "ID",
      'First Name',
      'Last Name',
      'City',
    ]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, filterData, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'userdata.xlsx');

  }
  return (
    <>{(loading || isLoading) && <CustomLoader />}

      {showAdd == "add" && <Addusers setShowAdd={setShowAdd} />}
      <div className='padding'>
        <h1>Employee List</h1>
        <div className='top_section'>
          <div>
            <CustomTextInput
              values={values}
              setValues={setValues}
              name="search"
              type='text'
              placeholder="search"
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <button className='btn add' onClick={clcikAddHandler}>Add</button>
            <button className='btn export' onClick={exportData}>Export</button>
          </div>
        </div>
        <Table usersList={filterData}
          deleteUserRow={deleteUserRow}
          clcikAddHandler={clcikAddHandler}
        />
      </div>
    </>
  )
}

export default PersonList
