export function PasswordTextbox(props) {
  const { value, onChange } = { props }
  return (
    <div>
      <label htmlFor="passwordText">Password</label>
      <input
        type="password" name="passwordText"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        aria-label="password"
        aria-required={true}
        placeholder="******"
        required
      />
    </div>
  )
}