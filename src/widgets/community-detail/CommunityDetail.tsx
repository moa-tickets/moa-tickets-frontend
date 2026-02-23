import {
  OPEN_WRITE_MODAL,
  type MainBoardData,
} from '@/entities/reducers/BoardReducer';
import {
  useComments,
  useCommunity,
  useCommunityDetail,
} from '@/features/community/useCommunity';
import { cn } from '@/shared';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import {
  Calendar,
  Check,
  ChevronRight,
  MessageCircleMore,
  MonitorCog,
  Pencil,
  Send,
  Trash2,
  UserRoundX,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import WriteModal from '../community-list/WriteModal';

type ConfirmType = 'modify' | 'delete' | null;

export default function CommunityDetail({
  concertName,
}: Readonly<{
  concertName: string;
}>) {
  const { id, boardId } = useParams<{ id: string; boardId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirmType, setConfirmType] = useState<ConfirmType>(null);
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { boardDetail, boardDetailLoading } = useCommunityDetail(
    Number(boardId),
  );
  const { deleteCommunity, modifyCommunity, modifyLoading, writeLoading } =
    useCommunity();
  const {
    comments,
    commentsLoading,
    commentsFetching,
    postComment,
    postCommentLoading,
    deleteComment,
    updateComment,
    updateCommentLoading,
  } = useComments(Number(boardId));

  const { write: writeData } = useSelector(
    (state: { boardReducer: MainBoardData }) => state.boardReducer,
  );

  useEffect(() => {
    if (writeLoading) {
      document.body.classList.add('modal-dimmed');
    } else {
      document.body.classList.remove('modal-dimmed');
    }
  }, [writeLoading]);

  const handleConfirm = () => {
    if (!boardDetail) return;

    if (confirmType === 'modify') {
      setConfirmType(null);
      dispatch({
        type: OPEN_WRITE_MODAL,
        payload: {
          title: boardDetail.title,
          content: boardDetail.content,
          isModify: true,
          modifyBoardId: boardDetail.boardId,
        },
      });
    }

    if (confirmType === 'delete') {
      setConfirmType(null);
      deleteCommunity.mutate(
        { boardId: boardDetail.boardId },
        {
          onSuccess: () => {
            navigate(`/detail/${id}`, { state: { tab: '커뮤니티' } });
          },
        },
      );
    }
  };

  const modifiesCommunity = () => {
    modifyCommunity.mutate({
      boardId: writeData.modifyBoardId!,
      title: writeData.title,
      content: writeData.content,
    });
  };

  const handleCommentSubmit = async () => {
    const trimmed = commentInput.trim();
    if (!trimmed || postCommentLoading) return;

    try {
      await postComment.mutateAsync({ content: trimmed });
      setCommentInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch {
      // 에러는 mutation 레벨에서 처리
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleEditStart = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleEditSave = async (commentId: number) => {
    const trimmed = editingContent.trim();
    if (!trimmed || updateCommentLoading) return;
    try {
      await updateComment.mutateAsync({ commentId, content: trimmed });
      setEditingCommentId(null);
      setEditingContent('');
    } catch {
      // 에러는 mutation 레벨에서 처리
    }
  };

  if (boardDetailLoading) {
    return (
      <div className={cn('community__detail max-w-[1080px] mx-auto pt-[40px]')}>
        <div className={cn('animate-pulse space-y-[16px]')}>
          <div className={cn('h-[20px] bg-[#e5e5e5] rounded w-1/3')} />
          <div className={cn('h-[200px] bg-[#e5e5e5] rounded')} />
        </div>
      </div>
    );
  }

  if (!boardDetail) {
    return (
      <div
        className={cn(
          'community__detail max-w-[1080px] mx-auto pt-[40px] text-center text-[#777]',
        )}
      >
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <>
      {confirmType && (
        <ConfirmModal
          isOpen={!!confirmType}
          title={
            confirmType === 'modify' ? '수정하시겠습니까?' : '삭제하시겠습니까?'
          }
          message={
            confirmType === 'modify'
              ? '게시글을 수정합니다.'
              : '삭제된 게시글은 복구할 수 없습니다.'
          }
          onClose={() => setConfirmType(null)}
          onConfirm={handleConfirm}
        />
      )}
      {writeData.isModalOpen && (
        <WriteModal
          isModalOpen={writeData.isModalOpen}
          title={writeData.title}
          content={writeData.content}
          writes={modifiesCommunity}
          loading={modifyLoading}
        />
      )}
      <div className={cn('community__detail max-w-[1080px] mx-auto')}>
        {/* 브레드크럼 */}
        <div
          className={cn(
            'community__detail__header flex items-center gap-[8px] mb-[30px]',
          )}
        >
          <span className={cn('text-[14px] text-[#777]')}>{concertName}</span>
          <ChevronRight className={cn('text-[#777]')} size={16} />
          <button
            className={cn('text-[14px] text-[#777] cursor-pointer')}
            onClick={() =>
              navigate(`/detail/${id}`, { state: { tab: '커뮤니티' } })
            }
          >
            커뮤니티
          </button>
          <ChevronRight className={cn('text-[#777]')} size={16} />
          <span className={cn('text-[14px] truncate max-w-[300px]')}>
            {boardDetail.title}
          </span>
        </div>

        {/* 게시글 본문 */}
        <div
          className={cn(
            'community__detail__card',
            'border border-solid border-[#ccc]',
            'rounded-[15px]',
            'bg-[#f2f2f2]',
            'p-[32px]',
            'relative',
          )}
        >
          {/* 수정/삭제 버튼 */}
          <div
            className={cn(
              'board__buttons absolute top-[24px] right-[24px] flex gap-[8px] items-center',
            )}
          >
            <button
              className={cn(
                'bg-white w-[30px] h-[30px] flex justify-center items-center',
                'rounded-full',
                'border border-solid border-[#000]',
                'cursor-pointer',
              )}
              onClick={() => setConfirmType('modify')}
            >
              <MonitorCog size={16} />
            </button>
            <button
              className={cn(
                'bg-white w-[30px] h-[30px] flex justify-center items-center',
                'rounded-full',
                'border border-solid border-[#000]',
                'cursor-pointer',
              )}
              onClick={() => setConfirmType('delete')}
            >
              <UserRoundX size={16} />
            </button>
          </div>

          {/* 제목 */}
          <h1 className={cn('text-[20px] font-semibold pr-[80px]')}>
            {boardDetail.title}
          </h1>

          {/* 메타 정보 */}
          <div
            className={cn(
              'flex items-center gap-[16px] mt-[12px] pb-[20px]',
              'border-b border-solid border-[#ddd]',
              'text-[13px] text-[#777]',
            )}
          >
            <div className={cn('flex items-center gap-[6px]')}>
              <Calendar size={14} />
              <span>{boardDetail.createdAt.split('T')[0]}</span>
            </div>
            <div className={cn('flex items-center gap-[4px]')}>
              <span>작성자</span>
              <span className={cn('text-[#333] font-medium')}>
                {boardDetail.nickName}
              </span>
            </div>
          </div>

          {/* 본문 내용 */}
          <p
            className={cn(
              'community__detail__content',
              'mt-[24px]',
              'text-[15px] leading-[1.8] text-[#333]',
              'whitespace-pre-wrap',
              'min-h-[200px]',
            )}
          >
            {boardDetail.content}
          </p>
        </div>

        {/* 댓글 섹션 */}
        <div className={cn('community__comments mt-[32px]')}>
          {/* 댓글 헤더 */}
          <div className={cn('flex items-center gap-[8px] mb-[16px]')}>
            <MessageCircleMore size={18} />
            <span className={cn('text-[15px] font-semibold')}>
              댓글
              {!commentsLoading && (
                <span className={cn('text-[#777] font-normal ml-[6px]')}>
                  {comments.length}
                </span>
              )}
            </span>
          </div>

          {/* 댓글 입력 */}
          <div
            className={cn(
              'flex gap-[12px] mb-[24px]',
              'border border-solid border-[#ccc]',
              'rounded-[12px]',
              'bg-[#f2f2f2]',
              'p-[16px]',
            )}
          >
            <textarea
              ref={textareaRef}
              value={commentInput}
              onChange={handleTextareaChange}
              onKeyDown={handleTextareaKeyDown}
              placeholder="댓글을 입력하세요. (Shift+Enter: 줄바꿈)"
              rows={1}
              className={cn(
                'flex-1 bg-transparent resize-none outline-none',
                'text-[14px] leading-[1.6] text-[#333]',
                'placeholder:text-[#bbb]',
                'overflow-hidden',
              )}
            />
            <button
              type="button"
              disabled={!commentInput.trim() || postCommentLoading}
              onClick={handleCommentSubmit}
              className={cn(
                'self-end flex items-center gap-[6px]',
                'bg-[#161339] text-white text-[13px]',
                'px-[14px] py-[8px] rounded-[8px]',
                'cursor-pointer',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'transition-opacity',
              )}
            >
              <Send size={14} />
              {postCommentLoading ? '등록 중' : '등록'}
            </button>
          </div>

          {/* 댓글 목록 */}
          {commentsLoading && (
            <div className={cn('space-y-[12px]')}>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'animate-pulse h-[72px] bg-[#e5e5e5] rounded-[12px]',
                  )}
                />
              ))}
            </div>
          )}
          {!commentsLoading && comments.length === 0 && !commentsFetching && (
            <div
              className={cn(
                'text-center text-[14px] text-[#aaa] py-[32px]',
                'border border-solid border-[#eee] rounded-[12px]',
              )}
            >
              첫 번째 댓글을 남겨보세요.
            </div>
          )}
          {!commentsLoading && comments.length > 0 && (
            <ul
              className={cn(
                'space-y-[12px]',
                'transition-opacity duration-200',
                commentsFetching && 'opacity-50',
              )}
            >
              {comments.map((comment) => {
                const isEditing = editingCommentId === comment.commentId;
                return (
                  <li
                    key={comment.commentId}
                    className={cn(
                      'border border-solid border-[#ccc]',
                      'rounded-[12px]',
                      'bg-[#f2f2f2]',
                      'p-[16px]',
                    )}
                  >
                    {/* 헤더: 작성자 + 날짜 + 버튼 */}
                    <div
                      className={cn(
                        'flex items-center justify-between mb-[8px]',
                      )}
                    >
                      <span className={cn('text-[13px] font-semibold text-[#333]')}>
                        {comment.nickName}
                      </span>
                      <div className={cn('flex items-center gap-[10px]')}>
                        <span className={cn('text-[12px] text-[#aaa]')}>
                          {comment.createdAt.split('T')[0]}
                        </span>
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEditSave(comment.commentId)}
                              disabled={updateCommentLoading}
                              className={cn(
                                'text-[#bbb] hover:text-blue-400 transition-colors cursor-pointer',
                                'disabled:opacity-40',
                              )}
                            >
                              <Check size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={handleEditCancel}
                              className={cn(
                                'text-[#bbb] hover:text-[#555] transition-colors cursor-pointer',
                              )}
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleEditStart(comment.commentId, comment.content)
                              }
                              className={cn(
                                'text-[#bbb] hover:text-blue-400 transition-colors cursor-pointer',
                              )}
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                deleteComment.mutate({
                                  commentId: comment.commentId,
                                })
                              }
                              className={cn(
                                'text-[#bbb] hover:text-red-400 transition-colors cursor-pointer',
                              )}
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 본문: 수정 모드 / 뷰 모드 */}
                    {isEditing ? (
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleEditSave(comment.commentId);
                          }
                          if (e.key === 'Escape') handleEditCancel();
                        }}
                        autoFocus
                        className={cn(
                          'w-full bg-white border border-solid border-[#ccc]',
                          'rounded-[8px] p-[8px]',
                          'text-[14px] text-[#333] leading-[1.6]',
                          'resize-none outline-none',
                          'min-h-[60px]',
                        )}
                      />
                    ) : (
                      <p className={cn('text-[14px] text-[#444] whitespace-pre-wrap')}>
                        {comment.content}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* 목록으로 버튼 */}
        <div className={cn('flex justify-start mt-[32px]')}>
          <button
            className={cn(
              'bg-[#161339] px-[20px] py-[8px] rounded-[6px]',
              'text-white text-[14px] cursor-pointer',
            )}
            onClick={() =>
              navigate(`/detail/${id}`, { state: { tab: '커뮤니티' } })
            }
          >
            ← 목록으로
          </button>
        </div>
      </div>
    </>
  );
}
