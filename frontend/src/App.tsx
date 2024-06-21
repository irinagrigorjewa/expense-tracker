import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/signUp/SignUpPage";
import { LoginPage } from "./pages/login/LoginPage";
import { TransactionPage } from "./pages/transaction/TransactionPage";
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
  const { data } = useQuery(GET_AUTH_USER);

  return (
    <div className="app">
      {data?.authUser && <Header />}
      <Routes>
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
        />
        <Route path="/not-found" element={<TransactionPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
