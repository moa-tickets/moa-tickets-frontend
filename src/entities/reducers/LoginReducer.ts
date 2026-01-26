import { type Action } from '../types/types';

export const LOGIN = 'login/login';
export const GET_MEMBER = 'login/get_member';
export const LOGOUT = 'login/logout';
export const SESSION_CHANGE = 'login/session_change';
export const SESSION_INIT = 'login/session_init';

export const getLoginData = () => ({ type: LOGIN });
export const getMember = () => ({ type: GET_MEMBER });
export const getLogout = () => ({ type: LOGOUT });
export const sessionChange = () => ({ type: SESSION_CHANGE });
export const sessionInit = () => ({ type: SESSION_INIT });

export interface LoginState {
  isLoggedIn: boolean;
  nickname: string;
  email: string;
  isSeller: boolean;
  selectedSession: {
    date: string;
    sessionId: number;
  };
}

const initialLoginState = {
  isLoggedIn: false,
  nickname: '',
  email: '',
  isSeller: false,
  selectedSession: {
    date: '',
    sessionId: 0,
  },
};

export default function loginReducer(
  state: LoginState = initialLoginState,
  action: Action,
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case GET_MEMBER:
      return {
        ...state,
        nickname: action.payload.nickname,
        email: action.payload.email,
        isSeller: action.payload.isSeller,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        nickname: '',
        email: '',
        isSeller: false,
      };
    case SESSION_CHANGE:
      return {
        ...state,
        selectedSession: {
          date: action.payload.date,
          sessionId: action.payload.sessionId,
        },
      };
    case SESSION_INIT:
      return {
        ...state,
        selectedSession: {
          date: '',
          sessionId: 0,
        },
      };
    default:
      return state;
  }
}
