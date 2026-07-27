from flask import Flask, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import os
from forecast import generate_forecast

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(BASE_DIR, "data", "sales.csv")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/dashboard")
def dashboard():

    df = pd.read_csv("data/sales.csv")

    total_sales = df["Sales"].sum()
    total_revenue = df["Revenue"].sum()
    total_profit = df["Profit"].sum()
    total_customers = df["Customers"].sum()

    # Temporary growth value
    growth = 12.8

    data = {
        "sales": int(total_sales),
        "revenue": float(total_revenue),
        "profit": float(total_profit),
        "customers": int(total_customers),
        "growth": growth
    }

    return jsonify(data)


@app.route("/api/forecast")
def forecast():

    result = generate_forecast()

    data = result[["ds", "yhat"]].tail(30)

    return data.to_json(orient="records")


@app.route("/api/insights")
def get_insights():

    df = pd.read_csv("sales.csv")

    latest = df.iloc[-1]
    previous = df.iloc[-2]

    insights = []

    # Sales
    if latest["Sales"] > previous["Sales"]:
        insights.append(
            f"📈 Sales increased by {latest['Sales'] - previous['Sales']} units compared to the previous month."
        )
    else:
        insights.append("⚠️ Sales declined compared to the previous month.")

    # Revenue
    if latest["Revenue"] > previous["Revenue"]:
        insights.append(
            f"💰 Revenue increased to R{latest['Revenue']:,}."
        )
    else:
        insights.append("⚠️ Revenue has decreased.")

    # Profit
    margin = (latest["Profit"] / latest["Revenue"]) * 100

    insights.append(
        f"📊 Current profit margin is {margin:.1f}%."
    )

    # Customers
    if latest["Customers"] > previous["Customers"]:
        insights.append(
            f"👥 Customer base grew by {latest['Customers'] - previous['Customers']}."
        )

    # Forecast
    insights.append(
        "🔮 AI forecasts continued business growth over the next 30 days."
    )

    return jsonify(insights)
    

@app.route("/sales")
def sales():
    df = pd.read_csv("data/sales.csv")
    sales_data = df.to_dict(orient="records")
    return jsonify(sales_data)


@app.route("/customers")
def customers():
    df = pd.read_csv("data/sales.csv")

    customer_data = []

    for index, row in df.iterrows():
        customer_data.append({
            "month": row["Date"],
            "customers": int(row["Customers"])
        })

    return jsonify(customer_data)

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )