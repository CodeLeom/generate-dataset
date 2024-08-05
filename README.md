# Building a synthetic Dataset generating application


>This app is showcasing the Autogon AI power and this can be integrated into any application that needs to integrate a synthetic datasets generation. 

This app was built using react [vite](https://vitejs.dev/guide/), [JSON-server](https://www.npmjs.com/package/json-server), and [Autogon Generate Dataset](https://autogon.ai/playground/generate-dataset).


To run this app locally, you need to have an [Autogon](https://autogon.ai/) account, so as to be able to get your API key. If you don't have an existing account, [signup](https://console.autogon.ai/), and log in to your dashboard, click your profile image, then click on settings, you'd find the tab for API, generate your API key and come back to your code for usage.

At the root level of your app (that is, the same location where your `vite.config.js` is located), create a `.env` file and put your API key there for safety.

>the `sample.env` file is there to guide you on what is needed
>base url is `https://api.autogon.ai/api/v1`

### Endpoints

*Generate Dataset API (base url)*
```plaintext
https://api.autogon.ai/api/v1
```
*Complete API*
```plaintext
https://api.autogon.ai/api/v1/services/generate-data
```
---

Once you clone this repo, change your directory into the folder, open your terminal, either through your coding environment or your default system based (cmd, terminal). Run `npm install`, and `npm run dev` in the terminal respectively and your app should be running.

:bulb: Build yours and show me what you came up with.