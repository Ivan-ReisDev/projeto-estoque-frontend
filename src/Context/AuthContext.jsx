import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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


    const handleSubmitLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataLogin),
            });

            const resJSON = await res.json()
            console.log(resJSON)
            setMessage(resJSON)
            if(resJSON.token) {
                localStorage.setItem('token', resJSON.token);
                navigate('/home')
            } else {
                console.log('teste login')
                localStorage.removeIten('token');
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
        localStorage.removeIten('token');
        navigate('/');
    }


    return (
        <Context.Provider
            value={{
                dataLogin, 
                setDataLogin,
                handleSubmitLogin,
                tokenUser,
                exit
            }}>

            {children}
        </Context.Provider>

    )
}

AuthContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export  {AuthContext, Context }