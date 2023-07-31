import { Layout as AntdLayout, Menu } from 'antd';
import { Link, Outlet } from 'umi';
import './index.less'

const { Header, Content } = AntdLayout;

export default function Layout() {
  return (
    <AntdLayout
      className='layout'
    >
      <Header>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['main']}
          items={[
            {key: 'main', label: <Link to="/">Main</Link>},
            {key: 'xflow', label: <Link to="/xflow">XFlow</Link>}
          ]}
        ></Menu>
      </Header>

      <Content>
        <div><Outlet/></div>
      </Content>
    </AntdLayout>
  );
}
