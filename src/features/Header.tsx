import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
//
import { styles } from "shared/styles/Header.style";
import { Search, SearchIconWrapper, StyledInputBase } from "components/Search";
import { pages } from "shared/mocks/header.mock";
import { useLocation } from "react-router";
import { Paper } from "@mui/material";
import { useAppSelector } from "store/hooks";
import { Link } from "react-router-dom";

type SearchType = {
  title: string;
  id: number;
};

export const Header: React.FC = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchResult, setSearchResult] = React.useState<SearchType[]>([]);
  const location = useLocation();

  const { items } = useAppSelector((state) => state.news);

  React.useEffect(() => {
    if (!searchText) return setSearchResult([]);

    const result: SearchType[] = [];

    items.map((item) => {
      if (item.title.toLocaleLowerCase().includes(searchText.toLowerCase())) {
        result.push({ title: item.title, id: item.id });
      }
    });

    setSearchResult(result);
  }, [searchText]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NewspaperIcon sx={{ ...styles.logoIcon }} />
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
            <Box>
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
              {searchResult.length ? (
                <Paper
                  sx={{
                    position: "absolute",
                    padding: 1,
                    zIndex: 999,
                  }}
                >
                  {searchResult.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        marginTop: 2,
                        paddingLeft: 2,
                        borderLeft: "2px solid orange",
                      }}
                    >
                      <Link
                        to={"/item/" + item.id}
                        onClick={() => setSearchText("")}
                        style={{ color: "darkgray" }}
                      >
                        {item.title} <InsertLinkIcon />
                      </Link>
                    </Box>
                  ))}
                </Paper>
              ) : (
                ""
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
