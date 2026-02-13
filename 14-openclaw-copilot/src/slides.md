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
  ## Claw & Order — Lobsters never sleep
  OpenClaw 101
title: Claw & Order — Lobsters never sleep — OpenClaw 101
fonts:
  mono: Operator Mono
  local: Operator Mono
  sans: DM Sans
  strong: Rubik Iso
  fast: Ubuntu
  hand: Caveat
---

# Claw & Order
Lobsters never sleep — OpenClaw 101

<!--
Quick intro for peers: what OpenClaw is, why it's got so much hype, and what I actually use it for day to day—including the fun bit where it helped fix its own container and now sends me PRs and calendar summaries. No prior OpenClaw knowledge assumed.
-->

---

# What is OpenClaw?

<v-clicks>

- **Personal AI assistant you run on your own devices** — open source, 180k+ GitHub stars, MIT
- Talks to you on **channels you already use:** WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Teams, WebChat, and more
- **Gateway** = control plane (sessions, tools, cron, config); **workspace** on disk for skills and files
- **Skills** give it real tools: git, browser, Home Assistant, cron — and **ClawHub** to discover more
- **Models:** you bring your own (Anthropic, OpenAI); docs recommend Claude for long-context and safety

</v-clicks>

<!--
OpenClaw is "your own AI assistant"—not a SaaS. Your data, your infra. You chat with it on Telegram or WebChat or whatever you connect. The Gateway is the brain; skills let it run bash, hit APIs, control your smart home, open PRs. You plug in your own model subscription.
-->

---

# Why the hype?

<v-clicks>

- **Viral growth:** 100k+ stars in a week, ~180k now; some call it an "AGI moment" — first autonomous agent to hit mainstream
- **Origin:** Peter Steinberger (PSPDFKit exit) built it because he wanted an assistant that *does* things, not just chats — Clawdbot → Moltbot → OpenClaw
- **Reality check:** it can run commands and touch your systems, so treat it like prod — scope access, no secrets in chat or repo

</v-clicks>

<!--
It blew up in early 2026: fastest-growing OSS project in a while. Steinberger built it after selling his company because he was tired of chatbots that only talk. The flip side: agents with access can do real damage, so we'll come back to safety.
-->

---

# Architecture (10,000 ft)

```
WhatsApp / Telegram / Slack / … / WebChat
│
▼
┌───────────────────────────────┐
│            Gateway            │
│    (control plane · WS API)   │
└──────────────┬────────────────┘
               │
     ├─ CLI (openclaw …)
     ├─ WebChat / Control UI
     └─ device nodes (optional)
```

<v-clicks>

- **Channels** → **Gateway**; Gateway serves WebChat, CLI, and optional device nodes (voice, canvas)
- **Skills** in the workspace: bash, browser, cron, GitHub, Home Assistant, etc.; install via wizard or ClawHub
- Run as **daemon**, **Docker**, or **VPS** — Node ≥22

</v-clicks>

<!--
All your channels feed one Gateway. You talk to it from the app or WebChat. Skills run in its workspace and can call out to the real world. I run mine in Docker next to the rest of my homelab.
-->

---

# What I use it for (overview)

<v-clicks>

- **Fix its own environment** — when the CLI container had issues, the assistant helped debug and patch the bootstrap (and opened PRs for the fixes)
- **Daily schedule** — Google Calendar hooked up; OpenClaw helped me set it up and now I get a 07:00 summary every morning
- **GitHub** — it has access to my repos; I get **enhancements and feature proposals via PRs once a week**
- **Home Assistant** — ask it about the house (lights, sensors, etc.) in natural language
- **Personality** — I personalized it (in my case, full anime/kawaii vibe in chat) while **PRs and code stay professional**

</v-clicks>

<!--
Five things: it fixes itself when the container or tooling breaks; it runs my calendar summary; it opens PRs on a schedule for improvements and ideas; I ask it about Home Assistant; and I gave it a character in chat while keeping output in PRs clean. Next slides unpack a couple of these.
-->

---

# It helped fix itself

<v-clicks>

- **Problem:** OpenClaw runs in Docker; the CLI container next to it needed extra tooling (e.g. for calendar scripts, Ansible). Things failed after restarts because the image didn't have the right libs.
- **What I did:** Asked the assistant. It **diagnosed** the issue, **updated the bootstrap script** so the container installs what it needs on every start, and **opened a PR** with the change.
- **Ongoing:** When something breaks (e.g. Woodpecker CI, missing Python deps), I tell it; it fixes, pushes, and reports back. No custom image—just an entrypoint that runs a script before the gateway starts.

</v-clicks>

