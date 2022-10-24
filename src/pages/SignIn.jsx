// Forms style
// https://codepen.io/web-dot-dev/pen/ExXNXrO

import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);

  return (
    <div className="form-wrapper">
      <form>

        <h2>Sign in to your account</h2>

        <div>
          <label htmlFor="emailText">Email</label>
          <input type="text" name="emailText"
            value={email}
            placeholder="rohit@test.com"
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>

        <div>
          <label htmlFor="passwordText">Password</label>
          <input
            type="password" name="passwordText"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="******"
            required
          />
        </div>

        <div>
          <label htmlFor="staySignedInCheckbox">
            <input type="checkbox"
              name="staySignedInCheckbox"
              checked={staySignedIn}
              onChange={(e) => setStaySignedIn(e.target.checked)} />
            Stay signed in for 30 days
          </label>
        </div>

        <input type="submit" value="Continue"></input>
      </form>
      <h3>Have an account? Sign in</h3>

    </div>

  )
}