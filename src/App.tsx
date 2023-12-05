import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";
import { AuthProvider } from "./contexts/FakeAuthContext";
import CityList from "./components/CityList.tsx";
import CountryList from "./components/CountryList.tsx";
import City from "./components/City.tsx";
import Form from "./components/Form.tsx";
// to fix flag problem in City component
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SpinnerFullPage from "./components/SpinnerFullPage.tsx";

// import Product from "./pages/Product.tsx";
// import Pricing from "./pages/Pricing.tsx";
// import Homepage from "./pages/Homepage.tsx";
// import PageNotFound from "./pages/PageNotFound.tsx";
// import AppLayout from "./pages/AppLayout.tsx";
// import Login from "./pages/Login.tsx";
const Homepage = lazy(() => import("./pages/Homepage.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.tsx"));

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
