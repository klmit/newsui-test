export const styles = {
  logo: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  logoIcon: {
    display: { xs: "none", md: "flex" },
    mr: 1,
  },
  menu: {
    flexGrow: 1,
    display: { xs: "none", md: "flex" },
  },
  menuBtn: {
    fontSize: "14px",
    color: "white",
    display: "block",
    textDecoration: "none",
    textTransform: "uppercase",
    margin: "0 10px 0 10px",
    "&:hover": {
      color: "gray",
    },
  },
};
