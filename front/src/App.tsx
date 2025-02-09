//import { Routes, Route, Outlet, NavLink, Link } from 'react-router';
import { Routes, Route } from 'react-router';
import './App.css';
import { Create } from './page/Create';
import { NotFound } from './page/NotFound';

function Layout() {
  return (
    <Create />
    // <>
    //   <div style={{ width: '100vw', maxWidth: '100%' }}>
    //     <div
    //       style={{
    //         display: 'flex',
    //         flexDirection: 'row',
    //         justifyContent: 'space-around'
    //       }}
    //     >
    //       <Link to="/">홈</Link>
    //       <NavLink
    //         to="/create"
    //         className={({ isActive }) => (isActive ? 'active' : '')}
    //       >
    //         테스트 페이지
    //       </NavLink>
    //     </div>
    //   </div>
    //   <Outlet />
    // </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="create" element={<Create />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
