import Button from '../../../components/Button/Button';
import FormControl from '../../../components/FormControl/FormControl';
import { formField } from '../../../constants/formField';

const RecordFilter = ({
  handleFilterDialog,
  isRecord,
  handleSubmit,
  checked,
  setChecked,
  watchRefs,
}) => {
  const handleRadio = (label, option) => {
    setChecked(prev => ({
      ...prev,
      [label]: option,
    }));
  };
  const handleCheckbox = (label, option) => {
    setChecked(prev => ({
      ...prev,
      [label]: prev[label]?.includes(option)
        ? prev[label].filter(item => item !== option)
        : [...(prev[label] || []), option],
    }));
  };

  return (
    <aside className={`RecordFilter ${isRecord ? '' : 'hide'}`}>
      <section className="filterList">
        <header onClick={handleFilterDialog}>
          <button />
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
                        handleRadio(field.label, option);
                      }}
                    />
                    <input
                      type="radio"
                      name={field.label}
                      id={`${field.label}-${option}`}
                      value={option}
                      checked={checked[field.label] === option}
                      onChange={() => handleRadio(field.label, option)}
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
                      ref={el => (watchRefs.current.startDate = el)}
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
                      ref={el => (watchRefs.current.endDate = el)}
                    />
                  </div>
                </section>
              )}
              {field.type === 'textarea' && (
                <textarea
                  ref={el => (watchRefs.current.comment = el)}
                  placeholder="추가적으로 남기고 싶은 코멘트가 있다면 자유롭게 작성해주세요!"
                />
              )}
            </FormControl>
          ))}
          <Button
            styleType="full"
            styleSize="large"
            text="저장"
            onClick={handleSubmit}
          />
        </form>
      </section>
    </aside>
  );
};

export default RecordFilter;
