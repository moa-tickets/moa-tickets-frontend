import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

const TicketCancelNotice = () => {
  const notices = [
    '예매한 티켓 전체 취소, 혹은 신용카드 결제 시 부분 취소가 가능합니다. 단, 일부 상품 및 스마트티켓 발권 시 부분취소가 불가합니다.',
    '티켓이 배송된 이후에는 인터넷이나 고객센터를 통한 취소가 불가하며, 받으신 티켓을 취소일 전까지 NHN LINK 본사로 반송을 해주셔야 취소 가능합니다. (등기우편을 이용해주세요!)',
    '예매 당일 자정까지 취소하실 경우는 예매수수료도 환불되며, 취소수수료가 부과되지 않습니다. 그 이후에 취소하실 경우는 예매수수료가 환불 되지 않으며, 취소수수료는 정책에 따라 부과됩니다.',
    '일부 경기의 경우 상황에 따라 일괄 취소 건이 발생할 수있으며, 일괄 취소 시에는 취소 수수료가 부과되지 않습니다.',
    '티켓의 날짜/시간/좌석 등급/좌석 위치 변경은 불가합니다. 자세한 안내가 필요할 경우 고객센터를 이용해주세요.',
    '구단 홈페이지에서 예매한 내역은 구단 홈페이지에서만 확인이 가능합니다.',
  ];

  return (
    <div className={cn('bg-[#F8F9FA] p-[22px] mt-[10px]')}>
      <div className={cn('flex items-center gap-[7px] mb-[24px]')}>
        <Icon ICON="INFO" className={cn('w-[16px] h-[16px]')} />
        <h3 className={cn('text-[14px] font-bold text-[#62676C]')}>
          티켓취소 안내
        </h3>
      </div>
      <ol className={cn('space-y-[22px]')}>
        {notices.map((notice, index) => (
          <li key={index} className={cn('flex gap-[6px]')}>
            <span
              className={cn(
                'w-[2px] h-[2px] rounded-full bg-[#878D95] mt-[10px] flex-shrink-0',
              )}
            />
            <p className={cn('text-[13px] text-[#878D95] leading-[22px]')}>
              {notice}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TicketCancelNotice;
