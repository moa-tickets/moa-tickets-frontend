import { mypageMenus } from '@/entities/constant/mypageMenus';
import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';
import { Link, useLocation } from 'react-router-dom';

const MyPageAside = () => {
  const location = useLocation();

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
                // 예매 상세 페이지도 마이 티켓 메뉴가 active 상태가 되도록 처리
                const isActive =
                  location.pathname === child.childLink ||
                  (child.childLink === '/mypage/reservation' &&
                    location.pathname.startsWith('/mypage/reservation'));

                return (
                  <dt key={child.childMenu}>
                    <Link
                      to={child.childLink}
                      className={cn(
                        'text-[14px] font-light hover:font-bold block',
                        isActive ? 'text-[#fa2828] font-bold relative' : '',
                      )}
                    >
                      <span>{child.childMenu}</span>
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
