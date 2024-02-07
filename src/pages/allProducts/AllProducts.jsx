import { useContext, useEffect, useState } from 'react'
import Modal from '../../components/modal/Modal'
import ModalUpdate from '../../components/modalUpdate/ModalUpdate';
import ModalDelete from '../../components/modalDelete/ModalDelete'
import { ContextProducts } from '../../Context/ProductsContext';
import { UserContext } from '../../Context/UserContext';
import { FaEye, FaSearch } from "react-icons/fa";
import { IoSettings, IoTrashBin } from "react-icons/io5";
import { Button, Table} from 'react-bootstrap';
import './style.css'
// import { CiSearch } from "react-icons/ci";

const AllProducts = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false)

    const { allProduct, searchAllProducts, handleUpdateProducts, handleDelete, setMessage, selectedProducts, setSelectedProducts, isModalOpenDelete, setIsModalOpenDelete } = useContext(ContextProducts);
    const { profile } = useContext(UserContext);
  

    const openModal = (data) => {
        setSelectedProducts(data);
        setIsModalOpen(true);
    };

    const openModalUpdate = (data) => {
        setSelectedProducts(data);
        setIsModalOpenUpdate(true);
    };

    const openModalDelete = (data) => {
        setMessage('')
        setSelectedProducts(data);
        setIsModalOpenDelete(true);
        
    };
    
    const [itensPerPages, setItensPerPages] = useState(20);
    const [currentPages, setCurrentPages] = useState(0)
    const pages = Math.ceil(allProduct.length / itensPerPages)
    const startIndex = currentPages * itensPerPages;
    const endIndex = startIndex + itensPerPages;
    const currentItens = allProduct.slice(startIndex, endIndex)

    useEffect(() => {
      searchAllProducts()

    }, [])

    return (
        <div className='service-details'>
            <div className='seach'>
                <div className='seach-input'>
                    <input type="text" name="seach" id="seach" placeholder='Pesquisar' onChange={(e) => searchAllProducts && searchAllProducts(e)} />
                    <span><FaSearch className='icon' /></span>
                </div>

                 <div className='qtdItens'>
                    <select name="itensPagination" id="itensPagination" onChange={(e) => setItensPerPages(Number(e.target.value))} placeholder='10'
                    >
                    <option value="">Selecione...</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    </select>
                </div> 
            
            </div>
            <Table striped bordered hover >
        <thead>
          <tr>
            <th>Produto</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>SKU</th>
            <th>Estoque</th>
            <th>Preço</th>
            <th>Localização</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {allProduct &&
            Array.isArray(currentItens.sort()) &&
            currentItens.map((product) => (
              <tr key={product._id}>
                <td>{product.nameProducts}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.codeSKU}</td>
                <td>{product.stock}</td>
                <td>R$ {product.price}</td>
                <td>{product.localization}</td>
                <td className='flex flex-row'>
                  <Button variant='success' className='mr-1' onClick={() => openModal(product)}>
                    <FaEye />
                  </Button>
                  {profile.userType === 'Administrador' && (
                    <Button variant='primary' className='mr-1' onClick={() => openModalUpdate(product)}>
                      <IoSettings />
                    </Button>
                  )}
                  {profile.userType === 'Administrador' && (
                    <Button variant='danger' onClick={() => openModalDelete(product)}>
                      <IoTrashBin />
                    </Button>
                  )}
                  {/* {profile.userType === 'Admin' && (
                    <button className='btn-single btn-single-delete' onClick={() => handleDelete(product._id)}>
                      <IoTrashBin />
                    </button>
                  )} */}

                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      
      <div className='btnPagination'>
        {Array.from(Array(pages), (itens, index) => (
          <Button key={index} value={index} onClick={(e) => setCurrentPages(Number(e.target.value))}>
            {index + 1}
          </Button>
        ))}
      </div>

            {selectedProducts && (
                <Modal
                onClose={() => {
                    setSelectedProducts(null);
                    setIsModalOpen(false);
                }}
                    isOpen={isModalOpen}
                    product={selectedProducts}
                />
            )}

            {selectedProducts && (
                <ModalUpdate
                    isOpen={isModalOpenUpdate}
                    onClose={() => {
                        setSelectedProducts(null);
                        setIsModalOpenUpdate(false);
                    }}
                    reserve={selectedProducts}
                    handleUpdateProducts={handleUpdateProducts}
                />
            )}

            {selectedProducts && (
                <ModalDelete
                    isOpen={isModalOpenDelete}
                    onClose={() => {
                        setSelectedProducts(null);
                        setIsModalOpenDelete(false);
                    }}
                    reserve={selectedProducts}
                    handleDelete={handleDelete}

                />
            )}

        </div>
    )
}

export default AllProducts