# Setting Up a Nuxt 3 Project with Nuxt UI and Firebase

This guide is designed to help you set up a Nuxt 3 project with Nuxt UI and Firebase integration. The setup is tailored for rapid development, including essential tools and libraries to enhance your workflow.

## Table of Contents

1. [Requirements](#requirements)
2. [Initial Setup (Nuxt)](#initial-setup-nuxt)
3. [Installing Nuxt UI](#installing-nuxt-ui)
4. [Installing Key Libraries](#installing-key-libraries)
5. [Installing Firebase](#installing-firebase)
6. [Deployment](#deployment)

## Step 1: Requirements

Before starting, ensure you have the following installed:

- **Node.js**: Version 22 or higher (recommended to use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions).

- **Npm**: Version 10 or higher.

## Step 2: Initial Setup (Nuxt)

To get started with a fresh Nuxt 3 project, follow these steps:

1. Open your terminal and run the following command to create a new Nuxt 3 project:

   ```bash
   npx nuxi@latest init -t ui my-nuxt3-project
   ```

   Replace `my-nuxt3-project` with your desired project name, and select npm upon installation.

2. Navigate to the project directory:

   ```bash
   cd my-nuxt3-project
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

Your basic Nuxt 3 project and Nuxt UI are now set up and ready for further configuration!

For more information regarding Nuxt 3, follow [this link](https://nuxt.com/docs/getting-started/introduction).

## Step 3: Configuring Nuxt UI & Tailwind

Nuxt UI is pre-installed with the starter template (if you used `npx nuxi@latest init -t ui`). To customize the theme, you can modify or create an `app.config.ts` file at the root of your project. Here’s an example:

1. Open or create an `app.config.ts` file in your project’s root directory.
2. Add or edit the `ui` configuration to define your theme:

```ts
// app.config.ts
export default defineAppConfig({
  ui: {
    // Example of customizing your primary color and other theme variables
    primary: '#3B82F6', // Tailwind's default blue as an example
    gray: '#6B7280', // Example gray color
    // Add or customize any additional theme variables here
  },
})
```

To configure Tailwind, create a `tailwind.config.ts` file at the project root:

```ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {},
  },
}
```

Tailwind helps you design and style your Nuxt 3 project with custom colors, fonts, and other design elements.

For more information regarding the Nuxt UI Module, follow [this link](https://ui.nuxt.com/getting-started)

## Step 4: Installing Key Libraries

The following libraries are essential for your Nuxt 3 project:

1. **@nuxtjs/i18n**: For internationalization support
2. **@nuxt/eslint-config and ESLint**: For code linting
3. **Prettier**: For code formatting
4. **@pinia/nuxt and Pinia**: For state management
5. **TypeScript**: For static typing (usually pre-installed with Nuxt 3)

Install dependencies:

```bash
npm install @nuxtjs/i18n @pinia/nuxt pinia
```

Install dev dependencies:

```bash
npm install --save-dev @nuxt/eslint eslint prettier typescript
```

After installing these libraries, configure them in your `nuxt.config.ts` file and create necessary configuration files (e.g., `.eslintrc.js`, `.prettierrc`) to customize their behavior according to your project needs.

`nuxt.config.ts`

```ts
export default defineNuxtConfig({
 ...
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxtjs/eslint",
  ]
  ...
})
```

### Eslint Setup

`eslint.config.mjs`: ESLint configuration file for `@nuxt/eslint`.

```js
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': ['warn', { allow: ['error'] }],
  },
})
```

### Prettier Setup

`.prettierrc.json`: Prettier configuration file for `prettier`.

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "vueIndentScriptAndStyle": true
}
```

### Internationalization (i18n) Setup

`nuxt.config.ts` for `@nuxtjs/i18n`:

```typescript
  i18n: {
    langDir: './i18n/locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.ts',
        name: 'English',
      },
    ],
    vueI18n: './i18n.options.ts',
  },

```

To complete the i18n setup:

1. Create an `i18n` folder in your project root.
2. Inside `i18n`, create a `locales` folder.
3. In the `locales` folder, add language-specific TypeScript files (e.g., `en.ts`, `de.ts`) for translations.

Example structure:

```
project-root/
  ├── i18n/
  │   └── locales/
  │       ├── en.ts
  │       └── de.ts
  └── ...
```

