export function validateForm(req, res, next) {
  const { name, password } = req.body;

  // ❌ Case: Empty fields
 if (!name || !password) {
  return res.status(400).send(getErrorHTML("Both name and password are required!"));
}

if (name !== "sushil" || password !== "1234") {
  return res.status(401).send(getErrorHTML("Either your name or password is incorrect. Please double-check and try again."));
}


  // ✅ All good
  next();
}

function getErrorHTML(message) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Error - Login Failed</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: #0f172a;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .face {
      width: 150px;
      height: 150px;
      background: #fff;
      border-radius: 50%;
      position: relative;
      animation: shake 0.3s infinite alternate;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    }

    .eye {
      width: 20px;
      height: 20px;
      background: #0f172a;
      border-radius: 50%;
      position: absolute;
      top: 50px;
      animation: blink 2.5s infinite;
    }

    .eye.left {
      left: 35px;
    }

    .eye.right {
      right: 35px;
    }

    @keyframes blink {
      0%, 30%, 55%, 90%, 100% { transform: translateY(0); }
      10%, 25% { transform: translateY(10px); }
      65% { transform: translateX(-10px); }
      80% { transform: translateX(10px); }
    }

    @keyframes shake {
      0% { transform: translateX(1px); }
      100% { transform: translateX(-1px); }
    }

    .error-box {
      max-width: 420px;
      margin-top: 2rem;
      padding: 1.25rem 1.5rem;
      background-color: #fff0f0;
      border: 1px solid #fca5a5;
      border-left: 6px solid #ef4444;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: flex-start;
      gap: 12px;
      color: #1f2937;
    }

    .error-box strong {
      font-size: 1.05rem;
      color: #b91c1c;
      margin-bottom: 4px;
      display: block;
    }

    .error-box small {
      font-size: 0.95rem;
      color: #7f1d1d;
    }
  </style>
</head>
<body>
  <div class="face">
    <div class="eye left"></div>
    <div class="eye right"></div>
  </div>

  <div class="error-box">
    <div style="font-size: 1.5rem; color: #ef4444;">⚠️</div>
    <div>
      <strong>Authentication Error</strong>
      <small>${message}</small>
    </div>
  </div>
</body>
</html>
`;
}

