const TYPE_TO_TITLE = {
  default: 'Note',
  info: 'Info',
  tip: 'Tip',
  warning: 'Warning',
  error: 'Error',
  important: 'Important'
};

const SUPPORTED_TYPES = new Set(Object.keys(TYPE_TO_TITLE));

export default function Callout({ type = 'info', title, children }) {
  const normalizedType = SUPPORTED_TYPES.has(type) ? type : 'info';
  const variant = normalizedType === 'default' ? 'info' : normalizedType;
  const heading = title || TYPE_TO_TITLE[normalizedType] || 'Info';

  return (
    <div className={`admonition admonition-${variant}`}>
      <div className="admonition-header">
        <span className="admonition-icon" aria-hidden="true" />
        <span className="admonition-title">{heading}</span>
      </div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
