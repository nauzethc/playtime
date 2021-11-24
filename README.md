# PlayTime

HowLongToBeat.com clone made with Vue 3, Vite and [Netlify functions](https://www.netlify.com/products/functions/)


### Features

* Mobile-first and responsive UX
* [howlongtobeat-api](https://github.com/nauzethc/howlongtobeat-api) to retrieve games data from HowLongToBeat.com (scrapping)
* [vite-plugin-pwa](https://github.com/antfu/vite-plugin-pwa) to automate ServiceWorker generation
* Charts with [vue-chart-3](https://github.com/victorgarciaesgi/vue-chart-3)


### External resources

* Icons from [heroicons.dev](https://github.com/zaydek/heroicons.dev)
* Colors from [TailwindCSS](https://tailwindcss.com/)


## Run

```bash
npm install
npm run dev
```
Then go to http://localhost:3000/


## Backend

In order to test app on local development you have to implement some API server.
At `examples` folder you'll find a basic example ready to launch.

```bash
$ npm i --no-save koa @koa/router koa-logger @koa/cors howlongtobeat-api
$ node examples/server.js
```
