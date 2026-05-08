# Security Specification for CORN

## Data Invariants
1. A user can only read and write their own profile document.
2. A user can only read and write their own favorites list.
3. Timestamps (createdAt, addedAt) must be valid server timestamps.
4. IDs must be valid (alphanumeric).

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Attempt to create a user profile with a `userId` that doesn't match the auth UID.
2. **PII Leak**: Attempt to read another user's profile document as a signed-in user.
3. **Malicious ID**: Use a 1MB string as a `recipeId` in the favorites collection.
4. **Shadow Field**: Adding `isAdmin: true` to the user profile update.
5. **Timestamp Forge**: Providing a manual `createdAt` date from the client during creation.
6. **Orphaned Write**: Creating a favorite with an invalid or non-existent user path.
7. **Recursive List**: Attempt to list ALL users in the database.
8. **Immutability Breach**: Attempt to change the `createdAt` field on a user profile update.
9. **State Shortcut**: Attempt to update a favorite with a modified `recipeId`.
10. **Unauthenticated Write**: Attempt to create a user profile while signed out.
11. **Email Spoof**: Attempting to access admin-only paths (if any) by spoofing an email (using `request.auth.token.email`).
12. **Blanket Read**: Querying the `users` collection without a specific document ID.

## Test Runner (Mock Logic)
We will ensure that all the above payloads return `PERMISSION_DENIED` by implementing explicit owners-only rules and validation helpers.
