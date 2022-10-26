// Forms style
// https://codepen.io/web-dot-dev/pen/ExXNXrO

import { useState } from "react"
import { EmailTextbox } from "../components/EmailTextbox";
import { PasswordTextbox } from "../components/PasswordTextbox";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);

  return (
    <div className="form-wrapper">
      <form>

        <h2>Sign in to your account</h2>

        <EmailTextbox value={email} onChange={setEmail} />

        <PasswordTextbox value={password} onChange={setPassword} />

        <div>
          <label htmlFor="staySignedInCheckbox"
            onClick={(e) => setStaySignedIn(prev => !prev)}>
            <input type="checkbox"
              name="staySignedInCheckbox"
              checked={staySignedIn}
              aria-label="Stay signed in for 30 days"
              onChange={(e) => setStaySignedIn(e.target.checked)} />
            Stay signed in for 30 days
          </label>

        </div>

        <input type="submit" value="Continue"></input>
      </form>
      <h3>Don't have an account? Sign up</h3>

    </div>

  )
}

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true;
    setTimeout(callback, 100);
  }
}