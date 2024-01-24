import { Context, useContext, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import './style.css'
import { IoSettings, IoTrashBin } from "react-icons/io5";
import { Table, Button } from 'react-bootstrap';

const TableUser = () => {
    const { profile, getUserAll } = useContext(UserContext)

  return (
    <div className="panelUser">

<Table striped bordered hover id="tbUser">
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
                 
                
    </div>

  )
}

export default TableUser