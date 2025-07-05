import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../../components/Badge/Badge';
import AlertBox from '../../../../components/AlertBox/AlertBox';
import RecordFilter from '../../../../components/RecordFilter/RecordFilter';
import { getWatchStatusLabel } from '../../../../constants/formField';
import { setMovieRecords } from '../../../../utils/storage';
import { useMovieForm } from '../../../../hooks/useMovieForm';

const ReviewAction = ({ id, record, recordList, setRecordList }) => {
  const [isRecord, setIsRecord] = useState(false);
  const [alertTargetId, setAlertTargetId] = useState(null);
  const [editTargetId, setEditTargetId] = useState(null);
  const navigate = useNavigate();
  const { watch, setWatch, getEditFormData, initialData } =
    useMovieForm(record);

  //삭제
  const openAlert = id => setAlertTargetId(id);

  const handleDelMovie = createId => {
    const updatedRecords = recordList.filter(
      item => item.createId !== createId,
    );
    setMovieRecords(updatedRecords);
    setRecordList(updatedRecords);
    updatedRecords.filter(item => item.movieId === Number(id)).length === 0 &&
      navigate('/');
    setAlertTargetId(null);
  };
  //수정
  const openEdit = createId => {
    const record = recordList.find(r => r.createId === createId);
    if (!record) return;
    setWatch(initialData);
    setEditTargetId(createId);
    setIsRecord(true);
  };

  const handleFilterDialog = () => {
    setIsRecord(!isRecord);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const updatedData = getEditFormData();
    const updatedRecords = recordList.map(record =>
      record.createId === editTargetId ? { ...record, ...updatedData } : record,
    );

    setMovieRecords(updatedRecords);
    setRecordList(updatedRecords);
    setIsRecord(false);
    setEditTargetId(null);
  };
  return (
    <div className="head">
      <Badge
        text={getWatchStatusLabel(record.watchStatus)}
        badgeType={`${record.watchStatus}`}
      />
      <article>
        <button className="reviewBtn" onClick={() => openEdit(record.createId)}>
          수정
        </button>
        {editTargetId === record.createId && (
          <RecordFilter
            handleFilterDialog={handleFilterDialog}
            handleSubmit={handleSubmit}
            isRecord={isRecord}
            setIsRecord={setIsRecord}
            watch={watch}
            setWatch={setWatch}
          />
        )}
        <button
          className="reviewBtn"
          onClick={() => openAlert(record.createId)}
        >
          삭제
        </button>
        {alertTargetId === record.createId && (
          <AlertBox
            alertText={'정말 삭제하시겠습니까?'}
            submitText={'삭제'}
            onSubmit={() => {
              handleDelMovie(record.createId);
            }}
            onCancel={() => setAlertTargetId(null)}
          />
        )}
      </article>
    </div>
  );
};

export default ReviewAction;
