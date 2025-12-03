(function () {
  const statusBanner = document.getElementById('status');
  const connectionBanner = document.getElementById('connection-status');
  const lockApiButton = document.getElementById('lock-api');
  const unlockApiButton = document.getElementById('unlock-api');
  const passphraseInput = document.getElementById('api-passphrase');
  const saveDraftButton = document.getElementById('save-draft');
  const submitButton = document.querySelector('form button[type="submit"]');
  const tailoredOutput = document.getElementById('tailored-output');
  const tailoredActions = document.getElementById('tailored-actions');
  const downloadDocxButton = document.getElementById('download-docx');

  const { consultantExperience = '', resumeLibrary = [] } = window.resumeData || {};
  if (!resumeLibrary.length) {
    console.warn('Resume library is empty; tailoring cannot proceed without data.');
  }

  let lastTailoredData = null;

  const form = document.querySelector('form');
  const apiKeyInput = document.getElementById('api-key');
  const clearApiKeyButton = document.getElementById('clear-api');
  const docxReady = Boolean(
    window.docx?.Document && window.docx?.HeadingLevel && window.docx?.Packer && window.docx?.Paragraph
  );

  const DRAFT_STORAGE_KEY = 'job-notes';
  const ENCRYPTED_KEY_STORAGE_KEY = 'openai-api-key-encrypted';
  
  function showStatus(message, type = 'info') {
    if (!statusBanner) return;
    statusBanner.textContent = message;
    statusBanner.style.borderColor = type === 'error' ? 'rgba(237, 28, 36, 0.6)' : 'rgba(255, 255, 255, 0.16)';
  }

  function updateConnectionStatus() {
    if (!connectionBanner) return;
    const online = navigator.onLine !== false;
    if (online) {
      connectionBanner.textContent =
        'Online mode active. Submissions call the OpenAI Chat Completions API with your provided key.';
      connectionBanner.style.borderColor = 'rgba(255, 255, 255, 0.16)';
    } else {
      connectionBanner.textContent =
        'Offline detected. Connect to the internet to submit—offline tailoring is not supported.';
      connectionBanner.style.borderColor = 'rgba(237, 28, 36, 0.6)';
    }

    if (submitButton) {
      submitButton.disabled = !online;
      submitButton.textContent = online ? 'Submit' : 'Go online to submit';
      submitButton.setAttribute('aria-disabled', String(!online));
    }
  }
  
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  
  function toBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }
  
  function fromBase64(str) {
    return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
  }
  
  async function deriveKey(passphrase, salt) {
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  async function encryptApiKey(apiKey, passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(passphrase, salt);
    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(apiKey));
    return {
      salt: toBase64(salt),
      iv: toBase64(iv),
      ciphertext: toBase64(ciphertext)
    };
  }
  
  async function decryptApiKey(payload, passphrase) {
    const { salt, iv, ciphertext } = payload;
    const key = await deriveKey(passphrase, fromBase64(salt));
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromBase64(iv) },
      key,
      fromBase64(ciphertext)
    );
    return dec.decode(decrypted);
  }

  function sanitizeForFilename(value) {
    return value
      ? value
          .toString()
          .trim()
          .replace(/[^a-z0-9]+/gi, '-')
          .replace(/(^-|-$)/g, '')
      : '';
  }

  function buildDocxFilename(data) {
    const parts = [sanitizeForFilename(data.position), sanitizeForFilename(data.company), sanitizeForFilename(data.role)].filter(
      Boolean
    );
    return parts.join('-') || 'tailored-resume';
  }

  function bulletParagraphs(items, Paragraph) {
    if (!items?.length) return [];
    return items.filter(Boolean).map(
      (item) =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 80 }
        })
    );
  }

  function buildDocxBlob(data) {
    const { Document, HeadingLevel, Packer, Paragraph, TextRun } = window.docx || {};
    if (!Document || !HeadingLevel || !Packer || !Paragraph) {
      throw new Error('DOCX generator unavailable.');
    }

    const children = [
      new Paragraph({
        children: [new TextRun({ text: data.role || 'Tailored Resume', bold: true })],
        heading: HeadingLevel.TITLE,
        spacing: { after: 200 }
      })
    ];

    if (data.company || data.position) {
      const details = [data.position, data.company].filter(Boolean).join(' at ');
      children.push(
        new Paragraph({
          text: details,
          spacing: { after: 160 }
        })
      );
    }

    function addTextSection(title, text) {
      if (!text) return;
      children.push(new Paragraph({ text: title, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 80 } }));
      children.push(new Paragraph({ text, spacing: { after: 160 } }));
    }

    function addBulletSection(title, items) {
      const bullets = bulletParagraphs(items, Paragraph);
      if (!bullets.length) return;
      children.push(new Paragraph({ text: title, heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 80 } }));
      children.push(...bullets);
    }

    addTextSection('Summary', data.summary || 'No summary provided.');
    addBulletSection('Focused Skills', data.highlightedSkills);
    addBulletSection('Relevant Projects', data.projects);
    addBulletSection('Experience Highlights', data.experience);
    addTextSection('Certifications', data.certifications);
    addTextSection('Tools & Platforms', data.tools);

    if (data.includeConsultant && consultantExperience) {
      children.push(
        new Paragraph({ text: 'Additional Experience (as provided)', heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 80 } })
      );
      consultantExperience
        .split(/\n+/)
        .filter(Boolean)
        .forEach((line) => children.push(new Paragraph({ text: line, spacing: { after: 80 } })));
    }

    const doc = new Document({ sections: [{ properties: {}, children }] });
    return Packer.toBlob(doc);
  }
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const encrypted = localStorage.getItem(ENCRYPTED_KEY_STORAGE_KEY);

    if (navigator.onLine === false) {
      lastTailoredData = null;
      tailoredOutput.style.display = 'block';
      tailoredOutput.textContent = 'You appear to be offline. Connect to the internet to submit to ChatGPT.';
      if (tailoredActions) {
        tailoredActions.style.display = 'none';
      }
      showStatus('Connect to the internet before submitting to ChatGPT.', 'error');
      updateConnectionStatus();
      return;
    }

    if (!apiKeyInput.value.trim() && encrypted) {
      const passphrase = passphraseInput.value;
      if (!passphrase) {
        tailoredOutput.style.display = 'block';
        tailoredOutput.textContent = 'Enter your passphrase to unlock the stored API key before submitting.';
        showStatus('Add your passphrase to unlock the stored API key.', 'error');
        return;
      }
      try {
        const decrypted = await decryptApiKey(JSON.parse(encrypted), passphrase);
        apiKeyInput.value = decrypted;
        showStatus('Stored API key unlocked for this submission.', 'info');
      } catch (error) {
        console.error('Unable to auto-unlock API key for submission.', error);
        tailoredOutput.style.display = 'block';
        tailoredOutput.textContent = 'Could not unlock the stored API key. Check your passphrase and try again.';
        showStatus('Could not unlock the stored API key. Verify your passphrase.', 'error');
        return;
      }
    }
  
    if (!apiKeyInput.value.trim()) {
      tailoredOutput.style.display = 'block';
      tailoredOutput.textContent = 'Please add your OpenAI API key to tailor the resume with ChatGPT.';
      return;
    }
  
    saveDraft();
  
    tailoredOutput.style.display = 'block';
    tailoredOutput.textContent = 'Tailoring your resume with ChatGPT...';
  
    try {
      const tailored = await tailorWithChatGPT();
      renderTailoredResume(tailored);
    } catch (error) {
      console.error('ChatGPT tailoring failed.', error);
      tailoredOutput.style.display = 'block';
      const reason = error?.message ? ` (${error.message})` : '';
      tailoredOutput.textContent =
        'ChatGPT tailoring failed. Please check your API key or network connection and try again.' + reason;
      lastTailoredData = null;
      if (tailoredActions) {
        tailoredActions.style.display = 'none';
      }
      showStatus('ChatGPT tailoring failed. Verify your API key and connection.' + reason, 'error');
    }
  });

  if (saveDraftButton) {
    saveDraftButton.addEventListener('click', saveDraft);
  }

  if (downloadDocxButton) {
    if (!docxReady) {
      downloadDocxButton.disabled = true;
      downloadDocxButton.textContent = 'DOCX unavailable';
      downloadDocxButton.setAttribute('aria-disabled', 'true');
    }
    downloadDocxButton.addEventListener('click', handleDocxDownload);
  }
  
  function buildChatPrompt(position, company, description, includeConsultant) {
    const library = JSON.stringify(resumeLibrary, null, 2);
    return `You are a resume tailoring assistant. Choose the closest resume in the provided library and tailor it for the role, keeping facts consistent with the library. Respect the user's provided information and keep the wording concise and professional.
  
  Job Position: ${position}
  Company: ${company}
  Job Description: ${description}
  Include Consultant Entry: ${includeConsultant}
  Resume Library (JSON): ${library}
  
  Return ONLY valid JSON with the following shape: {
    "role": "<selected title>",
    "summary": "<tailored summary>",
    "highlightedSkills": ["skill", ... up to 8],
    "projects": ["project", ... up to 3],
    "experience": ["experience bullet", ... up to 3],
    "certifications": "certifications",
    "tools": "tools",
    "includeConsultant": ${includeConsultant}
  }`;
  }
  
  async function tailorWithChatGPT() {
    const position = document.getElementById('position').value;
    const company = document.getElementById('company').value;
    const description = document.getElementById('description').value;
    const includeConsultant = document.getElementById('include-consultant').checked;
    const apiKey = apiKeyInput.value.trim();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a concise resume tailoring assistant who outputs JSON only.' },
          { role: 'user', content: buildChatPrompt(position, company, description, includeConsultant) }
        ],
        temperature: 0.35,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ChatGPT request failed: ${response.status} ${response.statusText}. ${errorText}`);
    }
  
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content returned from ChatGPT.');
    }
  
    const parsed = JSON.parse(content);
    return {
      role: parsed.role,
      summary: parsed.summary,
      highlightedSkills: parsed.highlightedSkills || [],
      projects: parsed.projects || [],
      experience: parsed.experience || [],
      certifications: parsed.certifications || '',
      tools: parsed.tools || '',
      includeConsultant: Boolean(parsed.includeConsultant)
    };
  }
  
  function renderTailoredResume(data) {
    if (!data) return;
    tailoredOutput.style.display = 'block';
    tailoredOutput.innerHTML = `
      <strong>Tailored Resume for ${data.role}</strong><br><br>
      <strong>Summary:</strong> ${data.summary}<br><br>
      <strong>Focused Skills:</strong>
      <ul>${data.highlightedSkills.map((skill) => `<li>${skill}</li>`).join('')}</ul>
      ${data.projects.length ? `<strong>Relevant Projects:</strong><ul>${data.projects.map((p) => `<li>${p}</li>`).join('')}</ul>` : ''}
      <strong>Experience Highlights:</strong>
      <ul>${data.experience.map((exp) => `<li>${exp}</li>`).join('')}</ul>
      <strong>Certifications:</strong> ${data.certifications}<br>
      <strong>Tools & Platforms:</strong> ${data.tools}
      ${data.includeConsultant ? `<br><br><strong>Additional Experience (as provided):</strong><pre style="white-space: pre-wrap; background: rgba(255,255,255,0.02); padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">${consultantExperience}</pre>` : ''}
    `;

    lastTailoredData = {
      ...data,
      position: document.getElementById('position').value,
      company: document.getElementById('company').value
    };

    if (tailoredActions && downloadDocxButton) {
      tailoredActions.style.display = 'flex';
      downloadDocxButton.disabled = !docxReady;
      downloadDocxButton.textContent = docxReady ? 'Download DOCX' : 'DOCX unavailable';
      downloadDocxButton.setAttribute('aria-disabled', String(!docxReady));
      if (!docxReady) {
        showStatus('DOCX generator unavailable; reload the page to try again.', 'error');
      }
    }
  }

  async function handleDocxDownload() {
    if (!lastTailoredData || !downloadDocxButton) return;
    if (!docxReady) {
      showStatus('DOCX generation is unavailable. Please reload the page and try again.', 'error');
      return;
    }
    const originalText = downloadDocxButton.textContent;
    downloadDocxButton.disabled = true;
    downloadDocxButton.textContent = 'Preparing DOCX...';
    try {
      const blob = await buildDocxBlob(lastTailoredData);
      const filename = `${buildDocxFilename(lastTailoredData)}.docx`;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }, 2000);
      showStatus('DOCX download ready.', 'info');
    } catch (error) {
      console.error('DOCX generation failed.', error);
      showStatus('Unable to generate the DOCX file. Please try again.', 'error');
    } finally {
      downloadDocxButton.disabled = false;
      downloadDocxButton.textContent = originalText;
    }
  }
  
  function saveDraft() {
    const data = {
      position: document.getElementById('position').value,
      company: document.getElementById('company').value,
      description: document.getElementById('description').value,
      includeConsultant: document.getElementById('include-consultant').checked,
      savedAt: new Date().toISOString()
    };
  
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
  }
  
  (function restoreDraft() {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    try {
      if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('position').value = data.position || '';
        document.getElementById('company').value = data.company || '';
        document.getElementById('description').value = data.description || '';
        document.getElementById('include-consultant').checked = Boolean(data.includeConsultant);
      }
      const encrypted = localStorage.getItem(ENCRYPTED_KEY_STORAGE_KEY);
      if (encrypted) {
        showStatus('Encrypted API key found. Enter your passphrase to unlock.', 'info');
      }
    } catch (err) {
      console.error('Unable to restore draft', err);
    }
  })();

  updateConnectionStatus();
  window.addEventListener('online', updateConnectionStatus);
  window.addEventListener('offline', updateConnectionStatus);

  lockApiButton.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    const passphrase = passphraseInput.value;
    if (!apiKey) {
      showStatus('Enter an API key to encrypt and save.', 'error');
      return;
    }
    if (!passphrase) {
      showStatus('Enter a passphrase to encrypt your key.', 'error');
      return;
    }
    try {
      const encrypted = await encryptApiKey(apiKey, passphrase);
      localStorage.setItem(ENCRYPTED_KEY_STORAGE_KEY, JSON.stringify(encrypted));
      showStatus('API key encrypted and saved locally. Use your passphrase to unlock it next time.', 'info');
    } catch (err) {
      console.error(err);
      showStatus('Could not encrypt and save the API key. Please try again.', 'error');
    }
  });
  
  unlockApiButton.addEventListener('click', async () => {
    const encrypted = localStorage.getItem(ENCRYPTED_KEY_STORAGE_KEY);
    const passphrase = passphraseInput.value;
    if (!encrypted) {
      showStatus('No encrypted API key is stored in this browser.', 'error');
      return;
    }
    if (!passphrase) {
      showStatus('Enter your passphrase to unlock the stored API key.', 'error');
      return;
    }
    try {
      const parsed = JSON.parse(encrypted);
      const decrypted = await decryptApiKey(parsed, passphrase);
      apiKeyInput.value = decrypted;
      showStatus('Stored API key unlocked and ready to use.', 'info');
    } catch (err) {
      console.error(err);
      showStatus('Unable to unlock the stored API key. Check your passphrase.', 'error');
    }
  });
  
  clearApiKeyButton.addEventListener('click', () => {
    apiKeyInput.value = '';
    localStorage.removeItem(ENCRYPTED_KEY_STORAGE_KEY);
    saveDraft();
    tailoredOutput.style.display = 'block';
    tailoredOutput.textContent = 'Stored API key cleared for this browser. Enter your key and passphrase to save again.';
    lastTailoredData = null;
    if (tailoredActions) {
      tailoredActions.style.display = 'none';
    }
    showStatus('Stored API key cleared.', 'info');
  });
})();
