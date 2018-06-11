import * as React from 'react';

interface Props {
  discount: number;
}

export const Discount: React.SFC<Props> = ({ discount }) => (
  <span>{ Math.round(discount * 100) }%</span>
);
