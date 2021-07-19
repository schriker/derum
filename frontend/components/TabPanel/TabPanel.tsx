interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
