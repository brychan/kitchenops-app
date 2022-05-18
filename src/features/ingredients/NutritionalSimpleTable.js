import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/system'

import {
    Paper,
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    tableCellClasses,
    TextField,
    InputAdornment
} from '@mui/material/'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.common.white,
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        backgroundColor: theme.palette.common.white,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export default function NutritionalSimpleTable({ data, isEdit, handleChange, formErrors }) {
    const textOrInput = (type, unit) => {
        return isEdit ? (
            <TextField
                error={formErrors[type]}
                helperText={formErrors[type] && "Invalid number, e.g. valid: 1234.56"}
                sx={{ width: '30ch' }}
                variant="outlined"
                type="text"
                value={data[type] === null ? '0' : data[type]}
                onChange={(e) => handleChange(e.target.value, type)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
                }}
                
            />
        ) : data[type] === null ? (
            'Not defined'
        ) : (
            `${data[type]} ${unit}`
        )
    }
    const theme = useTheme()
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Typical Values</StyledTableCell>
                        <StyledTableCell align="center">
                            per 100g
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell>Energy (Calories)</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrInput('calories', 'Kcal')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Protein</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrInput('protein', 'grams')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Carbohydrates</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrInput('carbs', 'grams')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            <em>Of which Dietary Fibers</em>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <em>{textOrInput('carbs_fiber', 'grams')}</em>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            <em>Of which sugars</em>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <em>{textOrInput('carbs_sugar', 'grams')}</em>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Fats</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrInput('fats', 'grams')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            <em>Of which Staurated Fats</em>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <em>{textOrInput('fats_sat', 'grams')}</em>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            <em>Of which Trans Fats</em>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <em>{textOrInput('fats_trans', 'grams')}</em>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            <em>Of which Polysaturated Fats</em>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <em>{textOrInput('fats_poly', 'grams')}</em>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            <em>Of which Monosaturated Fats</em>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <em>{textOrInput('fats_mono', 'grams')}</em>
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Sodium</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrInput('sodium', 'grams')}
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
