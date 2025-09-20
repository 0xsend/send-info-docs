export default function WelcomeHero({ backgroundImage = '/img/welcome-banner.png', ariaLabel = 'Send docs hero banner' }) {
  return (
    <div
      className="hero-section"
      role="img"
      aria-label={ariaLabel}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    />
  );
}
