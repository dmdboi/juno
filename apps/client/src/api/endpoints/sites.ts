import client from "../client";

async function get() {
  return (await client.get(`/site`)).data;
}

async function create(data: any) {
  return (await client.post("/site", data)).data;
}

async function update(id: string, data: any) {
  return (await client.put(`/site/${id}`, data)).data;
}

export const sites = {
  get,
  create,
  update,
};
