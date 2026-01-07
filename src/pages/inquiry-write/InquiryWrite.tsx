import { useInquiry } from '@/features/inquiry/useInquiry';
import type { InquiryDetail } from '@/entities/types/types';
import { cn } from '@/shared';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import InquiryInput from '@/shared/components/inquiry-input/InquiryInput';
import type React from 'react';
import { useReducer, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InquiryFormState {
  title: {
    value: string;
    isError: boolean;
    errorMessage: string;
    isTouched: boolean;
  };
  content: {
    value: string;
    isError: boolean;
    errorMessage: string;
    isTouched: boolean;
  };
  type: {
    value: string;
    isError: boolean;
    errorMessage: string;
    isTouched: boolean;
  };
}

const createInitialState = (
  initialData?: InquiryDetail | null,
): InquiryFormState => ({
  title: {
    value: initialData?.title || '',
    isError: false,
    errorMessage: '',
    isTouched: false,
  },
  content: {
    value: initialData?.content || '',
    isError: false,
    errorMessage: '',
    isTouched: false,
  },
  type: {
    value: initialData?.faqType || '',
    isError: false,
    errorMessage: '',
    isTouched: false,
  },
});

const reducer = (state: InquiryFormState, action: any): InquiryFormState => {
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
          isError: action.payload.trim() === '',
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
    case 'INIT_FORM': {
      return createInitialState(action.payload);
    }
    default:
      return state;
  }
};

interface InquiryWriteProps {
  mode?: 'create' | 'edit';
  inquiryId?: number;
  initialData?: InquiryDetail | null;
}

const InquiryWrite = ({
  mode = 'create',
  inquiryId,
  initialData,
}: InquiryWriteProps) => {
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(initialData),
  );
  const { goInquiry, goInquiryLoading, updateInquiry, updateInquiryLoading } =
    useInquiry();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이전 initialData를 추적하여 실제로 변경되었을 때만 업데이트
  const prevInitialDataRef = useRef<InquiryDetail | null | undefined>(
    initialData,
  );

  // 수정 모드일 때 initialData가 변경되면 폼 초기화
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      const prevData = prevInitialDataRef.current;
      // 실제로 데이터가 변경되었는지 확인 (id나 내용 비교)
      if (
        !prevData ||
        prevData.id !== initialData.id ||
        prevData.title !== initialData.title ||
        prevData.content !== initialData.content ||
        prevData.faqType !== initialData.faqType
      ) {
        dispatch({ type: 'INIT_FORM', payload: initialData });
        prevInitialDataRef.current = initialData;
      }
    }
  }, [initialData, mode]);

  const isLoading = mode === 'create' ? goInquiryLoading : updateInquiryLoading;

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/mypage/inquiry');
  };

  const getButtonText = () => {
    if (isLoading) {
      return mode === 'edit' ? '수정 중...' : '등록 중...';
    }
    return mode === 'edit' ? '문의 수정하기' : '질문 등록하기';
  };

  const buttonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      'dto',
      new Blob(
        [
          JSON.stringify({
            title: state.title.value,
            content: state.content.value,
            option: state.type.value,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    if (mode === 'edit' && inquiryId) {
      updateInquiry.mutate(
        { inquiryId, formData },
        {
          onSuccess: () => {
            setIsModalOpen(true);
          },
        },
      );
    } else {
      goInquiry.mutate(formData, {
        onSuccess: () => {
          setIsModalOpen(true);
        },
      });
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="완료되었습니다"
        message={mode === 'edit' ? '문의가 수정되었습니다.' : '문의가 등록되었습니다.'}
        confirmText="확인"
      />
      <div className={cn('inquiry__write__page')}>
        <div className={cn('max-w-[700px] mx-auto')}>
        <form onSubmit={buttonSubmit}>
          <h1 className={cn('mt-[26px] mb-[36px] text-[22px] font-bold')}>
            {mode === 'edit' ? '문의 수정하기' : '1:1 문의하기'}
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
            value={state.type.value}
            onChangeSelector={(changedValue: string) =>
              dispatch({ type: 'TYPE_CHANGE', payload: changedValue })
            }
          />
          <InquiryInput
            label="첨부 파일"
            type="file"
            className="inquiry__file"
          />
          <button
            className="text-[14px] w-full py-[10px] mb-[60px] bg-blue-500 rounded-[6px] text-white disabled:opacity-45 cursor-pointer"
            type="submit"
            disabled={
              isLoading ||
              !state.title.value ||
              !state.content.value ||
              !state.type.value
            }
          >
            {getButtonText()}
          </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InquiryWrite;
