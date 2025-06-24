import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page/Page';
import MovieList from '../../components/MovieList/MovieList';
import NoResult from '../../components/NoResult/NoResult';
import Button from '../../components/Button/Button';
import { useRecordList } from '../../hooks/useRecordList';
import { WATCH_STATUS } from '../../constants/formField';

const Main = () => {
  const [selectedStatus, setSelectedStatus] = useState('FINISHED');
  const navigate = useNavigate();
  const { recordList, getNoDupRecordList } = useRecordList();
  const filteredList = recordList.filter(
    item => item.watchStatus === selectedStatus,
  );
  const noDupRecordLists = getNoDupRecordList(filteredList);

  // const {
  //   data,
  //   isLoading,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchNextPage,
  // } = useInfiniteScroll();

  // const { ref, inView } = useInView();

  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage, fetchNextPage, isFetchNextPage]);

  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="MainPage">
      <Page
        header={
          <header className="searchBox">
            <input
              className="searchInput"
              type="text"
              placeholder="어떤 영화를 보셨나요?"
              onClick={() => navigate('/search')}
            />
          </header>
        }
      >
        {/* {data?.pages.map((page, i) => (
          <MovieList key={i} list={page.results} onClick />
        ))}
        {hasNextPage && (
          <div className="spinner" ref={ref}>
            <ClipLoader color="#5db996" />
          </div>
        )} */}{' '}
        {/* <h1 className="recordTit">오늘은 어떤 영화를 기록해볼까요?🍿</h1> */}
        <div className="recordContainer">
          <ul className="statusBox">
            {WATCH_STATUS.map(label => (
              <li
                key={label.label}
                className="statusBtn"
                onClick={() => setSelectedStatus(label.value)}
              >
                <Button
                  icon={label.icon}
                  text={label.label}
                  styleType={`stat ${label.value}`}
                  active={selectedStatus === label.value}
                />
              </li>
            ))}
          </ul>
          <div className="recordList">
            {recordList.length !== 0 ? (
              <>
                {noDupRecordLists.length !== 0 ? (
                  <MovieList
                    list={noDupRecordLists}
                    onClick={item => navigate(`/review/${item.movieId}`)}
                  />
                ) : (
                  <NoResult noResultData={'아직 저장된 영화가 없어요.'} />
                )}
              </>
            ) : (
              <NoResult noResultData={'관람한 영화를 저장해 보세요!'} />
            )}
          </div>
        </div>
      </Page>
    </div>
  );
};

export default Main;
