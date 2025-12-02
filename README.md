# ELEVN-site

Simple starter page for tracking job applications with a Bugatti-inspired dark, blue, and red aesthetic, now with animated gradients and glints to keep the page feeling alive. Open `index.html` directly in your browser or serve locally to see the form. The page uses ChatGPT to generate a tailored resume preview from stored role profiles when you submit a job description. An OpenAI API key is required and the page must be online to submit (offline use is not supported; the submit button is disabled when offline).

## Project structure

- `index.html` – markup-only shell that wires in styles, data, and behavior.
- `assets/css/style.css` – Bugatti-inspired styling.
- `data/resumes.js` – hidden resume library and consultant project content, attached to `window.resumeData` for tailoring requests.
- `assets/js/app.js` – form handling, draft persistence, encryption/decryption, and ChatGPT-tailoring logic.

## Run locally

1. Open `index.html` in your browser, **or**
2. From this directory run:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) to view the page.

Your entries are stored in `localStorage` and stay on your device until you submit. The OpenAI API key you paste is encrypted locally with your passphrase and saved in `localStorage`; unlock it per session with the same passphrase or clear it anytime. Submission calls the OpenAI API with your key to tailor the resume, automatically unlocking a stored encrypted key when you provide the passphrase.

## Tailored resume preview

1. Enter the **Job position**, **Company**, and **Job description**.
2. (Optional) Toggle **Add Information Security Analyst (Independent Consultant) entry** if you want that provided project added verbatim to the tailored output.
3. Paste your OpenAI API key, add an **Encryption passphrase**, then click **Encrypt & save key**. Unlock in future sessions with the same passphrase using **Unlock stored key**.
4. Click **Submit**. The page will save your draft locally and call the OpenAI Chat Completions API with the job data and stored resume library to return a JSON-tailored resume (resumes stay hidden and are used only for tailoring).

**Note:** The API key stays in your browser, encrypted with the passphrase you supply. Clear the encrypted key anytime with **Clear stored key**.
