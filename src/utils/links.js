const REAL_LINK = /^(https?:\/\/|mailto:|tel:|#.+)/i

/** True hanya untuk link yang benar-benar bisa dikunjungi (bukan placeholder). */
export const isRealLink = (href) =>
  typeof href === 'string' && REAL_LINK.test(href.trim())

/** True untuk teks placeholder berformat "[...]". */
export const isPlaceholderText = (text) =>
  typeof text === 'string' && /^\[.*\]$/.test(text.trim())
