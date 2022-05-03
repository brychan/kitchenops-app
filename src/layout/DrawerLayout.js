import List from '@mui/material/List'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/Inbox'
import EggIcon from '@mui/icons-material/Egg'
import MailIcon from '@mui/icons-material/Mail'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MuiDrawer from '@mui/material/Drawer'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import DrawerHeader from './ui/DrawerHeader'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}))

const DarkTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        fontSize: 14,
    },
}))

const drawerWidth = 240

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    [theme.breakpoints.down('sm')]: {
        width: `calc(${theme.spacing(0)} + 1px)`,
    },
})

export default function DrawerLayout({ open, handleDrawerClose }) {
    const theme = useTheme()
    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <DarkTooltip
                    title="Ingredients"
                    placement="right"
                    arrow
                    sx={{ opacity: open ? 0 : 1 }}
                >
                    <ListItemButton
                        component={Link}
                        to="/ingredients/"
                        key="Ingredients"
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <EggIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Ingredients"
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </ListItemButton>
                </DarkTooltip>
            </List>
            <Divider />
            <List>
                <DarkTooltip
                    title="Providers"
                    placement="right"
                    arrow
                    sx={{ opacity: open ? 0 : 1 }}
                >
                    <ListItemButton
                        component={Link}
                        to="/providers"
                        key="providers"
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <LocalShippingIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="providers"
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </ListItemButton>
                </DarkTooltip>
            </List>
        </Drawer>
    )
}
