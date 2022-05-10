import {
    Autocomplete,
    Box,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Typography,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    TextField,
} from '@mui/material'
import { Fragment } from 'react'

const optionsDummy = [{ name: 'Box' }, { name: 'Pallet' }]
const PackagingCreateForm = ({ values, handleChange}) => {
    const loosePriceStep = (
        <Box>
            <Typography variant="h6">
                Price per{' '}
                {values._loose_unit === 'Unit'
                    ? 'Unit'
                    : values._measurementUnit === 'Weight'
                    ? 'Kilogram'
                    : 'Liter'}
            </Typography>
            <FormControl fullWidth sx={{ m: 1, width: '30ch' }}>
                <InputLabel htmlFor="packaging-adornment-loose-price">
                    Required*
                </InputLabel>
                <OutlinedInput
                    id="packaging-adornment-loose-price"
                    value={values._loose_price}
                    onChange={handleChange('_loose_price')}
                    color="secondary"
                    startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Required*"
                />
            </FormControl>
        </Box>
    )

    const looseUnitStep = (
        <Box>
            <Typography variant="h6">
                Does it come in a single Unit, or by {values._measurementUnit}?
            </Typography>
            <FormControl>
                <RadioGroup
                    aria-labelledby="packaging-radio-loose-unit"
                    name="packaging-radio-loose-unit"
                    value={values._loose_unit}
                    onChange={handleChange('_loose_unit')}
                >
                    <FormControlLabel
                        value="Unit"
                        control={<Radio />}
                        label="Unit"
                    />
                    <FormControlLabel
                        value="Load"
                        control={<Radio />}
                        label={values._measurementUnit}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    )
    const looseUnitLoadStep = (
        <Box>
            <Typography variant="h6">
                Average {values._measurementUnit} of the Unit
            </Typography>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                <OutlinedInput
                    id="packaging-adornment-loose-unit-load"
                    value={values._loose_unit_load}
                    onChange={handleChange('_loose_unit_load')}
                    color="secondary"
                    endAdornment={
                        <InputAdornment position="end">
                            {values._measurementUnit === 'Weight'
                                ? 'kgs'
                                : 'lts'}
                        </InputAdornment>
                    }
                    inputProps={{
                        'aria-label': '_loose_unit_load',
                    }}
                />
            </FormControl>
        </Box>
    )
    const packageAmountUnitsStep = (
        <Box>
            <Typography variant="h6">
                Amounts of Packages in the Bundle
            </Typography>
            <TextField
                sx={{ m: 1, width: '30ch' }}
                variant="outlined"
                type="text"
                value={values._package_amount_units}
                onChange={handleChange('_package_amount_units')}
            />
        </Box>
    )
    const packagePriceStep = (
        <Box>
            <Typography variant="h6">Price for Minimum Order</Typography>
            <FormControl sx={{ m: 1, width: '30ch' }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                    Required*
                </InputLabel>
                <OutlinedInput
                    id="packaging-adornment-package-price"
                    value={values._package_price}
                    onChange={handleChange('_package_price')}
                    color="secondary"
                    startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Required*"
                />
            </FormControl>
        </Box>
    )
    const packageNameStep = (
        <Box>
            <Typography variant="h6">
                Custom name for this Bundle (i.e. Box, Pallet, etc...)
            </Typography>
            <Autocomplete
                id="free-solo-demo"
                sx={{ m: 1, width: '30ch' }}
                freeSolo
                options={optionsDummy.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} />}
            />
        </Box>
    )
    const packageWeightStep = (
        <Box>
            <Typography variant="h6">
                Minimum {values._measurementUnit} of the Package
            </Typography>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                <OutlinedInput
                    id="packaging-adornment-package-weight"
                    value={values._package_weight}
                    onChange={handleChange('_package_weight')}
                    color="secondary"
                    endAdornment={
                        <InputAdornment position="end">
                            {values._measurementUnit === 'Weight'
                                ? 'kgs'
                                : 'lts'}
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    )
    return (
        <Fragment>
            <Box>
                <Typography variant="h6">
                    What unit will you measure this ingredient by?
                </Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="packaging-radio-unit-measurement"
                        name="packaging-radio-unit-measurement"
                        value={values._measurementUnit}
                        onChange={handleChange('_measurementUnit')}
                    >
                        <FormControlLabel
                            value="Weight"
                            control={<Radio />}
                            label="Weight (Kilograms)"
                        />
                        <FormControlLabel
                            value="Volume"
                            control={<Radio />}
                            label="Volume (Liters)"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <Typography variant="h6">Does it come in a package?</Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="packaging-radio-is-package"
                        name="packaging-radio-is-package"
                        value={values._isPackage}
                        onChange={handleChange('_isPackage')}
                    >
                        <FormControlLabel
                            value="No"
                            control={<Radio />}
                            label="No"
                        />
                        <FormControlLabel
                            value="Yes"
                            control={<Radio />}
                            label="Yes"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
            {values._isPackage === 'Yes' && (
                <Fragment>
                    {packageNameStep}
                    {packageAmountUnitsStep}
                    {packageWeightStep}
                    {packagePriceStep}
                </Fragment>
            )}
            {values._isPackage === 'No' && (
                <Fragment>
                    {looseUnitStep}
                    {values._loose_unit === 'Unit' && looseUnitLoadStep}
                    {values._loose_unit !== '' && loosePriceStep}
                </Fragment>
            )}
        </Fragment>
    )
}

export default PackagingCreateForm
