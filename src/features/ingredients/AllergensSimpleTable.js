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
    FormControl,
    Select,
    MenuItem,
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

const parseValue = (value) => {
    return value === true ? 'Yes' : value === false ? 'No' : 'Not Defined'
}

const AllergensContainSelect = ({ value, onChange }) => {
    return (
        <FormControl sx={{ minWidth: 120 }}>
            <Select
                value={value}
                onChange={onChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Allergens Contains Select' }}
            >
                <MenuItem value="">
                    <em>Not Defined</em>
                </MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
            </Select>
        </FormControl>
    )
}

export default function AllergensSimpleTable({ data, isEdit, handleChangeSelection }) {
    const theme = useTheme()

    const textOrSelect = (allergen) => {
        return isEdit ? (
            <AllergensContainSelect
                value={data[allergen] === null ? '' : data[allergen]}
                onChange={(e) =>
                    handleChangeSelection(allergen, e.target.value)
                }
            />
        ) : (
            parseValue(data[allergen])
        )
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Allergen</StyledTableCell>
                        <StyledTableCell align="center">
                            Contains
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell>
                            Cereals containing gluten e.g. wheat, rye and barley
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('gluten')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Cellery</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('celery')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Crustaceans</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('crustaceans')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Egg</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('egg')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Fish</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('fish')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Lupins</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('lupins')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            Milk Proteins, including Lactose
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('milk')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            Nuts* (Almond, Hazelnut, Walnut, Cashew, Pecan nut,
                            Brazil nut, Pistachio nut, Macadamia nut and
                            Queensland nut).
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('nuts')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Peanuts</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('peanuts')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Sesame Seeds</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('sesame')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Soy Beans</StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('soy')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>
                            Sulphur Dioxid and sulphite at concentrations of
                            more than 10 mg/kg or 10 mg/liter expressed as SO2.
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            {textOrSelect('sulfur_dioxid')}
                        </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell>Comments</StyledTableCell>
                        <StyledTableCell align="center">
                            {data.comments}
                        </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
