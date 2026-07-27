import os
import pandas as pd
from prophet import Prophet


# Path to the CSV file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(BASE_DIR, "data", "sales.csv")


def generate_forecast():

    # Read sales data
    df = pd.read_csv(CSV_FILE)

    # Rename columns for Prophet
    df = df.rename(columns={
        "Date": "ds",
        "Sales": "y"
    })

    # Convert date column
    df["ds"] = pd.to_datetime(df["ds"])

    # Create Prophet model
    model = Prophet()

    # Train model
    model.fit(df)

    # Forecast next 30 days
    future = model.make_future_dataframe(periods=30)

    # Predict
    forecast = model.predict(future)

    return forecast