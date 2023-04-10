This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started with Doyen

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

# Project Structure

The index page is `app/page.js`.

Doyen is made up of pages and components. 

### Pages:
- About    `/about` : contains information about the team and project.
- Profile  `/profile` : contains information about a specific expert
- Results  `/results` : displays a search bar, set of filters and a list of experts
- Index    `/` : home page where use will input the initial query. 

### Dev:
There are a few pages that are currently being used for development:
- pubs `/pubs` : used to test calls to the API
- filters `/filters`: used to test filter UI components

### Components:

Reactive components can be found under each appropriate page. Components for the homepage are under the `/app` directory.


### Routes
Routes can be accessed on [http://localhost:3000/>](http://localhost:3000/) locally or at [http://doyenapp.org/](http://doyenapp.org)



## Deployment

This app uses Vercel for deployment under the Doyen Team. 

Production version: [doyenapp.org](https://doyenapp.org)
