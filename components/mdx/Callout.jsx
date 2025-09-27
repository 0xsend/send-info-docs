const TYPE_TO_EMOJI = {
  default: '💡',
  info: 'ℹ️',
  tip: '✅',
  warning: '⚠️',
  error: '❗',
  important: '📌'
};

const TYPE_TO_TITLE = {
  default: 'Note',
  info: 'Info',
  tip: 'Tip',
  warning: 'Warning',
  error: 'Error',
  important: 'Important'
};

const SUPPORTED_TYPES = new Set(Object.keys(TYPE_TO_EMOJI));

export default function Callout({ type = 'info', emoji, title, children }) {
  const normalizedType = SUPPORTED_TYPES.has(type) ? type : 'info';
  const variant = normalizedType === 'default' ? 'info' : normalizedType;
  const icon = emoji || TYPE_TO_EMOJI[normalizedType] || 'ℹ️';
  const heading = title || TYPE_TO_TITLE[normalizedType] || 'Info';

  return (
    <div className={`admonition admonition-${variant}`}>
      <div className="admonition-header">
        <span className="admonition-icon" aria-hidden="true">{icon}</span>
        <span className="admonition-title">{heading}</span>
      </div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
