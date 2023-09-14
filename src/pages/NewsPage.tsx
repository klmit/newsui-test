import React from "react";
import { Box, Button, CircularProgress, Paper, Skeleton } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
//
import { getItemIds, getItems } from "shared/api/routes/news";
import { styles } from "shared/styles/NewsPage.style";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { newsActions } from "store/slices/news.slice";
import { Item } from "components/Item";
import { appActions } from "store/slices/app.slice";
import { NewsItem } from "types/news.types";
import { news_mock } from "shared/mocks/news.mock";

const promiseWrapper = (data: number[]) => {
  return data.map((item, i) => {
    return new Promise((resolve, reject) => {
      getItems(item)
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  });
};

export const NewsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { itemIds, items } = useAppSelector((state) => state.news);
  const { isLoading } = useAppSelector((state) => state.app);
  const { setItemIds, setItems } = newsActions;
  const { setSuccessMessage } = appActions;
  const [updatedCount, setUpdatedCount] = React.useState<number>(0);
  const [rendering, setRendering] = React.useState<boolean>(false);

  const getItemsIdsHandler = async () => {
    try {
      const { data } = await getItemIds();
      dispatch(setItemIds(data));
    } catch (e) {}
  };
  const getItemsHandler = async (itemsId: number[], isNew?: boolean) => {
    setRendering(true);
    const requestData = promiseWrapper(itemsId);

    const response: any[] = (await Promise.all(requestData)).filter(
      (item) => item
    );

    if (isNew) dispatch(setItems(response.concat(items).sort((a, b) => b - a)));
    else dispatch(setItems(response.sort((a, b) => b - a)));
    setRendering(false);
  };

  const updateItems = () => {
    getItemsIdsHandler();
    dispatch(setSuccessMessage("Data updated successfully!"));
    setUpdatedCount((prev) => prev + 1);
  };

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight;

    if (isNearBottom) {
      getItemsHandler(itemIds.slice(items.length, items.length + 10), true);
      window.scrollTo({ top: scrollTop - 400 });
    }
  };

  React.useEffect(() => {
    const timeout = setInterval(updateItems, 60000);
    getItemsIdsHandler();

    document.title = "News";

    return () => clearInterval(timeout);
  }, []);

  React.useEffect(() => {
    if (items.length) getItemsHandler(itemIds.slice(0, items.length));
    else getItemsHandler(itemIds.slice(0, 10));
  }, [itemIds]);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [itemIds, items]);

  return (
    <Box sx={{ ...styles.main }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>
          Total: {itemIds.length} | Loaded: {items.length} | Updated:{" "}
          {updatedCount}
        </h3>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            <span>{rendering && "Rendering..."}</span>
            <Button
              variant="contained"
              sx={{ height: 30 }}
              onClick={updateItems}
              endIcon={<ReplayIcon />}
            >
              Update
            </Button>
          </Box>
        )}
      </Box>
      <Paper>
        {items.length ? (
          items.map((item) => <Item key={item.id} item={item} />)
        ) : (
          <Skeleton variant="rounded" animation="wave" width="100%">
            {news_mock.map((item, i) => (
              <Item key={item.id} item={item} />
            ))}
          </Skeleton>
        )}
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {isLoading && <CircularProgress />}
      </Box>
    </Box>
  );
};
