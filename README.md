# AURA AUTH (Authentication Flow)

![Project Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-React_|_React_Router_|_Context_API-blue?style=for-the-badge)

> Most developers learn authentication by copying a Firebase tutorial, pasting the snippet, and calling it a day. They never learn how tokens, sessions, and protected routes actually work under the hood.

That was fine for a beginner. But in 2026, you need to understand the exact lifecycle of a user session. You need to know how to securely store tokens, intercept unauthorized access, and manage global authentication states.

**Welcome to the final chapter, Part 8 of my FreeAPI Mastery Series.** This is **AURA AUTH**, a complete end-to-end frontend authentication architecture built using the FreeAPI Users endpoint.

Here is exactly how I leveled up from fetching public data to managing secure, protected user sessions. Step by step.

---

## The Next Level of React Architecture

In **Part 7 (Mentora)**, I mastered complex client-side caching and pre-fetching. But all of that data was public. In this final project, I tackled the most critical part of web development: **Security & Authentication**.

### 1. Global State Management (Context API)
- **Problem:** Passing the `user` object and `token` down through props to every single page and component is a nightmare (Prop Drilling).
- **Solution:** I engineered a robust `AuthContext`. It acts as a global vault. When a user logs in, their data and `accessToken` are securely stored in the Context and `localStorage`. Any component in the app can instantly check `useAuth()` to see who is logged in.

### 2. The Protected Route Interceptor
- **Problem:** What happens if a logged-out user tries to type `/profile` directly into the URL bar? They shouldn't see the dashboard.
- **Solution:** I built a custom `<ProtectedRoute>` component in React Router. It acts as a security bouncer. Before rendering the Profile, it checks the `AuthContext`. If there is no valid user, it instantly redirects them back to the `/login` screen.

### 3. Session Persistence
- **Problem:** When a user refreshes the page, React state resets, and they get logged out.
- **Solution:** I implemented a session recovery mechanism inside the `useEffect` of the `AuthProvider`. On every app load, it checks `localStorage` for a saved token. If found, it silently calls the `GET /current-user` API in the background to verify the session and seamlessly logs the user back in without them even noticing.

---

## The Real Secret: CSS Engineering

Just because it's an auth flow doesn't mean it has to look like a 90s banking website.

- **The AURA Aesthetic:** I maintained the premium luxury feel from the previous projects. The login and register cards use deep `backdrop-filter: blur(12px)` glassmorphism over a subtle, animated radial gradient background.
- **Interactive Feedback:** Forms have dynamic focus rings (`box-shadow` transitions), spinning CSS loaders when the API is communicating, and elegant success/error alert boxes that provide immediate feedback to the user.

---

## Try it yourself

1. **Clone this repository** to your machine:
   ```bash
   git clone https://github.com/prashsainidev/freeapi-authentication.git
   ```
2. **Navigate to the folder**:
   ```bash
   cd 10-freeapi-build-an-authentication-app
   ```
3. **Install the packages**:
   ```bash
   npm install
   ```
4. **Start the server**:
   ```bash
   npm run dev
   ```

_Create an account on the `/register` page. Watch the smooth redirect to the `/login` screen with a success message. Log in to access the protected `/profile` dashboard. Try refreshing the page to see how the session persists, and then hit Sign Out to clear your token!_
