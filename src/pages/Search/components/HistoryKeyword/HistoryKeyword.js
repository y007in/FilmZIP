import List from '../../../../components/List/List';
import NoResult from '../../../../components/NoResult/NoResult';

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
        <NoResult noResultData={'검색어가 없습니다'} />
      ) : (
        <List
          data={historyList}
          onClick={item => handleRecommend(item.text)}
          renderItem={item => (
            <>
              <span>{item.text}</span>
              <div>
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
