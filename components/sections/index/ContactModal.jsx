import React, { useState } from 'react';
import styles from './ContactModal.module.scss';
import Icon from '../../utils/icon.util';

const LINKEDIN_URL = 'https://www.linkedin.com/in/zhangkyle/';
const X_URL = 'https://x.com/riptidestar';

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
              <button className={styles.optionBtn} onClick={() => handleOption('linkedin')}>
                <Icon icon={['fab', 'linkedin']} />
                LinkedIn
              </button>
              <button className={styles.optionBtn} onClick={() => handleOption('x')}>
                <Icon icon={['fab', 'x-twitter']} />
                X (Twitter)
              </button>
              <button className={styles.optionBtn} onClick={() => handleOption('email')}>
                <Icon icon={['far', 'envelope']} />
                Email
              </button>
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