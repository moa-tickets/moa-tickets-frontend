import { useCallback, useState } from 'react';
import { cn } from '@/shared';
import {
  mypageMenus,
  type OneDepth,
  type TwoDepth,
} from '@/entities/constant/mypageMenus';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { LoginState } from '@/entities/reducers/LoginReducer';
import ConfirmModal from '../confirm-modal/ConfirmModal';

const PREPARING_LINKS = new Set([
  '/mypage/info-edit',
  '/mypage/withdrawal',
  '/mypage/inquiry',
  '/mypage/selectInquiry',
]);

const MyPageAside = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isSeller } = useSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer,
  );

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const isPreparing = (link: string) => PREPARING_LINKS.has(link);

  return (
    <>
      {isModalOpen && (
        <ConfirmModal
          title="알림"
          message="준비중인 서비스입니다."
          isOpen={isModalOpen}
          onClose={handleClose}
        />
      )}
      <div className={cn('w-[250px] h-[500px] bg-white px-[26px] py-[20px]')}>
        {mypageMenus.map((one_depth: OneDepth) => (
          <div
            key={one_depth.id}
            className={cn(
              'aside__element pb-[14px] pt-[10px] px-[10px] border-b border-solid border-[rgb(237,237,237)]',
            )}
          >
            <h2 className={cn('text-[16px] font-bold mb-[14px]')}>
              {one_depth.parentMenu}
            </h2>
            <div className={cn('child__link flex flex-col gap-[8px]')}>
              {one_depth.id === 3
                ? one_depth.child.map((two_depth: TwoDepth) => {
                    const link = isSeller
                      ? two_depth.childLink.split('|')[1]
                      : two_depth.childLink.split('|')[0];
                    const menu = isSeller
                      ? two_depth.childMenu.split('|')[1]
                      : two_depth.childMenu.split('|')[0];

                    return isPreparing(link) ? (
                      <button
                        type="button"
                        className={cn(
                          'text-[14px] text-[rgb(135,141,149)] text-left cursor-pointer',
                        )}
                        onClick={() => setIsModalOpen(true)}
                        key={two_depth.childMenu}
                      >
                        {menu}
                      </button>
                    ) : (
                      <Link
                        className={cn('text-[14px] text-[rgb(135,141,149)]')}
                        to={link}
                        key={two_depth.childMenu}
                      >
                        {menu}
                      </Link>
                    );
                  })
                : one_depth.child.map((two_depth: TwoDepth) =>
                    isPreparing(two_depth.childLink) ? (
                      <button
                        type="button"
                        key={two_depth.childMenu}
                        className={cn(
                          'text-[14px] text-[rgb(135,141,149)] text-left cursor-pointer',
                        )}
                        onClick={() => setIsModalOpen(true)}
                      >
                        <span>{two_depth.childMenu}</span>
                      </button>
                    ) : (
                      <Link
                        to={two_depth.childLink}
                        key={two_depth.childMenu}
                        className={cn(
                          'text-[14px] text-[rgb(135,141,149)]',
                          location.pathname === two_depth.childLink &&
                            'text-[rgb(250,40,40)] flex justify-between items-center',
                        )}
                      >
                        <span>{two_depth.childMenu}</span>
                        {location.pathname === two_depth.childLink && (
                          <ChevronRight size={14} />
                        )}
                      </Link>
                    ),
                  )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyPageAside;
