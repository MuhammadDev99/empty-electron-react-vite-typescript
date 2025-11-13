import { signal } from '@preact/signals-react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router"
import Layout from './Layout';
import Home from './Pages/Home';
import About from './Pages/About';
const count = signal(0);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);