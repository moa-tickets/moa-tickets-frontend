export type Action = {
  type: string;
  payload?: any;
};

export type ModalState = {
  isOpen: boolean;
  title: string | null;
  message: string | null;
};

export type HomeProduct = {
  result: HomeProductResult;
  statusCode: number;
  message: string;
};

export type HomeProductResult = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: HomeProductContent[];
  number: number;
  numberOfElements: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  pageable: {
    offset: 0;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type HomeProductContent = {
  productId: number;
  productNo: number;
  brand: string;
  name: string;
  shortDescription: string;
  salesPrice: number;
  discountedPrice: number;
  discountRate: number;
  mainImageUrl: string;
  wishlistCount: number;
  isWishlisted: boolean;
  isSoldOut: boolean;
  productStatus: 'SALE';
};
