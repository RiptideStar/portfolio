import React, { useState } from 'react';
import styles from './ContactModal.module.scss';

const LINKEDIN_URL = 'https://www.linkedin.com/in/zhangkyle/';
const X_URL = 'https://x.com/riptidestar';

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z" fill="#0077B5"/></svg>
);
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}><path d="M17.53 2.47a.75.75 0 0 1 1.06 1.06L13.06 9l5.53 5.47a.75.75 0 1 1-1.06 1.06L12 10.06l-5.47 5.53a.75.75 0 1 1-1.06-1.06L10.94 9 5.41 3.53a.75.75 0 1 1 1.06-1.06L12 7.94l5.53-5.47z" fill="#000"/></svg>
);
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}><path d="M12 13.065l-8-5.065v10h16v-10l-8 5.065zm8-7.065h-16c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-14c0-1.104-.896-2-2-2zm-8 7.065l8-5.065h-16l8 5.065z" fill="#EA4335"/></svg>
);

export default function ContactModal({ open, onClose }) {
  const [step, setStep] = useState('choose');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Reset step and form when modal is closed
  React.useEffect(() => {
    if (!open) {
      setStep('choose');
      setForm({ name: '', email: '', message: '' });
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const handleOption = (option) => {
    if (option === 'linkedin') {
      window.open(LINKEDIN_URL, '_blank');
      onClose();
    } else if (option === 'x') {
      window.open(X_URL, '_blank');
      onClose();
    } else if (option === 'email') {
      setStep('form');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStep('success');
      } else {
        setStep('error');
      }
    } catch {
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const handleBackgroundClick = (e) => {
    // Fix: className may not be a string, so use classList if available
    if (
      (e.target.classList && e.target.classList.contains(styles.modalBackdrop)) ||
      (typeof e.target.className === 'string' && e.target.className.includes('modalBackdrop'))
    ) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackgroundClick}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeBtn} aria-label="Close">×</button>
        {step === 'choose' && (
          <div className={styles.chooseSection}>
            <h2>Contact Me</h2>
            <p>How would you like to connect?</p>
            <div className={styles.options}>
              <button className={styles.optionBtn} onClick={() => handleOption('linkedin')}><LinkedInIcon />LinkedIn</button>
              <button className={styles.optionBtn} onClick={() => handleOption('x')}><XIcon />X (Twitter)</button>
              <button className={styles.optionBtn} onClick={() => handleOption('email')}><EmailIcon />Email</button>
            </div>
          </div>
        )}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className={styles.formSection}>
            <h2>Contact Form</h2>
            <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className={styles.input} />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className={styles.input} />
            <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required className={styles.textarea} />
            <button type="submit" disabled={loading} className={styles.submitBtn}>{loading ? 'Sending...' : 'Send'}</button>
          </form>
        )}
        {step === 'success' && (
          <div className={styles.resultSection}>
            <h2>Thank you!</h2>
            <p>Your message has been sent.</p>
            <button onClick={onClose} className={styles.submitBtn}>Close</button>
          </div>
        )}
        {step === 'error' && (
          <div className={styles.resultSection}>
            <h2>Oops!</h2>
            <p>Something went wrong. Please try again later.</p>
            <button onClick={onClose} className={styles.submitBtn}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
} 