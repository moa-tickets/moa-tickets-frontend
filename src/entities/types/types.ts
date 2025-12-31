export type ConcertRankSlide = {
  id: number;
  title: string;
  imgUrl: string;
  location: string;
  date: string[];
  seatOver?: boolean;
  privateSale?: boolean;
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
    [key: string]: number;
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
