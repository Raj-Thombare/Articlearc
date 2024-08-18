const Prod_URL = "https://medium.rajthombare.workers.dev"
export const BACKEND = import.meta.env.MODE === "development" ? "http://127.0.0.1:8787" : `${Prod_URL}`;
