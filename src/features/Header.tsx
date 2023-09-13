import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
//
import { styles } from "shared/styles/Header.style";
import { Search, SearchIconWrapper, StyledInputBase } from "components/Search";
import { pages } from "shared/mocks/header.mock";
import { useLocation } from "react-router";

export const Header: React.FC = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const location = useLocation();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ ...styles.logoIcon }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ ...styles.logo }}
          >
            NEWSUI
          </Typography>
          <Box sx={{ ...styles.menu }}>
            {pages.map((page) => (
              <Typography
                key={page.name}
                component="a"
                href={page.href}
                sx={{
                  ...styles.menuBtn,
                  color: location.pathname === page.href ? "orange" : "white",
                }}
              >
                {page.name}
              </Typography>
            ))}
          </Box>
          {location.pathname === pages[0].href && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search news..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                inputProps={{ "aria-label": "search" }}
                style={{ width: searchText && 400 }}
              />
            </Search>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
