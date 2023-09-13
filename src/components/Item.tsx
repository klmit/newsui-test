import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, Comment } from "@mui/icons-material";
//
import { NewsItem } from "types/news.types";
import { Link } from "react-router-dom";

const canculateDate = (unixTime: number): string => {
  const date = new Date(unixTime * 1000);

  return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
};

const getSiteName = (url: string): string => {
  return url && url.split("/")[2];
};

type Props = {
  item: NewsItem;
};

export const Item: React.FC<Props> = ({ item }) => {
  const { by, time, title, text, id, kids, type, score, url } = item;

  const date = canculateDate(time);
  const siteName = getSiteName(url);

  const toRedirect = () => {
    const bool = window.confirm("You wan't redirect to: " + url);

    if (bool) {
      window.location.href = url;
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        width: "100%",
        marginTop: 0.5,
      }}
      variant="outlined"
      id={id.toString()}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {by}
        </Typography>
        <Typography variant="body2">{text?.slice(0, 500)}...</Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {siteName || "?"}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="kids">
          <Comment fontSize="small" />
        </IconButton>
        {kids?.length}
        <IconButton aria-label="likes">
          <Favorite fontSize="small" />
        </IconButton>
        {score}
      </CardActions>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Box>
          <Link to={"/item/" + id}>
            <Button size="small">Learn More</Button>
          </Link>
          <Button size="small" onClick={toRedirect}>
            Source
          </Button>
        </Box>
        <Box sx={{ fontStyle: "italic", fontSize: 14, marginRight: 2 }}>
          {type}
          {date}
        </Box>
      </CardActions>
    </Card>
  );
};
