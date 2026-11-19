/** Amplop sage polos, gambar dekoratif untuk komposisi flat-lay. */
export default function Envelope({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={`block h-auto w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="500" fill="#9DAE94" />
      <path d="M0 0H158L338 352L66 500H0Z" fill="#A9B9A0" />
      <path
        d="M158 0L338 352L66 500"
        fill="none"
        stroke="#8C9E84"
        strokeWidth="1.5"
      />
    </svg>
  )
}
