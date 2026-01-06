export const mypageMenus = [
  {
    id: 1,
    parentMenu: '티켓 관리',
    child: [
      {
        childMenu: '마이 티켓',
        childLink: '/mypage/reservation',
      },
    ],
  },
  {
    id: 2,
    parentMenu: '회원정보관리',
    child: [
      {
        childMenu: '회원정보수정',
        childLink: '/mypage/info-edit',
      },
      {
        childMenu: '회원탈퇴',
        childLink: '/mypage/withdrawal',
      },
    ],
  },
  {
    id: 3,
    parentMenu: '1:1 문의 내역',
    child: [
      {
        childMenu: '문의 내역',
        childLink: '/mypage/inquiry',
      },
    ],
  },
];
