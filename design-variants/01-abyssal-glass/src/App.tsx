import { useEffect, useState, useRef, useCallback } from "react";
import type { TabId } from "@shared/types";
import { profile } from "@shared/content/profile";
import { resume } from "@shared/content/resume";
import { bio } from "@shared/content/bio";
import { photos } from "@shared/content/photos";
import { links } from "@shared/content/links";

const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "resume", label: "Resume" },
  { id: "bio", label: "Bio" },
  { id: "photography", label: "Photography" },
  { id: "links", label: "Links" },
];

function useHashTab(): [TabId, (t: TabId) => void] {
  const [tab, setTab] = useState<TabId>(() => {
    const h = window.location.hash.replace("#", "") as TabId;
    return TABS.some((t) => t.id === h) ? h : "home";
  });
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "") as TabId;
      setTab(TABS.some((t) => t.id === h) ? h : "home");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = useCallback((t: TabId) => {
    window.location.hash = t;
  }, []);
  return [tab, navigate];
}

function CausticsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      ctx.fillStyle = "#03131f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return () => window.removeEventListener("resize", resize);
    }
    const draw = () => {
      ctx.fillStyle = "rgba(3, 19, 31, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const numRays = 6;
      for (let i = 0; i < numRays; i++) {
        const x = (canvas.width / numRays) * i + Math.sin(t + i * 1.3) * 120;
        const y = Math.sin(t * 0.7 + i * 2.1) * 80 + canvas.height * 0.3;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 300);
        grad.addColorStop(0, "rgba(98, 214, 200, 0.04)");
        grad.addColorStop(0.5, "rgba(98, 214, 200, 0.01)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      t += 0.008;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="caustics-bg" aria-hidden="true" />;
}

function PhotoModal({ id, onClose }: { id: string; onClose: () => void }) {
  const photo = photos.find((p) => p.id === id);
  if (!photo) return null;
  return (
    <div className="photo-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={photo.title}>
      <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="photo-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <img src={photo.imageUrl} alt={photo.title} loading="lazy" />
        <div className="photo-modal-info">
          <h3>{photo.title}</h3>
          <p className="photo-modal-location">{photo.location} · {photo.date}</p>
          <p className="photo-modal-blurb">{photo.blurb}</p>
          {photo.camera && <p className="photo-modal-camera">{photo.camera}</p>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, navigate] = useHashTab();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleNavigate = (t: TabId) => {
    if (t === tab) return;
    setTransitioning(true);
    setTimeout(() => {
      navigate(t);
      setTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedPhoto]);

  return (
    <>
      <CausticsCanvas />
      <div className={`wave-transition ${transitioning ? "active" : ""}`} aria-hidden="true" />
      <header className="glass-header">
        <div className="header-inner">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleNavigate("home"); }}>
            {profile.name}
          </a>
          <nav className="tab-nav" aria-label="Main navigation">
            {TABS.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={`tab-link ${tab === t.id ? "active" : ""}`}
                onClick={(e) => { e.preventDefault(); handleNavigate(t.id); }}
              >{t.label}</a>
            ))}
          </nav>
        </div>
      </header>
      <main className="app-main">
        <div className="content-container">
          {tab === "home" && (
            <section className="glass-panel home-panel">
              <h1 className="home-name">{profile.name}</h1>
              <p className="home-headline">{profile.headline}</p>
              <p className="home-location">{profile.location}</p>
              <p className="home-bio">{profile.shortBio}</p>
              <a href={`mailto:${profile.email}`} className="glass-btn primary">Get in touch</a>
            </section>
          )}
          {tab === "resume" && (
            <section className="glass-panel">
              <h2 className="section-title">Experience</h2>
              <div className="resume-timeline">
                {resume.roles.map((role) => (
                  <div key={role.company} className={`resume-role ${role.featured ? "featured" : ""}`}>
                    <div className="resume-role-header">
                      <h3>{role.title}</h3>
                      <span className="resume-company">{role.company}</span>
                      <span className="resume-dates">{role.startDate}–{role.endDate ?? "Present"}</span>
                      <span className="resume-location">{role.location}</span>
                    </div>
                    <ul className="resume-bullets">
                      {role.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                    <div className="resume-tech">
                      {role.technologies.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="resume-skills">
                <h3>Skills</h3>
                <div className="skill-tags">
                  {resume.skills.map((s) => <span key={s} className="tech-tag">{s}</span>)}
                </div>
              </div>
              <div className="resume-education">
                <h3>Education</h3>
                {resume.education.map((ed) => (
                  <div key={ed.institution} className="edu-item">
                    <strong>{ed.institution}</strong> — {ed.degree} ({ed.years})
                  </div>
                ))}
              </div>
              {resume.pdfUrl && <a href={resume.pdfUrl} className="glass-btn" download>Download PDF</a>}
            </section>
          )}
          {tab === "bio" && (
            <section className="glass-panel">
              <h2 className="section-title">About</h2>
              {bio.paragraphs.map((p, i) => <p key={i} className="bio-para">{p}</p>)}
              <div className="bio-highlights">
                <h3>Highlights</h3>
                <ul>{bio.highlights.map((h, i) => <li key={i}>{h}</li>)}</ul>
              </div>
            </section>
          )}
          {tab === "photography" && (
            <section className="glass-panel">
              <h2 className="section-title">Photography</h2>
              <div className="photo-grid">
                {photos.map((p) => (
                  <button key={p.id} className="photo-card" onClick={() => setSelectedPhoto(p.id)} aria-label={p.title}>
                    <img src={p.thumbUrl} alt={p.title} loading="lazy" />
                    <div className="photo-card-info">
                      <strong>{p.title}</strong>
                      <span>{p.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
          {tab === "links" && (
            <section className="glass-panel">
              <h2 className="section-title">Connect</h2>
              <div className="links-grid">
                {links.map((l) => (
                  <a key={l.label} href={l.url} className="glass-link-card" target={l.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <strong>{l.label}</strong>
                  </a>
                ))}
              </div>
              <a href={`mailto:${profile.email}`} className="glass-btn primary">Email me</a>
            </section>
          )}
        </div>
      </main>
      <footer className="glass-footer">
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </footer>
      {selectedPhoto && <PhotoModal id={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </>
  );
}
