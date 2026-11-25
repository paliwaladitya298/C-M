import { useState } from "react";
import CarvingAnimation from "./components/CarvingAnimation";

const monuments = [
  {
    src: "/monuments/celtic-cross.png",
    alt: "Grey granite Celtic cross memorial",
    name: "Celtic Cross Memorial",
  },
  {
    src: "/monuments/leaf-memorial.png",
    alt: "Grey memorial with an intricate leaf design",
    name: "Leaf Design Memorial",
  },
  {
    src: "/monuments/angel-memorial.png",
    alt: "White marble angel memorial",
    name: "Angel Memorial",
  },
  {
    src: "/monuments/black-granite.png",
    alt: "Polished black granite memorial",
    name: "Black Granite Memorial",
  },
];

const navigation = ["Home", "About Us", "Services", "Our Monuments", "Gallery", "Contact"];
const services = [
  {
    name: "Personalised monument design",
    description: "We help you create a fitting memorial for your loved one and your budget.",
  },
  {
    name: "Sandblast carving",
    description: "Our team completes custom lettering and carving with care in our own workshop.",
  },
  {
    name: "Artist etching",
    description: "We create artist etchings on our monuments to make every tribute personal.",
  },
  {
    name: "Monument installation",
    description: "We personally install monuments locally and can ship memorials across the US.",
  },
];

function MenuIcon({ open }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function LandingDove() {
  return (
    <span className="landing-dove" aria-hidden="true">
      <img src="/birds/dove-perched.png" alt="" draggable="false" />
    </span>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="header-brand" href="#home" aria-label="C&M Monument Company home">
          <img src="/cm-monument-logo.png" alt="" draggable="false" />
        </a>
        <nav className={`navigation ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            className="enquire-link mobile-enquire"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Make an enquiry
          </a>
        </nav>

        <a className="enquire-link desktop-enquire" href="#contact">
          Make an enquiry
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              Est. 1995 · Master stonecraft
            </p>
            <h1 className="company-title">
              <span className="company-title-main">
                <span className="landing-letter">C</span>
                <span className="company-ampersand">&amp;</span>M
              </span>
              <span className="company-title-sub">Monument Company</span>
              <LandingDove />
            </h1>
            <p className="intro">
              Thoughtfully designed memorials, hand-finished in enduring natural stone to honour a
              life and preserve its story.
            </p>
            <a className="primary-action" href="#our-monuments">
              Explore our monuments
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13M14 7l5 5-5 5" />
              </svg>
            </a>
            <p className="craft-note">Made with care in our family workshop</p>
          </div>

          <CarvingAnimation />
        </section>

        <section className="heritage-strip" aria-label="Our promise">
          <p>Natural stone</p>
          <span />
          <p>Bespoke inscriptions</p>
          <span />
          <p>Generations of craft</p>
        </section>

        <section className="page-section about-section" id="about-us">
          <div className="section-inner">
            <p className="section-kicker">Our story</p>
            <h2 className="section-title">About C&amp;M Monuments</h2>
            <div className="about-copy">
              <p>
                At C&amp;M Monuments we pride ourselves in offering a high quality monument at a
                price that you can afford. Unlike some internet based companies that run the
                business from a computer in their home, we are a brick and mortar business located
                in Amory, Mississippi.
              </p>
              <p>
                C&amp;M Monuments started in 1995 and made sure the business was built on honesty
                and treating people fairly at a time that is the hardest for them. Our only business
                is monuments and memorial products and we handle the order from start to finish.
                Several factors help us to have the best price around. One is being this close to
                “The Granite Capital of the World” along with the volume we order, two is doing our
                own sandblast carving and artist etching on all of our monuments, and three we
                personally install the monuments here locally.
              </p>
              <p>
                Since we are a Christian based company, we make sure that you are treated like we
                would want to be treated. We have sold monuments on the internet and shipped them
                all over the United States for several years and we see a growing need for a quality
                monument that is not overpriced. Some “companies” try to tell you that you need this
                and that for a monument and take advantage of you at a time when you are hurting. We
                will help you design a monument for your budget from the smallest and most simple to
                the largest and most extravagant.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section services-section" id="services">
          <div className="section-inner">
            <p className="section-kicker">How we can help</p>
            <h2 className="section-title">Services made personal</h2>
            <div className="services-grid">
              {services.map((service, index) => (
                <article className="service-card" key={service.name}>
                  <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section monuments-section" id="our-monuments">
          <div className="section-inner">
            <p className="section-kicker">Made to honour a life</p>
            <h2 className="section-title">Our Monuments</h2>
            <p className="section-intro">
              Every memorial is thoughtfully made to reflect a life, a story, and the people who
              will remember.
            </p>
            <div className="monuments-grid">
              {monuments.map((monument) => (
                <article className="monument-card" key={monument.src}>
                  <div className="monument-card-image">
                    <img src={monument.src} alt={monument.alt} loading="lazy" />
                  </div>
                  <h3>{monument.name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section gallery-section" id="gallery">
          <div className="section-inner">
            <p className="section-kicker">A closer look</p>
            <h2 className="section-title">Gallery</h2>
            <div className="gallery-grid">
              {monuments.map((monument) => (
                <figure className="gallery-item" key={monument.src}>
                  <div className="gallery-item-image">
                    <img src={monument.src} alt={monument.alt} loading="lazy" />
                  </div>
                  <figcaption>{monument.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section contact-section" id="contact">
          <div className="section-inner">
            <p className="section-kicker">We are here to help</p>
            <h2 className="section-title">Contact Us</h2>
            <div className="contact-grid">
              <div className="contact-details">
                <p>
                  <span>Email Us</span>
                  <a href="mailto:cmmonuments@bellsouth.net">cmmonuments@bellsouth.net</a>
                </p>
                <p>
                  <span>Call Us</span>
                  <a href="tel:+16622570370">(662) 257-0370</a>
                </p>
                <p>
                  <span>Find Us On Facebook</span>
                  <a href="https://www.facebook.com/CMMonument/" target="_blank" rel="noreferrer">
                    @CMMonument
                  </a>
                </p>
                <p>
                  <span>Visit Us</span>
                  <address>60004 Dobbs Rd. Amory, MS 38821</address>
                </p>
              </div>
              <div className="hours-card">
                <h3>
                  <a
                    href="https://www.google.com/search?q=C%26M+Monument+Company+hours"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Hours
                  </a>
                </h3>
                <dl>
                  <div>
                    <dt>Monday</dt>
                    <dd>9 AM–5 PM</dd>
                  </div>
                  <div>
                    <dt>Tuesday</dt>
                    <dd>9 AM–5 PM</dd>
                  </div>
                  <div>
                    <dt>Wednesday</dt>
                    <dd>9 AM–5 PM</dd>
                  </div>
                  <div>
                    <dt>Thursday</dt>
                    <dd>9 AM–5 PM</dd>
                  </div>
                  <div>
                    <dt>Friday</dt>
                    <dd>9 AM–5 PM</dd>
                  </div>
                  <div>
                    <dt>Saturday</dt>
                    <dd>9 AM–12:30 PM</dd>
                  </div>
                  <div>
                    <dt>Sunday</dt>
                    <dd>Closed</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
