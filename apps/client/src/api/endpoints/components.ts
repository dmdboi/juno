import client from "../client";

async function list() {
  return (await client.get("/components")).data;
}

async function get(id: string) {
  return (await client.get(`/components/${id}`)).data;
}

async function create(data: any) {
  return (await client.post("/components", data)).data;
}

async function update(id: string, data: any) {
  return (await client.put(`/components/${id}`, data)).data;
}

export const components = {
  list,
  get,
  create,
  update,
};
