import { Switch } from 'antd';
import { BulbOutlined, MoonOutlined } from '@ant-design/icons';
import { useUIStore } from '../store/uiStore';

const ThemeSelector = () => {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  return (
    <Switch
      checked={theme === 'dark'}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<BulbOutlined />}
      onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      style={{ marginLeft: 8 }}
    />
  );
};

export default ThemeSelector;

