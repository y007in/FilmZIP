import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

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
            <button className="delBtn" onClick={e => handleDel(item.id, e)}>
              &chi;
            </button>
          </span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideList;
