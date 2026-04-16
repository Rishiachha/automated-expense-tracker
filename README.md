ExpenseIntel: Automated Expense Intelligence System

 Project Overview & Problem Statement

Traditional expense trackers fail because they require too much manual effort. Users often struggle with:

1.Manual Friction: Typing every merchant name and amount is tedious and leads to data gaps.

2.Classification Bias: Manually categorizing "Uber" as "Travel" or "Food" every single time leads to user fatigue.

3.Data Without Context: Knowing what you spent yesterday is useful; knowing what you will spend next month is Intelligence.

ExpenseIntel was engineered to solve these problems by automating data entry through OCR Receipt Scanning, automating organization via Naive Bayes NLP, and
providing foresight through Linear RegressionForecasting.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Technical Architecture: The "Why" Behind the Stack
The system utilizes a Decoupled Microservices Architecture to ensure that heavy AI processing does not slow down the user experience.
1. Frontend: React.js & Tailwind CSS
Rationale: We used React for its state management capabilities, allowing real-time chart updates without page refreshes.

UI/UX: Tailwind CSS was used to implement a "High-Tech Intelligence" aesthetic. We utilized Glassmorphism (semi-transparent, blurred backgrounds) and a strict 
Dark Mode for the dashboard to mimic professional financial command centers.

Localization: Built a custom context-aware helper that maps Nationalities to Currency Symbols (₹, $, £, €) dynamically based on the user's profile settings.

2. Backend: Node.js & Express.js
Rationale: Node.js is asynchronous and event-driven, making it perfect for handling multiple API requests (like fetching history while uploading an image)
simultaneously.

Security: Implemented JWT (JSON Web Tokens) for stateless authentication and Bcrypt.js with 10 salt rounds to ensure user credentials remain encrypted.

3. AI Service:
 FastAPI & Scikit-Learn (Python)
 Rationale: Python is the industry standard for AI. FastAPI was chosen over Flask because it is significantly faster and provides native support for async operations.
 NLP Categorization: We used a Multinomial Naive Bayes model paired with a TfidfVectorizer. Unlike simple keyword matching, this calculates the statistical
 probability of a merchant's category based on a balanced training dataset.
 Forecasting: Uses Linear Regression to calculate the Line of Best Fit ($$y = mx + b$$) for spending trends, allowing the app to predict future overhead.

4. OCR Engine: Pytesseract (Tesseract OCR)
Implementation: When a user scans a receipt, the Python service processes the image buffer, identifies text patterns, and uses Regular Expressions (Regex) to
extract the highest numeric value (the Total) and the top-most text (the Merchant).

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

Database Normalization & AI Precision
Text Processing: All merchant names are normalized to lowercase before hitting the AI. This increased categorization accuracy by 40%, ensuring "PIZZA" and "pizza" 
trigger the same response.

Class Balancing: The AI training set is manually balanced. If "Travel" had more examples than "Food," the AI would develop a bias. We ensured an equal distribution 
across 5 major categories.

Multi-Currency Logic
The app stores the user's nationality as a string in MongoDB. On the frontend, a currencyMap object translates this nationality into a Unicode symbol 
(e.g., "India" $\rightarrow$ "₹"). This makes the app globally scalable for daily life anywhere.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Deployment

Backend:Render

Database: MongoDB Atlas Cloud

AI Service: Render

Frontend Port: Vercel

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Local Installation
1. Clone & Install
   
git clone https://github.com/your-username/expense-intel.git

3. Python AI Setup
   
cd ml_service

pip install -r requirements.txt

python main.py

Backend Setup

cd server

npm install

npm start

4. Frontend Setup

cd client

npm install

npm start

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Roadmap & Future Advancements
Bill Splitting: Feature to split OCR-detected totals among multiple users.

PWA: Convert to a Progressive Web App for home-screen installation on mobile.

Bank API: Integration with Plaid for real-time transaction syncing.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

link for the app:https://automated-expense-tracker.vercel.app/login
