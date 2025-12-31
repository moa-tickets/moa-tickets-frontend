import { cn } from '@/shared';
import { useScroll } from '@/features/scroll/useScroll';
import { useRef } from 'react';

const ActiveMenu = ({
  menuNames,
  menuIds,
}: {
  menuNames: string[];
  menuIds: string[];
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { activeSection, isElementFixed } = useScroll(menuIds, menuRef);

  return (
    <div
      ref={menuRef}
      className={cn(
        'active__menus w-full bg-black z-[200] transition-all duration-300',
        isElementFixed
          ? 'fixed top-0 h-[120px] shadow-lg'
          : 'relative h-[120px]',
      )}
    >
      <div
        className={cn(
          'active__menus__inner max-w-[1080px] mx-auto h-full flex justify-center items-center gap-3',
        )}
      >
        {menuNames.map((mn: string, index: number) => (
          <button
            key={index}
            onClick={() => {
              const element = document.getElementById(menuIds[index]);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={cn(
              'text-white py-[20px] px-[26px] text-[26px] relative cursor-pointer transition-colors duration-300',
              activeSection === menuIds[index]
                ? 'text-[#B0FF41] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[5px] after:bg-[#B0FF41]'
                : 'text-[#ccc] hover:text-[#B0FF41] hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[5px] hover:after:bg-[#B0FF41]',
            )}
          >
            {mn.split('|').map((text, idx) => (
              <span
                key={text}
                className={cn(
                  'block text-center',
                  idx === 0 ? 'font-light' : 'font-bold',
                )}
              >
                {text}
              </span>
            ))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActiveMenu;
