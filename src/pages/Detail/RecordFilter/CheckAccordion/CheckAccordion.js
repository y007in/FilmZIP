import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../components/Button/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

const CheckAccordion = ({ field, setWatch, checked }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_VISIBLE = 6;
  const selectedList = checked[field.label] || [];

  const handleCheckbox = (label, option) => {
    setWatch(prev => ({
      ...prev,
      checked: {
        ...prev.checked,
        [label]: selectedList.includes(option)
          ? selectedList.filter(item => item !== option)
          : [...selectedList, option],
      },
    }));
  };

  const isGrouped = field.options.some(group => typeof group === 'object');
  const isOverflow = field.options.some(
    group => (group.items ?? []).length > MAX_VISIBLE,
  );
  const renderGrouped = () => (
    <>
      <Swiper modules={[FreeMode]} spaceBetween={16} slidesPerView="auto">
        {field.options.map((group, groupIdx) => {
          const items = group.items ?? [];

          const visibleItems = expanded ? items : items.slice(0, MAX_VISIBLE);

          return (
            <SwiperSlide key={groupIdx} className="groupedField">
              <p className="groupLabel">{group.group}</p>
              <div className={`buttonGrid ${expanded ? 'ex' : ''}`}>
                {visibleItems.map((option, i) => {
                  const selected = selectedList.includes(option);
                  return (
                    <span key={i}>
                      <Button
                        styleType={selected ? 'brandSolid' : ''}
                        styleSize="small"
                        text={option}
                        onClick={e => {
                          e.preventDefault();
                          handleCheckbox(field.label, option);
                        }}
                      />
                      <input
                        type="checkbox"
                        name={field.label}
                        id={`${field.label}-${option}`}
                        value={option}
                        checked={selected}
                        onChange={() => handleCheckbox(field.label, option)}
                      />
                    </span>
                  );
                })}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {isOverflow && (
        <div className="rightBtn">
          <button
            className="acc"
            onClick={e => {
              e.preventDefault();
              setExpanded(prev => !prev);
            }}
          >
            <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
          </button>
        </div>
      )}{' '}
    </>
  );

  const renderFlat = () => (
    <div className="buttonCheck">
      {field.options.map((option, i) => {
        const selected = selectedList.includes(option);
        return (
          <span key={i}>
            <Button
              styleType={selected ? 'brandSolid' : ''}
              styleSize="small"
              text={option}
              onClick={e => {
                e.preventDefault();
                handleCheckbox(field.label, option);
              }}
            />
            <input
              type="checkbox"
              name={field.label}
              id={`${field.label}-${option}`}
              value={option}
              checked={selected}
              onChange={() => handleCheckbox(field.label, option)}
            />
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="CheckAccordion">
      {isGrouped ? renderGrouped() : renderFlat()}
    </div>
  );
};

export default CheckAccordion;
