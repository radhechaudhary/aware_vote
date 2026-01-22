import sys
import joblib
import pandas as pd
import re
from sklearn.base import BaseEstimator, TransformerMixin

# Must redefine cleaner EXACTLY as training
class TextCleaner(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        return X.apply(self.clean_text)
    
    def clean_text(self, text):
        if not isinstance(text, str):
            return ""
        text = text.lower()
        text = re.sub(r"http\S+|www\S+", "", text)
        text = re.sub(r"\d+", "", text)
        text = re.sub(r"[^\w\s]", "", text)
        return re.sub(r"\s+", " ", text).strip()

# Load FULL pipeline (vectorizer + model)
pipeline = joblib.load("./model/vulgar_chat_model.pkl")

# Read input text
data = sys.stdin.read().strip()

# Wrap input as Series
input_series = pd.Series([data])

# Predict
prediction = pipeline.predict(input_series)[0]

print(prediction)
