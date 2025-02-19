import { Routes, Route } from 'react-router';
import { MainLayout } from './layout/MainLayout';
import { Create } from './page/Create';
import { NotFound } from './page/NotFound';
import TailWind from './page/TailWind';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="create" element={<Create />} />
        <Route path="tailwind" element={<TailWind />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
