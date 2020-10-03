# Tic Tac Toe with Svelte

This is a simple Tic Tac Toe SPA implemented using [Svelte](https://svelte.dev), based on the 
project template found at <https://github.com/sveltejs/template>.

Play at <https://aioooi.github.io/tictactoe-svelte/> :blush:


## Requirements and Installation

Assuming rather recent versions [Node.js](https://nodejs.org), npm and the likes are installed:

```bash
git clone https://github.com/aioooi/tictactoe-svelte
cd tictactoe-svelte
npm install
```

Clone the Tic Tac Toe engine from <https://github.com/aioooi/tictactoe-js> using 
[degit](https://github.com/Rich-Harris/degit):


```bash
mkdir lib
npx degit aioooi/tictactoe-js lib/tictactoe
```


## Build and Run

Like the template, it uses [Rollup](https://rollupjs.org).
To run a development server with live reload at [localhost:5000](http://localhost:5000):
```bash
npm run dev
```

To create an optimised version of the app:

```bash
npm run build
```

For further information, please refer to the 
[README of the project template](https://github.com/sveltejs/template/blob/master/README.md).
