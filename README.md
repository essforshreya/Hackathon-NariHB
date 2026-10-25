# NariHB 💗
### Making Women's Health Awareness More Accessible

NariHB is a women's health-focused technology project designed to support awareness and preliminary anaemia screening through an accessible digital experience.

The project combines a React-based frontend, a Python Flask backend, an image-based screening pipeline, PDF-related functionality, and a mini voice assistant. Our aim is to make health-related information easier to access and understand while encouraging appropriate professional medical follow-up.

Developed as a hackathon project, NariHB explores how technology can support women's health awareness through an approachable and user-friendly platform.

> **Medical disclaimer:** NariHB is a screening-support prototype, not a diagnostic medical device. Its outputs must not replace professional medical evaluation, laboratory investigations, or advice from a qualified healthcare professional.

---

## 📌 Table of Contents

- [About NariHB](#-about-narihb)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [AI Model and Attribution](#-ai-model-and-attribution)
- [How It Works](#-how-it-works)
- [Repository Structure](#-repository-structure)
- [Local Setup](#-getting-started-locally)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Backend and API](#-backend-and-api)
- [Deployment Guide](#-deployment-guide)
- [Troubleshooting](#-troubleshooting)
- [Limitations and Future Scope](#-limitations-and-future-scope)
- [Privacy and Security](#-privacy-and-security)
- [Acknowledgements](#-acknowledgements)
- [License](#-license)

---

## 🌸 About NariHB

Anaemia is an important health concern, particularly for women. Recognising possible warning signs and understanding when to seek medical evaluation can be important steps towards better health awareness.

However, health information is not always easy to understand, and accessing appropriate guidance can be difficult for some people.

NariHB explores how a digital platform can make this process more approachable through health-focused functionality, image-based screening support, and accessible interaction.

Our project focuses on three key goals:

- **Awareness:** Make health-related information easier to understand.
- **Accessibility:** Provide a straightforward digital experience, including a mini voice assistant.
- **Action:** Encourage users to consider appropriate professional consultation.

NariHB is a developing prototype. Its capabilities depend on the implemented features, available model assets, and application configuration.

## 🚨 The Problem

Some of the challenges that inspired NariHB include:

- Limited awareness of anaemia and its possible warning signs.
- Difficulty understanding health-related information.
- Delays in seeking professional medical advice.
- The need for more accessible ways to interact with health technology.
- Difficulty organising and understanding screening-related information.

We wanted to explore a solution that combines an approachable digital experience with technology that can support preliminary screening and encourage informed next steps.

## 💡 Our Solution

NariHB combines a React frontend with a Python Flask backend to support a women's health screening workflow.

The frontend provides the user interface, while the backend contains image-processing and prediction components, database-related functionality, and report-generation logic.

The project also includes a mini voice assistant intended to make interaction more convenient.

Our approach focuses on making health-related technology easier to approach while being clear that preliminary screening cannot establish a medical diagnosis.

## ✨ Features

### 1. Women's Health Awareness

A health-focused digital experience designed to make preliminary screening and health-related information more approachable.

### 2. Image-Based Anaemia Screening Support

The backend includes an image-screening pipeline designed for supported image categories, including eye conjunctiva and fingernail images.

Actual model inference depends on obtaining and correctly configuring the required trained weights.

### 3. Screening Results

The backend processes screening inputs and prediction results. The application is intended to present screening-related information in an understandable format.

A model-derived confidence value is not the same as measured accuracy or diagnostic certainty. NariHB does not claim clinically validated accuracy without appropriate evaluation evidence.

### 4. PDF-Related Functionality

The project contains PDF-generation functionality in the backend and includes jsPDF in the frontend dependencies.

The exact report contents and download workflow depend on the relevant components being connected and configured correctly.

### 5. Mini Voice Assistant

NariHB includes a mini voice assistant intended to make interaction more convenient and accessible.

Its capabilities depend on the implemented frontend functionality and any required browser permissions or external services.

### 6. Screening Record Management

The backend contains database models for screening-related records, including patient information, uploaded-image references, prediction information, and timestamps.

### 7. React-Based Frontend

React and Vite provide the frontend application structure and local development workflow.

### 8. Configurable Database

The backend uses Flask-SQLAlchemy for database integration. SQLite is supported for local development, and PostgreSQL connection configuration is available.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend interface |
| Vite | Development server and production builds |
| JavaScript | Frontend application logic |
| jsPDF | Frontend PDF-related functionality |
| Python | Backend and screening logic |
| Flask | Backend web framework |
| Flask-SQLAlchemy | Database integration |
| SQLAlchemy | Database access |
| PyTorch | Machine-learning components |
| Torchvision and timm | Computer-vision and model components |
| Pillow | Image processing |
| ReportLab | Backend PDF generation |
| SQLite | Local database option |
| PostgreSQL | Configurable database option |
| Git and GitHub | Version control and collaboration |

The presence of a dependency does not guarantee that every associated feature is fully integrated or operational.

## 🤖 AI Model and Attribution

NariHB incorporates a machine-learning-based image-screening pipeline intended to support preliminary anaemia screening.

The project uses a model sourced from Hugging Face and associated with research using fingernail images from a Ghanaian dataset.

Relevant background includes the published research:

Asare, J. W., Appiahene, P., Donkoh, E. T., and collaborators. *Iron deficiency anemia detection using machine learning models: A comparative study of fingernails, palm and conjunctiva of the eye images.* Engineering Reports (2023).

Research paper: https://doi.org/10.1002/eng2.12667

The Hugging Face model and checkpoint used by the project must be identified precisely before attributing model-specific performance metrics.

### Understanding model confidence

A model can produce a predicted class and a probability-derived confidence value. Neither establishes that the prediction is medically correct.

Accuracy, sensitivity, specificity, and AUC are evaluation metrics that require appropriate labelled data and a documented testing methodology.

NariHB does not claim that a particular published accuracy figure represents its own performance. Clinical validation and testing on the intended population would be required before making such a claim.

### Model asset requirements

The repository's integration notes warn that certain `.pth` files are Git LFS pointer files rather than actual trained model weights.

Those pointer files alone cannot be used for inference. The correct trained weights must be obtained from the authorised source and configured at the paths expected by the backend.

**Model source:** https://huggingface.co/

The exact model repository and checkpoint should be cited once the integrated checkpoint is verified.

---

## 🔄 How It Works

The intended screening workflow is:

1. The user opens the application.
2. The user provides the requested information.
3. A supported image is submitted through the screening workflow.
4. The backend validates and processes the image.
5. The configured model performs inference if its trained weights are available and load correctly.
6. The application processes the screening result.
7. Available database and report-generation functionality organises the information.
8. The user is encouraged to seek professional medical evaluation when appropriate.

The complete workflow depends on the frontend-to-backend integration, valid model assets, and correct environment configuration.

---

## 📁 Repository Structure

The repository contains the following main areas:

```text
Hackathon-NariHB/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── requirements-full.txt
│   └── ...
├── model-test/
├── INTEGRATION_NOTES.txt
├── requirements.txt
├── requirements-full.txt
└── README.md
```

This is a simplified overview; additional files and directories are omitted.

- `frontend/` contains the React application and frontend dependencies.
- `backend/` contains the Flask application, configuration, and screening-related modules.
- `model-test/` contains model-related testing and experimentation files.
- `INTEGRATION_NOTES.txt` documents important integration and model-asset considerations.
- Python requirements files specify dependencies for the relevant environments.

---

## 🚀 Getting Started Locally

These instructions are intended for Windows users working with PowerShell and VS Code.

### Prerequisites

Install:

- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org/en/download)
- [Python 3.12](https://www.python.org/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/)

Model inference additionally requires compatible machine-learning dependencies and the actual trained model weights.

### Step 1: Clone the repository

```powershell
git clone https://github.com/essforshreya/Hackathon-NariHB.git
cd Hackathon-NariHB
code .
```

### Step 2: Install frontend dependencies

```powershell
cd frontend
npm install
npm run dev
```

Vite will display a local development URL, typically:

`http://localhost:5173`

Open the displayed address in Chrome.

Keep this terminal running.

### Step 3: Set up the backend

Open a second terminal at the repository root.

Create a virtual environment:

```powershell
py -3.12 -m venv backend\.venv
```

Upgrade pip:

```powershell
backend\.venv\Scripts\python.exe -m pip install --upgrade pip
```

Install the backend dependencies:

```powershell
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements-full.txt
```

### Step 4: Start Flask

From the repository root:

```powershell
backend\.venv\Scripts\python.exe backend\app.py
```

Check the terminal output for the local address, port, and any errors. The exact URL depends on the Flask configuration.

### Step 5: Test the application

1. Open the frontend in Chrome.
2. Confirm that the interface loads.
3. Check the backend terminal for errors.
4. Test the available user-interface functionality.
5. Confirm that frontend requests match the backend routes.
6. Test image inference only after the actual model weights have been obtained and loaded successfully.
7. Verify report generation and database-dependent operations.

The frontend and backend run as separate processes. Starting one does not automatically start the other.

---

## ⚙️ Environment Configuration

The backend supports environment-based database and runtime configuration.

SQLite can be used as the local database option where permitted by the application configuration.

Database settings may include:

```text
DATABASE_URL
SQLALCHEMY_DATABASE_URI
```

A PostgreSQL connection URL may follow this format:

```text
postgresql+psycopg://USERNAME:PASSWORD@HOST:5432/DATABASE_NAME
```

This is an example format, not a real credential. Use the exact variable names expected by `backend/config.py`.

Review the configuration for runtime directories, model locations, and other application settings before changing paths or environment variables.

### Model weights

To enable inference:

1. Identify the authorised source of the trained model.
2. Obtain the actual model files using Git LFS or the appropriate download process.
3. Place them in the configured model directory.
4. Verify that the checkpoint paths point to actual weight files.
5. Test model loading and inference in the intended Python environment.

Do not treat Git LFS pointer files as trained model weights.

---

## 🧩 Backend and API

NariHB uses **Flask**, not FastAPI, for its backend.

The main entry point is `backend/app.py`.

The backend contains screening-related processing, image validation, database models, and PDF report-generation components.

Inspect the route definitions in `backend/app.py` and any additional backend modules to identify the available API endpoints, required request formats, and response structures.

The frontend and backend must agree on endpoint URLs, request formats, and response formats. Review the integration notes before wiring the React frontend to the Flask application.

Do not assume that FastAPI's `/docs` endpoint is available.

---

## 🌐 Deployment Guide

NariHB requires a deployed frontend and a separately running backend. A public GitHub repository does not automatically host the complete application.

A typical architecture is:

```text
User's browser
      |
      v
React + Vite frontend
      |
      v
Flask backend
      |
      +----> Configured database
      |
      +----> Trained model weights
```

### Part A: Build the frontend

From the frontend directory:

```powershell
npm install
npm run build
```

Vite normally generates the production build in `frontend/dist/`.

### Part B: Deploy the frontend

A static hosting provider that supports Vite builds can host the frontend.

Options include:

- https://render.com/
- https://vercel.com/

Typical Vite static-site settings are:

| Setting | Value |
|---|---|
| Repository | `essforshreya/Hackathon-NariHB` |
| Root directory | `frontend` |
| Build command | `npm install && npm run build` |
| Publish directory | `dist` |

Adjust the settings to match the hosting provider.

If the frontend needs a backend API URL, configure the environment variable expected by the actual frontend code. Rebuild and redeploy after changing build-time variables.

### Part C: Deploy the Flask backend

Choose a hosting provider that supports Python web applications and the backend's dependencies.

Configure the service to use the `backend` directory and install the required dependencies.

A conventional Gunicorn command is:

```bash
gunicorn app:app
```

This assumes the working directory is `backend` and the Flask instance is named `app` in `app.py`. Verify the entry point and hosting platform's port requirements before deploying.

If model inference is enabled, the service must also have access to the real trained weights and compatible dependencies.

### Part D: Configure database and storage

Configure the production database through the supported environment variables.

Verify that the backend can connect to the database and that the required schema has been initialised.

Uploaded images, generated reports, and other runtime files may need persistent storage. Do not assume that files on a hosting provider's temporary filesystem will survive restarts or redeployments.

### Part E: Connect the frontend and backend

After both services are deployed:

1. Obtain the public backend URL.
2. Configure the frontend to use that URL rather than localhost.
3. Verify that requests match the actual Flask routes.
4. Configure cross-origin request handling for the frontend's production origin.
5. Set the required environment variables.
6. Test the public frontend and backend together.
7. Test database operations, report generation, and model inference where enabled.

### Part F: Verify deployment

Before sharing the application, confirm that:

- The frontend builds and loads.
- The backend starts without import or configuration errors.
- API requests reach the intended routes.
- Database operations work.
- Required model files are available if inference is enabled.
- Reports and uploaded files are handled correctly.
- Secrets and private user information are not exposed.

A successful frontend build alone does not establish that the complete screening workflow is operational.

---

## 🐛 Troubleshooting

| Issue | What to check |
|---|---|
| `npm` is not recognised | Install Node.js and reopen the terminal. |
| Python 3.12 is not found | Install Python 3.12 and verify the Python launcher. |
| Python dependencies fail | Check package compatibility, especially PyTorch. |
| Frontend requests fail | Verify the backend URL, routes, and cross-origin configuration. |
| Model loading fails | Check that actual trained weights are available. |
| Database connection fails | Check the URL, credentials, driver, and database availability. |
| PDF generation fails | Check the report code and runtime file permissions. |
| Uploaded files disappear | Review persistent-storage settings. |
| Production build fails | Review build logs and dependency installation. |

---

## ⚠️ Current Limitations

- The integration notes warn that certain `.pth` files are Git LFS pointers rather than actual trained weights.
- Model inference requires the correct model assets and compatible dependencies.
- Frontend-to-backend integration must be verified before assuming that the complete workflow works.
- The existence of report-generation or database code does not guarantee that every related feature is connected to the frontend.
- Model-derived confidence values are not proof of clinical accuracy.
- A screening result is not a confirmed diagnosis.

These limitations should be addressed and tested before use beyond development or demonstration.

## 🔮 Future Scope

Potential improvements include:

- Completing and testing frontend-to-backend integration.
- Making authorised model assets available through a reproducible setup process.
- Validating the screening methodology against appropriate clinical reference data.
- Improving the mini voice assistant.
- Refining report presentation and screening-result explanations.
- Expanding multilingual health information.
- Strengthening authentication, access controls, privacy protections, and auditability.
- Adding automated tests and continuous integration.
- Improving deployment reliability, persistent storage, and monitoring.

Any future clinical use would require appropriate validation, safeguards, and professional oversight.

---

## 🔐 Privacy and Security

The backend contains functionality for handling personal and screening-related information, including patient details and uploaded images.

When running or deploying NariHB:

- Never commit `.env` files, passwords, API keys, or database credentials.
- Do not commit patient records, uploaded health images, generated reports, or private logs.
- Use secure configuration for production credentials.
- Restrict access to personal and screening-related information.
- Review upload validation and storage permissions.
- Use HTTPS and appropriate access controls for production.
- Obtain appropriate consent before collecting or processing health-related information.

NariHB should not be used to make medical decisions without appropriate clinical validation and professional oversight.

## 🤝 Acknowledgements

NariHB was developed as a collaborative technology project focused on women's health awareness and accessible screening-support experiences.

We acknowledge the open-source tools, libraries, research, and developer communities that support projects like this.

**Repository:** https://github.com/essforshreya/Hackathon-NariHB

## 📄 License

No license has been added to this repository yet. All rights are reserved by the respective copyright holders unless otherwise stated.


---

*Built with care and the belief that technology can help make health awareness more accessible.* 💗
