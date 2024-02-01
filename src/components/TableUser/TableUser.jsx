import { Context, useContext, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import './style.css'
import { IoSettings, IoTrashBin } from "react-icons/io5";
import { Table, Button } from 'react-bootstrap';
import ModalCreateUser from "../ModalCreateUser/ModalCreateUser";

const TableUser = () => {
    const { profile, getUserAll, handleDeleteUser, isModalOpenUser,  setIsModalOpenUser, selectedUser, setSelecteUser  } = useContext(UserContext)

  return (
    <div className="panelUser">

<div className='w-full flex items-center justify-center h-[40px] mb-2'>
        <Button variant="outline-primary" onClick={() => setIsModalOpenUser(true)}>Novo usuário</Button>
      </div>

<Table striped bordered hover id="tbUser" >
      <thead>
        <tr>
          <th>Usuário</th>
          <th>E-mail</th>
          <th className="wAction">Ação</th>
        </tr>
      </thead>
      <tbody>
      {getUserAll ?
            Array.isArray(getUserAll) &&
            getUserAll.map((user) => (
              <tr key={user._id}>
                <td>{user.user}</td>
                <td>{user.email}</td>
                <td className="wAction"  id="tdUser"> {profile.userType === "Administrador" && <Button variant="primary"><IoSettings /></Button>}
                     {profile.userType === "Administrador" && <Button variant="danger"><IoTrashBin /></Button>} </td>
              </tr>
            )) : []}
      </tbody>
    </Table>
                 
    {(
        <ModalCreateUser
          onClose={() => {
            setSelecteUser(null);
            setIsModalOpenUser(false);
          }}
          isOpen={isModalOpenUser}

        />
      )}    
    </div>

  )
}

export default TableUser