# 🌍 Renova - The Premier Recycling & Eco-Commerce Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Renova** is a modern, high-performance web platform built to champion environmental sustainability. It empowers users to sell household scrap materials, which are then upcycled and sold as eco-friendly products. 

The application features a deep environmental aesthetic, utilizing an earthy color palette (Emerald, Lime, Stone), modern Glassmorphism, and dynamic mesh gradients to deliver a premium user experience.

---

## ✨ Key Features

- **Eco-Commerce:** Browse, add to cart, and purchase recycled and upcycled products.
- **Scrap Selling Portal:** Users can easily submit scrap materials to the platform for recycling.
- **Role-Based Access Control:** Distinct experiences and protections for regular users and administrators.
- **Comprehensive Admin Dashboard:** Full CRUD management for products, orders, users, and incoming scrap requests.
- **Dark/Light Mode:** Seamlessly integrated theme switching matching the platform's nature-inspired aesthetic.
- **Persistent State:** All data (Cart, Auth, Products) is persisted securely using `localStorage`.

---

## 🚀 Tech Stack

- **Framework:** [React.js](https://reactjs.org/) powered by [Vite](https://vitejs.dev/) for blazing-fast builds.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** React Context API (Zero external dependencies)
- **Data Persistence:** Local Storage API

---

## 🛠️ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/renova.git](https://github.com/your-username/renova.git)
   ```

2. **Navigate to the project directory:**
   ```bash
   cd renova
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

> **Note for Admins:** To access the admin dashboard, login with the email `admin@renova.com`.

---

## 📂 Project Structure

The project follows a modular, scalable architecture:

```text
src/
├── components/       # Reusable UI components (Navbar, Footer, ProductCard, etc.)
├── context/          # State management providers (Auth, Cart, Products, Settings, etc.)
├── pages/            # Main application pages
│   └── admin/        # Admin dashboard pages
├── App.jsx           # Main application router and Provider wrappers
├── main.jsx          # React application entry point
└── index.css         # Global styling and Tailwind CSS configuration
```

---

## 🧠 State Management (Context API)

To ensure rapid performance and a streamlined architecture, **React Context** is used in place of external libraries like Redux. 

- **`AuthContext`:** Manages authentication states for both users and administrators.
- **`CartContext`:** Handles shopping cart logic, discounts, and dynamic totals.
- **`ProductContext`:** Acts as the virtual database. Supports CRUD operations (with Canvas image compression) and cross-tab synchronization via Storage Events.
- **`RequestsContext`:** Manages user submissions for selling scrap. 
- **`OrdersContext`:** Tracks e-commerce transactions and fulfillment statuses.
- **`FavoritesContext`:** Enables users to bookmark products.
- **`SettingsContext`:** Provides dynamic configuration (categories, scrap types) for admins.
- **`ThemeContext`:** Manages the system's Dark/Light mode.

---

## 🌐 Application Views

### 👤 User Pages
- **`Home`:** The landing page featuring the Hero section and a grid of featured eco-products.
- **`SellScrap`:** A comprehensive form for users to submit scrap materials.
- **`Cart` & `Favorites`:** E-commerce essentials for managing purchases and bookmarked items.
- **`MyOrders`:** A tracking dashboard for past purchases.

### 🛡️ Admin Dashboard
- **`Dashboard`:** Central command center displaying high-level metrics.
- **`ProductsManager` & `SettingsManager`:** Full inventory and store configuration management.
- **`OrdersManager` & `RequestsManager`:** Interfaces to process customer orders and incoming scrap offers.
- **`UsersManager`:** A directory of all registered platform users.

---

## 🎨 Design System & UI/UX

The visual identity is powered by **Tailwind CSS v4** and customized within `index.css`:

- **Custom Color Palette:** Tailwind's default colors are remapped via `@theme` to nature-inspired tones (Emerald, Lime, Stone).
- **Mesh Gradients:** Complex `radial-gradient` layers generate a dynamic, fixed mesh gradient that adds visual depth.
- **Glassmorphism:** The `.glass` and `.glass-dark` utility classes provide a frosted glass effect with tailored transparency and backdrop blur.
- **Animations:** Custom keyframes (`float`, `pulse-glow`) bring the UI to life. Premium text gradients seamlessly blend nature's colors for typography and pricing.

---

> **Built for sustainability, speed, and a premium user experience.** 🌱