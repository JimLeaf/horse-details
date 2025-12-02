import streamlit as st
import streamlit.components.v1 as components
import os

# Set page config
st.set_page_config(page_title="Horse Details", layout="wide")

# Load the HTML file
html_path = os.path.join(os.path.dirname(__file__), "index.html")
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Render the HTML
components.html(html_content, height=800, scrolling=True)
