import { useRef, useState } from 'react';
import Button from '../../../components/Button/Button';
import FormControl from '../../../components/FormControl/FormControl';
import { formField } from '../../../constants/formField';
import AccordionList from '../../../components/AccordionList/AccordionList';

const RecordFilter = ({
  handleFilterDialog,
  isRecord,
  setIsRecord,
  onsubmit,
}) => {
  const [checked, setChecked] = useState({});
  const watchStartDate = useRef(null);
  const watchEndDate = useRef(null);
  const watchComment = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      selections: checked,
      watchStartDate: watchStartDate.current?.value || '',
      watchEndDate: watchEndDate.current?.value || '',
      watchComment: watchComment.current?.value || '',
    };
    setIsRecord(false);
    if (onsubmit) onsubmit(formData);

    alert('저장되었습니다');
    console.log(formData);
  };

  const toggleCheckbox = (label, option) => {
    setChecked(prev => ({
      ...prev,
      [label]: prev[label]?.includes(option)
        ? prev[label].filter(item => item !== option)
        : [...(prev[label] || []), option],
    }));
  };

  return (
    <div className={`RecordFilter ${isRecord ? '' : 'hide'}`}>
      <div className="filterList">
        <header onClick={handleFilterDialog}>
          <div></div>
        </header>
        <form onSubmit={handleSubmit}>
          {formField.map((field, idx) => (
            <FormControl key={idx} label={field.label} inputType={field.type}>
              {field.type === 'buttons' &&
                field.options.map((option, i) => (
                  <span key={i}>
                    <Button
                      styleType={
                        checked[field.label] === option ? 'brandSolid' : ''
                      }
                      text={option}
                      onClick={e => {
                        e.preventDefault();
                        setChecked(prev => ({
                          ...prev,
                          [field.label]: option,
                        }));
                      }}
                    />
                    <input
                      type="radio"
                      name={field.label}
                      id={`${field.label}-${option}`}
                      value={option}
                      checked={checked[field.label] === option}
                      onChange={() =>
                        setChecked(prev => ({ ...prev, [field.label]: option }))
                      }
                    />
                  </span>
                ))}
              {field.type === 'buttonsCheck' &&
                field.options.map((option, i) => {
                  const selected = checked[field.label]?.includes(option);
                  return (
                    <span key={i}>
                      <Button
                        styleType={selected ? 'brandSolid' : ''}
                        text={option}
                        onClick={e => {
                          e.preventDefault();
                          toggleCheckbox(field.label, option);
                        }}
                      />
                      <input
                        type="checkbox"
                        name={field.label}
                        id={`${field.label}-${option}`}
                        value={option}
                        checked={selected}
                        onChange={() => toggleCheckbox(field.label, option)}
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
                      ref={watchStartDate}
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
                      ref={watchEndDate}
                    />
                  </div>
                </section>
              )}
              {field.type === 'textarea' && (
                <textarea
                  ref={watchComment}
                  placeholder="추가적으로 남기고 싶은 코멘트가 있다면 자유롭게 작성해주세요!"
                />
              )}
            </FormControl>
          ))}
          <Button
            styleType={'full'}
            styleSize={'large'}
            text={'저장'}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default RecordFilter;
