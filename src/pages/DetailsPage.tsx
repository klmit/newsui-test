import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Favorite, Comment } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { NewsItem } from "types/news.types";
import { canculateDate, getSiteName } from "components/Item";

export const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const { items } = useAppSelector((state) => state.news);
  const [item, setItem] = useState<NewsItem>(items[0]);

  const toBack = () => {
    window.history.back();
  };

  const toRedirect = () => {
    const bool = window.confirm("You wan't redirect to: " + item.url);

    if (bool) {
      window.location.href = item.url;
    }
  };

  useEffect(() => {
    const news = items.find((item) => item.id === Number(id));
    setItem(news || items[0]);
  }, [id]);
  const siteName = getSiteName(item.url);
  const date = canculateDate(item.time);
  return (
    <>
      <Box sx={{ width: "80%", margin: "20px auto" }}>
        <IconButton onClick={toBack}>
          <ArrowBackIcon />
        </IconButton>
        <Paper sx={{ padding: 2, marginTop: "20px" }}>
          {item && (
            <Box>
              <Typography component="h1" sx={{ fontSize: 20 }}>
                {item.title}
              </Typography>
              <Typography component="h2" sx={{ fontSize: 16 }}>
                {item.by}
              </Typography>
              <Typography component="p" sx={{ fontSize: 14 }}>
                {item.text || "..."}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {siteName || "?"}
              </Typography>
              <Box sx={{ marginTop: 4 }}>
                <IconButton aria-label="kids">
                  <Comment fontSize="small" />
                </IconButton>
                {item.kids?.length}
                <IconButton aria-label="likes">
                  <Favorite fontSize="small" />
                </IconButton>
                {item.score}
              </Box>
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button size="small" onClick={toRedirect}>
                  Source
                </Button>
                <Box sx={{ fontStyle: "italic", fontSize: 14, marginRight: 2 }}>
                  {item.type} | {date}
                </Box>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};
