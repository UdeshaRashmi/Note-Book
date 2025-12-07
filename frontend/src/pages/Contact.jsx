import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: in a real app you'd POST this to an API
    alert('Thanks! Your message has been received.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-50 to-emerald-50 flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10 border border-olive-100">
          <h1 className="text-2xl font-extrabold text-olive-900 mb-3">Contact Us</h1>
          <p className="text-olive-700 mb-6">Have a question or feedback? We'd love to hear from you.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-olive-700 block mb-2">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded-lg border border-olive-100 bg-olive-50 outline-none" placeholder="Your name" />
            </div>

            <div>
              <label className="text-sm text-olive-700 block mb-2">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-olive-500" />
                <input name="email" value={form.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-olive-100 bg-olive-50 outline-none" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="text-sm text-olive-700 block mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="6" className="w-full p-3 rounded-lg border border-olive-100 bg-olive-50 outline-none" placeholder="How can we help?"></textarea>
            </div>

            <div>
              <button type="submit" className="inline-flex items-center gap-3 bg-olive-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-olive-700">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm text-olive-600">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-olive-500" />
              <span>Phone: +1 (555) 123-4567</span>
            </div>
            <div className="mt-2">Or email us at <a className="text-olive-700 font-medium" href="mailto:support@notebookpro.example">support@notebookpro.example</a></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
