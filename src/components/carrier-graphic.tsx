import { Icon } from "./icon";

// Conceptual carrier route, never a claim of delivery or a live connection.
export function CarrierGraphic() {
  return (
    <figure className="carrier-illustration">
      <div className="carrier-diagram" aria-hidden="true">
        <div>
          <span className="carrier-symbol">
            <Icon name="smartphone" />
          </span>
          <span>Your phone</span>
        </div>
        <span className="carrier-connector" />
        <div className="carrier-node">
          <span className="carrier-symbol">
            <Icon name="radio" />
          </span>
          <span>Cellular service</span>
        </div>
        <span className="carrier-connector" />
        <div>
          <span className="carrier-symbol">
            <Icon name="users" />
          </span>
          <span>Your people</span>
        </div>
      </div>
      <figcaption>SMS & calls · illustrative overview</figcaption>
    </figure>
  );
}
