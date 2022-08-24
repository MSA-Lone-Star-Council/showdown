
# Showdown

The web application for MSA Showdown, hosted by MSA Lone Star Council.

## Installation
To install and run, ensure you have the Node.js to use the NPM package manager, and PostgreSQL installed.
<details>
<summary>Node.js</summary>
For Mac users:
https://www.youtube.com/watch?v=DeCTDksI4EE

For Windows users:
https://www.youtube.com/watch?v=Wm7WoLFNXMk

</details>

<details>
<summary>PostgreSQL</summary>
For Mac users:
https://www.youtube.com/watch?v=eozE4lM0MRE

For Windows users:
https://www.youtube.com/watch?v=Xsl9qQ02Cwc

</details>

### *Step 1: Clone Showdown repository*

```bash
  $ git clone https://github.com/MSA-Lone-Star-Council/showdown.git
```

### *Step 2: Install backend dependencies*
- Ensure you're in the Showdown directory
```bash
  $ npm install
```

### *Step 3: Install frontend/client dependencies*
- Ensure you're in the client directory
```bash
  $ cd client
  $ npm install
```

### *Step 4: Run Showdown.sql seed file*
```bash
  $ psql

  user=# \i showdown.sql
```
## Deployment

### *Step 5: Run backend app*
- In your backend directory run
```bash
  $ npm start
```

### *Step 6: Run client app*
- Split your terminal screen in VS Code and run the client app: 
```bash
  $ cd client
  $ npm start
```
## Authors

- Januar Soepangat [@JanuarS](https://www.github.com/JanuarS)

