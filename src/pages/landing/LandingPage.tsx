import React from 'react';
import { detailData } from '@/entities/constant/detailData';
import type { DetailMenu } from '@/entities/types/types';
import { cn } from '@/shared';
import { useParams } from 'react-router-dom';
import ActiveMenu from '@/shared/components/active-menu/ActiveMenu';

const LandingPage = () => {
  const { id } = useParams<{ id: string }>();

  const landingPageData = detailData[Number(id)];
  const menuNames = landingPageData.activeMenus.map((menu) => menu.menuName);
  const menuIds = landingPageData.activeMenus.map((menu) => menu.eng);

  return (
    <div className={cn('landing__page__all')}>
      <div
        className={cn('landing__top__design w-full h-[800px] relative')}
        style={{
          background: `url(${landingPageData.topDetailPageDesign[0]}) no-repeat top`,
        }}
      >
        <img
          src={landingPageData.topDetailPageDesign[1]}
          alt="Top Design"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[44%] mt-[100px]"
        />
      </div>
      {landingPageData.activeMenus.map((menuComp: DetailMenu, index: number) =>
        index === 0 ? (
          <section
            key={menuComp.menuName}
            id={menuComp.eng}
            className={cn('landing__section')}
          >
            <ActiveMenu menuNames={menuNames} menuIds={menuIds} />
            {menuComp.component.map((comp: React.ReactNode, i: number) => {
              return comp;
            })}
          </section>
        ) : (
          <section
            key={menuComp.menuName}
            id={menuComp.eng}
            className={cn('landing__section')}
          >
            {menuComp.component.map((comp: React.ReactNode, i: number) => {
              return comp;
            })}
          </section>
        ),
      )}
    </div>
  );
};

export default LandingPage;
