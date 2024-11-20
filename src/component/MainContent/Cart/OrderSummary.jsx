// material-ui
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import storeItem from '/src/component/data/breakfastItem.json'
import { useShoppingCart } from '/src/component/context/ShoppingCartContext';
import { formatCurrency } from "/src/component/utilities/formatCurrency"

export default function OrderSummary({fee}) {
    const theme = useTheme();
    const { cartItems, getItemQuantity } = useShoppingCart();

    let subTotalPrice = cartItems.reduce((prevPrice, cartItem) => {
        const item = storeItem.find(i => i.id === cartItem.id);
        const qty = getItemQuantity(item.id);
        return prevPrice + item.price * qty;
    }, 0);

    let totalPrice = subTotalPrice + parseInt(fee);

    return (
        <Card variant="outlined" sx={{ minWidth: 275, padding: 3, borderRadius: 2, ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' } }}>
            <TableContainer>
                <Table sx={{ minWidth: 'auto' }} size="small" aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle1">Order Summary</Typography>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                        <TableRow>
                            <TableCell>Sub Total</TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">
                                    {formatCurrency(subTotalPrice)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Coupon Discount</TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">
                                    {'$0'}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Shipping Charges</TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">
                                {formatCurrency(fee)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ borderBottom: 'none' }}>
                                <Typography variant="subtitle1">Total</Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ borderBottom: 'none' }}>
                                <Typography variant="subtitle1">
                                    {formatCurrency(totalPrice)}

                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}