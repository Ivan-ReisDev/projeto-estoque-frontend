import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthContext } from './Context/UserContext.jsx'
import { ProductsContext } from './Context/ProductsContext.jsx'
import { PdfContext } from './Context/PdfContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthContext>
      <PdfContext>
        <ProductsContext>
          <App />
        </ProductsContext>
      </PdfContext>
    </AuthContext>
  </BrowserRouter>
)
