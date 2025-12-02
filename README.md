# ELEVN-site

Simple starter page for tracking job applications with a Bugatti-inspired dark, blue, and red aesthetic. Open `index.html` directly in your browser or serve locally to see the form. The page uses ChatGPT to generate a tailored resume preview from stored role profiles when you submit a job description. An OpenAI API key is required.

## Run locally

1. Open `index.html` in your browser, **or**
2. From this directory run:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) to view the page.

Your entries are stored in `localStorage` and stay on your device until you submit. The OpenAI API key you paste is saved to your browser (localStorage) automatically so you only add it once; clear it anytime with **Clear stored key**. Submission calls the OpenAI API with your key to tailor the resume.

## Tailored resume preview

1. Enter the **Job position**, **Company**, and **Job description**.
2. (Optional) Toggle **Add Information Security Analyst (Independent Consultant) entry** if you want that provided project added verbatim to the tailored output.
3. Paste your OpenAI API key (kept only in your browser/localStorage for this page).
4. Click **Submit**. The page will save your draft locally and call the OpenAI Chat Completions API with the job data and stored resume library to return a JSON-tailored resume (resumes stay hidden and are used only for tailoring).

**Note:** Keep your API key secret. You can clear it anytime by removing the key field and clicking **Save locally**.
