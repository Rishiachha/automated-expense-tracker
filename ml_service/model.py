import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
import numpy as np
import pytesseract
from PIL import Image
import re
import io


# =========================
# 🔥 MASSIVE BALANCED DATASET
# =========================
training_data = {
    'text': [
        # FOOD & DRINK
        'pizza', 'dominos', 'pizzahut', 'pepperoni pizza', 'burger', 'king burger', 'mcdonalds', 'mcd',
        'starbucks', 'coffee', 'latte', 'cafe', 'restaurant', 'dinner', 'lunch', 'breakfast', 'taco', 'bell',
        'subway', 'sandwich', 'food', 'kfc', 'chicken', 'zomato', 'swiggy', 'uber eats', 'bakery', 'grocery',

        # TRAVEL
        'uber', 'uber trip', 'lyft', 'ola', 'taxi', 'cab', 'gas', 'petrol', 'diesel', 'shell', 'chevron',
        'fuel', 'train', 'metro', 'subway train', 'bus', 'ticket', 'flight', 'airline', 'indigo', 'emirates',
        'travel', 'hotel', 'airbnb', 'parking', 'toll', 'commute',

        # SHOPPING
        'amazon', 'flipkart', 'walmart', 'target', 'ebay', 'shopping', 'mall', 'clothes', 'shirt', 'shoes',
        'nike', 'adidas', 'h&m', 'zara', 'electronics', 'iphone', 'apple store', 'laptop', 'fashion', 'retail',

        # ENTERTAINMENT
        'netflix', 'hotstar', 'prime video', 'spotify', 'apple music', 'movie', 'cinema', 'theatre',
        'pvr', 'imax', 'gaming', 'steam', 'playstation', 'xbox', 'subscription', 'youtube premium',

        # BILLS & HOUSING
        'rent', 'apartment', 'electricity', 'bill', 'water', 'internet', 'wifi', 'jio fibre', 'airtel',
        'maintenance', 'recharge', 'insurance', 'tax', 'loan emi', 'utility'
    ],
    'category': (
        ['Food & Drink'] * 28 +
        ['Travel'] * 27 +
        ['Shopping'] * 20 +
        ['Entertainment'] * 16 +
        ['Bills & Housing'] * 15
    )
}


# =========================
# 🧠 TRAIN MODEL
# =========================
def train_categorizer():
    df = pd.DataFrame(training_data)

    model = Pipeline([
        ('vectorizer', TfidfVectorizer(ngram_range=(1, 2))),
        ('nb', MultinomialNB(alpha=0.1))
    ])

    model.fit(df['text'].str.lower(), df['category'])
    return model


# Initialize model
cat_model = train_categorizer()


# =========================
# 🔍 CATEGORY PREDICTION
# =========================
def predict_category(text: str):
    processed_text = text.lower().strip()

    # ✅ Manual override (fast + accurate for common cases)
    overrides = {
        'food': ['pizza', 'burger', 'food', 'eat', 'dinner', 'lunch', 'cafe', 'mcdonald', 'starbucks'],
        'travel': ['uber', 'gas', 'petrol', 'fuel', 'flight', 'airline', 'taxi', 'cab'],
        'shopping': ['amazon', 'flipkart', 'shopping', 'clothes', 'mall'],
    }

    for category, keywords in overrides.items():
        if any(word in processed_text for word in keywords):
            if category == 'food': return 'Food & Drink'
            if category == 'travel': return 'Travel'
            if category == 'shopping': return 'Shopping'

    # ✅ AI fallback
    try:
        return cat_model.predict([processed_text])[0]
    except:
        return "Uncategorized"


# =========================
# 📸 OCR RECEIPT PROCESSING
# =========================
def extract_from_image(image_bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)

        # Extract amounts like 123.45
        amounts = re.findall(r'\d+\.\d{2}', text)
        total = max([float(a) for a in amounts]) if amounts else 0.0

        # Extract merchant (first meaningful line)
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        merchant = lines[0] if lines else "Unknown Merchant"

        return {
            "title": merchant,
            "amount": total,
            "category": predict_category(merchant)
        }

    except Exception as e:
        print(f"OCR Error: {e}")
        return {
            "title": "",
            "amount": 0,
            "category": "Uncategorized"
        }


# =========================
# 📈 SPENDING FORECAST
# =========================
def forecast_spending(history_amounts):
    if len(history_amounts) < 2:
        return sum(history_amounts)

    X = np.array(range(len(history_amounts))).reshape(-1, 1)
    y = np.array(history_amounts)

    model = LinearRegression()
    model.fit(X, y)

    next_index = np.array([[len(history_amounts)]])
    prediction = model.predict(next_index)

    return max(0, float(prediction[0]))