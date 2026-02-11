
---

# Caution: treat your co-pilot like prod infra

<v-clicks>
- Scope access intentionally (finances, HA, SSH) and log what the agent can touch
- Keep secrets in vaults / service accounts, not in prompts or raw repo files
- Review PRs/automation outputs—human oversight stays mandatory
- If you wouldn’t give a junior root on day 1, don’t give the agent either
</v-clicks>

<!--
A friendly warning slide so people know this isn’t “set it and forget it”.
-->

---
background: /cover.jpg
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
drawings:
  enabled: false
mdc: true
presenter: dev
download: https://raw.githubusercontent.com/PhyberApex/lightning-talks/main/14-openclaw-copilot/14-openclaw-copilot.pdf
info: |
  ## Building an OpenClaw Co-Pilot
  How a personalized agent now handles my homelab + workflow
title: Building an OpenClaw Co-Pilot
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Building an OpenClaw Co-Pilot
Turning a chatty LLM into a reliable teammate

<!--
Introduce the talk: why I invested in customizing the OpenClaw assistant and what outcomes I got.
-->

---

# Starting point

<v-clicks>
- Goals: keep infra nimble, avoid snowflake images, get human-friendly status updates
- Constraints: Ouroboros auto-updates, Renovate noise, limited container size
- Desired vibe: assistant responds in *my* tone but still ships production-ready work
</v-clicks>

<!--
Highlight the problem statement: automation without losing control, plus a branded communication style.
-->


---

# What even is OpenClaw?

<v-clicks>
- OSS agent gateway: skills + workspace + channel bridges
- Ships as Docker stack (gateway, CLI, workspace volume)
- Skills talk to real tools (git, HA, tmux, browsers)
- Goal: assistants act like teammates, not chatboxes
</v-clicks>

<!--
Give attendees baseline context before diving into the customizations.
-->


---

# OpenClaw architecture (at 10,000 ft)

```
+----------------------+     +---------------------+
|  Channels (TG/WA/etc) |<--->|  Gateway (WS/API)    |
+----------------------+     |  - Auth, skills, fs  |
                              |  - Workspace volume |
                          +-->+---------------------+
                          |
                          |   +---------------------+
                          +-->|  Skills             |
                              |  - Git / HA / tmux  |
                              |  - Claude Code CLI  |
                              +---------------------+
```

<v-clicks>
- Channels hit the Gateway, which mounts my workspace + config
- Skills wrap real tools (git, tmux, Home Assistant, Claude CLI)
- Everything packaged as Docker Compose → easy to control updates
</v-clicks>

<!--
Give a quick block diagram so the audience can picture how requests flow.
-->

---

# Hardening the runtime

<v-clicks>
- On-boot bootstrap script installs `tmux`, `jq`, and auto-downloads the Claude CLI
- Works with vanilla `ghcr.io/openclaw/openclaw` image → Ouroboros & Renovate stay happy
- Optional binary override for air‑gapped deploys (stat + copy only when present)
</v-clicks>

<!--
Explain how the bootstrap approach kept the container immutable while still letting me add tooling.
-->

---

# CI + secret hygiene

<v-clicks>
- Woodpecker syntax-checks now guard every Ansible change (quoting fixes FTW)
- Virtual camera overlay uses a runtime `app-config.json` instead of regexing bundles
- Deploy pipeline writes secrets via SMB, repo only carries examples
</v-clicks>

<!--
Showcase the concrete pipeline upgrades that removed brittle steps.
-->


---

# Deep dive: Claude Code wingman

<v-clicks>
- Problem: need `tmux`, `jq`, Claude CLI inside a stock OpenClaw container
- Solution: on-boot bootstrap script (bash) that installs deps + auto-downloads latest CLI from Anthropic bucket
- Entry point points to `/bootstrap/openclaw-bootstrap.sh` → every service starts with tooling ready
- CLI auth stored via service-account token (no manual login), wingman skill drives tmux sessions
</v-clicks>

```
entrypoint: ["/bin/bash", "/bootstrap/openclaw-bootstrap.sh"]
command: ["node", "dist/index.js", "gateway"]
```

<v-click>
- Keeps Ouroboros/standard image workflow intact (no custom image drift)
</v-click>

<!--
Highlight why we had to bootstrap inside Docker and how the Claude Code wingman works.
-->

---

# Ops concierge

<v-clicks>
- Google Calendar service account → daily 07:00 summaries across 3 calendars
- Contact export from Google kept locally for quick lookup
- Bi-daily repo watch list: infra, virtual overlay, profile site, personal homepage
</v-clicks>

<!--
Stress how the assistant now keeps me informed without me digging around.
-->

---

# Human interface tweaks

<v-clicks>
- Custom responses tuned to my preferred tone (playful but still concise)
- Catchphrase & sign-off policy → consistent personal brand in chats
- Guardrails: professional voice in PRs, stylized voice only in direct comms
</v-clicks>

<!--
Mention personalization without diving into kawaii details.
-->

---

# Takeaways

<v-clicks>
- Treat the agent like any other service: bootstrap, lint, monitor
- Keep secrets & binaries out of git; fetch or inject them at deploy time
- Small workflows (calendar digests, repo patrols) build massive trust quickly
- Custom tone matters more when the assistant already delivers real work
</v-clicks>

<!--
Wrap with lessons learned.
-->


---

# Fun side quests

<v-clicks>
- Built lightning-talk #14 inside itself (Slidev deck generated by the agent)
- Clawhub skill registry: shared gallery of what other folks automate
- Wingman skill spawns multiple Claude Code sessions via tmux for free coding while you sip coffee
</v-clicks>

<!--
Highlight some lighter examples: slide deck creation, Clawhub ecosystem, wingman automation.
-->

---
layout: center
class: text-center
---

# Next steps

- Slide-deck #14 published → ready for the lightning talk circuit
- Continue layering skills (finance views, Home Assistant automations, etc.)
- Dream: one co-pilot, every channel

<!--
Close with a forward-looking statement.
-->
