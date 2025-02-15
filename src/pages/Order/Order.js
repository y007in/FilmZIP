import React from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import FormControl from '../../components/FormControl/FormControl';
import Page from '../../components/Page/Page';

const Order = () => {
  const handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };
  return (
    <div className="Order">
      <Page
        header={<Header header={'결제'} back />}
        footer={
          <Button
            styleType={'full'}
            text={'결제하기'}
            form="orderForm"
            type="submit"
            onClick={handleSubmit}
          />
        }
      >
        <form className="forms" id="orderForm">
          <FormControl label={'이름'} htmlFor={'userName'} required>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="이름"
              autoFocus
              required
            />
          </FormControl>
          <FormControl label={'전화번호'} htmlFor={'userTel'} required>
            <input
              type="text"
              id="userTel"
              name="userTel"
              placeholder="010-0000-0000"
              pattern="^\d{2,3}-\d{3,4}-\d{4}$"
              required
            />
          </FormControl>
        </form>
      </Page>
    </div>
  );
};

export default Order;
