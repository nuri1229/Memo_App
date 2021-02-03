export const getSelectedLabelId = (hash: string) => {
  if (!hash) return "all";
  const [_, labelId] = hash.split("/");
  return labelId ? labelId : "all";
};

export const getSelectedMemoId = (hash: string) => {
  if (!hash) return "";
  const [_, labelId, memoId] = hash.split("/");
  return memoId ? memoId : "";
};
