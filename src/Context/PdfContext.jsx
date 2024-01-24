import { createContext, useState } from 'react';
import PropTypes from 'prop-types';


// const API = 'http://localhost:3000/api/';
const PRD = 'https://backend-carropeca.vercel.app/api/'

const ContextPdf = createContext('');


const PdfContext = ({ children }) => {


    const [message, setMessage] = useState('');

    // Função para lidar com o envio do PDF
    const createPDF = async (e, data) => {
        e.preventDefault();

        try {
            const res = await fetch(`${PRD}create/pdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resJSON = await res.json();
            setMessage(resJSON);



        } catch (error) {
            console.error('Erro no PDF', error);
        }
    };


    

    // Fornecimento do contexto para os componentes filhos
    return (
        <ContextPdf.Provider
            value={{
                createPDF
            }}
        >
            {children}
        </ContextPdf.Provider>
    );
};

// Propriedades esperadas pelo componente PdfContext
PdfContext.propTypes = {
    children: PropTypes.node.isRequired,
};

// Exporta o contexto e o provedor
export { PdfContext, ContextPdf };
