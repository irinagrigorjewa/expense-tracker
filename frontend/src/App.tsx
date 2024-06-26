import "./App.scss";
import {
  Link,
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SignUpPage } from "./pages/signUp/SignUpPage";
import { LoginPage } from "./pages/login/LoginPage";
import { TransactionPage } from "./pages/transaction/TransactionPage";
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
  const { data, loading } = useQuery(GET_AUTH_USER);

  if (loading) return <div>Loading...</div>;
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
          handle={{
            crumb: () => <Link to="/">Back to Transactions</Link>,
          }}
        />
        <Route path="/not-found" element={<TransactionPage />} />
      </>
    )
  );
  return (
    <div className="app">
      {data?.authUser && <Header />}
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
}

export default App;
