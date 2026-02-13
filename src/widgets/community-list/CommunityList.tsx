import {
  GET_BOARD,
  OPEN_WRITE_MODAL,
  type MainBoardData,
} from '@/entities/reducers/BoardReducer';
import { useCommunity } from '@/features/community/useCommunity';
import { cn } from '@/shared';
import CommunitySearcher from '@/shared/components/community-searcher/CommunitySearcher';
import BoardList from './BoardList';
import WriteModal from './WriteModal';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CommunityList({
  concertName,
}: {
  concertName: string;
}) {
  const { getCommunityData, getCommunityLoading } = useCommunity();
  const { data: boardData, write: writeData } = useSelector(
    (state: { boardReducer: MainBoardData }) => state.boardReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (getCommunityData) {
      dispatch({
        type: GET_BOARD,
        payload: {
          data: getCommunityData,
        },
      });
    }
  }, [dispatch, getCommunityData]);

  return (
    <>
      {writeData.isModalOpen && (
        <WriteModal isModalOpen={writeData.isModalOpen} />
      )}
      <div className={cn('community__list')}>
        <div className={cn('community__list__inner', 'max-w-[1080px] mx-auto')}>
          <div
            className={cn(
              'community__list__header',
              'flex items-center gap-[8px] mb-[20px]',
            )}
          >
            <span
              className={cn('community__header__start text-[14px] text-[#777]')}
            >
              {concertName}
            </span>
            <ChevronRight
              className={cn('community__header__icon', 'text-[#777]')}
              size={16}
            />
            <span>커뮤니티</span>
          </div>
          <div className="community__list__second flex justify-between items-center mb-[30px]">
            <CommunitySearcher />
            <button
              className={cn(
                'community__list__button bg-[#161339] px-[14px] py-[6px] rounded-[6px] text-white text-[14px] cursor-pointer',
              )}
              onClick={() => {
                dispatch({ type: OPEN_WRITE_MODAL });
              }}
            >
              글 작성하기
            </button>
          </div>
        </div>
        <BoardList data={boardData} isLoading={getCommunityLoading} />
      </div>
    </>
  );
}
