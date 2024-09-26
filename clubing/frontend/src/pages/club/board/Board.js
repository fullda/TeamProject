import React, { useState, useEffect } from 'react';
import { Container, Fab, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Box } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import CKEditor5Editor from '../../../components/club/ClubBoardEditor';
import VoteCreationForm from '../../../components/club/ClubVote';
import ListPosts from './BoardList';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { checkMembership, savePost, saveVote, fetchPosts } from '../../../api/ClubBoardApi'; // fetchPosts 함수가 API에 정의되어 있어야 합니다.

const Board = () => {
  const [open, setOpen] = useState(false); // 다이얼로그 열기 상태
  const [editorData, setEditorData] = useState(''); // 에디터 데이터
  const [title, setTitle] = useState(''); // 제목 상태
  const [category, setCategory] = useState(''); // 카테고리 상태
  const [image, setImage] = useState(''); // 이미지 상태
  const [options, setOptions] = useState(['', '']); // 투표 옵션 상태
  const [allowMultiple, setAllowMultiple] = useState(false); // 다중 선택 여부
  const [anonymous, setAnonymous] = useState(false); // 익명 투표 여부
  const [endTime, setEndTime] = useState(''); // 투표 종료 시간
  const [isMember, setIsMember] = useState(false); // 회원 여부
  const [snackbarOpen, setSnackbarOpen] = useState(false); // 스낵바 열기 상태
  const [snackbarMessage, setSnackbarMessage] = useState(''); // 스낵바 메시지
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 스낵바 심각도
  const [posts, setPosts] = useState([]); // 게시글 목록 상태

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clubNumber = queryParams.get("clubNumber"); // 클럽 번호 가져오기
  const author = useSelector(state => state.user?.userData?.user?.email || null); // 작성자 이메일 가져오기

  useEffect(() => {
    // 컴포넌트가 마운트될 때 회원 여부 확인
    if (author && clubNumber) {
      checkMembership(clubNumber, author)
        .then(setIsMember) // 회원이면 true 설정
        .catch(() => setIsMember(false)); // 실패하면 false 설정
    }
  }, [author, clubNumber]);

  useEffect(() => {
    // 클럽 번호가 있을 때 게시글 가져오기
    if (clubNumber) {
      fetchAllPosts(); // 게시글 목록 가져오기
    }
  }, [clubNumber]);

  const fetchAllPosts = async () => {
    // 게시글 가져오는 함수
    try {
      const data = await fetchPosts(clubNumber); // fetchPosts API 호출
      setPosts(data); // 게시글 목록 상태 업데이트
    } catch (error) {
      console.error('게시글 가져오기 실패:', error);
    }
  };

  const getCurrentDate = () => {
    // 현재 날짜를 ISO 형식으로 반환
    const now = new Date();
    return now.toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' }).replace('T', ' ').split('.')[0]; // 'YYYY-MM-DD HH:mm:ss' 형식
  };

  const handleSave = async () => {
    // 게시글 저장 처리
    if (!title || !category || !editorData) {
      showSnackbar('모든 필드를 입력해주세요.', 'error');
      return;
    }
    try {
      await savePost({
        clubNumber,
        create_at: getCurrentDate(),
        author,
        title,
        category,
        content: editorData
      });
      handleClose();
      await fetchAllPosts(); // 저장 후 게시글 목록 다시 가져오기
    } catch {
      showSnackbar('게시글 저장에 실패했습니다.', 'error');
    }
  };

  const handleVoteSave = async () => {
    // 투표 저장 처리
    if (!title || !category || options.some(option => !option.trim()) || !endTime) {
      showSnackbar('모든 필드를 입력해주세요.', 'error');
      return;
    }
    try {
      await saveVote({
        clubNumber,
        create_at: getCurrentDate(),
        author,
        title,
        category,
        options,
        allowMultiple,
        anonymous,
        endTime
      });
      handleClose();
      fetchAllPosts(); // 저장 후 게시글 목록 다시 가져오기
    } catch {
      showSnackbar('투표 저장에 실패했습니다.', 'error');
    }
  };

  const handleClickOpen = () => {
    // 다이얼로그 열기
    setOpen(true);
  };

  const handleClose = () => {
    // 다이얼로그 닫기
    setOpen(false);
    category === '투표' ? resetVoteState() : resetEditorState();
  };

  const resetEditorState = () => {
    // 에디터 상태 초기화
    setTitle('');
    setCategory('');
    setEditorData('');
  };

  const resetVoteState = () => {
    // 투표 상태 초기화
    setTitle('');
    setCategory('');
    setOptions(['', '']);
    setAllowMultiple(false);
    setAnonymous(false);
    setEndTime('');
  };

  const showSnackbar = (message, severity) => {
    // 스낵바 표시 함수
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    // 스낵바 닫기
    setSnackbarOpen(false);
  };

  return (
    <Container>
      {isMember && (
        <Fab
          onClick={handleClickOpen}
          aria-label="add"
          sx={{
            backgroundColor: "#DBC7B5",
            color: "white",
            position: "fixed",
            bottom: "50px",
            right: "100px",
            "&:hover": {
              backgroundColor: "#A67153", // hover 시 배경 색상 변경
            },
          }}
        >
          <AddIcon />
        </Fab>
      )}

      <ListPosts posts={posts} /> {/* ListPosts에 게시글 목록 전달 */}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: {
            height: '80%', // 다이얼로그 높이 80% 설정
            maxHeight: '80%', // 최대 높이 설정
          },
        }}
      >
        <DialogTitle>글쓰기</DialogTitle>
        <DialogContent
          dividers // 내용에 구분선 추가
          sx={{ maxHeight: 'calc(80vh - 100px)', overflowY: 'auto' }} // 내용 영역의 최대 높이 설정
        >
          {category === '투표' ? (
            <VoteCreationForm
              title={title}
              setTitle={setTitle}
              category={category}
              setCategory={setCategory}
              options={options}
              setOptions={setOptions}
              allowMultiple={allowMultiple}
              setAllowMultiple={setAllowMultiple}
              anonymous={anonymous}
              setAnonymous={setAnonymous}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          ) : (
            <CKEditor5Editor
              onChange={setEditorData}
              title={title}
              setTitle={setTitle}
              category={category}
              setCategory={setCategory}
              setImage={setImage}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">닫기</Button>
          <Button onClick={category === '투표' ? handleVoteSave : handleSave} color="primary">저장</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box m={5}></Box>
    </Container>
  );
};

export default Board;
