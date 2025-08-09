import { useLocation, useSearchParams } from 'react-router-dom';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import RecordTab from './components/RecordTab';
import CollectionList from './components/CollectionList';

const ReviewArchive = () => {
  const location = useLocation();
  const nav = location.pathname;
  const [params] = useSearchParams();
  const title = params.get('title');

  return (
    <div className="ReviewArchive">
      <Page header={<Header title={title} />}>
        {nav === '/review' ? <RecordTab /> : <CollectionList />}
      </Page>
    </div>
  );
};

export default ReviewArchive;
