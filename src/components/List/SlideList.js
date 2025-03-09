import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import DelBtn from '../Button/DelBtn';
import { setSearchKeywordList } from '../../utils/storage';

const SlideList = ({ data, onClick }) => {
  const handleDel = (id, e) => {
    e.preventDefault();
    const delKeyword = data.filter(item => item.id !== id);
    setSearchKeywordList(delKeyword);
    window.location.reload();
  };

  return (
    <Swiper modules={[FreeMode]} spaceBetween={5} slidesPerView="auto">
      {data.map((item, i) => (
        <SwiperSlide key={item.id}>
          <span className="listItem">
            <span onClick={() => onClick(item)}>{item.text}</span>
            <DelBtn onClick={e => handleDel(item.id, e)}>x</DelBtn>
          </span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideList;
