import React, { useContext } from 'react'
import ReactModal from 'react-modal';
import { Context } from '../../Context/AuthContext';

const Modal = ({ isOpen, onClose, reserve }) => {


const {formatarData} = useContext(Context)

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
            <h2>Detalhes da Reserva</h2>
            {reserve && (
                <>
                    <p>Data de Criação: {formatarData(reserve.createdAt)}</p>
                    <p>Nome: {reserve.nameProducts}</p>
                    <p>Descrição: {reserve.description}</p>
                    <p>Usuário: {reserve.category}</p>
                    <p>Tipo de Usuário: {reserve.link}</p>
                    <p>Status: {reserve.codeSKU}</p>
                    <p>Status: {reserve.mark}</p>
                    <p>Status: {reserve.stock}</p>
                    <p>Status: {reserve.price}</p>
                    <p>Status: {reserve.localization}</p>
                    <p>Data de Atualização: {formatarData(reserve.updatedAt)}</p>
                </>
            )}
            <button onClick={onClose}>Fechar</button>
        </ReactModal>
    );

}

export default Modal