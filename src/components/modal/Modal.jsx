/* eslint-disable react/prop-types */
import { useContext } from 'react'
import ReactModal from 'react-modal';
import { UserContext } from '../../Context/UserContext';
import './style.css'
import { ContextPdf } from '../../Context/PdfContext';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, product }) => {


    const { formatarData } = useContext(UserContext)

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
            <h2>Detalhes do Produto</h2>
            {product && (
                <div className='container_modal'>
                    <div>
                        <p><span className=''>Produto:</span> {product.nameProducts}</p>
                        <p><span className=''>SKU:</span> {product.codeSKU}</p>
                        <p><span className=''>Criação:</span> {formatarData(product.createdAt)}</p>
                        <p><span className=''>Preço:</span> R$ {product.price}</p>
                        <p><span className=''>Link:</span> <a href={product.link} target='_blank' rel="noreferrer" >{product.link}</a></p>
                        <p><span className=''>Usuario:</span> {product.nameUser}</p>
                    </div>

                    <div >
                        <p><span className=''>Categoria:</span> {product.category}</p>
                        <p><span className=''>Estoque:</span> {product.stock}</p>
                        <p><span className=''>Marca:</span> {product.mark}</p>
                        <p><span className=''>Localização:</span> {product.localization}</p>
                        <p><span className=''>Descrição:</span> {product.description}</p>
                        <p><span className=''>Atualização:</span> {formatarData(product.updatedAt)}</p>
                    </div>
                    <div className='close'>
                        <button onClick={onClose}>X</button>
                    </div>
                </div>
            )}
        </ReactModal>
    );

}

export default Modal