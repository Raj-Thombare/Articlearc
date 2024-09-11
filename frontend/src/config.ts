const Dev_URL = 'http://127.0.0.1:8787';
const Prod_URL = 'https://articlearc.rajthombare.workers.dev';
export const BACKEND = import.meta.env.MODE === "development" ? `${Dev_URL}` : `${Prod_URL}`;
