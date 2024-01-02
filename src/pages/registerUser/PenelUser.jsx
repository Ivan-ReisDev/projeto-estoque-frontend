import { Context, useContext, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import './style.css'
import { IoSettings, IoTrashBin } from "react-icons/io5";
import { Table, Button } from 'react-bootstrap';
import ModalUserDelete from "../../components/modalUserDelete/ModalUserDelete.Jsx";


const PenelUser = () => {

  const { profile, getUserAll, setSelectUser, selectUser, handleDeleteUser, isModalOpenDeleteUser, setIsModalOpenDeleteUser } = useContext(UserContext)



  const openModal = (data) => {
    setSelectUser(data);
    setIsModalOpenDeleteUser(true);
};


  return (
    <div className="panelUser">

<Table striped bordered hover id="tbUser">
      <thead>
        <tr>
          <th>Usuário</th>
          <th>E-mail</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
      {getUserAll ?
            Array.isArray(getUserAll) &&
            getUserAll.map((user) => (
              <tr key={user._id}>
                <td>{user.user}</td>
                <td>{user.email}</td>
                <td id="tdUser"> {profile.userType === "Administrador" && <Button variant="primary"><IoSettings /></Button>}
                     {profile.userType === "Administrador" && <Button variant="danger" onClick={() => openModal(user)}><IoTrashBin /></Button>} </td>
              </tr>
            )) : []}
      </tbody>
    </Table>
     
     {selectUser && (
                <ModalUserDelete
                    isOpen={isModalOpenDeleteUser}
                    onClose={() => {
                        setSelectedProducts(null);
                        setIsModalOpenDeleteUser(false);
                    }}
                    user={selectUser}
                    handleDeleteUser={handleDeleteUser}
                />

                )}
                
    </div>

  )}

export default PenelUser