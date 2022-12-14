# Asuma

Visualize Z score to track children's growth. See it in action: [https://asuma.onrender.com/](https://asuma.onrender.com/)

**Asuma** is the complement for [Hiruzen](https://github.com/theobitoproject/hiruzen) project

<img src="asuma.jpg" alt="Asuma's image" width="320"/>

> The "King" are the unborn children who will grow up to take care of the leaf. One is still in Kurenai's womb... hers and my child. Take care of my "king"!"

**Asuma Sarutobi**, former member of the Twelve Guardian Ninja and leader of Team 10.

## Local development

### Setup

#### 1. Set environment variables

Create a `.env.local` file in the root of the project. Copy all content from `env.example` into `.env.local`. No more changes should be needed

**Note:** You can modify what you consider is necessary.

#### 2. Install dependencies and run the project

From within the container, run:

```sh
npm install
npm run serve
```

## Pending work

- Add unit testing
- Use **PWA** features so professionals can use the application without internet connection
- Align with [**Hiruzen**](https://github.com/theobitoproject/hiruzen) so a CRUD can be added to track Z score in time
  - The above feature might require authentication and authorization features.
