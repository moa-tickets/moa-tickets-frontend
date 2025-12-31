import { Link } from 'react-router-dom';

const SaleTicket = () => {
  const saleTicketArray = [
    {
      id: 1,
      imgSrc: '/sale_tickets/sale_tickets_1.gif',
      box: '12월세일',
      saleDate: '12/1 (월) ~ 12/31 (수)',
      title: '우리 이토록 작은 존재들',
      saleText: '입장권 30% 할인',
      originalPrice: 10000,
      discountedPrice: 7000,
    },
    {
      id: 2,
      imgSrc: '/sale_tickets/sale_tickets_2.gif',
      box: '연말특가',
      saleDate: '12/12 (금) ~ 12/31 (수)',
      title: '디 뮤지엄 취향 가옥 : Art in Life',
      saleText: '성인 전시입장권 연말특가 할인',
      originalPrice: 12000,
      discountedPrice: 7900,
    },
    {
      id: 3,
      imgSrc: '/sale_tickets/sale_tickets_3.gif',
      box: '고마워요|타임세일',
      saleDate: '12/30 (화) ~ 1/1 (목)',
      title: '뮤지컬<#0528>',
      saleText: 'R,S석 40% 할인',
      originalPrice: 66000,
      discountedPrice: 39600,
    },
  ];

  return (
    <div className="sale__ticket w-full pb-[30px] bg-white">
      <img
        src={'/main_banner/main_slide_1_detail_5.png'}
        alt="Sale Ticket Title"
        className="mx-auto max-w-[50%]"
      />
      <div className="ticket__sale__list max-w-[750px] mt-[100px] mx-auto">
        <ul className="grid grid-cols-2 gap-25">
          {saleTicketArray.map((ticket) => (
            <li key={ticket.id}>
              <Link to="/">
                <div className="ticket__image w-full mx-auto aspect-[2/3] relative">
                  <img
                    src={ticket.imgSrc}
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="ticket__image__box absolute px-[10px] py-[25px] bg-[#4154ff] text-white top-0 left-0 -translate-x-1/2">
                    {ticket.box.includes('|')
                      ? ticket.box.split('|').map((ti) => (
                          <span key={ti} className="block">
                            {ti}
                          </span>
                        ))
                      : ticket.box}
                  </div>
                  <div
                    className="sale__life mt-[20px] text-[26px] font-light text-[#666]"
                    style={{ letterSpacing: '-1px' }}
                  >
                    #{ticket.saleDate}
                  </div>
                  <div className="ticket__title mt-[10px] text-[30px] font-bold whitespace-nowrap overflow-hidden text-ellipsis pb-[20px] border-b border-solid border-[#ddd]">
                    {ticket.title}
                  </div>
                  <div className="ticket__sale__text mt-[10px] text-[26px] font-light text-[#666] flex items-center before:content-[''] before:block before:w-[6px] before:h-[6px] before:bg-[#666] before:rounded-full before:mr-[10px] whitespace-nowrap">
                    {ticket.saleText}
                  </div>
                  <div className="ticket__original mt-[10px] text-[28px]">
                    입장권{' '}
                    <span className="line-through text-[#999]">
                      {ticket.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="ticket__discounted mt-[5px] text-[34px] font-bold text-[#4154ff]">
                    {ticket.discountedPrice.toLocaleString()}원
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SaleTicket;
