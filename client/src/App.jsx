import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

// HOOKS
import useHomeAPI from "./Hooks/useHomeAPI";
import useSingleEffect from "./Hooks/Custom/useSingleEffect";

// USER PAGES
const HomePage = lazy(() => import('./pages/User/Home/HomePage'));
const About = lazy(() => import("./pages/User/About/About"));
const Contact = lazy(() => import("./pages/User/Contact/Contact"));
const AllProducts = lazy(() => import("./pages/User/Product/AllProducts"));
const Product = lazy(() => import("./pages/User/Product/Product"));
const CategoryProducts = lazy(() => import("./pages/User/Category/CategoryProducts"));

// ADMIN PAGES
const Register = lazy(() => import("./pages/Admin/Auth/Register"));
const Login = lazy(() => import("./pages/Admin/Auth/Login"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard/Dashboard"));
const AddProduct = lazy(() => import("./pages/Admin/Product/AddProduct"));
const EditProduct = lazy(() => import("./pages/Admin/Product/EditProduct"));
const ProductList = lazy(() => import("./pages/Admin/Product/ProductList"));
const Category = lazy(() => import("./pages/Admin/Category/Category"));
const UploadVideo = lazy(() => import("./pages/Admin/Category/UploadVideo"));
const Account = lazy(() => import("./pages/Admin/Account/Account"));
const PageSetup = lazy(() => import("./pages/Admin/PageSetup/PageSetup"));
const Message = lazy(() => import("./pages/Admin/Message/Message"));

// OTHER PAGES
const InvalidPage = lazy(() => import("./pages/InvalidPage/InvalidPage"));

// LAYOUTS
import AdminLayout from "./components/Layout/AdminLayout/AdminLayout";
import UserLayout from "./components/Layout/UserLayout/UserLayout";

// COMPONENTS
import PreLoader from "./components/PreLoader/PreLoader";
import RequireAdmin from './pages/Admin/Auth/RequireAdmin';

function App() {
  const [showPage, setShowPage] = useState(false);
  const { category } = useSelector((state) => state.home);
  const { GetPublicHomeAPI } = useHomeAPI();

  useEffect(() => {
    // Wait 3 seconds before loading the page
    const timer = setTimeout(() => setShowPage(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // GET ATTRIBUTES RENDER
  useSingleEffect(async () => {
    if (category?.length === 0) {
      await GetPublicHomeAPI();
    }
  });

  return (
    <>
      {
        showPage ? (
          <Suspense fallback={<PreLoader />}>
            <Routes >
              {/* USER */}
              <Route path="/" element={<UserLayout />}>
                <Route index name="Home page" element={<HomePage />} />
                <Route path="/category/:name" name="Category Products" element={<CategoryProducts />} />
                <Route path="all-products" name="All Products" element={<AllProducts />} />
                <Route path="product/:pid" name="All Products" element={<Product />} />
                <Route path="about" name="About Us" element={<About />} />
                <Route path="contact" name="Contact Us" element={<Contact />} />
              </Route>

              {/* ADMIN */}
              <Route path="/admin-login" name="Login page" element={<Login />} />
              <Route path="/admin-register" name="Register page" element={<Register />} />
              <Route path="/my-admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                <Route index element={<Dashboard />} />
                <Route path="product-list" element={<ProductList />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="edit-product/:id" element={<EditProduct />} />
                <Route path="category" element={<Category />} />
                <Route path="category/subcategory/upload-video/:id" element={<UploadVideo />} />
                <Route path="page-setup" element={<PageSetup />} />
                <Route path="account" element={<Account />} />
                <Route path="message" element={<Message />} />
              </Route>

              <Route path="*" element={<InvalidPage />} />
            </Routes>
            {/* TOAST  */}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              closeOnClick
              theme="light"
            />
          </Suspense>
        ) : (
          <PreLoader />
        )
      }

    </>
  );
}

export default App;
