export type ConcertRankSlide = {
  id: number;
  title: string;
  imgUrl: string;
  location: string;
  date: string[];
  seatOver?: boolean;
  privateSale?: boolean;
};

export type ConcertListType = {
  concertId: number;
  bookingOpen: string;
  concertDuration: string;
  concertEnd: string;
  concertName: string;
  concertStart: string;
  concertThumbnail: string;
};

export type WillOpenGridItem = {
  imageUrl: string;
  date: string;
  title: string;
  ticketType: string;
  isHot?: boolean;
  isExclusive?: boolean;
};

export type PlayListItem = {
  id: number;
  playUrl: string;
  thumbnailUrl: string;
  title: string;
  videoId: string;
};

export type PlayListMocksType = {
  [key: string]: PlayListItem[];
};

export type RecommendKeywordItem = {
  id: number;
  imgUrl: string;
  title: string;
  location: string;
  date: string[];
};

export type RecommendKeywordsType = {
  [key: string]: {
    icons: string;
    contents: RecommendKeywordItem[];
  };
};

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

export type FilterDataStructure = {
  genre: string[];
  addGenre: (genre: string) => void;
  removeGenre: (genre: string) => void;
  saleStatus: string[];
  addSaleStatus: (status: string) => void;
  removeSaleStatus: (status: string) => void;
  dateRange: DateRange;
  setDateFrom: (from: Date | undefined) => void;
  setDateTo: (to: Date | undefined) => void;
};

export type DetailMenu = {
  menuName: string;
  component: React.ReactElement[];
  eng: string;
};

export type DetailPageData = {
  isLandingPage?: boolean;
  topDetailPageDesign?: string[];
  activeMenus?: DetailMenu[];
  concertTitle?: string;
  genre?: string;
  loc?: string;
  date?: string;
  age?: string;
  thumbnail?: string;
  price?: {
    [key: string]: number | undefined;
    all?: number;
  };
  benefits?: string[];
  delivery?: {
    date: string;
    details?: string;
    addressLink?: string;
  };
  ticketOpening?: {
    membership?: {
      label: string;
      date: string;
      daysLeft: string;
    };
    general?: {
      label: string;
      date: string;
      daysLeft: string;
    };
    notice?: string;
  };
  badges?: {
    exclusive?: boolean;
    safeBooking?: boolean;
    waiting?: boolean;
  };
  ticketcast?: boolean;
  likeCount?: number;
  detailPageDesign?: string;
};

export type DetailDataType = {
  [key: number]: DetailPageData;
};

export interface InquiryFunction extends InquiryData {
  setInquiryData: (inquiryData: InquiryData) => void;
}

export type InquiryData = {
  status: string;
  message: string;
  data: InquiryItem;
  timestamp: string;
};

export type InquiryItem = {
  contents: InquiryDetail[];
  first: boolean;
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type InquiryDetail = {
  id: number;
  title: string;
  content: string;
  faqType: string;
  createdAt: string;
};

export type InquiryDetailResponse = {
  status: string;
  message: string;
  data: InquiryDetail;
  timestamp: string;
};

export type LoginData = {
  isLoggedIn: boolean;
  userData: {
    email: string;
    nickname: string;
    seller: boolean;
  };
  setUserData: (data: {
    email: string;
    nickname: string;
    seller: boolean;
  }) => void;
  setIsLoggedIn: (status: boolean) => void;
};

export type ConcertSession = {
  sessionId: number;
  date: string;
  price: number;
};

export type ConcertDetailType = {
  age: number;
  bookingOpen: string;
  concertDuration: string;
  concertEnd: string;
  concertId: number;
  concertName: string;
  concertStart: string;
  sessions: ConcertSession[];
  thumbnail: string;
};

export type TicketType = {
  ticketId: number;
  seatNum: number;
  state: string;
};
