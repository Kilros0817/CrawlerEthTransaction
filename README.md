# TypeScript Crawler Ether Chain

The main purpose of this repository is to show a working crawling of ethereum transactions with JWT.

## Node Express Moralis PassportJS JWT
### Requirements
- Design a Backend API for client to retrieve the transaction for given address
 Please consider that the transaction amount will be huge; how do you deal with the situation.
 In this case, I recommend to use side chain APIs like Moralis, so I implement it my codebase.
- We care about security, so please integrate JWT into the Backend implementations for authentication
 Only when the user login can access the transaction retrieve endpoints.
 Implemented.
 Only the user with the address can retrieve the transaction of the address.
 Implemented.
- Write a decent README to explain what you have done
- You can use any third-party library to accomplish the tasks, but please briefly describe why you choose the library in README
 I implemented to crawl info from chain using Moralis API because if I get them directly from chain, the response takes too long.
 For sure, I can implement the logic to get them directly from chain and it's too easy.
### APIs
- Signup API
http://localhost:3000/signup
<img align="center" src="https://github.com/leopard930418/CrawlerEthTransaction/blob/e81fac613b4400b2b1e9693184db5faf6ab5e1a0/app_screen/Screenshot%202022-10-28%20092755.png?raw=true" style = "width: -webkit-fill-available;"/>

- Login API
http://localhost:3000/login
<img align="center" src="https://github.com/leopard930418/CrawlerEthTransaction/blob/e81fac613b4400b2b1e9693184db5faf6ab5e1a0/app_screen/Screenshot%202022-10-28%20092935.png?raw=true" style = "width: -webkit-fill-available;"/>

- Crawler Transactions on Ethereum API(Auth bearer token)
http://localhost:3000/crawler
<img align="center" src="https://github.com/leopard930418/CrawlerEthTransaction/blob/e81fac613b4400b2b1e9693184db5faf6ab5e1a0/app_screen/img_20221028.png?raw=true" style = "width: -webkit-fill-available;"/>

- Crawler ERC20 Transactions on Ethereum API(Auth bearer token)
http://localhost:3000/crawlerERC20
<img align="center" src="https://github.com/leopard930418/CrawlerEthTransaction/blob/e81fac613b4400b2b1e9693184db5faf6ab5e1a0/app_screen/Untitled.png?raw=true" style = "width: -webkit-fill-available;"/>

- Logout API
http://localhost:3000/logout

### Nice to Have
- Used MongoDB
- NodeJS Express Typescript
- Unit Test with Jest
- E2E Testing with postman

# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Deploying the app](#deploying-the-app)
	- [Pre-reqs](#Prerequisites)
	- [Deploying to Azure App Service](#deploying-to-azure-app-service)
- [TypeScript + Node](#typescript--node)
	- [Getting TypeScript](#getting-typescript)
	- [Project Structure](#project-structure)
	- [Building the project](#building-the-project)
	- [Type Definition (`.d.ts`) Files](#type-definition-dts-files)
	- [Debugging](#debugging)
	- [Testing](#testing)
	- [ESLint](#eslint)
- [Dependencies](#dependencies)
	- [`dependencies`](#dependencies)
	- [`devDependencies`](#devdependencies)
- [Hackathon Starter Project](#hackathon-starter-project)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git <project_name>
```
- Install dependencies
```
cd CrawlerEthTransaction
npm install
```
- Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db

# starting from macOS 10.15 even the admin cannot create directory at root
# so lets create the db directory under the home directory.
mkdir -p ~/data/db
# user account has automatically read and write permissions for ~/data/db.
```
- Start your mongoDB server (you'll probably want another command prompt)
```bash
mongod

# on macOS 10.15 or above the db directory is under home directory
mongod --dbpath ~/data/db
```
- Build and run the project
```
npm run build
npm start
```
Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

### Build the app
Building the app locally is required to generate a zip to deploy because the App Service won't execute build tasks.
Build the app however you normally would:
- `ctrl + shift + b` - kicks off default build in VS Code
- execute `npm run build` from a terminal window

## Project Structure
> **Note!** Make sure you have already built the app using `npm run build`

| Name                     | Description                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **.vscode**              | Contains VS Code specific settings                                                            |
| **.github**              | Contains GitHub settings and configurations, including the GitHub Actions workflows            |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | Passport authentication strategies and login middleware. Add other complex config code here   |
| **src/controllers**      | Controllers define functions that respond to various http requests                            |
| **src/models**           | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/public**           | Static assets that will be used client side                                                   |
| **src/types**            | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](#type-definition-dts-files)          |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains your tests. Separate from source because there is a different build process.         |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .travis.yml              | Used to configure Travis CI build                                                             |
| .copyStaticAssets.ts     | Build script that copies images, fonts, and JS libs to the dist folder                        |
| jest.config.js           | Used to configure Jest running tests written in TypeScript                                    |
| package.json             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tsconfig.tests.json      | Config settings for compiling tests written in TypeScript                                     |
| .eslintrc                | Config settings for ESLint code style checking                                                |
| .eslintignore            | Config settings for paths to exclude from linting                                             |
