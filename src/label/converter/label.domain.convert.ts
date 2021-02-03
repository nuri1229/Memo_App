import { LabelDomain, Label } from "label/model";

export const convertLabel = (domain: LabelDomain): Label => {
  return {
    ...domain,
    createdAt: new Date(domain.createdAt),
    updatedAt: new Date(domain.updatedAt),
  };
};
