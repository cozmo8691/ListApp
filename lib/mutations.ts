import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};

export const create = (body: { name: string; description: string }) => {
  return fetcher(`/list/create`, body);
};

export const update = (body: {
  id: number;
  name: string;
  description: string;
  items: { name: string; description: string }[];
}) => {
  return fetcher(`/list/update/${body.id}`, body);
};
