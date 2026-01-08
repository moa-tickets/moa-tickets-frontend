import { cn } from '@/shared';
import Icon from '@/shared/lib/Icon';

const Footer = () => {
  return (
    <footer
      className={cn(
        'footer__wrapper bg-[#1a1a1a] text-white py-[50px] mt-[100px]',
      )}
    >
      <div className={cn('footer max-w-[1280px] mx-auto px-[40px]')}>
        {/* Top Section */}
        <div className={cn('flex justify-between items-start mb-[50px]')}>
          {/* Logo and Description */}
          <div className={cn('flex flex-col gap-[20px]')}>
            <h2 className={cn('text-[24px] font-bold')}>MOA</h2>
            <p className={cn('text-[14px] text-[#ccc] max-w-[300px]')}>
              문화생활의 모든 것, MOA와 함께하세요.
            </p>
          </div>

          {/* Links */}
          <div className={cn('flex gap-[60px]')}>
            {/* Company */}
            <div className={cn('flex flex-col gap-[15px]')}>
              <h3 className={cn('text-[16px] font-bold mb-[10px]')}>회사</h3>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                소개
              </a>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                채용정보
              </a>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                뉴스
              </a>
            </div>

            {/* Support */}
            <div className={cn('flex flex-col gap-[15px]')}>
              <h3 className={cn('text-[16px] font-bold mb-[10px]')}>지원</h3>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                고객센터
              </a>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                문의하기
              </a>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                FAQ
              </a>
            </div>

            {/* Legal */}
            <div className={cn('flex flex-col gap-[15px]')}>
              <h3 className={cn('text-[16px] font-bold mb-[10px]')}>약관</h3>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                이용약관
              </a>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className={cn('text-[14px] text-[#ccc] hover:text-white')}
              >
                이용정책
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className={cn('flex gap-[15px]')}>
            <a
              href="#"
              className={cn(
                'w-[40px] h-[40px] flex items-center justify-center',
                'border border-[#666] rounded-full hover:border-white transition-colors',
              )}
            >
              <Icon ICON="ARROW_RIGHT" className="w-[20px] h-[20px]" />
            </a>
            <a
              href="#"
              className={cn(
                'w-[40px] h-[40px] flex items-center justify-center',
                'border border-[#666] rounded-full hover:border-white transition-colors',
              )}
            >
              <Icon ICON="ARROW_RIGHT" className="w-[20px] h-[20px]" />
            </a>
            <a
              href="#"
              className={cn(
                'w-[40px] h-[40px] flex items-center justify-center',
                'border border-[#666] rounded-full hover:border-white transition-colors',
              )}
            >
              <Icon ICON="ARROW_RIGHT" className="w-[20px] h-[20px]" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className={cn('border-t border-[#333] mb-[30px]')} />

        {/* Bottom Section */}
        <div
          className={cn(
            'flex justify-between items-center text-[12px] text-[#999]',
          )}
        >
          <p>© 2026 MOA. All rights reserved.</p>
          <p>
            <span className={cn('mr-[15px]')}>Contact: support@moa.com</span>
            <span>Tel: 1234-5678</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
