import { useSelectedFilterStore } from '@/entities/stores/useSelectedFilter';
import { cn } from '@/shared';

const FilterSelectButton = ({
  contents,
  title,
}: {
  contents: string;
  title: string;
}) => {
  const { addGenre, removeGenre, genre, addSaleStatus, removeSaleStatus, saleStatus } = useSelectedFilterStore();

  const isSelected = genre.includes(contents) || saleStatus.includes(contents);

  const optionalClick = () => {
    const filterType = title.split('/')[1];
    if (filterType === 'genre') {
      if (genre.includes(contents)) {
        removeGenre(contents);
      } else {
        addGenre(contents);
      }
    } else if (filterType === 'saleStatus') {
      if (saleStatus.includes(contents)) {
        removeSaleStatus(contents);
      } else {
        addSaleStatus(contents);
      }
    }
  };

  return (
    <li>
      <button
        className={cn(
          'text-[14px] font-bold text-[#666] px-[16px] py-[8px] border border-solid border-[#e8e8e8] rounded-[20px] cursor-pointer',
          isSelected &&
            'border-[#4154ff] bg-[rgba(65,84,255,.08)] text-[#4154ff]',
        )}
        onClick={optionalClick}
      >
        {contents}
      </button>
    </li>
  );
};

export default FilterSelectButton;
