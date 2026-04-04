export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
```

---

**Step 4 — Update the fetch URL in App.jsx**

In `App.jsx`, use **Cmd+F** to search for:
```
api.anthropic.com/v1/messages
```
Replace that entire URL string with:
```
/api/chat