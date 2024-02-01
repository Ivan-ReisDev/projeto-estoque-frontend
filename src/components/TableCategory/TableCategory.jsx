import React, { useContext } from 'react'
import { ContextCategory } from '../../Context/CategoryContext';
import { UserContext } from '../../Context/UserContext';
import { IoTrashBin } from "react-icons/io5";
import { Table, Button } from 'react-bootstrap';
import './style.css'
import ModalCategory from '../ModalCategory/ModalCategory';
import ModalCategoryDelete from '../ModalCategoryDelete/ModalCategoryDelete';

const TableCategory = () => {
  const { profile } = useContext(UserContext)
  const { allCategory, selectedCategory, setSelectedCategory, isModalOpenCategory, setIsModalOpenCategory, isModalOpenCategoryDelete, setIsModalOpenCategoryDelete, handleDeleteCategory } = useContext(ContextCategory);

  const openModalDelete = (data) => {
    console.log(data)
    setSelectedCategory(data);
    setIsModalOpenCategoryDelete(true)
  };

  return (
    <div className='panelCategory'>
      <div className='w-full flex items-center justify-center h-[40px] mb-2'>
        <Button variant="outline-primary" onClick={() => setIsModalOpenCategory(true)}>Nova Categoria</Button>
      </div>
      <Table striped bordered hover id="tbUser" >
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
                <td className="wAction" id="tdUser">  {profile.userType === "Administrador" && <Button onClick={() => openModalDelete(category)} variant="danger"><IoTrashBin /></Button>} </td>
              </tr>
            )) : []}
        </tbody>
      </Table>

      {(
        <ModalCategory
          onClose={() => {
            setSelectedCategory(null);
            setIsModalOpenCategory(false);
          }}
          isOpen={isModalOpenCategory}
          category={selectedCategory}
        />
      )}

{selectedCategory && (
                <ModalCategoryDelete
                    isOpen={setIsModalOpenCategory}
                    onClose={() => {
                      setSelectedCategory(null);
                      isModalOpenCategoryDelete(false);
                    }}
                    category={selectedCategory}
                    handleDeleteCategory={handleDeleteCategory}
                />
            )}

    </div>
  )
}

export default TableCategory