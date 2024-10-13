import client from "../client";

async function list() {
  return (await client.get("/pages")).data;
}

async function get(id: string) {
  return (await client.get(`/pages/${id}`)).data;
}

async function create(data: any) {
  return (await client.post("/pages", data)).data;
}

async function update(id: string, data: any) {
  return (await client.put(`/pages/${id}`, data)).data;
}

export const pages = {
  list,
  get,
  create,
  update,
};
