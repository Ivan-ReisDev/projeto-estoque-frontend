/* eslint-disable react/prop-types */
import { useContext } from 'react'
import ReactModal from 'react-modal';
import { UserContext } from '../../Context/UserContext';
import { Button } from 'react-bootstrap';
import './style.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, product }) => {


    const { formatarData } = useContext(UserContext)

    return (
        <ReactModal isOpen={isOpen} 
        onRequestClose={onClose} 
        contentLabel="Detalhes do produto" 
        style={{
            overlay: {
              backgroundColor: 'papayawhip'
            },
            content: {
              color: 'lightsteelblue',
              height: '450px'
            }
          }}>

            <div className='border-b-2 w-full h-{20%}'>
                <h2 className=' text-xl m-2 '>Detalhes do Produto</h2>
            </div>
            <div className='w-full flex flex-row items-center justify-center my-3 '>
                <div className='w-1/2	'>
                    <p className='text-black'><span className='font-bold'>Produto:</span> {product.nameProducts}</p>
                    <p className='text-black'><span className='font-bold'>SKU:</span> {product.codeSKU}</p>
                    <p className='text-black'><span className='font-bold'>Criação:</span> {formatarData(product.createdAt)}</p>
                    <p className='text-black'><span className='font-bold'>Preço:</span> R$ {product.price}</p>
                    <p className='text-black'><span className='font-bold'>Link:</span> <a href={product.link} target='_blank' rel="noreferrer" >{product.link}</a></p>
                    <p className='text-black'><span className='font-bold'>Usuario:</span> {product.nameUser}</p>
                </div>

                <div className='w-1/2	' >
                    <p className='text-black'><span className='font-bold'>Categoria:</span> {product.category}</p>
                    <p className='text-black'><span className='font-bold'>Estoque:</span> {product.stock}</p>
                    <p className='text-black'><span className='font-bold'>Marca:</span> {product.mark}</p>
                    <p className='text-black'><span className='font-bold'>Localização:</span> {product.localization}</p>
                    <p className='text-black'><span className='font-bold'>Descrição:</span> {product.description}</p>
                    <p className='text-black'><span className='font-bold'>Atualização:</span> {formatarData(product.updatedAt)}</p>
                </div>
            </div>
            <div className=' h-{20%} flex flex-row items-center justify-end border-t-2 w-full'>
                <Button className='m-2' variant="danger" onClick={onClose}> Fechar </Button>
            </div>
        </ReactModal>
    );

}

export default Modal