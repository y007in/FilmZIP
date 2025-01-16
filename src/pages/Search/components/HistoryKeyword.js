import List from '../../../components/List';

const HistoryKeyword = ({ historyList, setHistoryList, handleRecommend }) => {
  // 최근 검색어 삭제
  const handleDel = (id, e) => {
    e.stopPropagation();
    const delKeyword = historyList.filter(item => item.id !== id);
    setHistoryList(delKeyword);
  };

  return (
    <>
      {historyList.length === 0 ? (
        <div className="noSearchKeyword">
          <p>검색어가 없습니다.</p>
        </div>
      ) : (
        <List
          data={historyList}
          onClick={item => handleRecommend(item.text)}
          renderItem={item => (
            <>
              <span>{item.text}</span>
              <div>
                <span>{item.date}</span>
                <button className="delBtn" onClick={e => handleDel(item.id, e)}>
                  x
                </button>
              </div>
            </>
          )}
        />
      )}
    </>
  );
};

export default HistoryKeyword;
