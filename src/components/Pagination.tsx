import { Pagination, Stack } from "@mui/material";

type Props = {
  count: number;
  page: number;
};

export const PaginationComp: React.FC<Props> = ({ count, page }) => {
  return (
    <Stack spacing={2} sx={{ margin: "50px 0 50px 0" }}>
      <Pagination
        defaultPage={page}
        count={count}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};
