import { useState } from "react"

export default function SignUp() {
  const [email, setEmail] = useState("");

  return (
    <div className="form-wrapper">
      <form>
        <h2>Create your account</h2>

        <div>
          <label htmlFor="emailText">Email</label>
          <input type="text" name="emailText"
            value={email}
            placeholder="rohit@test.com"
            onChange={(e) => setEmail(e.target.value)}
            aria-label="email"
            aria-required={true}
            required
            autoFocus />
        </div>
      </form>
    </div>
  )
}