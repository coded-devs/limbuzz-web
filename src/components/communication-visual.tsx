import { Icon } from "./icon";
export function CommunicationVisual() {
  return (
    <figure
      className="communication-visual"
      aria-label="Communication flow illustration, not an app screenshot: hold SOS for 3 seconds to begin SMS attempts, followed by a primary-contact call. Location is shared when available."
    >
      <div className="signal-map" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <div className="map-cross cross-one" />
        <div className="map-cross cross-two" />
        <svg className="route-line" viewBox="0 0 500 470" fill="none">
          <path
            d="M250 235 L250 130 Q250 85 295 85 H370 M250 235 H120 Q80 235 80 280 V340 M250 235 H375 Q420 235 420 280 V340"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="5 6"
          />
        </svg>
        <div className="signal-center">
          <span className="signal-hold">HOLD FOR</span>
          <strong>SOS</strong>
          <span>3 seconds</span>
        </div>
        <div className="signal-node node-message">
          <Icon name="message" />
          <span>Alert your contacts</span>
        </div>
        <div className="signal-node node-call">
          <Icon name="phone" />
          <span>Call your primary</span>
        </div>
        <div className="signal-node node-location">
          <Icon name="location" />
          <span>
            Share a location fix<small>when available</small>
          </span>
        </div>
      </div>
      <figcaption>
        <span className="small-line" />
        Communication flow illustration · not an app screen
      </figcaption>
    </figure>
  );
}
