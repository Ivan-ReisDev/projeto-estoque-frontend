import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { redirect, useNavigate } from 'react-router-dom';


const API = 'http://localhost:3000/api/'


const Context = createContext('')

const AuthContext = ({ children }) => {


    const navigate = useNavigate()

    // Dados de login
    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: '',
    });

    // Resposta das requisições
    const [message, setMessage] = useState("");
    const [tokenUser, setTokenUser] = useState("")
    const [allProducts, setAllProducts] = useState()


    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${API}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataLogin),
            });

            const resJSON = await res.json()
            setMessage(resJSON)
            console.log(resJSON.error)
            console.log(resJSON)
            setMessage(resJSON)
            if(resJSON.token) {
                localStorage.setItem('token', resJSON.token);
                navigate('/home')
            } else {
                console.log('teste login')
                localStorage.removeItem('token');
                navigate('/')
            }


        } catch (error) {
            console.log('teste', error)
        }

    }

    useEffect(() => {
        const tokenAuth = localStorage.getItem('token')
        if(tokenAuth) {
            setTokenUser(tokenAuth)
        }
        
    }, [setTokenUser, navigate]);



    const exit = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    useEffect(() => {
        const getProductsAll = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/get/products', {
                    method:'GET',
                    headers:{
                        Authorization: `Bearer ${tokenUser}`,
                    },
                
                })

                const data = await res.json();
                
                setAllProducts(data)
                console.log(data)
            } catch (error) {
                setMessage(error)
            }


        } 
        getProductsAll()

    },[tokenUser])


    function formatarData(dataDoMongoDB) {
        const dataObjeto = new Date(dataDoMongoDB);
        const dia = dataObjeto.getDate().toString().padStart(2, '0');
        const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObjeto.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }


    return (
        <Context.Provider
            value={{
                dataLogin, 
                setDataLogin,
                handleSubmitLogin,
                tokenUser,
                exit,
                message,
                allProducts,
                formatarData
            }}>

            {children}
        </Context.Provider>

    )
}

AuthContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export  {AuthContext, Context }