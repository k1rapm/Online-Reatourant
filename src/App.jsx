import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./Layout/Layout";
import Contact from "./pages/Contact/Contact";
import SignUp from "./pages/Sign Up/Sign Up";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Cart2 from "./pages/Cart/cart2";
import ShopingCart from "./pages/ShopingCart/ShopingCart";
import Products from "./pages/Product/Product";
import Categoriya from "./pages/Categoriya/Categoriya";
import Profile from "./pages/Profile/Profile";
import Addpage from "./pages/Modal/modal";
import AuthCheck from "./utils/AuthChek";
import ProtectedRout from "./utils/ProtectedRout";
import Dish from "./pages/Dish/Dish";
import Drink from "./pages/Drink/Drink";
import Cotegoriyapage from "./pages/Categoriya/Cotegoriyapage";
import SopingCartById from "./pages/ShopingCart/ShopingCartById";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthCheck>
        <SignUp />
      </AuthCheck>
    ),
  },
  {
    path: "login",
    element: (
      <AuthCheck>
        <Login />
      </AuthCheck>
    ),
  },

  // {
  //   path: "/registration",
  //   element: <Registration />,
  // },
  {
    path: "/catalog",
    element: (
      <ProtectedRout>
        <Layout />
      </ProtectedRout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "cart/:id",
        element: <Cart />,
      },
      {
        path: "cart2/:id",
        element: <Cart2 />,
      },
      {
        path: "add/:id",
        element: <Addpage />,
      },
      {
        path: "dish",
        element: <Dish />,
      },
      {
        path: "drink",
        element: <Drink />,
      },
      {
        path: "categotypage",
        element: <Cotegoriyapage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "categoriya/:id",
        element: <Categoriya />,
      },
      {
        path: "shoppingcart",
        element: <ShopingCart />,
      },
      {
        path: "shoppingcartbyid/:id",
        element: <SopingCartById />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
