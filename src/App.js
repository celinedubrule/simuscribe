import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter> 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </HashRouter>
  );
}
