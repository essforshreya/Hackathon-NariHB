# NariHB 💗
### Making Women's Health Awareness More Accessible

NariHB is a women's health-focused technology project designed to make health awareness and preliminary anaemia screening more accessible through a simple digital experience.

The project brings together a React-based frontend, a Python backend, image-based screening functionality, PDF report generation, and a mini voice assistant. Our goal is to make health-related information easier to access and understand while encouraging users to seek professional medical advice when needed.

Built as a hackathon project, NariHB explores how technology can support women's health awareness through an approachable and user-friendly platform.

> **Medical disclaimer:** NariHB is a screening-support prototype, not a diagnostic medical device. Its results must not replace professional medical evaluation, laboratory investigations, or advice from a qualified healthcare professional.

---

## 📌 Table of Contents

- [About NariHB](#-about-narihb)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [How It Works](#-how-it-works)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started-locally)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Backend and API](#-backend-and-api)
- [Deployment Guide](#-deployment-guide)
- [Troubleshooting](#-troubleshooting)
- [Current Limitations](#-current-limitations)
- [Future Scope](#-future-scope)
- [Privacy and Security](#-privacy-and-security)
- [Acknowledgements](#-acknowledgements)
- [License](#-license)

---

## 🌸 About NariHB

Anaemia is an important health concern, particularly for women. Recognising possible warning signs and understanding when to seek medical evaluation can be important steps towards better health awareness.

However, health information is not always easy to understand, and accessing appropriate guidance can be difficult for some people.

NariHB explores how a digital platform can make this process more approachable by combining a health-focused interface with screening-support functionality and understandable reports.

Our project focuses on three key ideas:

- **Awareness:** Making health-related information easier to understand.
- **Accessibility:** Creating a straightforward experience, including a mini voice assistant.
- **Action:** Helping users understand the importance of appropriate follow-up and professional consultation.

NariHB is a developing prototype. Its capabilities depend on the implemented features, available model assets, and application configuration.

## 🚨 The Problem

Some of the challenges that inspired this project include:

- Limited awareness of anaemia and its possible warning signs.
- Difficulty understanding health-related information.
- Delays in seeking professional medical advice.
- The need for more accessible ways to interact with health technology.
- The difficulty of keeping assessment information organised and understandable.

We wanted to explore a solution that combines an approachable digital experience with technology that can support preliminary screening and encourage informed next steps.

## 💡 Our Solution

NariHB combines a React frontend with a Python-based backend to support a women's health screening workflow.

The frontend provides the user interface, while the backend contains image-screening functionality, database-related components, and report-generation logic.

The project also includes a mini voice assistant intended to make interaction more convenient.

Our aim is to make health-related technology easier to approach while being clear that preliminary screening does not establish a medical diagnosis.

## ✨ Features

### 1. Women's Health Awareness

A health-focused digital experience designed to make preliminary screening and health-related information more approachable.

### 2. Image-Based Anaemia Screening Support

The Python backend contains an image-screening pipeline designed around supported image categories, including:

- Eye conjunctiva
- Fingernail

The backend includes image validation and prediction-processing components. Actual inference requires the correct trained model weights and a compatible runtime environment.

### 3. Screening Results

The backend contains functionality for processing screening inputs and prediction results. The intended workflow is to present screening-related information in an understandable format.

Results are intended for preliminary screening support only and must not be interpreted as a confirmed medical diagnosis.

### 4. PDF Report Generation

The project includes PDF-related functionality in the backend and frontend.

The backend contains report-generation components, while the frontend includes jsPDF for PDF-related operations. The exact report contents and download workflow depend on the relevant components being connected and configured correctly.

### 5. Mini Voice Assistant

NariHB includes a mini voice assistant intended to make interaction more convenient and accessible.

Its available capabilities depend on the implemented frontend functionality, browser permissions, and any required external services.

### 6. Screening Record Management

The backend contains database models for screening records, including patient information, uploaded-image references, prediction information, and timestamps.

This functionality is intended to organise screening-related records within the application.

### 7. React-Based Frontend

The frontend uses React and Vite to provide a component-based user interface and a fast local development workflow.

### 8. Configurable Database

The backend uses Flask-SQLAlchemy for database integration. SQLite is supported as a local database option, and PostgreSQL connection configuration is available through environment settings.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and production builds |
| JavaScript | Frontend application logic |
| jsPDF | Frontend PDF-related functionality |
| Python | Backend and screening logic |
| Flask | Backend web framework |
| Flask-SQLAlchemy | Database integration |
| SQLAlchemy | Database access and ORM |
| PyTorch | Machine-learning inference |
| Torchvision and timm | Model and computer-vision components |
| Pillow | Image processing |
| ReportLab | Backend PDF generation |
| SQLite | Local database option |
| PostgreSQL | Configurable database option |
| Git and GitHub | Version control and collaboration |

The listed technologies are based on the project's source code, configuration, and dependency files. The presence of a dependency does not guarantee that every related feature is fully integrated or operational.

---

## 🔄 How It Works

The intended screening workflow is:

1. The user opens the application.
2. The user provides the information requested by the screening interface.
3. A supported image is submitted to the screening workflow.
4. The backend validates and processes the image.
5. The available model pipeline performs inference if the required trained weights are present and load correctly.
6. The application processes the resulting screening information.
7. Database and report-generation functionality can organise the available information.
8. The user is encouraged to seek professional medical evaluation when appropriate.

The complete workflow depends on the frontend-to-backend integration, valid model assets, and correct environment configuration.

---

## 📁 Repository Structure

The repository contains the following main project areas:

```text
Hackathon-NariHB/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── requirements-full.txt
│   └── ...
│
├── model-test/
│
├── INTEGRATION_NOTES.txt
├── requirements.txt
├── requirements-full.txt
└── README.md
```

This is a simplified overview; some files and subdirectories are omitted for readability.

- **`frontend/`** — React application and frontend dependencies.
- **`backend/`** — Flask application, configuration, screening pipeline, and supporting modules.
- **`model-test/`** — Model-related testing and experimentation files.
- **`INTEGRATION_NOTES.txt`** — Notes about backend integration, model assets, and setup considerations.
- **Python requirements files** — Dependency specifications for the relevant project environments.

---

## 🚀 Getting Started Locally

The following instructions are intended for Windows users working with PowerShell and VS Code.

### Prerequisites

Install the following tools:

- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org/en/download)
- [Python 3.12](https://www.python.org/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/)

Python 3.12 is the version recommended in the repository's integration notes for the suggested local setup.

For model inference, compatible PyTorch dependencies and the actual trained model weights are also required.

### Step 1: Clone the repository

Open PowerShell and run:

```powershell
git clone https://github.com/essforshreya/Hackathon-NariHB.git
cd Hackathon-NariHB
```

Open the project in VS Code:

```powershell
code .
```

### Step 2: Install frontend dependencies

Open a terminal at the repository root and run:

```powershell
cd frontend
npm install
```

Start the frontend development server:

```powershell
npm run dev
```

Vite will display a local URL, typically:

```text
http://localhost:5173
```

Open the displayed URL in Chrome.

Keep the terminal running while using the local development server.

### Step 3: Set up the Python backend

Open a second terminal at the repository root. If necessary, return to the root directory first:

```powershell
cd ..
```

Create a Python virtual environment:

```powershell
py -3.12 -m venv backend\.venv
```

Upgrade pip:

```powershell
backend\.venv\Scripts\python.exe -m pip install --upgrade pip
```

Install the dependencies specified in the backend's full requirements file:

```powershell
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements-full.txt
```

PyTorch and computer-vision dependencies can take time to install. Compatibility depends on your operating system, Python version, and hardware.

### Step 4: Start the backend

From the repository root, run:

```powershell
backend\.venv\Scripts\python.exe backend\app.py
```

This uses the Flask entry point identified in the repository's integration notes.

Check the terminal output for the address, port, and any startup errors. The exact local URL depends on the Flask configuration.

### Step 5: Test the application

With both development servers running:

1. Open the frontend in Chrome.
2. Confirm that the user interface loads.
3. Check the backend terminal for errors.
4. Test the available frontend functionality.
5. Confirm that backend requests use the correct routes and request formats.
6. Test image screening only after the trained model weights have been obtained and loaded successfully.
7. Verify PDF generation and database-dependent functionality.

The frontend and backend run as separate processes. Starting the frontend alone does not start the backend.

---

## ⚙️ Environment Configuration

The backend supports environment-based configuration for database and runtime settings.

For local development, SQLite can be used as the default database option when the configuration permits it.

The backend recognises database-related settings such as:

```text
DATABASE_URL
SQLALCHEMY_DATABASE_URI
```

A PostgreSQL connection URL may use the following format:

```text
postgresql+psycopg://USERNAME:PASSWORD@HOST:5432/DATABASE_NAME
```

This is an example, not a set of credentials to copy directly. Use the exact variable names and database settings expected by the code in `backend/config.py`.

The backend also defines configuration for runtime directories, model locations, and other application settings. Review the configuration before changing paths or environment variables.

### Model weights

The repository's integration notes warn that certain `.pth` files are Git LFS pointer files rather than actual trained model weights.

Those pointer files alone cannot be used to perform model inference.

To enable inference:

1. Identify the authorised source of the original trained model.
2. Obtain the real model files using Git LFS or the appropriate download process.
3. Place them in the configured model directory.
4. Verify that the configured checkpoint paths point to the actual files.
5. Test model loading and inference in the intended Python environment.

Do not claim that model inference is operational until the actual weights have been loaded and the pipeline has been tested successfully.

---

## 🧩 Backend and API

NariHB uses **Flask**, not FastAPI, for its backend.

The main backend entry point is:

```text
backend/app.py
```

The backend contains screening-related processing, image validation, database models, and PDF report-generation components.

To understand the available API routes, inspect the route definitions in `backend/app.py` and any additional backend modules.

The frontend and backend must agree on endpoint URLs, request formats, and response formats. The integration notes recommend checking the API contract before connecting the React frontend to the Flask application.

Do not assume that FastAPI's `/docs` endpoint exists for this project.

---

## 🌐 Deployment Guide

NariHB consists of a frontend and a Python backend. Uploading the repository to GitHub does not automatically make the complete application available online.

A typical deployment architecture is:

```text
User's browser
      |
      v
React + Vite frontend
      |
      v
Flask backend
      |
      +------> Configured database
      |
      +------> Trained model weights
```

### Part A: Build the frontend

From the frontend directory, run:

```powershell
npm install
npm run build
```

Vite normally generates the production build in:

```text
frontend/dist/
```

Resolve any build errors before deployment.

### Part B: Deploy the frontend

A static hosting service that supports Vite builds can host the frontend. Options include [Render](https://render.com/) and [Vercel](https://vercel.com/).

Typical settings for a static Vite deployment are:

| Setting | Value |
|---|---|
| Repository | `essforshreya/Hackathon-NariHB` |
| Root directory | `frontend` |
| Build command | `npm install && npm run build` |
| Publish directory | `dist` |

Adjust the settings if the hosting provider uses a different configuration.

If the frontend needs a backend API URL, configure the environment variable expected by the actual frontend source code. Rebuild and redeploy the frontend after changing build-time environment variables.

### Part C: Deploy the Flask backend

Choose a hosting platform that supports Python web applications and the dependencies required by the backend.

For model inference, the environment must also support the required PyTorch runtime and have access to the real trained model weights.

Connect the GitHub repository and configure the service's root directory as `backend`.

Install the dependencies specified in `backend/requirements-full.txt`, and configure the required environment variables.

A conventional Gunicorn start command is:

```bash
gunicorn app:app
```

This assumes the working directory is `backend` and the Flask application instance is named `app` in `app.py`. Verify these details and the hosting platform's port requirements before deploying.

### Part D: Configure the database and storage

Configure the production database using the settings expected by the application.

If PostgreSQL is used, confirm that the backend can connect to the database and that the required schema has been initialised.

Uploaded images, generated reports, and other runtime files may need persistent storage. Do not assume that files stored on a hosting provider's temporary filesystem will survive restarts or redeployments.

### Part E: Connect the frontend and backend

After deploying both services:

1. Obtain the public backend URL.
2. Configure the frontend to use that URL instead of localhost.
3. Verify that frontend requests match the actual Flask routes.
4. Configure cross-origin request handling for the deployed frontend origin.
5. Set all required environment variables.
6. Test database operations and report generation.
7. Test model inference separately after verifying the actual model weights.

### Part F: Verify the deployment

Before sharing a deployed version, confirm that:

- The frontend builds and loads correctly.
- The backend starts without import or configuration errors.
- API requests reach the intended backend routes.
- Database operations work.
- Required model files are available if inference is enabled.
- Reports and uploaded files are handled correctly.
- Secrets and private user information are not exposed.

A deployed frontend alone does not guarantee that the complete screening workflow is operational.

---

## 🐛 Troubleshooting

| Issue | What to check |
|---|---|
| `npm` is not recognised | Install Node.js and reopen the terminal. |
| Python 3.12 is not found | Install Python 3.12 and verify the `py -3.12` launcher. |
| Python dependencies fail to install | Check package compatibility, particularly PyTorch. |
| Frontend loads but API requests fail | Check the backend URL, route definitions, and cross-origin configuration. |
| Model loading fails | Verify that the actual trained model files are present and accessible. |
| Database connection fails | Check the database URL, credentials, driver, and database availability. |
| PDF generation fails | Check the report-generation code and runtime file permissions. |
| Uploaded files disappear after deployment | Review the hosting provider's persistent-storage configuration. |
| Production build fails | Review build logs, dependency installation, and the frontend root directory. |

Check the terminal output and hosting-provider logs before changing application code.

---

## ⚠️ Current Limitations

NariHB is a developing project, and its capabilities depend on the state of the implementation and runtime configuration.

- The integration notes warn that certain model files are Git LFS pointers rather than actual trained weights.
- Model inference requires the correct model assets and compatible dependencies.
- Frontend-to-backend integration must be verified before assuming the complete workflow works end to end.
- The existence of report-generation or database code does not guarantee that every related feature is fully connected to the frontend.
- A screening result is not a clinically confirmed diagnosis.

These limitations should be addressed and tested before the platform is used beyond development or demonstration.

## 🔮 Future Scope

Potential improvements include:

- Completing and testing frontend-to-backend integration.
- Making the authorised model assets available through a reproducible setup process.
- Validating the screening methodology against appropriate clinical reference data.
- Improving the accessibility and capabilities of the mini voice assistant.
- Refining report presentation and screening-result explanations.
- Expanding multilingual health information.
- Strengthening authentication, access controls, privacy protections, and auditability.
- Adding automated tests and continuous integration.
- Improving production deployment, persistent storage, and monitoring.

Any future clinical use would require appropriate validation, safeguards, and professional oversight.

---

## 🔐 Privacy and Security

The backend contains functionality for handling personal and screening-related information, including patient details and uploaded images.

When running or deploying NariHB:

- Never commit `.env` files, passwords, API keys, or database credentials.
- Do not commit patient records, uploaded health images, generated reports, or private logs.
- Use secure configuration for production credentials.
- Restrict access to personal and screening-related information.
- Review file-upload validation and storage permissions before public deployment.
- Use HTTPS and appropriate access controls for production services.
- Obtain appropriate consent before collecting or processing health-related information.

NariHB should not be used to make medical decisions without appropriate clinical validation and professional oversight.

## 🤝 Acknowledgements

NariHB was developed as a collaborative technology project focused on women's health awareness and accessible screening-support experiences.

We appreciate the open-source tools, libraries, documentation, and developer communities that support projects like this.

**Repository:** [essforshreya/Hackathon-NariHB](https://github.com/essforshreya/Hackathon-NariHB)

## 📄 License

No license has been added to this repository yet. All rights are reserved by the respective copyright holders unless otherwise stated.



---

*Built with care and the belief that technology can help make health awareness more accessible.* 💗
