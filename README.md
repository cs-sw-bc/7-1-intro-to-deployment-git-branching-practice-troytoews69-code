# Book Review App

A simple book review app built with React and Express.

# 7.1 – Assignment: Fix & Deploy

## Overview

You have been given a Book Review app that is already running — but users are complaining that it feels slow. Your job is to find the problem, fix it, and deploy the fix using the correct branching workflow.

The repo already has three branches set up for you:

| Branch | Environment |
|---|---|
| `develop` | Development |
| `staging` | Staging |
| `main` | Production |

---

## Part 1 – Clone the Repo

Your instructor will share the GitHub Classroom link. Accept the assignment and clone your repo:

```bash
git clone <your-repo-url>
cd book-review-app
```

Verify all three branches are there:

```bash
git branch -a
```

You should see `develop`, `staging`, and `main`.

---

## Part 2 – Run the App

**Backend:**
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

**Frontend (new terminal):**
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. Click through the app and use it as a real user would.

---

## Part 3 – Find the Bug (5–10 mins)

Something in this app is noticeably slow. Users have reported that a specific action takes 3+ seconds when it should be near-instant.

**Your task:**
1. Identify which action is slow
2. Find the line of code causing it
3. Write down the file name and line number before you fix anything

> Hint: Open your browser's Network tab (DevTools → Network) and watch which API request is taking a long time.

---

## Part 4 – Fix It Using the Correct Workflow

Now that you've found the bug, fix it using the branching strategy from class.

> **Note:** The steps below use the terminal, but you can also do the branching and merging through the GitHub UI. On GitHub, use the branch dropdown to create a new branch, and open a Pull Request to merge one branch into another. Both approaches are valid — use whichever you're more comfortable with.

**Step 1 — Create a fix branch off `develop`**
```bash
git checkout develop
git checkout -b fix/slow-reviews
```

**Step 2 — Fix the bug**

Remove the line causing the delay. Save the file.

**Step 3 — Commit your fix**
```bash
git add .
git commit -m "fix: remove sleep delay from reviews endpoint"
```

**Step 4 — Merge into `develop`**
```bash
git checkout develop
git merge fix/slow-reviews
```

Test the app again on `develop`. The slowness should be gone.

**Step 5 — Merge into `staging`**
```bash
git checkout staging
git merge develop
```

Verify it still works on `staging`.

**Step 6 — Merge into `main`**
```bash
git checkout main
git merge staging
```

**Step 7 — Push all branches**
```bash
git push origin fix/slow-reviews
git push origin develop
git push origin staging
git push origin main
```

---

## Branches

| Branch | Environment |
|---|---|
| `develop` | Development |
| `staging` | Staging |
| `main` | Production |
