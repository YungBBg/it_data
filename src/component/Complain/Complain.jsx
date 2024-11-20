import { Box, Button, FormControlLabel, Typography, Card, Stack, Radio, RadioGroup, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import EditOutlined from '@mui/icons-material/EditOutlined';

export default function Complain() {
    const theme = useTheme();

    const complaintOptionList = [
        { name: 'Service Issue', id: 1 },
        { name: 'Product Quality', id: 2 },
        { name: 'Billing Problem', id: 3 },
        { name: 'Others', id: 4 },
    ];

    const [selectedComplaint, setSelectedComplaint] = React.useState(null);
    const [complaintDetails, setComplaintDetails] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleEditClick = (optionName) => {
        // Handle edit button click, e.g., open a modal or navigate to another page
        console.log(`Editing complaint type: ${optionName}`);
    };

    const handleSubmit = () => {
        // Set the submission state to true to show the confirmation message
        setIsSubmitted(true);
    };

    const handleComplaintChange = (event) => {
        // Update the selected complaint based on the radio button choice
        setSelectedComplaint(event.target.value);
    };

    return (
        <Grid container direction="row" justifyContent="center" alignContent="center">
            <Grid item>
                {!isSubmitted ? (
                    <>
                        <Typography variant="h3">Submit a Complaint</Typography>

                        <RadioGroup
                            defaultValue={1}
                            sx={{ mt: 2 }}
                            onChange={handleComplaintChange}
                        >
                            {complaintOptionList.map((option) => (
                                <Card key={option.id} variant="outlined"
                                    sx={{
                                        padding: 2,
                                        margin: [1, 1],
                                        borderRadius: 2,
                                        ':hover': {
                                            boxShadow: theme.palette.mode === 'dark'
                                                ? '0 2px 14px 0 rgb(33 150 243 / 10%)'
                                                : '0 2px 14px 0 rgb(32 40 45 / 8%)'
                                        }
                                    }}>
                                    <FormControlLabel
                                        value={option.id}
                                        control={<Radio sx={{
                                            "&.MuiRadio-root": { color: '#fec816' },
                                            ":hover": { bgcolor: '#fef9e8' }
                                        }} />}
                                        label={
                                            <Box width={470}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="h6" component="div" gutterBottom>
                                                        {option.name}
                                                    </Typography>
                                                    <Button variant="contained"
                                                        sx={{ color: "#322805", bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }}
                                                        onClick={() => handleEditClick(option.name)}>
                                                        <EditOutlined />
                                                    </Button>
                                                </Stack>
                                            </Box>
                                        }
                                    />
                                </Card>
                            ))}
                        </RadioGroup>

                        <Box mt={4}>
                            <Typography variant="h6" gutterBottom>Complaint Details</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Please describe your issue in detail..."
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={complaintDetails}
                                onChange={(e) => setComplaintDetails(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                sx={{ bgcolor: '#fec81a', color: "#322805", ":hover": { bgcolor: "#feda66" } }}
                                onClick={handleSubmit}
                            >
                                Submit Complaint
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Box>
                        <Typography variant="h4" color="success.main">Complaint Submitted</Typography>
                        <Typography variant="h6">Complaint Type: {complaintOptionList.find(option => option.id === parseInt(selectedComplaint))?.name}</Typography>
                        <Typography variant="body1">Details: {complaintDetails || 'No details provided'}</Typography>
                    </Box>
                )}
            </Grid>
        </Grid>
    );
}
