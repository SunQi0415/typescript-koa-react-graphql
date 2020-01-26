import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Breadcrumb, Icon, Avatar, message } from 'antd';
const { Header, Content, Footer, Sider }  = Layout;
const { SubMenu } = Menu;
import '@/layout/default.scss';

import WorkTable from '../containers/WorkTable';
import AuthManage from '../containers/AuthManage';
import LoggerManage from '../containers/LoggerManage';
// import ProjectManage from '../containers/ProjectManage';
import WorkOrder from '../containers/ProjectManage/WorkOrder';
import TaskGantt from '../containers/ProjectManage/TaskGantt';

interface LayoutProps {

}

interface LayoutState {
  collapsed: boolean;
}

const naviRightAccountClick = ({ key }: any) => {
  message.info(`Click on item ${key}`);
};

const naviRightAccount = (
  <Menu onClick={naviRightAccountClick}>
    <Menu.Item key="1"><Icon type="user" /> 个人中心</Menu.Item>
    <Menu.Item key="2"><Icon type="setting" /> 系统设置</Menu.Item>
    <Menu.Item key="3"><Icon type="logout" /> 退出登录</Menu.Item>
  </Menu>
);

export class LayoutDefault extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props)
  }

  state: LayoutState = {
    collapsed: false
  };

  public render(): JSX.Element {
    return (
      <>
        <Layout className="wrapper">
          <Header className="header navi">
          <section className="fl">
            <div className="logo">Logo</div>
          </section>
          <section className="fr">
            <Icon type="question-circle" className="item" />
            <Icon type="bell" className="item" />
            <Icon type="fullscreen" className="item" />
            <Dropdown overlay={naviRightAccount} className="item">
              <a className="ant-dropdown-link" href="#" style={{ fontSize: '16px' }}>
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
                <span className="user">Sun</span>
                <Icon type="down" />
              </a>
            </Dropdown>
          </section>
        </Header>
          <Layout className="main-wrap">
            <Sider className="sider-menu">
              <Menu
                mode="inline"
                theme="light"
                defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
              >

                <Menu.Item key="1">
                  <Link to="/work_table">
                    <Icon type="rocket" />
                    工作台
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/manage/auth">
                    <Icon type="team" />
                    权限管理
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/manage/logger">
                    <Icon type="file-sync" />
                    日志管理
                  </Link>
                </Menu.Item>
                <SubMenu key="sub1" title={
                  <span>
                    <Icon type="project" />
                    <span>项目管理</span>
                  </span>
                }>
                  <Menu.Item key="4">
                    <Link to="/manage/project/work_order">
                      <Icon type="ordered-list" />
                      工单系统
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/manage/project/task_gantt">
                      <Icon type="schedule" />
                      任务甘特图
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content className="content-wrap">
              <section className="content">
                <Switch>
                  <Route path="/work_table" component={WorkTable}></Route>
                  <Route path="/manage/auth" component={AuthManage}></Route>
                  <Route path="/manage/logger" component={LoggerManage}></Route>
                  <Route path="/manage/project/work_order" component={WorkOrder}></Route>
                  <Route path="/manage/project/task_gantt" component={TaskGantt}></Route>
                </Switch>
              </section>
              {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Content>
          </Layout>
        </Layout>
      </>
    )
  }
}