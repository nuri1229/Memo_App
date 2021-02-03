import { HTTP, API_HOST } from "global/service/global.http.service";
import { LabelDomain } from "label/model";

export const labelService = {
  list: () => HTTP.get<{ data: LabelDomain[] }>(`${API_HOST}/labels?offset=1`),
  get: (labelId: string) => HTTP.get<{ data: LabelDomain[] }>(`${API_HOST}/labels/${labelId}`),
  post: (body: { title: string }) => HTTP.post<{ title: string }, { data: LabelDomain }>(`${API_HOST}/labels`, body),
  put: (body: Pick<LabelDomain, "id" | "title">) => HTTP.put<Pick<LabelDomain, "title">, { data: LabelDomain }>(`${API_HOST}/labels/${body.id}`, { title: body.title }),
  addMemoToLabel: (body: { id: string; memoIds: string[] }) => HTTP.post<{ memoIds: string[] }, { data: LabelDomain }>(`${API_HOST}/labels/${body.id}/memos`, { memoIds: body.memoIds }),
  delete: (labelId: string) => HTTP.delete(`${API_HOST}/labels/${labelId}`),
  removeMemoToLabel: (body: { id: string; memoIds: string[] }) => HTTP.post<{ memoIds: string[] }, { data: LabelDomain }>(`${API_HOST}/labels/${body.id}/memos/delete`, { memoIds: body.memoIds }),
};
