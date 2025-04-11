import { useRef, useState } from 'react';
import Button from '../../../components/Button/Button';
import FormControl from '../../../components/FormControl/FormControl';
import AccordionList from '../../../components/AccordionList/AccordionList';

const RecordFilter = ({ handleFilterDialog, isRecord }) => {
  const [checked, setChecked] = useState({});
  const watchStartDate = useRef(null);
  const watchEndDate = useRef(null);
  const watchComment = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      watchState: checked,
      watchStartDate: watchStartDate.current.value,
      watchEndDate: watchEndDate.current?.value || '',
      watchLocation: checked,
      watchRe: checked,
      watchFeel: checked,
      watchComment: watchComment.current?.value || '',
    };
    onsubmit(formData);

    console.log(formData);
  };

  const formFields = [
    {
      label: '관람 상태',
      type: 'buttons',
      options: ['다 본 영화', '재관람 영화', '중단한 영화'],
    },
    {
      label: '언제 관람하셨나요?',
      type: 'dates',
    },
    {
      label: '누구와 함께했나요?',
      type: 'buttons',
      options: [
        '친구',
        '연인﹒배우자',
        '지인﹒동료',
        '혼자',
        '아이',
        '부모님',
        '반려동물',
        '친척﹒형제',
        '기타',
      ],
    },
    {
      label: '어디서 시청하셨나요?',
      type: 'buttons',
      options: ['영화관', '집', '카페', '비행기', 'OTT', '기타'],
    },
    {
      label: '다시 볼 의향이 있나요?',
      type: 'buttons',
      options: ['네 있어요', '애매해요', '아니요 안볼래요'],
    },
    {
      label: '어떤 영화였나요?',
      type: 'buttons',
      options: [
        'N차 관람 확정',
        '내 취향 저격',
        '장면 하나가 계속 떠올라요',
        '끝나고 멍해졌어요',
        '생각보다 별로였어요',
        '재밌었는데 설명은 어려운 영화',
        '내 감정 어지럽힘',
      ],
    },
    {
      label: '추가적인 코멘트를 남겨보세요!',
      type: 'textarea',
    },
  ];

  return (
    <div className="RecordFilter">
      <div className={`filterList ${isRecord ? '' : 'hide'}`}>
        <form>
          {formFields.map((field, idx) => (
            <FormControl key={idx} label={field.label}>
              {/* 버튼 */}
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
                      id={option}
                      value={option}
                      checked={checked[field.label] === option}
                      onChange={() =>
                        setChecked(prev => ({
                          ...prev,
                          [field.label]: option,
                        }))
                      }
                    />
                  </span>
                ))}
              {/* 날짜 */}
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
              {/* textarea */}
              {field.type === 'textarea' && <textarea ref={watchComment} />}
            </FormControl>
          ))}
          <Button
            styleType={'full'}
            styleSize={'large'}
            text={'저장'}
            onsubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default RecordFilter;
