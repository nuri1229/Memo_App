import { memoListActionSaga } from "./memo.list.saga";
import { memoCountActionSaga } from "./memo.count.saga";
import { memoCreateActionSaga } from "./memo.create.saga";

export const memoSagas = [memoListActionSaga, memoCountActionSaga, memoCreateActionSaga];
