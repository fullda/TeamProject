import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Box, Button, Dialog, DialogTitle, DialogContent, Pagination, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPosts } from '../../../api/ClubBoardApi';
import Read from './BoardRead';
import ReadVote from './BoardReadVote';
import PushPinIcon from '@mui/icons-material/PushPin';

const ListPosts = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemCategory, setSelectedItemCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12; // 페이지당 게시물 수

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const clubNumber = queryParams.get("clubNumber");

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', clubNumber, currentPage],
    queryFn: () => fetchPosts(clubNumber, currentPage, limit),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const items = data?.boards || [];

  const handleSelect = (id, category, title) => {
    if (category === '투표') {
      setSelectedItemId(id);
      setSelectedItemCategory(category);
      setDialogTitle(title);
      setOpenDialog(true);
    } else {
      navigate(`read/${id}?clubNumber=${clubNumber}`);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedItemId(null);
    setSelectedItemCategory('');
    setDialogTitle('');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const filteredItems = items.filter(item => 
    selectedCategory === '전체' || item.category === selectedCategory
  );

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 가져오는 중 오류 발생: {error.message}</p>;

  return (
    <Container maxWidth="md">
      <Box mt={1} sx={{ '& button': { m: 1 } }}>
        {['전체', '공지사항(전체알림)', '자유글', '관심사공유', '모임후기', '가입인사', '투표'].map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleCategoryClick(category)}
            sx={{
              bgcolor: selectedCategory === category ? '#DBC7B5' : 'transparent',
              color: selectedCategory === category ? '#fff' : '#000',
              borderColor: selectedCategory === category ? '#DBC7B5' : '#BDC0C8',
              '&:hover': {
                bgcolor: '#A67153',
                borderColor: '#A67153',
                color: '#fff',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Box
        sx={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: '4px',
          p: 2
        }}
      >
        <List sx={{ width: '100%' }}>
          {filteredItems.length === 0 ? (
            <Typography variant="body1" color="textSecondary">게시물이 없습니다.</Typography>
          ) : (
            filteredItems.map((item) => (
              <React.Fragment key={item._id}>
                <ListItem
                  button
                  onClick={() => handleSelect(item._id, item.category, item.title)}
                  sx={{ borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                          flexGrow: 1
                        }}
                      >
                        {truncateText(item.title, 45)}
                      </Typography>
                    }
                    secondary={`${item.category || ' 투표 '} ${item.endTime ? `종료시간: ${new Date(item.endTime).toLocaleString()}` : ''}`}
                  />
                  {/* 핀 아이콘 조건부 렌더링 */}
                  {item.pin && <PushPinIcon sx={{ color: 'gold' }} />} {/* 핀 아이콘의 색상을 조정할 수 있습니다 */}
                </ListItem>
              </React.Fragment>
            ))
          )}
        </List>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              bgcolor: 'transparent',
              color: '#000',
              borderColor: '#BDC0C8',
            },
            '& .MuiPaginationItem-page.Mui-selected': {
              bgcolor: '#DBC7B5',
              color: '#fff',
            },
            '& .MuiPaginationItem-previousNext': {
              bgcolor: 'transparent',
              color: '#000',
              borderColor: '#BDC0C8',
            }
          }}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>{selectedItemCategory === '투표' ? null : dialogTitle}</DialogTitle>
        <DialogContent>
          {selectedItemCategory === '투표' && <ReadVote voteId={selectedItemId} title={dialogTitle} onDelete={() => handleClose()} />}
          {selectedItemCategory !== '투표' && <Read postId={selectedItemId} title={dialogTitle} onClose={() => handleClose()} />}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ListPosts;
