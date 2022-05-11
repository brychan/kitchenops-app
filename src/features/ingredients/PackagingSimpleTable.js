import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/system'

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
    Typography,
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

export default function PackagingSimpleTable({ data }) {
    const theme = useTheme()
    const _typeToLoad = { Weight: 'Kg', Volume: 'Lt' }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell align="center">Unit</StyledTableCell>
                        <StyledTableCell align="center">
                            Weight/Volume of Unit
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Units in Bundle
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Price per Unit/Bundle
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Price per Kg/Lt
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Actions
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell>
                                {row.type === 'by_weight'
                                    ? 'By Weight'
                                    : row.type === 'by_unit'
                                    ? 'By Unit'
                                    : 'ByPackage'}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {_typeToLoad[row.measurement_unit]}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.type === 'by_weight'
                                    ? '-'
                                    : row.type === 'by_unit'
                                    ? `${row.loose_load_per_unit} ${
                                          _typeToLoad[row.measurement_unit]
                                      }`
                                    : `${row.package_load_per_unit} ${
                                          _typeToLoad[row.measurement_unit]
                                      }`}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.type === 'by_package'
                                    ? row.package_amount_units
                                    : '-'}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.type === 'by_weight'
                                    ? '-'
                                    : row.type === 'by_unit'
                                    ? `${row.price}$ per Unit`
                                    : `${row.price}$ per Bundle`}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Typography variant="h6" sx={{color: theme.palette.secondary.main}}>
                                    {row.type === 'by_weight'
                                        ? row.price
                                        : row.type === 'by_unit'
                                        ? (
                                              row.price /
                                              row.loose_load_per_unit
                                          ).toFixed(2)
                                        : (
                                              row.price /
                                              (row.package_load_per_unit *
                                                  row.package_amount_units)
                                          ).toFixed(2)}
                                    $
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    component={Link}
                                    to={`/ingredients/view/${row.id}`}
                                    color="primary"
                                    variant="outlined"
                                >
                                    Edit
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
