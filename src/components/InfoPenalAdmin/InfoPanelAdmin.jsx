import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import { FaBoxOpen } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import './style.css'
import { ContextProducts } from '../../Context/ProductsContext';
import { UserContext } from '../../Context/UserContext';
import {  ContextCategory } from '../../Context/CategoryContext';



export const InfoPanelAdmin = () => {
    const { allProduct} = useContext(ContextProducts);
    const { getUserAll } = useContext(UserContext)
    const { allCategory } = useContext(ContextCategory)

    return (
        <div className='InfoPanelAdmin'>
            <div className='InfoPanelAdminBody'>

           
            <Card  className='CardInfo' border="primary" style={{ width: '18rem'}}>
            <Card.Header>Produtos Cadastrados</Card.Header>
                <Card.Body className='CardInfoBody'>
                    <div>
                        <Card.Title> <i><FaBoxOpen /></i></Card.Title>
                    </div>
                    <Card.Text>
                            {allProduct.length}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card  className='CardInfo CardInfoUsers' border="success" style={{ width: '18rem' }}>
            <Card.Header>Usuários Ativos</Card.Header>
                <Card.Body className='CardInfoBody'>
                    <div>
                        <Card.Title> <i><FaUsers /></i></Card.Title>
                    </div>
                    <Card.Text>
                            {getUserAll.length}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card  className='CardInfo CardInfoCategory' border="warning" style={{ width: '18rem' }}>
            <Card.Header>Categorias Cadastradas</Card.Header>
                <Card.Body className='CardInfoBody'>
                    <div>
                        <Card.Title> <i><BiCategory /></i></Card.Title>
                    </div>
                    <Card.Text>
                            {allCategory.length}
                    </Card.Text>
                </Card.Body>
            </Card>
            </div>
        </div>
    )
}
