import { TabType, TabLabel } from '../../../../constants/tabs';

const Tabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <ul className="tabs">
      {Object.values(TabType).map(tabType => (
        <li
          className={selectedTab === tabType ? 'active' : ''}
          key={tabType}
          onClick={() => setSelectedTab(tabType)}
        >
          {TabLabel[tabType]}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
