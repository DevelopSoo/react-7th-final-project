import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import AuthProvider from "./providers/AuthProvider";
import QueryProvider from "./providers/QueryProvider";

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/feeds/:id" element={<Detail />} />
              <Route path="/feeds/create" element={<CreatePage />} />
              <Route path="/feeds/update/:id" element={<UpdatePage />} />
              <Route path="/mypage" element={<MyPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}
