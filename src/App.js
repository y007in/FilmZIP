import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Search from './pages/Search/Search/Search';
import ShoppingList from './pages/ShoppingList/ShoppingList';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/shoppingList" element={<ShoppingList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
