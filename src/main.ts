import { createApp } from "./app/app";

const app = createApp();

/* tslintaa:disable-next-line: no-console */
app.listen(3000, () => console.log("App started"));