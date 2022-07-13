import React, { ReactNode, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { packmanColors } from '../../styles/color';
import AddIcon from '@material-ui/icons/Add';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: '3rem',
    right: '2rem',
    height: '100%',
    flexGrow: 1,
    zIndex: 1050,
    fontFamily: 'Pretendard',

    '& .MuiFab-root': {
      boxShadow: 'none',
      '& .MuiSpeedDial-actions': {
        '& .MuiSpeedDialAction-staticTooltip': {
          '& > button:first-child': {
            background: 'red',
          },
        },
      },
    },
    '& .MuiSpeedDial-root': {
      alignItems: 'end',
    },
    '& .MuiSpeedDialAction-tooltipPlacementLeft .MuiSpeedDialAction-staticTooltipLabel': {
      display: 'none',
    },
    '& #FAB-action-2': {
      marginBottom: '0.8rem',
    },
  },
  backdrop: {
    zIndex: 1,
    color: 'rgba(0, 0, 0, 0.47)',
  },
  speedDial: {
    position: 'fixed',
    bottom: '3rem',
    right: '1rem',
  },
  tooltip: {
    width: '16rem',
    borderRadius: '0.8rem',
    color: `${packmanColors.pmBlack}`,
    fontSize: '1.5rem',
    margin: '0.1rem',
    boxShadow: '0',
  },
}));
function FloatActionButton() {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [icon, setIcon] = useState<ReactNode>(
    <AddIcon style={{ fill: `${packmanColors.white}` }} />,
  );

  const actions = [
    { name: '👐🏻 함께 리스트 추가' },
    { name: '☝🏻 혼자 리스트 추가' },
    {
      name: `📂 \u00a0\u00a0\u00a0\u00a0\u00a0폴더 추가 \u00a0 \u00a0`,
    },
  ];

  const handleOpen = () => {
    setOpen(true);
    setIcon(<AddIcon style={{ fill: `${packmanColors.white}` }} />);
  };

  const handleClose = () => {
    setOpen(false);
    setIcon(<AddIcon style={{ fill: `${packmanColors.white}` }} />);
  };

  return (
    <div className={classes.root}>
      <Backdrop open={open} className={classes.backdrop} />
      <SpeedDial
        ariaLabel="FAB"
        className={classes.speedDial}
        icon={icon}
        onOpen={handleOpen}
        onClose={handleClose}
        open={open}
        FabProps={{
          color: 'secondary',
          size: 'medium',
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<div>{action.name}</div>}
            tooltipTitle=""
            tooltipOpen
            onClick={handleClose}
            className={classes.tooltip}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default FloatActionButton;
