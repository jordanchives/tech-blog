# Tech Blog

## Table of Contents
- [Description](#description)
- [Files](#files)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Live Site](#live-site)

## Description
The Tech Blog is a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. The application follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Files
- `config/`: Contains configuration files for the application.
- `controllers/`: Contains controller files for the application.
- `db/`: Contains database files for the application.
- `models/`: Contains model files for the application.
- `public/`: Contains public files for the application.
- `seeds/`: Contains seed files for the application.
- `views/`: Contains view files for the application.
- `utils/`: Contains utility files for the application.
- `LICENSE`: License file for the application.
- `README.md`: Readme file for the application.
- `server.js`: Server file for the application.

## Requirements
Web browser with JavaScript enabled.

## Installation
1. Clone the repository to your local machine:

    ```bash
    git clone
    ```
2. Navigate to the project directory.
3. Install the required dependencies:

    ```bash
    npm install
    ```
4. Create a `.env` file in the root of the project and add the following:

    ```bash
    DB_NAME='tech_blog_db'
    DB_USER='root'
    DB_PW='your_password'
    ```
5. Create the database:

    ```bash
    mysql -u root -p
    ```
    ```sql
    source db/schema.sql
    ```
6. Seed the database:

    ```bash
    npm run seed
    ```

## Usage
1. Start the application:

    ```bash
    npm start
    ```
2. Open a web browser and navigate to `http://localhost:3001`.
3. Sign up for an account or log in if you already have one.
4. View blog posts on the homepage.
5. Click on a blog post to view comments.
6. Add a comment to a blog post.
7. Create a new blog post.
8. Edit or delete your blog posts.

## Live Site
The live site can be accessed [here](https://tech-blog-jordan-a9a449694fab.herokuapp.com/).
