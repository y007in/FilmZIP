import { TabLabel, TabReview } from '../../../../constants/tabs';

const Tabs = ({ selectedTab, onChange }) => {
  return (
    <ul className="tabs">
      {Object.values(TabReview).map(tabReview => (
        <li
          key={tabReview}
          className={`tab ${selectedTab === tabReview ? 'active' : ''}`}
          onClick={() => onChange(tabReview)}
        >
          {TabLabel[tabReview]}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
