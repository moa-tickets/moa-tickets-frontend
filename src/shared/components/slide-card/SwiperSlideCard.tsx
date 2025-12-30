const SwiperSlideCard = ({ item }: { item: any }) => {
  return (
    <div className="swiper__slide__card flex flex-col items-center gap-3">
      <div className="swiper__slide__image w-full aspect-[2/3]">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="swiper__slide__genre text-[#b0ff41] text-[36px] font-bold py-3 px-6 border border-[#b0ff41] border-solid rounded-[5px]">
        {item.genre}
      </div>
      <div className="swiper__slide__title text-white text-[32px] font-bold">
        {item.title}
      </div>
      <div className="swiper__slide__description text-[#ccc] text-[30px] font-light">
        {item.description}
      </div>
      <div className="swiper__slide__sale w-full px-[20px] py-[12px] mb-[20px] bg-[#b0ff41] flex items-center rounded-[16px]">
        <span className="text-[40px] font-bold px-[30px] relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:my-auto before:w-[2px] before:h-[20px] before:bg-[#ccc]">
          {item.sale.split('|')[0]}
        </span>
        <span className="px-[20px] text-[26px] font-normal">
          {item.sale.split('|')[1]}
        </span>
      </div>
    </div>
  );
};

export default SwiperSlideCard;
