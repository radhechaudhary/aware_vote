import pandas as pd
import joblib
import re
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import ComplementNB
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.linear_model import LogisticRegression

# Load data
data = pd.read_csv("./hate.csv")
data = data.dropna(subset=["tweet"])
data["tweet"] = data["tweet"].astype(str)


# Convert to binary
data["label"] = data["class"].apply(lambda x: 1 if x <= 1 else 0)

# Add neutral chat samples
neutral_samples = pd.DataFrame({
    "tweet": [
        "hi", "hello", "hey", "ok", "yes", "no",
        "thanks", "thank you", "good morning",
        "good night", "how are you", "welcome"
    ],
    "label": [0]*12
})

data = pd.concat([data[["tweet", "label"]], neutral_samples], ignore_index=True)

print(data["label"].value_counts())


# Split
X_train, X_test, y_train, y_test = train_test_split(
    data["tweet"], data["label"], test_size=0.05, random_state=42
)

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


# Full pipeline
pipeline = Pipeline([
    ("clean", TextCleaner()),
    ("vectorize", TfidfVectorizer(
        ngram_range=(1,2),
        min_df=2,
        max_df=0.95
    )),
    ("model", LogisticRegression(
    class_weight="balanced",
    max_iter=1000))
])

# Train
pipeline.fit(X_train, y_train)

# Save
joblib.dump(pipeline, "vulgar_chat_model.pkl")
