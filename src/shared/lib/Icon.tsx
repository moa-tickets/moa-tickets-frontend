import React from 'react';
import type { IconList } from '@/entities/constant/IconDatas';
import ICON_DATAS from '@/entities/constant/IconDatas';

const Icon = React.memo(
  ({ ICON, className }: { ICON: IconList; className: string }) => {
    const iconData = ICON_DATAS[ICON];

    return (
      <svg
        viewBox={iconData.rect}
        className={className}
        style={{ display: 'block' }}
      >
        {iconData.svgChild}
      </svg>
    );
  },
);

export default Icon;
