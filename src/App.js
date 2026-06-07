<<<<<<< HEAD
function App() {
  return (
    <div className="App">
      {/* Your app content goes here */}
      <h1>Hello, Simuscribe!</h1>
    </div>
  );
}

export default App; // <--- This line is critical!
=======
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
>>>>>>> 1dc88e4fb43ddaa805d658f132ed21dbaae87f16
