import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import Page from '../../components/Page/Page';
import { filterMovies } from '../../utils/filterMovies';
import { fetchSearch } from '../../api/api';
import { useState, useEffect } from 'react';

const ShoppingList = () => {
  const navigate = useNavigate();
  const cartList = JSON.parse(localStorage.getItem('movie')) || [];

  return (
    <div className="shoppingList">
      <Page
        header={<Header header={'장바구니'} back />}
        footer={
          <Button
            styleType={'full'}
            text={'주문하기'}
            onClick={() => navigate('/order')}
          />
        }
      >
        <MovieList list={cartList} onDelete />
      </Page>
    </div>
  );
};

export default ShoppingList;
