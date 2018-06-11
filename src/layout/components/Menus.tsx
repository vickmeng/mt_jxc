import * as React from 'react';
import { Link } from 'react-router-dom';

import { Icon, Menu } from 'antd';

import { Menu as MenuEntity, menus, SubMenu as SubMenuEntity } from '@app/shared';

const { Item: MenuItem, SubMenu } = Menu;

export const Menus: React.SFC<{}> = () => (
  <Menu theme="dark" mode="inline">
    { menus.map((menu: MenuEntity) => (
      <SubMenu
        key={ menu.id }
        title={
          <span><Icon type={ menu.icon } /><span>{ menu.title }</span></span>
        }
      >
        { menu.subMenus.map((subMenu: SubMenuEntity) => (
          <MenuItem key={ subMenu.id }>
            <Link to={ subMenu.link }>{ subMenu.title }</Link>
          </MenuItem>
        )) }
      </SubMenu>
    )) }
  </Menu>
);