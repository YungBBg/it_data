import { Snackbar, Alert, Stack, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function CustSnackbar({ openSnack, setOpenSnack, message="Thank You for your Rating!" }) {

    const handleClose = () => { setOpenSnack(false) };

    return (
        <Snackbar
            open={openSnack}
            autoHideDuration={2500}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }} 
        >
            <Alert variant="filled" sx={{bgcolor:'white', border:"1px solid orange", color:'black'}} severity='warning' icon={false}>
                <Stack direction={'row'} justifyContent={'center'} spacing={1}>
                    <FavoriteIcon sx={{ color: 'red' }} />
                    <Typography>{message}</Typography>
                </Stack>
            </Alert>
        </Snackbar>
    )
}