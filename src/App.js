import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Search from './pages/Search/Search/Search';
import Detail from './pages/Detail/Detail';
import ReviewArchive from './pages/ReviewArchive/ReviewArchive';
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
            <Route path="/detail/:contentType/:id" element={<Detail />}></Route>
            <Route path="/review" element={<ReviewArchive />}></Route>
            <Route path="/collection" element={<ReviewArchive />}></Route>
            <Route path="/review/:contentType/:id" element={<Review />}></Route>
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </div>
  );
}

export default App;
