(() => {
    const consultantExperience = `Information Security Analyst (Independent Consultant)
June 2023 – September 2025
Summary:
Provided security consulting and technical support for small e-commerce–style environments, focusing on ISO 27001–aligned information security management, vulnerability assessment, and implementation of practical security controls to protect customer data, web applications, and operational assets.
Key Responsibilities & Achievements:
• Conducted ISO 27001–aligned information security risk assessments, identifying threats, vulnerabilities, and business impacts for systems handling customer and operational data.
• Designed and implemented core Annex A controls including access control policies, authentication requirements, secure configuration baselines, backup/encryption strategy, and logging/monitoring procedures.
• Built a cloud-hosted, e-commerce–style security lab environment to simulate customer data flows, admin interfaces, payment processing components, and backend infrastructure.
• Performed vulnerability scanning using Nessus Essentials, analyzed findings, and documented remediation plans using POA&M-style tracking (identified weakness, recommended action, severity, required resources).
• Set up continuous monitoring pipelines using Splunk-style SIEM workflows (log ingestion, dashboards, alerts for authentication anomalies, system errors, and suspicious activity).
• Developed and maintained security policies, including access control, asset management, acceptable use, incident response, cryptographic controls, vendor risk, and change management.
• Created and tested Incident Response Playbooks covering detection, containment, eradication, recovery, and post-incident lessons learned aligned with ISO 27035 and NIST SP 800-61.
• Led internal security awareness sessions (phishing, password hygiene, MFA adoption, secure browsing), and trained non-technical users on security best practices.
• Documented system architecture diagrams, data-flow models, and asset inventories to support ISO 27001 clause requirements for scope definition and ISMS governance.`;

    const resumeLibrary = [
      {
        title: 'Security Engineer (IT Operations Security Analyst)',
        summary:
          'Security operations professional who turns signal into action across SIEM/XDR alert handling, incident response, vulnerability remediation coordination, and audit-ready evidence aligned to ISO 27001 / SOC 2 / NIST CSF.',
        coreSkills: [
          'SIEM/XDR triage (Microsoft Sentinel, Defender exposure)',
          'Incident response & RCA (playbooks, timelines, evidence)',
          'SOAR workflow concepts',
          'Vulnerability management (Nessus lab; CVSS)',
          'Threat intel awareness & anomaly detection',
          'IAM policy hygiene (Entra ID SSO/MFA; least privilege)',
          'Network segmentation & encryption standards (awareness)',
          'Cloud security baselines (Azure/AWS fundamentals)',
          'DevSecOps mindset (controls into CI/CD—concepts)',
          'Compliance evidence for ISO 27001 / SOC 2 / NIST CSF',
          'Security documentation & audit readiness',
          'PowerShell/Python for report parsing & ticket prefill'
        ],
        professionalExperience: [
          'Citadel Drilling — Field Operations Lead (Motorhand): monitored dashboards, triaged anomalies, escalated per runbook, coordinated incident response, enforced change control, and maintained evidence-quality logs.',
          'DuPure — Water Treatment Installer/Service: owned tickets end-to-end with evidence, baseline hygiene, PII handling, customer communications, SLA coordination, and inventory readiness.',
          'Houston Water Solutions — Head Installer/Technician & Project Lead: ran daily operations with QA/QC artifacts, built checklists, structured on-call handling, protected sensitive files, tracked KPIs, and coordinated suppliers/resources.'
        ],
        projects: [
          'Vulnerability & Threat Management (lab): Nessus scans, CVSS prioritization, remediation steps, validations, and exception/risk-acceptance notes.',
          'SIEM/XDR & SOAR (exposure): Sentinel/Defender workflows, alert validation, enrichment, severity mapping, escalation, evidence capture, and playbook updates.',
          'Cloud Baselines (study-level): Azure/AWS hardening categories mapped to dashboards/ticket fields.',
          'IAM & Zero Trust (study-level): Entra ID SSO/MFA concepts, access reviews, least privilege, and audit-ready documentation.',
          'Automation (intro): PowerShell/Python to parse scanner exports and prefill reports/tickets.'
        ],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Microsoft 365, Microsoft Sentinel/Defender exposure, Nessus lab, PowerShell/Python basics, Azure/AWS fundamentals, Jira/ticketing concepts'
      },
      {
        title: 'Maintenance Technician',
        summary:
          'Hands-on maintenance professional with industrial field experience across mechanical, electrical, pneumatic, and hydraulic systems, strong at emergency repairs, preventive maintenance, troubleshooting, and safe documentation.',
        coreSkills: [
          'Preventive maintenance (PM)',
          'Emergency repairs during production',
          'Mechanical/electrical/pneumatic/hydraulic troubleshooting',
          'Read/interpret manuals, drawings, work orders',
          'Parts replacement, testing & adjustments',
          'Pumps/motors/gearboxes & drive components',
          'Basic alignment & vibration/noise recognition',
          'Plumbing (PVC glue, copper sweat, leak/pressure checks)',
          'Conduit & basic motor circuit hookups (safe meter use)',
          'Material handling & rigging basics',
          'Housekeeping & safety/PPE compliance',
          'Work logs & shift handoffs'
        ],
        professionalExperience: [
          'Citadel Drilling — Maintenance Lead (Motorhand): unscheduled repairs, scheduled PMs, diagnostics, manual-driven adjustments, motor/pump service, clean bays, and shift handoffs.',
          'DuPure — Water Treatment Installer/Service Technician: installs/repairs pumping assemblies, plumbing maintenance, low-voltage checks, routing per layouts, preventive service cycles, and safe work practices.',
          'Houston Water Solutions — Head Installer / Project Lead: led installs/maintenance, QA/QC artifacts, checklists that reduced rework, on-call structure, protected sensitive files, tracked KPIs, and coordinated suppliers.'
        ],
        projects: [],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Hand/power tools, digital multimeter, pipe tools, conduit basics, lifts/hoists/material handling, Microsoft Word/Excel/Teams'
      },
      {
        title: 'GRC Analyst',
        summary:
          'Governance, Risk & Compliance practitioner focused on RMF implementation, NIST 800-53 control management, and audit-ready documentation with SSPs, POA&Ms, SCTMs, and continuous monitoring.',
        coreSkills: [
          'RMF lifecycle (Categorization to Continuous Monitoring)',
          'NIST 800-53 control implementation/assessment',
          'SSP / POA&M / SCTM / BoE authoring',
          'Evidence collection & indexing',
          'Common-controls & inheritance mapping',
          'Finding tracking & remediation coordination',
          'Risk register & exception/risk acceptance notes',
          'CMMC readiness support',
          'Compliance audit support',
          'Change control & configuration baselines',
          'Stakeholder communications with SMEs/leadership',
          'eMASS/Xacta familiarity (package structure)'
        ],
        professionalExperience: [
          'Citadel Drilling — Field Operations Lead: procedural controls, change control, incident coordination, continuous monitoring, briefings, and milestone schedules for auditability.',
          'DuPure — Water Treatment Installer/Service: diagnostics with BoE-quality closure, PII handling, exception logging, SLA alignment, inventory management, and user education.',
          'Houston Water Solutions — Head Installer/Technician & Project Lead: lifecycle ownership with versioned artifacts, checklists, access hygiene, on-call documentation, and KPI tracking.'
        ],
        projects: [
          'RMF Mock A&A Package: categorization, control selection, SSP drafting, SCTM in Excel, POA&M entries, continuous monitoring cadence, BoE index.',
          'Finding Management Workflow: converted Nessus findings into POA&M items with milestones and exceptions.',
          'eMASS/Xacta Familiarization (study-level): package structures and artifact expectations.',
          'CMMC Alignment (study-level): mapped practices to domains and readiness checklist.'
        ],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Microsoft Excel/Word/Outlook/SharePoint/Teams, Nessus lab, eMASS/Xacta familiarity'
      },
      {
        title: 'Cyber Security Analyst',
        summary:
          'Security operations analyst enforcing risk management policies, coordinating vulnerability remediation, and producing audit-ready documentation with SIEM exposure and strong ticket discipline.',
        coreSkills: [
          'SIEM alert triage (Splunk/Sentinel exposure)',
          'IDS/IPS/HIDS awareness',
          'DLP & content filtering policy awareness',
          'Endpoint protection hygiene (Defender exposure)',
          'Vulnerability scanning & remediation coordination (Nessus/CVSS)',
          'IAM (Entra ID SSO/MFA concepts)',
          'Log review & anomaly detection',
          'Incident response participation & escalation',
          'Evidence packs & audit documentation (SOC 2/ISO/NIST awareness)',
          'Windows/Linux (virtualized)',
          'Python/PowerShell (report automation basics)'
        ],
        professionalExperience: [
          'Citadel Drilling — Field Operations Lead: telemetry monitoring, incident participation, change control, evidence-quality logs, reporting, and policy reinforcement.',
          'DuPure — Water Treatment Installer/Service: end-to-end tickets with evidence, baseline hygiene, PII handling, communications, SLA coordination, and documentation.',
          'Houston Water Solutions — Head Installer/Technician & Project Lead: regional operations with QA/QC artifacts, checklists, on-call structure, access hygiene, KPI tracking, and supplier coordination.'
        ],
        projects: [
          'Vulnerability Management (lab): Nessus scans, CVSS prioritization, remediation steps, after-state validation, and exception notes.',
          'SIEM/IR Workflows (study-level): Splunk/Sentinel workflows, alert validation, enrichment, containment steps, evidence capture, and reporting templates.',
          'IAM & Endpoint (study-level): Entra ID concepts, access reviews, Defender hygiene, containment basics.',
          'Automation (intro): Python/PowerShell scripts to parse Nessus exports and prefill tickets.'
        ],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Microsoft 365, Nessus lab, Python/PowerShell basics, Splunk/Microsoft Sentinel exposure, Defender exposure'
      },
      {
        title: 'Security Analyst II (Cyber Security Analyst)',
        summary:
          'Security analyst focused on vulnerability triage/remediation coordination, secure configuration baselines, and audit-ready evidence for SOC 2 / ISO 27001 / NIST with CVSS experience.',
        coreSkills: [
          'Vulnerability management (triage → remediation validation)',
          'CVSS scoring',
          'Baseline hardening & configuration hygiene (Windows/macOS; cloud fundamentals)',
          'IAM reviews & least-privilege mindset',
          'SIEM alert triage (Splunk/Sentinel exposure)',
          'Endpoint protection hygiene (Defender exposure)',
          'Incident triage, RCA & documentation',
          'Evidence gathering for SOC 2 / ISO 27001 / NIST 800-53 (awareness)',
          'Ticketing/Jira workflows',
          'Python / PowerShell (report parsing, checklists)',
          'Cloud fundamentals (AWS/Azure/Oracle Cloud awareness)',
          'Cross-functional collaboration (IT, DevOps, Compliance)'
        ],
        professionalExperience: [
          'Citadel Drilling — Motorhand: telemetry monitoring, incident response, change control, evidence-quality logs, trend tracking, and coaching.',
          'DuPure — Water Treatment Installer/Service: end-to-end tickets with measurements and photos, baseline hygiene, PII handling, SLA coordination, and communication.',
          'Houston Water Solutions — Head Installer/Technician & Project Lead: regional operations with QA/QC artifacts, checklists, on-call structure, access hygiene, KPI tracking, and supplier coordination.'
        ],
        projects: [
          'Vulnerability Management (lab): Nessus scans, CVSS prioritization, remediation, validation, and exception notes.',
          'Cloud Baselines & Monitoring (study-level): AWS/Azure/Oracle Cloud baselines and misconfigurations mapped to dashboards/tickets.',
          'IAM Reviews (study-level): least-privilege reviews and access attestations.',
          'Automation (intro): Python/PowerShell to parse Nessus exports into CSV and prefill remediation tickets.',
          'SIEM & Dashboards (exposure): Splunk/Microsoft Sentinel workflows with evidence fields.'
        ],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Microsoft 365, Nessus lab, Python/PowerShell, AWS/Azure/Oracle Cloud awareness, Splunk/Microsoft Sentinel exposure, Defender exposure'
      },
      {
        title: 'Product Support Representative',
        summary:
          'Customer-facing technical troubleshooter with mechanical/electrical aptitude, strong documentation habits, and consistent SLA adherence across phone/email/IM support.',
        coreSkills: [
          'Phone/email/IM support',
          'Incident triage & escalation',
          'Root-cause analysis (mechanical/electrical)',
          'Multimeter voltage/current checks',
          'Step-by-step customer coaching',
          'Knowledge Base article writing',
          'CRM & ticketing (service requests, updates, closure)',
          'SLA adherence & time management',
          'Pattern/recurrence analysis',
          'Cross-functional collaboration',
          'Documentation quality (photos/measurements)',
          'Microsoft 365 productivity tools'
        ],
        professionalExperience: [
          'Citadel Drilling — Field Operations: first-line technical triage, runbook execution, escalation, meter logging, RCA for repeat faults, SOP updates, SharePoint structure, and clear communications.',
          'DuPure — Water Treatment Installer/Service (Customer Support & Field Repair): troubleshooting mechanical/electronic components, coaching safe checks, RCA documentation, KB entries, SLA-focused ticket handling, PII accuracy, and de-escalation.',
          'Houston Water Solutions — Head Installer/Technician & Project Lead (Product/Customer Support): daily queue management, troubleshooting checklists/FAQs, validated repairs with evidence, service tickets, recurrence surfacing, training, and compliance-ready workspaces.'
        ],
        projects: [],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Microsoft Outlook, Word, Excel, Teams, SharePoint; CRM/ticketing systems; digital multimeter; mobile photo/notes for evidence'
      },
      {
        title: 'IT Support Technician',
        summary:
          'First-level support specialist with disciplined documentation, experienced in end-to-end user issue resolution, SOP creation, SLA follow-through, and Microsoft 365 collaboration.',
        coreSkills: [
          'First-level support',
          'Incident triage & escalation',
          'Problem management software (mobile intake → CRM)',
          'Ticket notes & status updates',
          'SLA awareness & time-boxed follow-through',
          'SOP/KB authoring',
          'User communication & expectation setting',
          'Hardware readiness & workspace compliance',
          'Basic software install/configuration',
          'Documentation quality & auditability',
          'Cross-team collaboration',
          'Task scheduling & daily work logs'
        ],
        professionalExperience: [
          'Citadel Drilling — Field Operations Lead: first-line triage, runbook steps, escalation, incident tracking, policy-compliant work areas, SOP/guide updates, communication via Teams/SharePoint, and schedule management.',
          'DuPure — Water Treatment Installer/Service (Project Delivery): service requests via mobile app → CRM with evidence, accurate records/PII, repeatable checklists, inventory organization, SLA/status updates, and hazard escalation.',
          'Houston Water Solutions — Head Installer/Technician & Project Lead: managed daily queue, documentation templates, Microsoft 365 coaching, materials readiness, policy-compliant workspaces, invoicing support, and accurate job records.'
        ],
        projects: [],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Microsoft Outlook, Word, Excel, Teams, SharePoint; mobile intake/CRM app; photo/notes for evidence'
      },
      {
        title: 'Project Manager',
        summary:
          'Operations-focused project leader with field installation/service background who delivers spec/schedule/budget adherence with clean documentation, safety/PPE enforcement, and stakeholder alignment.',
        coreSkills: [
          'Client & stakeholder management',
          'Scope/estimate & proposals',
          'Schedule & resource planning',
          'Field execution & QA/QC',
          'Safety/PPE compliance & toolbox talks',
          'Risk/issue tracking & CAPA',
          'Budget tracking, forecasting & invoicing support',
          'Multi-agency deliverables',
          'Crew leadership & coaching',
          'Vendor/subcontractor coordination',
          'Status reporting & closeout packages',
          'Document control via SharePoint/OneDrive'
        ],
        professionalExperience: [
          'Citadel Drilling — Field Operations Lead: daily plans, safety briefings, spec reviews, troubleshooting, change control, document control, and KPI tracking.',
          'DuPure — Water Treatment Installer/Service: end-to-end jobs with QA/QC, service reports, chain-of-custody coordination, SOP compliance, schedule risk mitigation, and status communications.',
          'Houston Water Solutions — Head Installer/Technician & Project Lead: regional operations lifecycle, checklists, vendor coordination, budget visibility, training/coaching, KPI tracking, and CAPA actions.'
        ],
        projects: [],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Microsoft Word, Excel, Teams, SharePoint/OneDrive document control, mobile photo/notes'
      },
      {
        title: 'Cybersecurity Engineer',
        summary:
          'Security-minded operator pivoting into cybersecurity engineering with RMF literacy, SSP/POA&M drafting, continuous monitoring planning, and change-control discipline aligned to mission assurance.',
        coreSkills: [
          'Security Control Implementation (NIST 800-53)',
          'RMF A&A lifecycle',
          'System categorization (FIPS 199 / NIST 800-60)',
          'SSP / POA&M drafting (lab)',
          'Continuous Monitoring & metrics',
          'Common controls strategy',
          'FISMA risk assessment (awareness)',
          'Systems security engineering awareness (NIST 800-160)',
          'Security planning (NIST 800-18 awareness)',
          'Authorization package artifacts awareness',
          'Cyber schedule & milestones management',
          'Vulnerability management (Nessus lab; CVSS)'
        ],
        professionalExperience: [
          'Citadel Drilling — Motorhand: procedural controls, change control, incident response coordination, continuous monitoring, onboarding/briefings, and milestone scheduling.',
          'DuPure — Water Treatment Installer/Service: structured diagnostics, evidence-focused closures, PII handling, exception logging, SLA compliance, inventory management, and user education.',
          'Houston Water Solutions — Head Installer/Technician & Project Lead: lifecycle ownership with versioned artifacts, schedule/milestone planning, standardized checklists, access hygiene, on-call documentation, and KPI-driven improvements.'
        ],
        projects: [
          'RMF Mock A&A Package (lab): categorization, control selection, SSP drafting, POA&M entries, continuous monitoring cadence, BoE plan.',
          'Vulnerability Management (lab): Nessus scans, CVSS prioritization, remediation steps, validation, and exception notes.',
          'Security Planning & Engineering (study): aligned control implementation with design decisions using NIST 800-18 and 800-160.',
          'Tool Familiarity (study-level): eMASS/Xacta package structure, FISMA control testing themes, NOTAM/TCO awareness.'
        ],
        certifications: 'CompTIA Security+ (current)',
        tools: 'Microsoft 365, Azure documentation/collaboration, Nessus lab, GitHub (lab documentation)'
      }
    ];
  window.resumeData = { consultantExperience, resumeLibrary };
})();
