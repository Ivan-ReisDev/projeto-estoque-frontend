import { useContext } from 'react'
import ReactModal from 'react-modal';
import { UserContext } from '../../Context/UserContext';
import './style.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, reserve }) => {


    const { formatarData } = useContext(UserContext)

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
            <h2>Detalhes do Produto</h2>
            {reserve && (
                <div className='container_modal'>
                    <h2>Atualizar Produto</h2>
                        <div className='content_Modal'> 
                            <form>

                            <label htmlFor="user">Usuário</label>
                            <input type="text" id='user' value={`${reserve.nameUser}`} />

                            <label htmlFor="products">Produto</label>
                            <input type="text" id='products' value={reserve.nameProducts} />

                            <label htmlFor="categoryEdit">Categoria:</label>
                            <input type="text" id='categoryEdit' value={`${reserve.category}`} />

                            <label htmlFor="sku">SKU:</label>
                            <input type="text" id='sku' value={`${reserve.codeSKU}`} />

                            <label htmlFor="mark">Marca</label>
                            <input type="text" id='mark' value={`${reserve.mark}`} />

                            <label htmlFor="stock">Estoque</label>
                            <input type="text" id='stock' value={`${reserve.stock}`} />

                            <label htmlFor="price">Preço:</label>
                            <input type="text" id='price' value={`${reserve.price}`} />

                            <label htmlFor="localization">Localização</label>
                            <input type="text" id='localization' value={`${reserve.localization}`} />

                        </form>
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