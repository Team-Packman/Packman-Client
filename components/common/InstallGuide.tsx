import { Alert, Button, IconButton, Slide, SlideProps, Snackbar } from '@mui/material';
import React from 'react';
import useInstallGuide from '../../utils/hooks/useInstallGuide';

function InstallGuide() {
  const [installGuide, installHandler, closeGuide] = useInstallGuide();

  const TransitionLeft = (props: SlideProps) => {
    return <Slide {...props} direction="up" />;
  };

  return installGuide.open ? (
    <Snackbar
      open={installGuide.open}
      autoHideDuration={6000}
      onClose={closeGuide}
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
        {installGuide.agent === 'ios' ? (
          <>
            <div>
              Packman을 앱으로 사용해보세요!
              <br />
              공유하기 버튼을 누른뒤 홈 화면에 추가하세요
            </div>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeGuide}
              sx={{ marginLeft: '0.5rem' }}
            >
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
            <IconButton size="small" aria-label="close" color="inherit" onClick={closeGuide}>
              X
            </IconButton>
          </>
        )}
      </Alert>
    </Snackbar>
  ) : null;
}

export default InstallGuide;
