# ShowMOEvents

ShowMOEvents is a full-stack community platform built with
**Spring Boot** and **React** that helps people share and discuss
local events throughout Missouri and the surrounding Midwest.

Originally developed as part of LaunchCode's Liftoff Program,
the project has grown into a modern portfolio application focused
on clean architecture and an intuitive user experience.

## Purpose

ShowMOEvents exists to strengthen local communities by making
it easier for residents and visitors to discover events and engage
with one another.

Whether someone is searching for a community festival, charity fundraiser,
farmers market, technology meetup, or local concert, ShowMOEvents
aims to provide a simple and welcoming platform for connecting people
through local events.

## Current Features

The application currently includes:

- Secure user registration and authentication
- JWT-based authorization with Spring Security
- User profiles
- Create, edit, and delete community posts
- Create, edit, and delete events
- Comment system for discussions
- RESTful API built with Spring Boot
- React frontend with reusable custom hooks and services
- MariaDB persistence using Spring Data JPA
- Modern client/server architecture with token-based authentication

## Technology stack

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MariaDB

### Frontend

- React
- React Router
- JavaScript (ES6+)
- HTML5
- CSS3

## Architecture

The project follows a modern client/server architecture.

- **Frontend:** React application responsible for the user interface and application state.
- **Backend:** Spring Boot REST API that manages authentication, authorization, business logic, and database operations.
- **Database:** MariaDB stores users, events, post, comments, and related application data.
- **Security:** JWT authentication with stateless sessions and protected API endpoints.

## Project Status

ShowMOEvents is under active development.

The core authentication system and CRUD functionality for posts and events
are operational, with ongoing worked focused on refining the user experience,
improving security, expanding community features, and modernizing the interface.

## Roadmap

Planned enhancements include:

- Event categories and filtering
- Search improvements
- Interactive calendars
- User profile enhancements
- Image uploads
- Event attendance tracking
- Notifications
- Improved moderation tools
- Responsive interface refinements
- Additional accessibility improvements

## Vision

The long-term vision for ShowMOEvents is to become a modern,
community-driven platform that makes discovering and sharing local
events effortless.

By combining a clean user experience with a secure Java backend
and scalable architecture, the project serves both as a practical
community application and as a demonstration of modern full-stack
engineering practices.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

This project was made possible thanks to the following:

- [**React**](https://reactjs.org/) - for the intuitive front-end library.
- [**Node.js**](https://nodejs.org/) - for the powerful and robust runtime environment.
- The **Open Source Community** - for generously sharing the tools and knowledge that enable this technology.


