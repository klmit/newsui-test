import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Favorite, Comment } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { NewsItem } from "types/news.types";

export const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const { items } = useAppSelector((state) => state.news);
  const [item, setItem] = useState<NewsItem | undefined>();

  const toBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const news = items.find((item) => item.id === Number(id));
    setItem(news);
  }, [id]);

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
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};
