import { HTTP, API_HOST } from "global/service/global.http.service";
import { MemoDomain } from "memo/model";

export const memoService = {
  list: (countOnly?: boolean) => HTTP.get<{ data: MemoDomain[] }>(`${API_HOST}/memos?${countOnly ? `countOnly=${countOnly}` : ""}`),
  get: (memoId: string) => HTTP.get<{ data: MemoDomain[] }>(`${API_HOST}/labels/${memoId}`),
  getMemosByLabel: (labelId: string) => HTTP.get<{ data: MemoDomain[] }>(`${API_HOST}/labels/${labelId}/memos`),
  post: (body: Pick<MemoDomain, "title" | "content">) => HTTP.post<Pick<MemoDomain, "title" | "content">, { data: MemoDomain }>(`${API_HOST}/memos`, body),
  put: (body: Pick<MemoDomain, "title" | "content" | "id">) =>
    HTTP.put<Pick<MemoDomain, "title" | "content">, MemoDomain>(`${API_HOST}/memos/${body.id}`, { title: body.title, content: body.content }),
  delete: (memoId: string) => HTTP.delete(`${API_HOST}/memos/${memoId}`),
};
