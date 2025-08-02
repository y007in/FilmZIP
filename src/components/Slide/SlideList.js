import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import DelBtn from '../Button/DelBtn';
import Poster from '../Poster/Poster';

import { MvInfoKrTit, ContentType } from '../MovieTitle/MovieTitle';

const SlideList = ({ data, contentType, onClick, onDelete, dayCount, nav }) => {
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[FreeMode]}
      spaceBetween={10}
      slidesPerView="auto"
      className="slideSwiper"
    >
      {data?.map((item, i) => (
        <SwiperSlide key={item.id ?? `${item.text}-${i}`}>
          {contentType ? (
            <div
              className="listPoster"
              onClick={() =>
                nav === '/review'
                  ? navigate(`${nav}/${contentType}/${item.movieId}`)
                  : navigate(`/detail/${contentType}/${item.id}`)
              }
            >
              <Poster
                item={item}
                contentType={contentType}
                dayCount={dayCount}
              />
              <div className="posterTit">
                <MvInfoKrTit data={item} />
                <ContentType data={item} />
              </div>
            </div>
          ) : (
            <span className="listItem">
              <span onClick={() => onClick(item)}>{item.text}</span>
              {onDelete && (
                <DelBtn
                  onClick={e => {
                    e.preventDefault();
                    onDelete(item.id ?? item.text);
                  }}
                />
              )}
            </span>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideList;
