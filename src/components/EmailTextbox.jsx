export function EmailTextbox(props) {
  const { value, onChange } = { props };

  return (
    <div>
      <label htmlFor="emailText">Email</label>
      <input type="text" name="emailText"
        value={value}
        placeholder="rohit@test.com"
        onChange={(e) => onChange(e.target.value)}
        aria-label="email"
        aria-required={true}
        required
        autoFocus />
    </div>
  )
}