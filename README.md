# apc-frontend-pdes-s1-2024

App frontend for 'Practicas de desarrollo de software' signature S12024

## Stack

Using latest versions for all technologies (March 2024)

- Nodejs 18.17.0
- Next 14.1
- React 18
- Redux 9.1
- Styled components 6.1
- Material UI 5.15
- Jest 29.7

## Develop environment

- Change name file `.env.example` to `.env.local`

- Run `npm install -f` to get the dependencies installed.

- Run `docker compose -p apc-frontend up -d --force-recreate` to get images and create containers.

### Let's go!

- Frontend: `localhost:3000`

## Prod environment

Using [Vercel](https://vercel.com/) to deploy app

- https://apc-frontend-pdes-s1-2024.vercel.app/

## Using app

Have a some generic data to test app both locally and in production

- User administrator: 
    - Email: admin@email.com
    - Password: 12345678

- User purchaser: 
    - Email: ucomprador@email.com
    - Password: 12345678

Anyway, you can to create own user from login page! Enjoy , thanks!