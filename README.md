# Users List

This is a React application designed to list, search, and view user details using data from the DummyJSON API.

## Features

- **List Users**: Displays a list of users with the following details:
  - First Name
  - Last Name
  - Email
  - Phone
  - Company Name
- **Search Users**: Allows users to search by name (first or last).
- **View User Details**: Click on a user to view additional details:
  - Company Address
  - Company Department
  - Company Title

## Demo

**https://users-list-cmrs.vercel.app/**

---

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **DummyJSON API**: As the data source for users.
- **Fetch**: For making API calls.

---

## Getting Started

Follow these instructions to set up the project on your local machine:

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Faizan816/Users-List.git
   ```

2. Navigate to project directory:

   ```bash
   cd users-list
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

## Running the Application

1. Creating .env.local:

   - Create .env.local file in the root directory where package.json is located.

   - Copy and paste **REACT_APP_API_URL=https://dummyjson.com** in .env.local and save it.

2. Start the development server:

   ```bash
   npm start
   ```

The application will be accessible at `http://localhost:3000`

## API Details

This project uses the DummyJSON API to fetch user data. Below are the endpoints utilized:

1. **List Users**: `https://dummyjson.com/users`

   - Returns a list of users.

2. **Search Users**: `https://dummyjson.com/users/search?q=param`

   - Returns the matching list of users depending upon the param.

3. **User Details**: `https://dummyjson.com/users/1`
   - Returns the matching user with given id.

Refer to [DummyJSON API Documentation](https://dummyjson.com) for more details.

## Redux Usage

This project uses redux in the following way:

1. **Store Current User's Id**:

   - Clicking on a table row from UsersList component sets the selected user's id in redux.

2. **Retrieve User Id**:
   - The UserDetails component retrieves that stored user id from redux to fetch data of that user.
