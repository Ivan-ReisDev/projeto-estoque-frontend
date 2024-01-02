import ReactModal from 'react-modal';

// eslint-disable-next-line react/prop-types
const ModalUserDelete = ({ isOpen, onClose, user, handleDeleteUser }) => {

    
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto" className='modalDelete'>
            <h2>Atenção!</h2>
            {user && (
                
                <div className='container_modal container_modal_delete'>
                    <p>Você tem certeza que deseja excluir o usuário <span className='itemProducts'>{user.user}</span></p>
                    <input type="button" value={"Excluir"} onClick={() => handleDeleteUser(user._id)} />
                    <div className='close'>
                        <button onClick={onClose}>X</button>
                    </div>
                </div>
            )}
        </ReactModal>
    );

}

export default ModalUserDelete;