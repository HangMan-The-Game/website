# HangMan - The Game

HangMan - The Game is an educational project created by a team of students from
ITET Rapisardi - Da Vinci. It reimagines the classic word game as a web
experience and a physical prototype whose parts fall after each wrong attempt.

The website presents the project and includes online gameplay, Firebase
accounts, player statistics, difficulty levels, a live leaderboard, light and
dark themes, and Italian/English content.

## Technology

- Vue 3 and Vue Router
- Vite
- Bootstrap 5 and Bootstrap Icons
- Firebase Authentication, Cloud Firestore, and optional Analytics
- Vue I18n

## Local development

Requirements:

- Node.js
- npm
- a Firebase project for account and database features

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Create a local `.env` file with the Firebase configuration used by the app:

```dotenv
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_DATABASE_URL=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

`VITE_MEASUREMENT_ID` is optional. When configured, Firebase Analytics is still
disabled until the visitor gives consent through the privacy banner.

## Production build

```sh
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Privacy and legal pages

The application includes a consent manager and these public routes:

- `/privacy-policy`
- `/cookie-policy`
- `/terms`

Legal and privacy text should be reviewed whenever Firebase services, hosting,
data collection, project ownership, or contact details change.

## Team

- Michele Turco - CEO & Embedded Systems Lead
- Alessandro Runza - CTO & Full-Stack IoT Architect
- Gandolfo Amico - Mobile Developer & Social Media Lead
- Emanuele Dolce - 3D Product Design Lead
- Calogero Frisina - Hardware Prototyping & Electronics Lead

## Licensing

The source code is available under the [MIT License](./LICENSE).

HangMan branding, logos, photographs, website copy, translations, legal
documents, and original media are not covered by the MIT License and remain
protected as described in [ASSETS_LICENSE.md](./ASSETS_LICENSE.md).

Third-party dependencies and materials remain subject to their own licenses.
