import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Category from './components/Category/Category';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Notfound from './components/Notfound/Notfound';
import Cart from './components/Cart/Cart';
import UserContextProvider from './context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details'
import CartContextProvider from './context/cartContext';
import { ToastContainer } from 'react-toastify';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import WishList from './components/WishList/WishList';
import WishContextProvider from './context/wishContext';
import CategoryContextProvider from './context/CategoryContext';
import SubCategories from './components/SubCategories/SubCategories';
import Spc from './components/Spc/Spc';
import AuthContextProvider from './context/AuthContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetCode from './components/ForgetPassword/ResetCode';
import ResetPassword from './components/ForgetPassword/ResetPassword';


const router=createBrowserRouter([
  {path:'',element:<Layout/>,children:[
{path:'',element: <ProtectedRoute><Home/></ProtectedRoute>},
{path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
{path:'product',element:<ProtectedRoute><Products/></ProtectedRoute>},
{path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
{path:'category',element:<ProtectedRoute><Category/></ProtectedRoute>},
{path:'signin',element:<Signin/>},
{path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
{path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
{path:'sub/:id',element:<ProtectedRoute><SubCategories/></ProtectedRoute>},
{path:'spc/:id',element:<ProtectedRoute><Spc/></ProtectedRoute>},
{path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
{path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
{path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
{path:'forgetpassword',element:<ForgetPassword/>},
{path:'resetcode',element:<ResetCode/>},
{path:'resetpassword',element:<ResetPassword/>},
{path:'signup',element:<Signup/>},
{path:'*',element:<Notfound/>}
]
}
])
function App() {

  return (
    <AuthContextProvider>
   <CategoryContextProvider>
    <WishContextProvider>
    <CartContextProvider>
     <UserContextProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer theme='colored'/>
     </UserContextProvider>
    </CartContextProvider>
    </WishContextProvider>
    </CategoryContextProvider>
    </AuthContextProvider>
  );
}

export default App;
