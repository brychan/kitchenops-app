import { Box, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'

const itemRowArgs = (borderBottom, extraStyles = {}) => {
    return {
        sx: !borderBottom
            ? {
                  borderBottom: { md: '1px solid', sm: 0 },
                  borderColor: { md: grey[300], sm: 0 },
                  paddingY: 2,
                  ...extraStyles,
              }
            : {
                  borderBottom: '1px solid',
                  borderColor: grey[300],
                  paddingY: 2,
                  ...extraStyles,
              },
    }
}
const ProviderCreateForm = ({ name, description }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(1,1fr)',
                    md: 'repeat(2,1fr)',
                },
            }}
        >
            <Box {...itemRowArgs(false)}>Name</Box>
            <Box {...itemRowArgs(true)}>
                <TextField
                    required
                    label="Required"
                    type="text"
                    color="secondary"
                    value={name.value}
                    onChange={(e) => name.setValue(e.target.value)}
                    sx={{ width: '100%' }}
                />
            </Box>
            <Box {...itemRowArgs(false)}>Description</Box>
            <Box {...itemRowArgs(true)}>
                <TextField
                    required
                    type="text"
                    color="secondary"
                    value={description.value}
                    onChange={(e) => description.setValue(e.target.value)}
                    sx={{ width: '100%' }}
                />
            </Box>
        </Box>
    )
}

export default ProviderCreateForm
