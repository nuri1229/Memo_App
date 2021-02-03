import { MemoDomain, Memo } from "memo/model";

export const convertMemo = (domain: MemoDomain): Memo => {
  return {
    ...domain,
    createdAt: new Date(domain.createdAt),
    updatedAt: new Date(domain.updatedAt),
  };
};
