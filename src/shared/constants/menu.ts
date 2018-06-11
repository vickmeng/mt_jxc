import { Menu } from '@app/shared/models';

export const menus: Menu[] = [
  {
    id: 1,
    title: '订单',
    icon: 'profile',
    subMenus: [
      {
        id: 101,
        title: '订单管理',
        link: '/order/orderList',
      }]
  },
  {
    id: 2,
    title: '商品管理',
    icon: 'shopping-cart',
    subMenus: [
      {
        id: 201,
        title: '商品列表',
        link: '/product/list',
      }]
  },
  {
    id: 4,
    title: '库存',
    icon: 'database',
    subMenus: [
      {
        id: 401,
        title: '商品库存',
        link: '/warehouse/inventory',
      },
      {
        id: 402,
        title: '商品入库',
        link: '/warehouse/inOut/in',
      },
      {
        id: 403,
        title: '商品出库',
        link: '/warehouse/inOut/out',
      },
      {
        id: 405,
        title: '库存调拨',
        link: '/warehouse/transfer',
      },
      {
        id: 406,
        title: '出入库明细',
        link: '/warehouse/inOutList',
      },
    ]
  },
  {
    id: 5,
    title: '设置',
    icon: 'setting',
    subMenus: [
      {
        id: 501,
        title: '商品分类',
        link: '/setting/category',
      },
      {
        id: 502,
        title: '商品品牌',
        link: '/setting/brand',
      },
      {
        id: 503,
        title: '计量单位',
        link: '/setting/unit',
      },
      {
        id: 504,
        title: '经销商级别',
        link: '/setting/dealer-level',
      },
      {
        id: 505,
        title: '仓库',
        link: '/setting/warehouse',
      },
      {
        id: 506,
        title: '经销商',
        link: '/setting/dealer',
      },
      {
        id: 507,
        title: '订单处理流程',
        link: '/setting/order-progress',
      },
    ]
  }
];