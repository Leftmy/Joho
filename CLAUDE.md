# Joho API & Frontend — Development Guide & Architectural Context

## Project Overview
Joho is an ASP.NET Core Web API backend with a modern web frontend that integrates with LLM providers (e.g., Google Gemini, OpenAI, Claude) to perform automated code reviews, code analysis, and developer tooling tasks.

## Tech Stack & Ecosystem
- **Backend:** .NET 8 / 9 (ASP.NET Core Web API)
- **Database:** PostgreSQL via Entity Framework Core (`Npgsql.EntityFrameworkCore.PostgreSQL`)
- **Authentication:** ASP.NET Core Identity + JWT Bearer Tokens (Access & Refresh Tokens)
- **API Documentation:** Swagger / OpenAPI with Bearer Authorization UI
- **Architecture:** Controller-Service Pattern with DTOs and Repository/Service abstraction

---

## Security & Authentication Rules

### Token Management Strategy
- **Access Tokens:** Must be stored securely in `HTTP-Only` cookies or memory/HTTP-Only cookies to protect against XSS attacks.
- **Refresh Tokens:** Strictly stored as **HTTP-Only, SameSite=Strict, Secure** cookies on the client side. Never expose refresh tokens in local storage or JavaScript state.
- **API Key Storage:** User custom provider API keys (e.g., Gemini, OpenAI) must be stored on the frontend inside client-side local storage or encrypted state, and sent via encrypted request headers/payloads per session without being hardcoded on the backend.

---

## Frontend Design & UI/UX Guidelines

### UI Aesthetic & Tone
- **Visual Style:** Hybrid dark/light theme inspired by Google Antigravity, GitHub Copilot, and ChatGPT.
  - Dark mode primary background: `#0d1117` / `#161b22` (GitHub Dark).
  - Clean monospace code blocks with syntax highlighting, subtle glow borders, and minimal futuristic accents.
  - Streamlined sidebar navigation with chat/review history and prompt/review focus selection.
- **Responsiveness & Adaptability:** 
  - Fully responsive layout supporting Mobile, Tablet, and Desktop displays.
  - Mobile view must collapse sidebar into an interactive drawer and maintain sticky code review input controls.

---

## Backend & Code Style Guidelines

### C# / ASP.NET Core Conventions
- **Naming Conventions:**
  - `PascalCase` for classes, methods, records, interfaces, and public properties.
  - `camelCase` for local variables and method arguments.
  - `_camelCase` for private readonly injected fields.
- **DTOs:** Use C# `record` types with Data Annotations (`[Required]`, `[EmailAddress]`) for request payloads.
- **Entity Framework Core & Identity:**
  - `User` inherits from `IdentityUser`.
  - Do **NOT** duplicate standard Identity properties (`UserName`, `Email`, `PasswordHash`).
  - Access username strictly via `user.UserName` (capitalized N).
- **Null Safety:** Enable C# Nullable Reference Types (`<Nullable>enable</Nullable>`) and handle missing DB entities explicitly.

---

## AI & Provider Integration Specifications

### Google Gemini API Configuration
- **Valid Production Models:**
  - `gemini-2.5-flash` (Fast, low-latency code reviews)
  - `gemini-2.5-pro` (Deep architecture & complex logic analysis)
- **Constraint:** Validate model strings before API calls to prevent `404 Not Found` provider errors.

---

## Database & EF Core Workflows

### EF Core CLI Commands
- **Add Migration:**
  `dotnet ef migrations add <MigrationName>`
- **Update Database:**
  `dotnet ef database update`

### Connection String Setup (Development)
For local debugging, include `Include Error Detail=true` in `appsettings.Development.json` *(exclude from production)*.

---

## Useful Development Commands

```bash
# Build project
dotnet build

# Run API server
dotnet run --project Joho
```