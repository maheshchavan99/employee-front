import React, { useState } from 'react'
const Table = ({ usersList, deleteUserRow}) => {
    return (
        <>
            <table>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Action</th>
                </tr>
                {usersList?.map((each) => (
                    <tr>
                        <td>{each._id}</td>
                        <td>{each?.firstName}</td>
                        <td>{each?.lastName}</td>
                        <td>{each?.city}</td>
                        <td>
                        <button className='btn remove-btn' onClick={(() => deleteUserRow(each))}>Remove</button>
                        </td>
                    </tr>
                ))}
            </table>
        </>
    )
}

export default Table
