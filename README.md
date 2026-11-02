✨ Features
- Product Price Overview: Explore essential product prices.
- Product Categories: Browse products by categories such as rice and other daily essentials.
- Product Details: View detailed information about each product.
- Market-wise Price Comparison: Compare minimum and maximum prices from different markets.
- Price Trend Information: See price changes compared with previous periods.
- Responsive Design: Works on mobile, tablet, and desktop screens.
- User Authentication: Sign up and sign in using email and password.
- Google & GitHub Login: Support for social authentication.
- Profile Management: View and update user profile information.
- Toast Notifications: Get feedback for successful actions and errors.
- Bangla Interface: Designed for a familiar experience for Bangladeshi users.
🛠️ Technologies Used
Technology	Purpose
Next.js	React framework and routing
React	Building user interfaces
TypeScript	Type-safe development
Tailwind CSS	Styling and responsive layouts
DaisyUI	UI components
Better Auth	Authentication
React Toastify	Toast notifications
REST API	Product and category data
Git & GitHub	Version control


🚀 Getting Started
Follow these steps to run BazarDor locally.
Prerequisites
- Node.js
- npm
- Git
Installation
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
2. Navigate to the project folder
cd e-commerce
3. Install dependencies
npm install
4. Configure environment variables

Create a .env.local file in the project root and add the environment variables required by your API and authentication setup.
# Add your required API and authentication environment variables here
5. Start the development server
npm run dev
Open http://localhost:3000 in your browser.
🔌 API Integration
BazarDor uses REST APIs to retrieve product and category information.
Products API
https://api.api-store.workers.dev/api/bazardor/products
Categories API
https://api.api-store.workers.dev/api/bazardor/categories
Product data may include:
- Product name in Bangla
- Category and category icon
- Product image or emoji
- Current and previous prices
- Price change direction and percentage
- Market-wise minimum and maximum prices
🔐 Authentication
BazarDor provides authentication features for a personalized experience:
- Create an account with email and password
- Sign in to an existing account
- Sign in using Google
- Sign in using GitHub
- View and update profile information
- Sign out securely
Authentication providers must be configured with the required environment variables and OAuth credentials.
📱 Responsive Design
The interface is designed to provide a smooth experience across:
- Mobile devices
- Tablets
- Desktop computers
⚠️ Disclaimer
Product prices displayed on BazarDor are indicative and may vary depending on market conditions, location, and availability.

বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে। সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
👨‍💻 Developer
MD. Rabbi Ghorami

Aspiring Full-Stack Web Developer
- GitHub: rabbi-cpu
⭐ If you find this project useful, consider giving it a star on GitHub!