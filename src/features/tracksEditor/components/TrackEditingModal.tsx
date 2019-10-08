import isEmpty from 'lodash/fp/isEmpty';
import range from 'lodash/fp/range';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import { Translation } from 'react-i18next';
import Dawww from '../../../dawww';

const minVolume = -20;
const maxVolume = 0;

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    deleteButton: {
      alignSelf: 'stretch',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dropdown: {
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(1),
    },
    content: {
      alignItems: 'flex-start',
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      marginLeft: theme.spacing(-1),
      marginRight: theme.spacing(-1),
    },
    title: {
      fontWeight: 800,
      textTransform: 'uppercase',
    },
  });

interface IDawww {
  VOICES?: any;
}

interface Track {
  [key: string]: any;
}

export interface TrackEditingModalProps extends WithStyles<typeof styles> {
  onDelete?: (track: Track) => void;
  onDismiss?: () => void;
  onVoiceSet?: (track: Track, voice: string) => void;
  onVolumeSet?: (track: Track, volume: string) => void;
  stagedTrack?: Track;
}

function TrackEditingModal(props: TrackEditingModalProps) {
  const {
    classes,
    onDelete,
    onDismiss,
    onVoiceSet,
    onVolumeSet,
    stagedTrack = {},
  } = props;

  const handleContentDeleteButtonClick = React.useCallback(() => {
    onDelete(stagedTrack);
  }, [onDelete, stagedTrack]);

  const handleVoiceChange = React.useCallback(
    e => {
      onVoiceSet(stagedTrack, e.target.value);
    },
    [onVoiceSet, stagedTrack],
  );

  const handleVolumeChange = React.useCallback(
    e => {
      onVolumeSet(stagedTrack, e.target.value);
    },
    [onVolumeSet, stagedTrack],
  );

  return (
    <Translation>
      {t => (
        <Dialog
          className={classes.root}
          fullWidth={true}
          maxWidth="xs"
          onClose={onDismiss}
          open={!isEmpty(stagedTrack)}
        >
          <DialogTitle className={classes.title}>{t('Edit Track')}</DialogTitle>
          <DialogContent className={classes.content}>
            <FormControl className={classes.dropdown}>
              <InputLabel htmlFor="voice">Voice</InputLabel>
              <Select
                inputProps={{ name: 'voice', id: 'voice' }}
                onChange={handleVoiceChange}
                value={stagedTrack.voice || ''}
              >
                {Object.keys((Dawww as IDawww).VOICES).map(voice => (
                  <MenuItem key={voice} value={voice}>
                    {t(voice)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.dropdown}>
              <InputLabel htmlFor="volume">Volume</InputLabel>
              <Select
                inputProps={{ name: 'volume', id: 'volume' }}
                onChange={handleVolumeChange}
                value={stagedTrack.volume || 0}
              >
                {range(maxVolume, minVolume - 1).map(volume => (
                  <MenuItem key={volume} value={volume}>
                    {volume}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              className={classes.deleteButton}
              color="secondary"
              onClick={handleContentDeleteButtonClick}
              variant="contained"
            >
              {t('Delete')}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Translation>
  );
}

export default React.memo(withStyles(styles)(TrackEditingModal));