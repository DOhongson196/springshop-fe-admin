import React, { useState} from 'react';
import 'antd/dist/reset.css';
import './DashboardPage.css';
import {
    MdOutlineHome,MdCategory,MdSupervisorAccount,
    MdAddCircleOutline,MdFormatListBulleted,MdManageAccounts,
    MdRequestPage,MdInsertChartOutlined,MdOutlineShoppingBag,
    MdOutlineInventory2,MdLogout
 } from 'react-icons/md'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Col, Layout, Menu, Row, theme } from 'antd';
import { Routes,Route,Outlet,useNavigate  } from 'react-router-dom';
import Home from '../components/home/Home';
import ListCategory from '../components/categories/ListCategory';
import AddOrEditCategory from '../components/categories/AddOrEditCategory';

const { Header, Sider, Content } = Layout;

function DashboardPage() {
    const [collapsed, setCollapsed] = useState(false);
    const [marginLeft, setMarginLeft] = useState(200);

    const navigate = useNavigate();

    const siteLayoutStyle = {marginLeft: marginLeft};
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return ( 
      
        <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
        style={{overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: '0px',
                top: '0px',
                bottom: '0px',
    }}
      >
        <div className="logo">
            <h2>{collapsed?'SS' : 'SpringShop'}</h2>
            </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <MdOutlineHome/>,
              label: 'Home',
              onClick: () => navigate('/'),
            },
            {
              key: '2',
              icon: <MdCategory />,
              label: 'Categories',
              children: [
                {
                    key: '21',
                    icon: <MdAddCircleOutline />,
                    label: 'Add Category',
                    onClick: () => navigate('/categories/add'),
                  },
                  {
                    key: '22',
                    icon: <MdFormatListBulleted />,
                    label: 'List Categories',
                    onClick: () => navigate('/categories/list'),
                  },
              ]
            },
            {
              key: '3',
              icon: <MdOutlineInventory2/>,
              label: 'Products',
            },
            {
                key: '4',
                icon: <MdOutlineShoppingBag/>,
                label: 'Orders',
              },
              {
                key: '5',
                icon: <MdRequestPage/>,
                label: 'Invoices',
              },
              {
                key: '6',
                icon: <MdInsertChartOutlined/>,
                label: 'Statistics',
              },
              {
                key: '7',
                icon: <MdManageAccounts/>,
                label: 'Profiles',
              },
              {
                key: '8',
                icon: <MdSupervisorAccount/>,
                label: 'Accounts',
              },
              {
                key: '9',
                icon: <MdLogout/>,
                label: 'Logout',
              },
              
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={siteLayoutStyle}>
        <Header style={{
            padding: 0,
            background: colorBgContainer,
            position: 'fixed',
            top: 0,
            height: 70,
            right: 16,
            left: marginLeft + 16,
            }}>
            <Row>
                <Col md={20}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => {
                const sts = !collapsed;
                setCollapsed(sts)
                setMarginLeft(sts ? 80 : 200) 
                }
          })}

                </Col>
                <Col md={4}>
                    <div>
                        <Avatar size='default' icon={<UserOutlined/>}></Avatar>
                        Do Hong Son
                    </div>
                </Col>
            </Row>
        </Header>
        <Content
          style={{
            margin: '90px 16px 10px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/categories/add" element={<AddOrEditCategory />}></Route>
              <Route path="/categories/list" element={<ListCategory />}></Route>
            </Routes>
            <Outlet></Outlet> 
          </div>
        </Content>
      </Layout>
        </Layout>
     );
}

export default DashboardPage;



