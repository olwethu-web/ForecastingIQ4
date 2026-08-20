from flask import Flask, jsonify, render_template
from flask_cors import CORS
import pandas as pd
from forecast import generate_forecast

app = Flask(__name__)
CORS(app)


# ==========================================================
# HOME
# ==========================================================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================================================
# DASHBOARD KPI DATA
# ==========================================================

@app.route("/api/dashboard")
def dashboard():

    df = pd.read_csv("sales.csv")

    total_sales = df["Sales"].sum()
    total_revenue = df["Revenue"].sum()
    total_profit = df["Profit"].sum()
    total_customers = df["Customers"].sum()

    growth = 12.8

    data = {
        "sales": int(total_sales),
        "revenue": float(total_revenue),
        "profit": float(total_profit),
        "customers": int(total_customers),
        "growth": growth
    }

    return jsonify(data)


# ==========================================================
# CHART DATA
# ==========================================================

@app.route("/api/chart-data")
def chart_data():

    df = pd.read_csv("sales.csv")

    df["Date"] = pd.to_datetime(df["Date"])

    # Sort by date
    df = df.sort_values("Date")

    # Return the raw data
    data = df[
        ["Date", "Sales", "Revenue", "Profit", "Customers"]
    ].copy()

    data["Date"] = data["Date"].dt.strftime("%Y-%m-%d")

    return jsonify(data.to_dict(orient="records"))


# ==========================================================
# SALES FORECAST
# ==========================================================

@app.route("/api/forecast")
def forecast():

    result = generate_forecast()

    data = result[
        ["ds", "yhat"]
    ].tail(30)

    return jsonify(
        data.to_dict(orient="records")
    )


# ==========================================================
# AI INSIGHTS
# ==========================================================

@app.route("/api/insights")
def insights():

    df = pd.read_csv("sales.csv")

    total_sales = df["Sales"].sum()
    total_revenue = df["Revenue"].sum()
    total_profit = df["Profit"].sum()
    total_customers = df["Customers"].sum()

    insights = []

    if total_sales > 500:
        insights.append("📈 Sales performance is strong.")

    if total_revenue > 100000:
        insights.append("💰 Revenue is growing steadily.")

    if total_profit > 50000:
        insights.append("✅ Profit levels are healthy.")
    else:
        insights.append("⚠️ Profit needs improvement.")

    if total_customers > 200:
        insights.append("👥 Customer growth is excellent.")

    return jsonify(insights)


# ==========================================================
# RUN APPLICATION
# ==========================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )