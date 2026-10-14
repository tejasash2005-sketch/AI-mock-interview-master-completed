# 🧠 AI Interview Mocker – The Ultimate Practice Platform

**AI Interview Mocker** is a professional, AI-powered platform designed to simulate real-world technical and behavioral interviews. Powered by the **Google Gemini API**, it provides personalized questions, real-time voice interaction, and detailed, data-driven feedback to help candidates ace their dream jobs.

> 🚀 **Built for Professionals, by Professionals.**

---

## 🌟 Key Features

### 👤 For Candidates
- 🎯 **Tailored Interviews** – AI generates questions based on your specific job role, description, and years of experience.
- 🎤 **Voice & Video Support** – Real-time speech-to-text processing for a natural interview feel.
- 📊 **Smart Feedback Engine** – Instant scoring and constructive feedback using Generative AI.
- 📂 **Session History** – Revisit every interview, view your progress, and learn from previous mistakes.

### 🛡️ For Administrators (New)
A comprehensive **Admin Panel** to monitor, refine, and control the entire ecosystem:
1.  **📊 Master Dashboard** – Real-time metrics on platform growth, user activity, and AI performance.
2.  **👥 User Management** – Complete control over user accounts, roles, and session tracking.
3.  **👁️ Interview Monitor** – An observer view to watch every interview transcript happening on the platform.
4.  **✍️ Feedback Corrections** – "Human-in-the-loop" interface to edit and perfect AI-generated feedback.
5.  **💡 AI Suggestions Library** – Manage a repository of professional tips that the AI injects into its coaching.
6.  **🤖 AI Assistant Config** – Tune the AI’s persona, change its tone, and adjust skill weighting (e.g., Technical vs. Communication).
7.  **✨ AI Playground** – A dedicated chat sandbox to test and refine the AI's logic and response patterns.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/), [PostgreSQL (Neon)](https://neon.tech/)
- **AI/ML**: [Google Gemini API](https://ai.google.dev/), [LangChain](https://www.langchain.com/)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- A Neon PostgreSQL Database
- A Google Gemini API Key
- A Clerk Account

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/SHARUN266/AI-mock-interview
cd AI-mock-interview

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your credentials:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_DRIZZLE_DB_URL=your_postgres_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

#### 🔑 How to Obtain the 4 Required Keys:

**1. Google Gemini API Key:**
   - Go to [Google AI Studio](https://aistudio.google.com/).
   - Sign in with your Google account.
   - Click on **"Get API key"** in the sidebar.
   - Click **"Create API key in new project"**.
   - Copy the key and paste it as `NEXT_PUBLIC_GEMINI_API_KEY`.

**2. Neon PostgreSQL URL:**
   - Go to [Neon.tech](https://neon.tech/) and sign up.
   - Create a new project (e.g., "ai-interview").
   - In the **Dashboard**, look for the **"Connection String"** section.
   - Ensure "Pooled connection" is selected.
   - Copy the URL (it starts with `postgresql://...`) and paste it as `NEXT_PUBLIC_DRIZZLE_DB_URL`.

**3. Clerk Publishable & Secret Keys:**
   - Go to the [Clerk Dashboard](https://dashboard.clerk.com/) and create a new application.
   - Select "Email" and "Google" as social connections.
   - In the sidebar, click on **"API Keys"**.
   - Copy the **Publishable key** and paste it as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.
   - Copy the **Secret key** and paste it as `CLERK_SECRET_KEY`.

### 4. Database Setup
Sync your database schema:
```bash
npx drizzle-kit push
```

### 5. Running the App
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Detailed Manual Run Guide (Step-by-Step)

If you are running the project for the first time or on a new machine, follow these exact steps:

### **Step 1: Install Node.js**
Ensure you have **Node.js v18.0.0 or higher** installed. Check by running `node -v` in your terminal.

### **Step 2: Prepare the Folder**
1. Extract the project files or clone the repository.
2. Open your terminal (CMD, PowerShell, or VS Code Terminal).
3. Navigate into the project root: `cd AI-mock-interview-master`.

### **Step 3: Install Dependencies**
Run the following command to install all necessary packages:
```bash
npm install
```
*Wait for it to finish. If you see warnings, you can usually ignore them.*

### **Step 4: Configure Environment Variables**
1. Look for a file named `.env.example` in the root folder.
2. Create a copy of it and rename the copy to exactly `.env`.
3. Open `.env` and fill in the 4 keys as described in the **"How to Obtain the 4 Required Keys"** section above.

### **Step 5: Initialize the Database**
Before running the app, you must create the tables in your database. Run:
```bash
npx drizzle-kit push
```
*If this fails due to network issues, use the manual SQL method described in the Troubleshooting section (or the "Seed Data" instructions).*

### **Step 6: Start the Development Server**
Launch the application:
```bash
npm run dev
```
You should see a message saying `Ready in ...ms` and `Started server on 0.0.0.0:3000`.

### **Step 7: Access the Application**
1. Open your browser.
2. Go to `http://localhost:3000`.
3. Sign up or Sign in using the Clerk interface.

### **Step 8: Set Up Admin (Optional but Recommended)**
1. Navigate to `http://localhost:3000/admin`.
2. Since you are the first user, you will be automatically made an admin.
3. Visit `http://localhost:3000/admin/seed` to add sample data for testing.

---

## 🔑 Admin Access
To access the Admin Panel:
1.  Log in to the app with your Clerk account.
2.  Navigate to `/admin`.
3.  **First-Login Feature**: The very first user to visit the `/admin` page is automatically promoted to **Super Admin**.
4.  **Demo Data**: Visit `/admin/seed` to instantly populate the platform with 10 professional, realistic interview records for testing.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔗 Connect With Us
- **Developer**: Sharun Attari
- **Email**: [sharunattari266@gmail.com]
- **Project URL**: [https://ai-interview-mocker-two.vercel.app/](https://ai-interview-mocker-two.vercel.app/)

Built with ❤️ using Next.js & Google Gemini.
