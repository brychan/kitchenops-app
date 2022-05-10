import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import {
    Paper,
    Button,
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    tableCellClasses,
} from '@mui/material/'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        backgroundColor: theme.palette.common.white,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export default function SimpleTable({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Brand</StyledTableCell>
                        <StyledTableCell align="right">
                            Description
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            Internal Code
                        </StyledTableCell>
                        <StyledTableCell align="right">Active</StyledTableCell>
                        <StyledTableCell align="right">Added</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell>{row.name}</StyledTableCell>
                            <StyledTableCell align="right">
                                {row.description}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.brand}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.code_internal}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.active ? 'Yes' : 'No'}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {new Intl.DateTimeFormat('en-US').format(
                                    new Date(row.created_at)
                                )}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button
                                    component={Link}
                                    to={`/ingredients/view/${row.id}`}
                                    color="primary"
                                    variant="outlined"
                                >
                                    View & Edit
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
