import { useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import DelBtn from '../../../components/Button/DelBtn';
import FormControl from '../../../components/FormControl/FormControl';

import { formField } from '../../../constants/formField';

const RecordFilter = ({
  handleFilterDialog,
  isRecord,
  handleSubmit,
  watch,
  setWatch,
}) => {
  const checked = watch.checked;
  const [isDisable, setIsDisable] = useState(false);

  //버튼 활성화 & 유효성 검사
  useEffect(() => {
    const isAllSelected = formField.every(field => {
      const value = checked[field.label];
      if (field.type === 'buttons') {
        return Boolean(value);
      }
      if (field.type === 'buttonsCheck') {
        return Array.isArray(value) && value.length > 0;
      }
      if (field.type === 'dates') {
        return Boolean(watch.startDate) && Boolean(watch.endDate);
      }
      return true;
    });
    setIsDisable(isAllSelected);
  }, [watch, checked]);

  //폼 선택
  const handleRadio = (label, option) => {
    setWatch(prev => ({
      ...prev,
      checked: {
        ...prev.checked,
        [label]: option,
      },
    }));
  };
  const handleCheckbox = (label, option) => {
    setWatch(prev => ({
      ...prev,
      checked: {
        ...prev.checked,
        [label]: checked[label]?.includes(option)
          ? checked[label].filter(item => item !== option)
          : [...(checked[label] || []), option],
      },
    }));
  };

  return (
    <>
      <div
        className={`filterOverlay ${isRecord ? '' : 'hide'}`}
        onClick={handleFilterDialog}
      ></div>
      <aside className={`RecordFilter ${isRecord ? '' : 'hide'}`}>
        <section className="filterList">
          <span className="close" onClick={handleFilterDialog}>
            <DelBtn />
          </span>

          <form onSubmit={handleSubmit}>
            {formField.map((field, idx) => (
              <FormControl key={idx} label={field.label} inputType={field.type}>
                {field.type === 'buttons' &&
                  field.options.map((option, i) => (
                    <span key={i}>
                      <Button
                        styleType={
                          checked[field.label] === (option.value || option)
                            ? 'brandSolid'
                            : ''
                        }
                        styleSize={'small'}
                        text={option.label || option}
                        onClick={e => {
                          e.preventDefault();
                          handleRadio(field.label, option.value || option);
                        }}
                      />
                      <input
                        type="radio"
                        name={field.label}
                        id={`${field.label}-${option.value || option}`}
                        value={option.value || option}
                        checked={
                          checked[field.label] === (option.value || option)
                        }
                        onChange={() =>
                          handleRadio(field.label, option.value || option)
                        }
                      />
                    </span>
                  ))}
                {field.type === 'buttonsCheck' &&
                  field.options.map((option, i) => {
                    const selected = (checked[field.label] || [])?.includes(
                      option,
                    );
                    return (
                      <span key={i}>
                        <Button
                          styleType={selected ? 'brandSolid' : ''}
                          styleSize={'small'}
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
                {field.type === 'dates' && (
                  <section className="dateContent">
                    <div className="dates">
                      <label htmlFor="start-date" className="subLabel">
                        시작일
                      </label>
                      <input
                        type="date"
                        id="start-date"
                        name="start-date"
                        max={watch.endDate}
                        value={watch.startDate}
                        onChange={e =>
                          setWatch({ ...watch, startDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="dates">
                      <label htmlFor="end-date" className="subLabel">
                        종료일
                      </label>
                      <input
                        type="date"
                        id="end-date"
                        name="end-date"
                        value={watch.endDate}
                        min={watch.startDate}
                        max={watch.endDate}
                        onChange={e =>
                          setWatch({ ...watch, endDate: e.target.value })
                        }
                      />
                    </div>
                  </section>
                )}
                {field.type === 'textarea' && (
                  <textarea
                    value={watch.comment}
                    placeholder="추가적으로 남기고 싶은 코멘트가 있다면 자유롭게 작성해주세요!"
                    onChange={e =>
                      setWatch({ ...watch, comment: e.target.value })
                    }
                  />
                )}
              </FormControl>
            ))}
            <Button
              styleType={isDisable ? 'full' : 'disabled'}
              styleSize="large"
              text="저장"
              onClick={handleSubmit}
              disabled={!isDisable}
            />
          </form>
        </section>
      </aside>
    </>
  );
};

export default RecordFilter;
