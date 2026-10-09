# Testing Authentication Flow

## Manual Testing Steps

### 1. Test Registration
1. Open browser to http://localhost:5173
2. Should redirect to /login (not authenticated)
3. Click "Create one now" link
4. Fill in registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
5. Click "Create Account"
6. Should redirect to dashboard
7. Should see welcome message with user name

### 2. Test Logout
1. Click "Logout" button
2. Should redirect to /login
3. Token should be removed from localStorage

### 3. Test Login
1. At /login page
2. Fill in login form:
   - Email: test@example.com
   - Password: test123
3. Click "Sign In"
4. Should redirect to dashboard
5. Should see welcome message

### 4. Test Protected Routes
1. Logout if logged in
2. Try to access http://localhost:5173/
3. Should automatically redirect to /login

### 5. Test Persistent Auth
1. Login successfully
2. Refresh the page
3. Should remain logged in
4. Should still see dashboard

### 6. Test Dark Mode
1. Login to dashboard
2. Click moon/sun icon in header
3. UI should toggle between light and dark
4. Refresh page - theme should persist

### 7. Test Validation
**Registration:**
- Try empty fields → Should show error
- Try invalid email → Should show error
- Try password < 6 chars → Should show error
- Try mismatched passwords → Should show error

**Login:**
- Try empty fields → Should show error
- Try invalid email format → Should show error
- Try wrong credentials → Should show "Invalid email or password"

### 8. Test Error Handling
1. Stop backend server
2. Try to login
3. Should show appropriate error message

## Automated API Testing

You can also test the API directly:

```powershell
# Test registration
$body = @{
    name = "API Test User"
    email = "apitest@example.com"
    password = "test123"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/auth/register -Method Post -Body $body -ContentType "application/json"

# Test login
$body = @{
    email = "apitest@example.com"
    password = "test123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri http://localhost:5000/api/auth/login -Method Post -Body $body -ContentType "application/json"
$token = $response.data.token

# Test protected route
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri http://localhost:5000/api/auth/me -Method Get -Headers $headers
```

## Expected Results

✅ All form validations work
✅ Registration creates user and logs in
✅ Login works with correct credentials
✅ Login fails with wrong credentials
✅ Protected routes redirect when not authenticated
✅ Authentication persists after page refresh
✅ Dark mode toggles and persists
✅ Logout clears token and redirects
