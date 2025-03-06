import { useNavigate } from 'react-router-dom';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { useCreditInfo } from '../../hooks/useCreditInfo';

const CompletedOrder = () => {
  const navigate = useNavigate();
  const creditInfo = useCreditInfo();

  return (
    <div className="CompletedOrder">
      <Page header={<Header back />}>
        <div className="orderContainer">
          <div className="bookInfo">
            <h1>결제가 완료되었습니다.</h1>
            {creditInfo.map(book => (
              <div className="personalBook" key={book.label}>
                <p className="bookLabel">{book.label}</p>
                <p className="bookContent">{book.content}</p>
              </div>
            ))}
            <Button
              text={'홈으로'}
              styleSize={'small'}
              styleType={'full'}
              onClick={() => navigate('/')}
            />
          </div>
          <ul className="precautions">
            <li>
              ※ 구매 후 시청하시기 전에 구매일로부터 7일 이내에 구매 취소
              가능합니다.
            </li>
          </ul>
        </div>
      </Page>
    </div>
  );
};

export default CompletedOrder;