<!--
Real example: the calendar summary failed because the Google client lib wasn't in the container. Instead of me editing Dockerfiles, I told the assistant. It added the install to the bootstrap, opened a PR, and the next morning the summary ran again. Same pattern for Ansible and CI errors—it patches, opens PRs, and keeps me in the loop.
-->

---
layout: two-cols
---

# Bootstrap in one slide

<v-clicks>

- **Entrypoint** runs a script on container start: install deps (e.g. `pip`, Google API libs, Ansible), then start the gateway
- **No custom image** — same upstream image; Ouroboros/Renovate keep working
- When the assistant needs something new in the container, it **adds it to the bootstrap and opens a PR**

</v-clicks>

::right::

<<< ./snippets/01-bootstrap-entrypoint.yml yaml {monaco}

<!--
The config idea: we override entrypoint to run our script, then exec into the real gateway. The script is in the repo; the assistant edits it when we need new tooling. One image, no drift.
-->

---

# Calendar + GitHub + Home Assistant

<v-clicks>

- **Calendar:** OpenClaw helped me wire a Google Calendar service account and a daily cron; I get a 07:00 rundown of my schedule. When it failed (missing libs), the assistant added the deps to bootstrap and fixed it.
- **GitHub:** I gave it access to my repos. Every **48 hours** it opens PRs with enhancement ideas and feature proposals. I review, merge, or close—it's like having a teammate that constantly suggests improvements.
- **Home Assistant:** I hooked it up so I can ask "what's the temperature in the living room?" or "turn off the kitchen light" in chat. The assistant uses the HA skill and answers in natural language.

</v-clicks>

<!--
Calendar: set-and-forget morning summary; when it broke, the assistant fixed the container. GitHub: scheduled PRs so I get a steady stream of ideas without having to remember to ask. Home Assistant: just ask in plain language. All of this is skills + cron + a bit of config the assistant helped with.
-->

---

# Personality vs. professionalism

<v-clicks>

- **In chat:** I wanted it to feel like a person—so I tuned the system prompt. In my case that's full kawaii / anime vibe: uwu, emoji, "sensei," etc. Makes the daily interaction fun.
- **In PRs and code:** Descriptions and comments stay **professional**. No uwu in commit messages or on GitHub. The assistant knows: character in direct chat, neutral tone in shared artifacts.
- **When things break:** It still reports errors in character (so I get "sorry sensei, the calendar script failed because…" instead of silence). I asked for that explicitly: no silent failures.

</v-clicks>

<!--
I like the contrast: my direct chats are silly and on-brand; anything that lands in a repo or a PR stays clean. And when something goes wrong, I want to hear about it in the same tone—no mysterious silence. The assistant remembers that and reports back accordingly.
-->

---

# Caution: treat it like prod

<v-clicks>

- **Scope access** — limit what the agent can touch (repos, calendars, HA); log what it does where it matters
- **Secrets** — never in prompts or in the repo. Use service accounts, vaults, inject at deploy. The assistant doesn't need your raw API keys in chat.
- **Human in the loop** — review every PR, check automation output. If you wouldn't give a junior root on day one, don't give the agent that either.
- **Lint and monitor** — CI on config and playbooks; notice when cron jobs or summaries fail (and have the assistant report, not hide it)

</v-clicks>

<!--
OpenClaw can run bash and call APIs. So: scope it, keep secrets out of the conversation and the repo, and always review what it ships. I use a vault and inject credentials at deploy; the assistant only sees that things are configured, not the secrets themselves. And I made "no silent failures" part of the personality—so when the calendar or CI breaks, I get a message, not silence.
-->

---

# Takeaways

<v-clicks>

- **OpenClaw** = personal AI assistant you run; channels + Gateway + skills; you bring your own model
- **You can achieve:** self-healing infra (it fixes its own container), daily briefings (calendar, etc.), scheduled PRs (enhancements, ideas), smart-home Q&A, and a personalized vibe in chat while keeping PRs professional
- **Treat it like prod:** scope access, secrets out of repo and chat, human oversight, and make sure it reports when something breaks

</v-clicks>

<!--
Wrap: OpenClaw is the platform; the rest is how you wire it. I use it to keep my homelab and calendar and GitHub moving, with a character in chat and clean output in code. Scope it, secure it, and have it tell you when things go wrong.
-->

---
layout: center
class: text-center
---

# Questions?

Have you tried an AI agent on your own infra—or thinking about it?

<!--
That's OpenClaw in practice. Happy to take questions: setup, skills, or how to scope access and avoid leaking secrets.
-->

---
layout: center
class: text-center
---

# Thank you!

Run your own assistant. Keep it scoped. Let it ship.

<!--
Thanks! Run it yourself, lock down access, and let it do the work. See you in the next lightning talk.
-->
