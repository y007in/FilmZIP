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
  console.log(data);

  return (
    <div className="ReviewArchive">
      <Page header={<Header title={title} />}>
        {title === '나의 아카이빙' ? <RecordTab /> : <CollectionList />}
      </Page>
    </div>
  );
};

export default ReviewArchive;
