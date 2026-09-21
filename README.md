# CodeAlpha E-commerce Store

A decoupled full-stack e-commerce web application built for Task 1 of the CodeAlpha Full Stack Development Internship.

## Architecture
This project utilizes a separated frontend and backend architecture:
*   **Backend API:** Built with Python, Django, and Django REST Framework (DRF) to serve product data, manage user carts, and process orders. Hosted on Render.
*   **Frontend Interface:** Built with Vanilla JavaScript, HTML, and CSS to dynamically consume the REST API. Hosted on Vercel.

## Features
*   **Dynamic Product Catalog:** Products are fetched securely from the Django SQLite database via RESTful API endpoints.
*   **Cart Management:** Users can add products to their active cart session, which updates the database in real-time.
*   **Order Processing:** A streamlined checkout feature that marks the active cart order as complete and resets the user's session.

## Tech Stack
*   **Backend:** Python, Django, Django REST Framework, SQLite
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript, Fetch API
*   **Production Server:** Gunicorn
*   **Deployment:** Render (Backend), Vercel (Frontend)

## Live Demo
*   **Frontend:** [Insert your Vercel URL here]
*   **Backend API:** [Insert your Render URL here]/api/products/

## Local Setup

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/CodeAlpha_Ecommerce.git
cd CodeAlpha_Ecommerce
\`\`\`

**2. Start the Backend API**
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
\`\`\`

**3. Start the Frontend**
Open the `frontend` folder and launch `index.html` using Live Server or any local static server. *Note: Ensure `app.js` is pointed to your local `http://127.0.0.1:8000/api/` URL for local testing.*