import { useState } from 'react';
import { Routes, Route, Outlet, NavLink, Link } from 'react-router';
import reactLogo from './assets/react.svg';
import './App.css';
import { Test } from './page/test';
import { NotFound } from './page/NotFound';

function Layout() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}
      >
        <Link to="/">홈</Link>
        <NavLink
          to="/test"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          테스트 페이지
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="test" element={<Test />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
