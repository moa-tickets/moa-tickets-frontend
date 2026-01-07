import { mypageMenus } from '@/entities/constant/mypageMenus';
import { useLoginData } from '@/entities/stores/useLoginData';
import { useLoginDataFunction } from '@/features/login/useLoginDataFunction';
import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MyPageAside = () => {
  const location = useLocation();

  const { getLoginData } = useLoginDataFunction();
  const userData = useLoginData((state) => state.userData);

  useEffect(() => {
    getLoginData.mutate();
  }, []);

  console.log('userData:', userData);

  return (
    <div className={cn('my__page__aside w-[250px] px-[30px] pb-[30px]')}>
      <ul>
        {mypageMenus.map((menu: any) => (
          <li
            key={menu.id}
            className="pb-[20px] pt-[30px] border-b border-solid border-gray-300"
          >
            <dl>
              <dd className="text-[18px] font-bold mb-[20px]">
                {menu.parentMenu}
              </dd>
              {menu.child.map((child: any) => {
                // childLink에 | 가 있으면 seller 여부에 따라 분기
                const getChildLink = () => {
                  if (!child.childLink.includes('|')) return child.childLink;
                  const [buyerLink, sellerLink] = child.childLink.split('|');
                  return userData.seller ? sellerLink : buyerLink;
                };

                const currentLink = getChildLink();

                // 상세 페이지에서도 해당 메뉴가 active 상태가 되도록 처리
                const isActive =
                  location.pathname === currentLink ||
                  (currentLink === '/mypage/reservation' &&
                    location.pathname.startsWith('/mypage/reservation')) ||
                  (currentLink === '/mypage/inquiry' &&
                    location.pathname.startsWith('/mypage/inquiry'));

                const getMenuLabel = () => {
                  if (!child.childMenu.includes('|')) return child.childMenu;
                  const [buyerLabel, sellerLabel] = child.childMenu.split('|');
                  return userData.seller ? sellerLabel : buyerLabel;
                };

                return (
                  <dt key={child.childMenu}>
                    <Link
                      to={currentLink}
                      className={cn(
                        'text-[14px] font-light hover:font-bold block',
                        isActive ? 'text-[#fa2828] font-bold relative' : '',
                      )}
                    >
                      <span>{getMenuLabel()}</span>
                      {isActive && (
                        <Icon
                          ICON="ARROW_RIGHT"
                          className="w-[10px] h-[10px] fill-none absolute top-0 bottom-0 my-auto right-0"
                        />
                      )}
                    </Link>
                  </dt>
                );
              })}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPageAside;
