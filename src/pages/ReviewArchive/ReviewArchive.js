import { useLocation, useSearchParams } from 'react-router-dom';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import RecordTab from './components/RecordTab';
import CollectionList from './components/CollectionList';

const ReviewArchive = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [params] = useSearchParams();
  const title = params.get('title');

  return (
    <div className="ReviewArchive">
      <Page header={<Header title={title} />}>
        {title === '내가 본 영화' ? <RecordTab /> : <CollectionList />}
      </Page>
    </div>
  );
};

export default ReviewArchive;
