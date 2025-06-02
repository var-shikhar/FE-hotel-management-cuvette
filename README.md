# Booking Management & Dashboard Analytics - Frontend

## 🚀 Overview

The frontend is built with React and Redux Toolkit Query (RTK Query) to efficiently manage asynchronous state and server interactions.

## ✨ Features

### 🍳 Table Management

- Manage restaurant tables through a user-friendly interface with full CRUD (Create, Read, Update, Delete) operations.
- Fetches the current list of tables and displays loading states.
- Supports adding new tables with default values and validation.
- Allows editing existing tables, updating their details seamlessly.
- Enables deletion of tables with confirmation modals.
- Form inputs and modal visibility are managed using React state and React’s startTransition for smooth UI updates.
- User feedback is provided via toast notifications on success or failure of operations.

### 📊 Dashboard Analytics

- Total chefs, clients, and orders
- Total revenue generated
- Number of tables available and booked for the current day
- Provides valuable insights for restaurant management.

### ⚙️ RTK Query Integration & Reusable Hooks

- Utilizes RTK Query hooks to handle API requests, cache management, and loading states for table data.
- Queries to fetch the table list.
- Mutations for creating, updating, and deleting tables.
- Business logic for table operations is encapsulated in a custom React hook (useTableHook) for modularity and cleaner component code.

## 🧱 Tech Stack

### Backend

- **React**
- **Redux Toolkit Query** (RTK Query)
- **Vanilla CSS**

## 📦 Installation

To set up and run the backend locally, follow these steps:

```sh
# Clone the repository
git clone https://github.com/var-shikhar/FE-hotel-management-cuvette.git
cd FE-hotel-management-cuvette

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env file to add your config values

# Start the development server
npm run dev
```

## 🧩 Usage & Code Structure

### 📁 Modular Architecture

**Organized into:**

- /components – Reusable Modular Components
- /components/css – CSS for Components & Pages
- /hooks – All Project Hooks
- /pages – All Project Pages.
- /redux – Redux Slices and Store.
- /services – Common Redux/RTK Service.
- /lib – Helper functions and Common Route File

## Environment Variables

Ensure you configure the `.env` file with the required credentials:

```env
VITE_APP_DEV_BACKEND_URL=your_backend_port
VITE_APP_BACKEND_URL=your_live_port
```

## 📬 Contact

For more details, reach out to:

**Shikhar Varshney**  
📧 Email: [shikharvarshney10@gmail.com](mailto:shikharvarshney10@gmail.com)
