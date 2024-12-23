import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchKeyword = (e) => {
    if (e.target.value.length <= 0) {
      handleReset();
    }
    setSearchKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit :", searchKeyword);
  };
  const handleReset = () => {
    setSearchKeyword("");
  };
  useEffect(() => {
    if (searchKeyword === "") {
      console.log("Reset :", searchKeyword);
    }
  }, [searchKeyword]);
  return (
    <div className="App">
      <header>
        <h2>검색</h2>
      </header>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>
          <input
            className="searchInput"
            type="text"
            placeholder="검색어를 입력하세요."
            autoFocus
            value={searchKeyword}
            onChange={(e) => handleSearchKeyword(e)}
          />
          {searchKeyword.length > 0 && (
            <button type="reset" className="btnReset"></button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
