# ELEVN-site

Simple offline-friendly starter page for tracking job applications. Open `index.html` directly in your browser or serve locally to see the form. The page can also generate a tailored resume preview from stored role profiles when you submit a job description — nothing is sent over the network.

## Run locally

1. Open `index.html` in your browser, **or**
2. From this directory run:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) to view the page.

Your entries are stored in `localStorage` and stay on your device.

## Tailored resume preview

1. Enter the **Job position**, **Company**, and **Job description**.
2. (Optional) Toggle **Add Information Security Analyst (Independent Consultant) entry** if you want that provided project added verbatim to the tailored output.
3. Click **Submit**. The page will save your draft locally and display a tailored resume preview based on the closest matching stored role profile (resumes stay hidden and are used only for tailoring).
