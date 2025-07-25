import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import DelBtn from '../Button/DelBtn';
import Poster from '../Poster/Poster';
import { MvInfoKrTit } from '../MovieTitle/MovieTitle';
const SlideList = ({ data, contentType, onClick, onDelete, dayCount }) => {
  const navigate = useNavigate();
  return (
    <Swiper modules={[FreeMode]} spaceBetween={10} slidesPerView="auto">
      {data?.map((item, i) => (
        <SwiperSlide key={item.id ?? `${item.text}-${i}`}>
          {contentType ? (
            <div
              className="listPoster"
              onClick={() => navigate(`/detail/${contentType}/${item.id}`)}
            >
              <Poster
                item={item}
                contentType={contentType}
                dayCount={dayCount}
              />
              <MvInfoKrTit data={item} />
              {/* <ContentType data={item} /> */}
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