Each language file (e.g., `en.ts`) should export an object with your translations:

```typescript
export default {
  welcome: 'Welcome',
  // ... other translations
}
```

### Pinia Setup

To set up Pinia for state management in your Nuxt 3 project:

1. Create a `stores` directory in your project root to hold your Pinia store files.

2. Here's an example of a basic Pinia store (`stores/app.ts`):

   ```typescript
   export const useAppStore = defineStore('app', () => {
     const app = reactive({
       preloading: true,
     })

     const setPreloading = (preloading: boolean) => {
       app.preloading = preloading
     }

     return {
       preloading: computed(() => app.preloading),
       setPreloading,
     }
   })
   ```

3. Use translations in components like:

In this example, the `welcome` translation is used in the component template.

```ts
<h1>{{ $t('welcome') }}</h1>
```

Anh here, the `welcome` translation is used in the script.

```ts
<script setup lang="ts">
const { t } = useI18n()

</script>

<template>
  <h1>{{ t('welcome') }}</h1>
</template>
```

Pinia is now set up and ready to use in your Nuxt 3 project for efficient state management.

## Step 5: Installing & Use of Firebase

To set up Firebase for your Nuxt 3 project, follow these steps:

1. Install the necessary Firebase packages:

   ```bash
   npm install firebase
   npx nuxi@latest module add vuefire
   ```

2. Initialize Firebase in your `nuxt.config.ts` file:

   ```ts
   export default defineNuxtConfig({
     modules: [
       // ... other modules
       'nuxt-vuefire',
     ],

     vuefire: {
       config: {
         apiKey: process.env.FIREBASE_API_KEY,
         authDomain: process.env.FIREBASE_AUTH_DOMAIN,
         projectId: process.env.FIREBASE_PROJECT_ID,
         storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
         messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
         appId: process.env.FIREBASE_APP_ID,
         // there could be other properties depending on the project
       },
     },
   })
   ```

3. Set the env variables in your `.env` file (check the `.env.example` for more information):

   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

### useAuth composable

Create a `useAuth` composable to handle Firebase authentication in your Nuxt 3 project. This composable will provide methods for user login, registration, and logout, as well as a reactive user state. Here's an example implementation:

```typescript
import { useNuxtApp } from '#app'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

export function useAuth() {
  const { $firebaseAuth } = useNuxtApp()
  const user = ref()

  onAuthStateChanged($firebaseAuth, (firebaseUser) => {
    user.value = firebaseUser ? firebaseUser : null
  })

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $firebaseAuth,
        email,
        password
      )
      return userCredential.user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $firebaseAuth,
        email,
        password
      )
      return userCredential.user
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut($firebaseAuth)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user,
    login,
    register,
    logout,
  }
}
```

Use this composable in your components or pages to manage authentication:

```vue
<script setup>
  const { login, user, logout } = useAuth()
</script>
```

### Retrieving Firebase Collections

Here's an example of how to retrieve a collection from Firebase:

```typescript
import { collection, getDocs } from 'firebase/firestore'

const handleGetCollection = async () => {
  try {
    const db = useFirestore()
    const testCollectionRef = collection(db, 'test-collection')
    const querySnapshot = await getDocs(testCollectionRef)
    console.log(querySnapshot.docs) // Do something with the collection
  } catch (error) {
    // Handle error
    console.error('Error getting collection:', error)
  }
}
```

Note: For any troubleshooting regarding permissions, check [this link](https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions).

For more information regarding the Nuxt Firebase module, follow [this link](https://vuefire.vuejs.org/nuxt/getting-started.html).

## Step 6: Deployment

Make sure to install firebase related tools to help you deploy the app:

```bash
npm install -g firebase-tools
```

Once that is done, login into firebase with the same account you have your firebase project in:

```bash
firebase login
```

Make sure to have these set in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  // other properties
  ssr: false,
  target: 'static',
  nitro: {
    preset: 'node',
  },
  // other properties
})
```

Then run the next command to init te firebase project and select the next options:

- When selecting features, select only `hosting`
- Use existing project, and select the project in use
- Set `.output/public` for the public directory
- Select `y` for the single page app
- Select `n` for the github actions

Build the project:

```bash
npm run generate
```

Finally, deploy to Firebase:

```bash
firebase deploy
```
