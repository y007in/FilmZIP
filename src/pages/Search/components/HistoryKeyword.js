const HistoryKeyword = ({ historyList, setHistoryList, handleRecommend }) => {
  //최근 검색어 삭제
  const handleDel = (id) => {
    const delKeyword = historyList.filter((item) => item.id !== id);
    setHistoryList(delKeyword);
  };
  return (
    <>
      {historyList.length === 0 ? (
        <div className="noSearchKeyword">
          <p>검색어가 없습니다.</p>
        </div>
      ) : (
        <ul className="lists">
          {historyList.map(({ id, text, date }) => (
            <li key={id}>
              <ul className="list">
                <li onClick={() => handleRecommend(text)}>{text}</li>
                <li className="rightBtn">
                  <span>{date}</span>
                  <button
                    className="delBtn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDel(id);
                    }}
                  >
                    x
                  </button>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      ;
    </>
  );
};

export default HistoryKeyword;
