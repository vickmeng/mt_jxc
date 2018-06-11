export type orderStatusType = 'DDZT_DDDSH'|
'DDZT_DCWSH'|
'DDZT_DCKSH'|
'DDZT_DFHQR'|
'DDZT_DSHQR'|
'DDZT_YWC'|
'DDZT_YZF'

export const orderStatusMap = {
    DDZT_DDDSH: '待订单审核',
    DDZT_DCWSH: '待财务审核',
    DDZT_DCKSH: '待出库审核',
    DDZT_DFHQR: '待发货确认',
    DDZT_DSHQR: '待收货确认',
    DDZT_YWC: '已完成',
    DDZT_YZF: '已作废',
}

export const payStatusMap = {
    ZFZT_WFK:'未付款',
    ZFZT_FKDSH:'付款待审核',
    ZFZT_YFK:'已付款',
    ZFZT_YZF:'已作废',
    ZFZT_BFFK:'部分付款'
}
export const isSaleMap = {
    true:'特价',
    false:'非特价'
}

export const cargoStatusMap = {
    FHZT_DFH :'待发货',
    FHZT_BFFH :'部分发货',
    FHZT_YFH :'已发货',
    FHZT_DSH :'待收货',
    FHZT_YSH :'已收货',
}

export const stockStatusMap ={
    CKZT_BHZ: '备货中',
    CKZT_BFCK :'部分出库',
    CKZT_YCK: '已出库',
}
export const operateTypeMap = {
    CZLX_CJDHD :'创建订货单',
    CZLX_DHDDDSH :'订货单订单审核',
    CZLX_DHDYZF :'订货单已作废',
    CZLX_DHDTHZF :'订货单退回作废',
    CZLX_DHDCWSH :'订货单财务审核',
    CZLX_DHDTHCS :'订货单退回重审',
    CZLX_DHDCKSH :'订货单出库审核',
    CZLX_DHDQRFH :'订货单确认发货',
    CZLX_DHDYWC :'订货单已完成',
}
export const contentMap = {
    CZRZ_YTJDHD :'已提交订货单',
    CZRZ_DHDYTGDDSH :'订货单已通过订单审核',
    CZRZ_DHDBZF :'订货单被作废',
    CZRZ_DHDWTGDDSH :'订货单未通过订单审核',
    CZRZ_DHDYTGCWSH :'订货单已通过财务审核',
    CZRZ_DHDWTGCWSH :'订货单未通过财务审核',
    CZRZ_DHDYTGCKSH :'订货单已通过出库审核',
    CZRZ_DHDWTGCKSH :'订货单未通过出库审核',
    CZRZ_DHDYQRFH :'订货单已确认发货',
    CZRZ_DHDWQRFH :'订货单未确认发货',
    CZRZ_DHDYQRSH :'订货单已确认收货',
    CZRZ_DDYWC :'订单已完成',
}