import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthContext } from './Context/UserContext.jsx'
import { ProductsContext } from './Context/ProductsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthContext>
      <ProductsContext>
        <App />
      </ProductsContext>
    </AuthContext>
  </BrowserRouter>
)
