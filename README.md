
<div align="center">


![Here|Now](https://i.imgur.com/xR7Nb0Tb.png)
# Flatiron Phase 5 Project - Here|Now

</div>


## This version is deprecated
To view current repo, please visit this [link](https://github.com/GrantCloyd/herenow2)

## Description

A meditation app designed for users and content creators to come together and interact with each other through guided meditations, messaging, following, favoriting, and donations while tracking and providing relevant user/creator data.  



## Requirements

- Ruby 2.7.4
- NodeJS (v14 or higher), and npm
- Postgresql

## Setup

**Fork and clone this repository**.

Then run:

```sh
bundle install
rails db:create
npm install --prefix client
```

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)
- `rails start`: run the frontend and backend together with one command


## Acknowledgements

This application was created with React, Redux Toolkit,  MediaRecorder API, React Router, Axios, ReactPlayer and Material UI (core, styles, and icons). The rails back-end is built using ActiveStorage, PostgreSQL, BCrypt, and ActiveRecordSerializers. The logo was created with Canva's online tools. 
