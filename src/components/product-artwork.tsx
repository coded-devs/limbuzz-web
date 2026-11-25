import Image from "next/image";

export function ProductArtwork() {
  return (
    <section className="section showcase" id="app-preview">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">MADE FOR REAL LIFE</p>
            <h2>
              Your phone.
              <br />
              Your people.
            </h2>
          </div>
          <p className="artwork-intro">
            Choose who you would turn to, before you need help.
          </p>
        </div>
        <div className="artwork-grid" data-reveal>
          <figure className="people-artwork">
            <Image
              src="/illustrations/trusted-people.webp"
              alt="Editorial illustration of a Black woman looking at her phone, with blue lines connecting to trusted-contact symbols."
              width={1280}
              height={853}
              sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) 58vw, 730px"
            />
            <figcaption>
              <span className="artwork-kicker">YOUR TRUSTED CIRCLE</span>
              <span>Let them know what an alert from you would mean.</span>
            </figcaption>
          </figure>
          <figure className="route-artwork">
            <Image
              src="/illustrations/location-route.webp"
              alt="Conceptual map illustration with a blue location pin, radar rings and a dotted route to a message symbol."
              width={960}
              height={640}
              sizes="(max-width: 760px) calc(100vw - 40px), 370px"
            />
            <figcaption>
              <h3>An alert first. More context next.</h3>
              <p>
                Location can follow in a separate SMS when a usable fix is
                available.
              </p>
            </figcaption>
          </figure>
        </div>
        <p className="artwork-disclosure">Illustrative overview</p>
      </div>
    </section>
  );
}
