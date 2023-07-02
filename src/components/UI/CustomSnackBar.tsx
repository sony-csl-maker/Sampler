import { Alert, AlertColor, Snackbar } from '@mui/material';
import { FC } from 'react';

interface CustomSnackBarProps {
  open: boolean;
  onClose: () => void;
  text: string;
  severity: AlertColor | undefined;
}

const CustomSnackBar: FC<CustomSnackBarProps> = ({ open, onClose, text, severity }) => {
  return (
    <div>
      <Snackbar autoHideDuration={8000} open={open} onClose={onClose}>
        <Alert onClose={onClose} severity={severity}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackBar;
