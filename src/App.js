import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Search from './pages/Search/Search/Search';
import Detail from './pages/Detail/Detail';
import Review from './pages/Review/Review';

import { LayoutProvider } from './contexts/LayoutContext';

function App() {
  return (
    <div className="App">
      <LayoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/movie/:id" element={<Detail />}></Route>
            {/* <Route path="/shoppingList" element={<ShoppingList />}></Route>
            <Route path="/order" element={<Order />}></Route>
           */}{' '}
            <Route path="/review/:id" element={<Review />}></Route>
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </div>
  );
}

export default App;
