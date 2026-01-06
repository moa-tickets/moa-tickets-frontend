import { useInquiry } from '@/features/inquiry/useInquiry';
import { cn } from '@/shared';
import InquiryInput from '@/shared/components/inquiry-input/InquiryInput';
import type React from 'react';
import { useReducer } from 'react';

const initialState = {
  title: {
    value: '',
    isError: false,
    errorMessage: '',
    isTouched: false,
  },
  content: {
    value: '',
    isError: false,
    errorMessage: '',
    isTouched: false,
  },
  type: {
    value: '',
    isError: false,
    errorMessage: '',
    isTouched: false,
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'TITLE_CHANGE': {
      return {
        ...state,
        title: {
          ...state.title,
          value: action.payload,
          isError: action.payload.trim() === '',
          errorMessage:
            action.payload.trim() === '' ? '제목을 입력해주세요' : '',
        },
      };
    }
    case 'TITLE_TOUCHED': {
      return {
        ...state,
        title: {
          ...state.title,
          isTouched: true,
        },
      };
    }
    case 'CONTENT_CHANGE': {
      return {
        ...state,
        content: {
          ...state.content,
          value: action.payload,
          isError: action.payload.trim() === '',
          errorMessage:
            action.payload.trim() === '' ? '내용을 입력해주세요' : '',
        },
      };
    }
    case 'CONTENT_TOUCHED': {
      return {
        ...state,
        content: {
          ...state.content,
          isTouched: true,
        },
      };
    }
    case 'TYPE_CHANGE': {
      return {
        ...state,
        type: {
          ...state.type,
          value: action.payload,
          isError: action.payload.trim() !== '',
          errorMessage:
            action.payload.trim() === '' ? '유형을 선택해주세요' : '',
        },
      };
    }
    case 'TYPE_TOUCHED': {
      return {
        ...state,
        type: {
          ...state.type,
          isTouched: true,
        },
      };
    }
    default:
      return state;
  }
};

const InquiryWrite = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { goInquiry, goInquiryLoading } = useInquiry();

  const buttonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      'fqdto',
      new Blob(
        [
          JSON.stringify({
            title: state.title.value,
            content: state.content.value,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    goInquiry.mutate(formData);
  };

  return (
    <div className={cn('inquiry__write__page')}>
      <div className={cn('max-w-[700px] mx-auto')}>
        <form onSubmit={buttonSubmit}>
          <h1 className={cn('mt-[26px] mb-[36px] text-[22px] font-bold')}>
            1:1 문의하기
          </h1>
          <InquiryInput
            label="문의 제목"
            type="input"
            placeholder="제목을 입력해주세요"
            className="inquiry__input__title"
            htmlsFor={'inquiry-title'}
            value={state.title.value}
            onChangeInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({ type: 'TITLE_CHANGE', payload: e.target.value })
            }
            touch={() => dispatch({ type: 'TITLE_TOUCHED' })}
            touched={state.title.isTouched}
            isError={state.title.isError}
            errorMessage={state.title.errorMessage}
          />
          <InquiryInput
            label="문의 내용"
            type="textarea"
            placeholder="내용을 입력해주세요"
            className="inquiry__input__content"
            htmlsFor={'inquiry-content'}
            value={state.content.value}
            onChangeTextArea={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              dispatch({ type: 'CONTENT_CHANGE', payload: e.target.value })
            }
            touch={() => dispatch({ type: 'CONTENT_TOUCHED' })}
            touched={state.content.isTouched}
            isError={state.content.isError}
            errorMessage={state.content.errorMessage}
          />
          <InquiryInput
            label="문의 유형"
            type="selector"
            placeholder="문의 유형을 선택해주세요"
            className="inquiry__input__type"
          />
          <button
            className="text-[14px] w-full py-[10px] bg-blue-500 rounded-[6px] text-white disabled:opacity-45 cursor-pointer"
            type="submit"
            disabled={
              goInquiryLoading || !state.title.value || !state.content.value
            }
          >
            {goInquiryLoading ? '등록 중...' : '질문 등록하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryWrite;
