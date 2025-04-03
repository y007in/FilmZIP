import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Search from './pages/Search/Search/Search';
import ShoppingList from './pages/ShoppingList/ShoppingList';
import Order from './pages/Order/Order';
import './App.scss';
import CompletedOrder from './pages/CompletedOrder/CompletedOrder';
import { LayoutProvider } from './contexts/LayoutContext';

function App() {
  return (
    <div className="App">
      <LayoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/search" element={<Search />}></Route>
            {/* <Route path="/shoppingList" element={<ShoppingList />}></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route path="/completedOrder" element={<CompletedOrder />}></Route> */}
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </div>
  );
}

export default App;
