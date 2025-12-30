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
