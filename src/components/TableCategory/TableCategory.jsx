import React, { useContext } from 'react'
import { ContextCategory } from '../../Context/CategoryContext';
import { UserContext } from '../../Context/UserContext';
import { IoSettings, IoTrashBin } from "react-icons/io5";
import { Table, Button } from 'react-bootstrap';
import './style.css'

const TableCategory = () => {
    const { profile  } = useContext(UserContext)
    const { allCategory } = useContext(ContextCategory);
  return (
    <div className='panelCategory'>
<Table striped bordered hover id="tbUser">
      <thead>
        <tr>
          <th>Categoria</th>
          <th className="wAction">Ação</th>
        </tr>
      </thead>
      <tbody>
      {allCategory ?
            Array.isArray(allCategory) &&
            allCategory.map((category) => (
              <tr key={category._id}>
                <td>{category.category}</td>
                <td className="wAction"  id="tdUser"> {profile.userType === "Administrador" && <Button variant="primary"><IoSettings /></Button>}
                     {profile.userType === "Administrador" && <Button variant="danger"><IoTrashBin /></Button>} </td>
              </tr>
            )) : []}
      </tbody>
    </Table>

    </div>
  )
}

export default TableCategory