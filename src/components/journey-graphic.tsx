import { Icon } from "./icon";

// Original explanatory graphics. These are not captures of the Android interface.
export function JourneyGraphic({ stage }: { stage: number }) {
  return (
    <div className={`journey-art journey-art-${stage}`} aria-hidden="true">
      {stage === 0 ? (
        <>
          <svg viewBox="0 0 360 220" fill="none" className="contact-orbit">
            <circle
              cx="180"
              cy="110"
              r="78"
              stroke="#c4d8e8"
              strokeDasharray="3 7"
            />
            <path
              d="M180 110 L77 67 M180 110 L286 67 M180 110 V182"
              stroke="#2196f3"
              strokeWidth="1.5"
            />
            {[
              { x: 77, y: 67 },
              { x: 286, y: 67 },
              { x: 180, y: 182 },
            ].map(({ x, y }) => (
              <g key={x + y} transform={`translate(${x} ${y})`}>
                <circle r="26" fill="#F8FAFC" stroke="#99bed9" />
                <circle cy="-6" r="7" stroke="#0B2747" strokeWidth="1.5" />
                <path
                  d="M-12 14 C-12 0 12 0 12 14"
                  stroke="#0B2747"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
            ))}
            <circle cx="180" cy="110" r="34" fill="#061A33" />
            <circle
              cx="180"
              cy="101"
              r="9"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
            <path
              d="M164 127 C164 108 196 108 196 127"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="305" cy="49" r="8" fill="#2196F3" />
            <path d="m301 49 3 3 5-6" stroke="#061A33" strokeWidth="1.5" />
          </svg>
          <span className="graphic-label contact-primary">
            Choose a primary contact
          </span>
        </>
      ) : stage === 1 ? (
        <div className="permission-diagram">
          <div className="permission-band">
            <span>Required</span>
            <div>
              <Icon name="message" />
              SMS <span className="permission-divider" /> <Icon name="phone" />
              Phone
            </div>
          </div>
          <div className="permission-band permission-optional">
            <span>Optional</span>
            <div>
              <Icon name="location" />
              Location <span className="permission-divider" />{" "}
              <Icon name="audio" />
              Audio
            </div>
          </div>
          <span className="graphic-label">
            Review notification visibility, too
          </span>
        </div>
      ) : (
        <>
          <svg className="hold-reference" viewBox="0 0 360 220" fill="none">
            <circle cx="180" cy="108" r="78" stroke="#cfdeea" />
            <circle
              cx="180"
              cy="108"
              r="61"
              stroke="#99bed9"
              strokeWidth="1.5"
              strokeDasharray="2 7"
            />
            <circle cx="180" cy="108" r="45" fill="#061A33" />
            <path
              d="M180 20v8 M268 108h-8 M180 196v-8 M92 108h8"
              stroke="#2196F3"
              strokeWidth="1.5"
            />
          </svg>
          <div className="hold-reference-label">
            <strong>SOS</strong>
            <span>3 seconds</span>
          </div>
          <span className="graphic-label hold-caption">
            Release early to stop activation
          </span>
        </>
      )}
    </div>
  );
}

export function LocalRecordingGraphic() {
  return (
    <figure className="local-audio-illustration">
      <svg viewBox="0 0 480 250" fill="none" aria-hidden="true">
        <ellipse cx="254" cy="126" rx="176" ry="104" stroke="#29415a" />
        <ellipse
          cx="254"
          cy="126"
          rx="146"
          ry="80"
          stroke="#29415a"
          strokeDasharray="2 8"
        />
        <path
          d="M342 30c38 15 61 40 65 70M358 204c-24 18-58 28-96 28"
          stroke="#2196F3"
          strokeLinecap="round"
        />
        <circle cx="408" cy="105" r="3" fill="#38BDF8" />
        <rect
          x="168"
          y="11"
          width="146"
          height="224"
          rx="24"
          fill="#0B2747"
          stroke="#38BDF8"
          strokeWidth="2"
        />
        <path
          d="M218 25h46M225 221h32"
          stroke="#6486a1"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect x="181" y="40" width="120" height="165" rx="10" fill="#061A33" />
        <path d="M192 95h98" stroke="#29415a" />
        {[10, 22, 38, 26, 48, 32, 18, 40, 28, 12, 22].map((height, i) => (
          <path
            key={i}
            d={`M${197 + i * 9} ${95 - height / 2}v${height}`}
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
        <path
          d="M227 140h23l13 13v38h-36z"
          fill="#0B2747"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M250 140v13h13M236 165h17M236 173h17M236 181h10"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M111 121h42m-6-5 6 5-6 5"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="77" cy="121" r="29" fill="#0B2747" stroke="#365876" />
        <rect
          x="72"
          y="106"
          width="10"
          height="22"
          rx="5"
          stroke="#38BDF8"
          strokeWidth="1.7"
        />
        <path
          d="M67 120v3a10 10 0 0 0 20 0v-3M77 133v7m-5 0h10"
          stroke="#38BDF8"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      <figcaption>
        <span>
          Emergency audio <span aria-hidden="true">→</span> on your phone
        </span>
        <small>Illustrative overview</small>
      </figcaption>
    </figure>
  );
}
