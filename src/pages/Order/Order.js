import React from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import FormControl from '../../components/FormControl/FormControl';
import Page from '../../components/Page/Page';

const Order = () => {
  return (
    <div className="Order">
      <Page
        header={<Header header={'결제'} back />}
        footer={<Button type={'full'} text={'결제하기'} />}
      >
        <div className="forms">
          <FormControl label={'이름'} required>
            <input type="text" placeholder="이름" autoFocus />
          </FormControl>
          <FormControl label={'전화번호'} required>
            <input type="text" placeholder="전화번호" autoFocus />
          </FormControl>{' '}
        </div>
      </Page>
    </div>
  );
};

export default Order;
