const Prod_URL = "https://medium.rajthombare.workers.dev"
const Dev_URL = "http://127.0.0.1:8787"
export const BACKEND = import.meta.env.MODE === "development" ? `${Dev_URL}` : `${Prod_URL}`;
