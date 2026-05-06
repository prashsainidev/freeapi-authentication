# Future Skills and Enhancements

This document outlines the advanced authentication features that can be implemented in the future to upgrade this dashboard into a fully functional, read write profile management system.

### 1. Avatar Upload System
* **Goal**: Allow users to upload and change their profile picture.
* **Implementation Details**:
  * Create a multipart form data upload component.
  * Use the PATCH `/users/avatar` FreeAPI endpoint.
  * Manage local state update to instantly reflect the new avatar without a full page reload.

### 2. Edit Profile Details
* **Goal**: Enable users to update their username and email.
* **Implementation Details**:
  * Build a modal or a dedicated settings page.
  * Pre fill the form with existing user data.
  * Use the PATCH `/users/account details` endpoint.
  * Handle edge cases like checking if the new username is already taken.

### 3. Password Management
* **Goal**: Improve security by allowing users to change their passwords.
* **Implementation Details**:
  * Add a form requiring current password, new password, and confirm new password.
  * Call the POST `/users/change password` endpoint.
  * Provide clear success and error feedback.

### 4. Refresh Token Logic
* **Goal**: Create a seamless user experience where sessions do not abruptly expire.
* **Implementation Details**:
  * Implement an Axios interceptor or a fetch wrapper.
  * When a 401 Unauthorized error occurs, automatically call the POST `/users/refresh token` endpoint.
  * Update the access token in local storage and retry the original request.

### 5. Forgot and Reset Password Flow
* **Goal**: Allow users to recover their accounts.
* **Implementation Details**:
  * Build a Forgot Password page to request an email token.
  * Build a Reset Password page to verify the token and set a new password.
