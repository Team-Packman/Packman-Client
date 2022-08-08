import { Alert, Button, IconButton, Slide, SlideProps, Snackbar } from '@mui/material';
import React from 'react';

interface InstallGuideProps {
  installHandler: () => void;
  closeHandler: () => void;
  agent: 'ios' | 'and';
  open: boolean;
}

function InstallGuide(props: InstallGuideProps) {
  const { closeHandler, installHandler, open, agent } = props;

  const TransitionLeft = (props: SlideProps) => {
    return <Slide {...props} direction="up" />;
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={closeHandler}
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="info"
        sx={{
          width: '100%',
          '& .MuiAlert-message': {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          '& .MuiAlert-icon': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        {agent === 'ios' ? (
          <>
            <div>
              Packman을 앱으로 사용해보세요!
              <br />
              공유하기 버튼을 누른뒤 홈 화면에 추가하세요
            </div>
            <IconButton size="small" aria-label="close" color="inherit" onClick={closeHandler}>
              X
            </IconButton>
          </>
        ) : (
          <>
            <div>Packman을 앱으로 사용해보세요!</div>
            <Button
              color="secondary"
              size="small"
              onClick={installHandler}
              sx={{ marginLeft: 'auto' }}
            >
              Install
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={closeHandler}>
              X
            </IconButton>
          </>
        )}
      </Alert>
    </Snackbar>
  );
}

export default InstallGuide;
