 <!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="/">
    <img src="https://github.com/sabaicode-dev/check-me/blob/Dev/apps/frontend-client/public/CheckMe.svg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Check Me</h3>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Our website is Blood Pressure Monitoring System aims to develop an innovative, user-friendly, and reliable device for measuring blood pressure. The project leverages modern technology to provide accurate and real-time blood pressure readings, enhancing the ability of individuals to monitor their blood pressure. The device will be integrated with a Web application, allowing users to track and manage their blood pressure data effectively.<a href="https://www.canva.com/design/DAGHJwfWCdg/N-zFVoLk8Pa_mstrUg5bEQ/edit?utm_content=DAGHJwfWCdg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank">Check Me</a>!

## Our vision

Guide everyone to a healthier life style
<a href="https://www.canva.com/design/DAGHJ5o7Rjc/w8SN2DBhXLgre1fxVirX3w/edit?utm_content=DAGHJ5o7Rjc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank">Product vision board</a>

## Our mission

Anyone can easily understand the meaning behind their blood pressure test result

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## UI design

- [![Static Badge](https://img.shields.io/badge/Figma-2C2D34?style=for-the-badge&logo=figma&logoColor=fff&color=%232C2D34)](https://www.figma.com/design/crMDtSSVv5vX7sIZc8jCWN/Team-Project-Check-Me?node-id=205-108&t=fR3Ai4jI02tEYQvX-0)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This section we lists all library and framework that make this project

- [![Next][Next.js]][Next-url]
- [![Static Badge](https://img.shields.io/badge/Node.js-499442?style=for-the-badge&logo=node.js&logoColor=fff&color=499442)](https://nodejs.org/en)
- [![Static Badge](https://img.shields.io/badge/Tyscript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff&color=3178C6)](https://www.typescriptlang.org/)
- [![Static Badge](https://img.shields.io/badge/Express.js-000?style=for-the-badge&logo=express&logoColor=fff&color=000)](https://expressjs.com/)
- [![Static Badge](https://img.shields.io/badge/Mongodb-%23023430?style=for-the-badge&logo=mongodb&logoColor=fff&color=%23023430)](https://www.mongodb.com/)

### Project Structure

<p>The project follows a microservices architecture within a monorepo setup. Below is an overview of the directory structure and the purpose of each component:</p>

```
CheckMe
.
├── .github
├── .next
├── .vscode
├── .yarn
├── apps
│   ├── backend
│   │   ├── api-proxy
│   │   │   ├── build
│   │   │   |   ├── configs
│   │   │   |   |   └── .env.production
|   |   |   |   └── server.js
│   │   │   ├── src
│   │   │   |   ├── configs
│   │   │   |   |   ├── .env.production
|   |   |   |   |   └── .env.production
│   │   │   |   ├── middleware
│   │   │   |   |   ├── auth.ts
│   │   │   |   |   ├── cors.ts
│   │   │   |   |   └── proxy.ts
│   │   │   |   ├── app.ts
│   │   │   |   ├── config.ts
│   │   │   |   ├── route-defs.ts
│   │   │   |   └── server.ts
│   │   │   ├── build-script.js
│   │   │   ├── package-lock.json
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   ├── auth-service
│   │   │   ├── build
│   │   │   |   ├── configs
│   │   │   |   |   └── .env.production
│   │   │   |   ├── docs
│   │   │   |   |   ├── absolute-path.js
│   │   │   |   |   ├── index.css
│   │   │   |   |   ├── index.js
│   │   │   |   |   ├── swagger-initializer.js
│   │   │   |   |   └── ...
|   |   |   |   ├── favicon-16x16.png
|   |   |   |   ├── favicon-32x32.png
|   |   |   |   └── server.js
│   │   │   ├── node_modules
│   │   │   ├── src
│   │   │   |   ├── configs
│   │   │   |   |   ├── .env.development
|   |   |   |   |   └── .env.production
│   │   │   |   ├── controllers
|   |   |   |   |   └── auth.controller.ts
│   │   │   |   ├── docs
|   |   |   |   |   └── swagger.json
│   │   │   |   ├── models
|   |   |   |   |   └── auth.model.ts
│   │   │   |   ├── routes
|   |   |   |   |   └── auth
│   │   │   |   |       └── routes.ts
│   │   │   |   ├── services
│   │   │   |   |   └── auth.service.ts
│   │   │   |   ├── utils
│   │   │   |   |   ├── cookies.ts
|   |   |   |   |   └── send-response.ts
│   │   │   |   ├── app.ts
│   │   │   |   ├── config.ts
│   │   │   |   └── server.ts
│   │   │   ├── build-script.js
│   │   │   ├── nodemon.json
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── tsconfig.json
│   │   │   └── tsoa.json
│   │   ├── bmi-service
│   │   ├── bp-service
│   │   ├── history-service
│   │   ├── profile-user-service
│   │   ├── reminder-notification-service
│   │   ├── tip-service
│   ├── frontend-client
│   │   ├── .next
│   │   ├── .storybook
│   │   ├── node_modules
│   │   ├── public
│   │   ├── src
│   │   │   ├── app
│   │   │   |   ├── (pages)
│   │   │   |   |   ├── allRecords
│   │   │   |   |   |   ├── page.tsx
│   │   │   |   |   |   └── result-data.ts
│   │   │   |   |   ├── bloodPressure
│   │   │   |   |   ├── bmiFun
│   │   │   |   |   ├── healthTips
│   │   │   |   |   └── user-profile
│   │   │   |   ├── favicon.ico
│   │   │   |   ├── globals.css
│   │   │   |   ├── layout.tsx
│   │   │   |   └── page.tsx
│   │   │   ├── components
│   │   │   ├── images
│   │   │   ├── utils
│   │   │   ├── middleware.ts
│   │   │   ├── .env.development
│   │   │   ├── .env.production
│   │   │   ├── .eslintrc.json
│   │   │   ├── .gitignore
│   │   │   ├── next-env.d.ts
│   │   │   ├── next.config.mjs
│   │   │   ├── package.json
│   │   │   ├── postcss.config.mjs
│   │   │   ├── README.md
│   │   │   ├── tailwind.config.ts
│   │   │   └── tsconfig.json
│   └── frontend-dashboard
├── node_modules
├── packages
├── .gitignore
├── .yarnrc.yml
├── package.json
├── README.md
└── yarn.lock

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To run the project, ensure you have the following installed on your system:

- [![Static Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=fff)](https://nodejs.org/)
- [![Static Badge](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=fff)](https://yarnpkg.com/)

Then, follow these steps:

<h3>Frontend</h3>

Open your terminal and run the following command to clone the project repository:

```sh
git clone https://github.com/sabaicode-dev/check-me.git

```

2. Navigate to the Project Directory:

```sh
cd check-me
```

3. Install Dependencies:

Navigate to the root directory of the project and run:

```sh
yarn install
```

4. Start the Project:

Use the following command to start all application:

```sh
yarn start
```

5. Click link in your terminal:

Use the following command to start all application:

<a href="http://localhost:3000/">localhost:3000</a>

<h3>Backend</h3>

1. Clone the Repository:

Open your terminal and run the following command to clone the project repository:

```sh
git clone https://github.com/sabaicode-dev/check-me.git

```

2. Navigate to the Project Directory:

```sh
cd check-me
```

3. Install Dependencies:

Navigate to the root directory of the project and run:

```sh
yarn install
```

4. Start the Project:

Use the following command to start all services

```sh
yarn start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

CheckMe<br/>
Team members<br/> vannbonath1@gmail.com <br/> nhamchamnes@gmail.com <br/> info.thoeurnbunthorn@gmail.com <br/> chhornsreyproek@gmail.com

Project Link: [https://github.com/sabaicode-dev/check-me](https://github.com/sabaicode-dev/check-me)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com

=================================================
# Project Name: CheckMe

Welcome to the **CheckMe** repository. This README provides guidelines on our coding conventions, project structure, and development practices to ensure consistency and maintainability of the codebase.

## Code Conventions

We aim to maintain a clean and uniform codebase. Please adhere to the following conventions when contributing to this project.

### Directory Structure

Our project is organized into several key directories:

```bash
/project-root
|-- /apps
| |-- /backend # Backend Service
| |-- /frontend-client # NextJS application for the client
| |-- /frontend-dashboard # ReactJS Dashboard application
|-- /packages
| |-- /ui-components # Reusable UI components
| |-- /libs
| |-- /utils # Utility functions
| |-- /types # TypeScript type definitions
```

### Naming Conventions

#### Files and Folders

- **Files**: Use kebab-case for file names. Example: `user-profile.ts`, `login-form.tsx`.
- **Folders**: Use kebab-case for folder names. Example: `ui-components`, `order-processing`.

#### Code

- **Variables and Functions**: Use camelCase for identifiers.
  ```typescript
  let recordCount = 10;
  function fetchUserData() { ... }

- **Classes and Interface**: Use PascalCase for classes and interfaces
  ```typescript
  class UserProcessor { ... }
  interface UserData { ... }

#### Functions
- Keep functions concise and focused on a single task.
- Clearly name functions to reflect their purpose.

#### Variables
- Use descriptive names, avoiding vague or generic terms.
- Avoid single-letter names except in short, localized loops.

#### React/NextJS Components
- Name React/NextJS components using PascalCase and match the file name with the component name.
- Place each component in its own folder with its associated styles and tests.

#### Commit Messages
- Use clear, concise commit messages in the imperative mood.
Example: "Add payment processing module", "Fix boundary error in cart calculation".

#### Pull Requests
- Describe changes thoroughly.
- Ensure code passes all tests and adheres to the coding standards set forth in this document.

#### Setup and Development
## Getting Started
To set up the project locally, follow these steps:

1. Clone the repository
```bash
git clone [repository-url]
```
2. Install dependencies
```bash
yarn install
```
3. Start All Server
```bash
yarn start
```

#### Contributing
Please read our contributing guidelines carefully before making a pull request. Contributions should be made in a separate branch and submitted via pull requests to the main branch for review.