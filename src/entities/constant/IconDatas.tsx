const ICON_DATAS = {
  SEARCH_ICON: {
    rect: '0 0 24 24',
    svgChild: (
      <>
        <rect width="24" height="24" fill="white" />
        <path
          d="M15.5 15.5L20.5 20.5"
          stroke="#29292D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 17C14.0899 17 17 14.0899 17 10.5C17 6.91015 14.0899 4 10.5 4C6.91015 4 4 6.91015 4 10.5C4 14.0899 6.91015 17 10.5 17Z"
          stroke="#29292D"
          strokeWidth="1.5"
        />
      </>
    ),
  },
  CLOSE: {
    rect: '0 0 9 9',
    svgChild: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.85285 0.895997C7.92723 0.970296 7.98624 1.05853 8.02649 1.15565C8.06675 1.25276 8.08748 1.35686 8.08748 1.462C8.08748 1.56713 8.06675 1.67123 8.02649 1.76835C7.98624 1.86547 7.92723 1.9537 7.85285 2.028L5.21985 4.662L7.85485 7.296C7.92918 7.37033 7.98814 7.45857 8.02836 7.55568C8.06859 7.65279 8.08929 7.75688 8.08929 7.862C8.08929 7.96711 8.06859 8.0712 8.02836 8.16831C7.98814 8.26543 7.92918 8.35367 7.85485 8.428C7.78052 8.50233 7.69228 8.56129 7.59516 8.60151C7.49805 8.64174 7.39396 8.66244 7.28885 8.66244C7.18373 8.66244 7.07965 8.64174 6.98253 8.60151C6.88542 8.56129 6.79718 8.50233 6.72285 8.428L4.08785 5.793L1.45385 8.428C1.30373 8.57811 1.10014 8.66244 0.887847 8.66244C0.675556 8.66244 0.47196 8.57811 0.321847 8.428C0.171735 8.27788 0.0874024 8.07429 0.0874024 7.862C0.0874024 7.64971 0.171735 7.44611 0.321847 7.296L2.95685 4.662L0.321847 2.028C0.247519 1.95367 0.188559 1.86543 0.148333 1.76831C0.108106 1.6712 0.0874023 1.56711 0.0874023 1.462C0.0874023 1.35688 0.108106 1.25279 0.148333 1.15568C0.188559 1.05857 0.247519 0.970325 0.321847 0.895997C0.396175 0.821669 0.484416 0.762709 0.58153 0.722483C0.678645 0.682257 0.782731 0.661552 0.887847 0.661552C0.992963 0.661552 1.09705 0.682257 1.19416 0.722483C1.29128 0.762709 1.37952 0.821669 1.45385 0.895997L4.08785 3.531L6.72185 0.895997C6.87186 0.746082 7.07526 0.661868 7.28735 0.661868C7.49943 0.661868 7.70283 0.746082 7.85285 0.895997Z"
        fill="#4154FF"
        fillOpacity="0.5"
      />
    ),
  },
  PROFILE: {
    rect: '0 0 20 19',
    svgChild: (
      <>
        <path
          d="M19 18C19 14.4101 16.0899 11.5 12.5 11.5H7.5C3.91015 11.5 1 14.4101 1 18"
          stroke="#29292D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 9C12.2091 9 14 7.20914 14 5C14 2.79086 12.2091 1 10 1C7.79086 1 6 2.79086 6 5C6 7.20914 7.79086 9 10 9Z"
          stroke="#29292D"
          strokeWidth="1.5"
        />
      </>
    ),
  },
  TICKET: {
    rect: '0 0 24 24',
    svgChild: (
      <>
        <path
          d="M19.7729 9.04466C18.7255 9.53297 18.0449 10.5718 18.0449 11.9232C18.0449 13.2769 18.7281 14.2937 19.7756 14.7666C19.9383 14.84 20.0704 14.9376 20.1533 15.0347C20.2323 15.1271 20.2499 15.1965 20.2499 15.2463V17C20.2499 18.2426 19.2426 19.25 17.9999 19.25H6C4.75736 19.25 3.75 18.2426 3.75 16.9999V7C3.75 5.75736 4.75736 4.75 6 4.75H17.9999C19.2426 4.75 20.2499 5.75736 20.2499 7V8.55715C20.2499 8.60663 20.2324 8.67653 20.1527 8.7705C20.0692 8.86903 19.9365 8.96842 19.7729 9.04466Z"
          stroke="#29292D"
          strokeWidth="1.5"
        />
        <path
          d="M14.75 5.75V18.25"
          stroke="#29292D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="1 3"
        />
      </>
    ),
  },
  RIGHT: {
    rect: '0 0 10 16',
    svgChild: (
      <>
        <g clipPath="url(#clip0_1_5125)">
          <path
            d="M1.09348 0L9 7.95298L1 16"
            stroke="#111111"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_5125">
            <rect
              width="10"
              height="18"
              fill="white"
              transform="translate(0 -1)"
            />
          </clipPath>
        </defs>
      </>
    ),
  },
  PLAY: {
    rect: '0 0 24 24',
    svgChild: (
      <path
        d="M19.5 11.1341C19.652 11.2219 19.7782 11.3481 19.866 11.5001C19.9538 11.6521 20 11.8246 20 12.0001C20 12.1756 19.9538 12.3481 19.866 12.5001C19.7782 12.6521 19.652 12.7783 19.5 12.8661L6.75 20.2271C6.59798 20.3149 6.42554 20.3611 6.25001 20.3611C6.07447 20.3611 5.90203 20.3149 5.75001 20.2271C5.59799 20.1394 5.47175 20.0131 5.38398 19.8611C5.29621 19.7091 5.25 19.5366 5.25 19.3611V4.64011C5.25 4.46458 5.29621 4.29214 5.38398 4.14012C5.47175 3.9881 5.59799 3.86187 5.75001 3.77411C5.90203 3.68634 6.07447 3.64014 6.25001 3.64014C6.42554 3.64014 6.59798 3.68634 6.75 3.77411L19.5 11.1341Z"
        fill="white"
      />
    ),
  },
  PAUSE: {
    rect: '0 0 24 24',
    svgChild: (
      <>
        <rect width="4" height="18" x="6" y="3" fill="#fff" rx="1"></rect>
        <rect width="4" height="18" x="14" y="3" fill="#fff" rx="1"></rect>
      </>
    ),
  },
  VOLUME: {
    rect: '0 0 24 24',
    svgChild: (
      <>
        <path
          d="M11 5L6 9H2V15H6L11 19V5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  MUTE: {
    rect: '0 0 24 24',
    svgChild: (
      <>
        <path
          d="M11 5L6 9H2V15H6L11 19V5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M23 9L17 15"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 9L23 15"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  CLOSE_SMALL: {
    rect: '0 0 14 14',
    svgChild: (
      <path
        d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    ),
  },
  ARROW_RIGHT: {
    rect: '0 0 5 7',
    svgChild: <path d="M0 0L5 3.5L0 7V0Z" fill="currentColor" />,
  },
  ARROW_RIGHT_SMALL: {
    rect: '0 0 4 7',
    svgChild: <path d="M0 0L4 3.5L0 7V0Z" fill="currentColor" />,
  },
  ARROW_LEFT_PAGINATION: {
    rect: '0 0 6 11',
    svgChild: (
      <path
        d="M1.09348 0L9 7.95298L1 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="scale(0.6, 0.6) translate(-1, -2)"
      />
    ),
  },
  ARROW_RIGHT_PAGINATION: {
    rect: '0 0 6 11',
    svgChild: (
      <path
        d="M1.09348 0L9 7.95298L1 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="scale(0.6, 0.6) translate(-1, -2)"
      />
    ),
  },
};

export type IconList = keyof typeof ICON_DATAS;
export default ICON_DATAS;
