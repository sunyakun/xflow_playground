import { Layout as AntdLayout, Menu } from 'antd';
import { Link, Outlet } from 'umi';
import './index.less'
import { ReactComponent as TraefikIcon } from "../assets/avatar.svg"


const { Header, Content } = AntdLayout;

export default function Layout() {
  return (
    <AntdLayout
      className='layout'
    >
      <Header style={{ display: 'flex' }}>
        <Link to="/">
          <TraefikIcon style={{ verticalAlign: 'middle', marginRight: 10 }}></TraefikIcon>
        </Link>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['main']}
          items={[
            {key: 'main', label: <Link to="/">Main</Link>},
            {key: 'xflow', label: <Link to="/xflow">XFlow</Link>}
          ]}
          style={{ flex: 'auto'}}
        ></Menu>
      </Header>

      <Content>
        <div><Outlet/></div>
      </Content>
    </AntdLayout>
  );
}
