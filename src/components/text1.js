import React, { useEffect } from 'react'
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux'
import { HomeAction } from '../redux/Action/HomeAction';
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isCollaspe, setIsCollapse] = React.useState(false);
  const [openDropdownId, setOpenDropdownId] = React.useState(null);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const { homeAction: homemess } = useSelector((store) => store.home)
  console.log(homemess, "home....");

  const handleClick = () => {
    const userObj = {}
    dispatch(HomeAction(userObj))
  }

  useEffect(() => {
    handleClick();
  }, [])

  const handleDropdownToggle = (encryptedTabId, isActive, isView) => {
    if (isActive && isView) {
      console.log(encryptedTabId, "encryptedTabId");
      setIsCollapse(openDropdownId === encryptedTabId ? false : true);
      // setIsCollapse((prevId) => console.log(encryptedTabId==null?false:true,"ccc--"))
      setOpenDropdownId((prevId) => (prevId === encryptedTabId ? null : encryptedTabId));
    }
    // console.log(encryptedTabId, "encryptedTabId");
    // setIsCollapse(!isCollaspe);
    // setOpenDropdownId((prevId) => (prevId === encryptedTabId ? null : encryptedTabId));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Header
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {homemess !== null && homemess
            .filter((webpage) => webpage.parentId === "0")
            .sort((a, b) => a.displayOrder - b.displayOrder).map((text, index) => (
              <>
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText onClick={() => handleDropdownToggle(text.encryptedTabId, text.isActive, text.isView)}
                      primary={text.displayName} sx={{ opacity: open ? 1 : 0 }} />
                    {index % 2 === 0 && isCollaspe == "true" ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>

                <Collapse in={isCollaspe}>
                  {openDropdownId == text.encryptedTabId &&
                    homemess.sort((a, b) => a.displayOrder - b.displayOrder)
                      .filter(child => child.parentId === text.encryptedTabId)
                      .map(child => (
                        console.log(openDropdownId, isCollaspe, "open"),

                        <ListItem key={child.encryptedTabId} disablePadding sx={{ display: "block" }}>
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                              }}
                            >
                              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText
                              primary={child.displayName} sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                        </ListItem>
                      ))
                  }
                </Collapse>
              </>

            ))}


        </List>
        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       
      </Box>
    </Box>
  );
}
