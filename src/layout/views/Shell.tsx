import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Icon, Layout } from 'antd';

import * as LayoutActions from '@app/layout/actions';
import { Menus } from '@app/layout/components';
import { State } from '@app/root';
import { Routes } from '@app/routes';

const { Content, Header, Sider }  = Layout;

interface Props extends RouteComponentProps<{}> {
  collapsed: boolean;
  toggleSider: () => LayoutActions.ToggleSiderAction;
}

const Shell: React.SFC<Props> = ({ collapsed, toggleSider }) => (
  <Layout style={{ height: '100%' }}>
    <Sider
      trigger={ null }
      collapsible
      collapsed={ collapsed }
    >
      <div className="logo" />
      <Menus />
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={ collapsed ? 'menu-unfold' : 'menu-fold' }
          onClick={ toggleSider }
        />
      </Header>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
        <Routes />
      </Content>
    </Layout>
  </Layout>
);

const mapStateToProps = (state: State) => ({
  collapsed: state.layout.siderCollapsed,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleSider: () => dispatch(LayoutActions.ToggleSider())
});

export const ShellLayout = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Shell)
);