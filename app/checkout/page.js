'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, QrCode, Truck, ArrowLeft } from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const item = searchParams.get('item') || 'Custom Project';
  const price = searchParams.get('price') || 'Custom Quote';

  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Custom Cursor
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const payload = {
      serviceName: item,
      amount: price,
      method: paymentMethod === 'qr' ? 'FamApp' : 'Cash on Delivery',
      transactionId: formData.get("FamApp_Transaction_ID") || "N/A",
      name: formData.get("Full_Name"),
      email: formData.get("Email_Address"),
      phone: formData.get("Phone_Number"),
      address: formData.get("Shipping_Address")
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.warn("Expected JSON response but received non-JSON content. Status:", response.status, text);
        
        throw new Error("Invalid server response format (expected JSON)");
      }

      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(data.error || 'Server error occurred during checkout');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Database connection failed or order submission failed: " + error.message);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <Shield size={80} color="var(--accent-secondary)" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '4rem', fontFamily: 'Syncopate', marginBottom: '1rem' }}>ORDER SECURED</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
          Your request for <strong>{item}</strong> has been securely logged to the Synapse Lab MongoDB server. Dhanvanth will verify your transaction and contact you.
        </p>
        <a href="/" style={{ padding: '1rem 2rem', marginTop: '3rem', fontSize: '1.1rem', background: '#FFD814', color: '#000', textDecoration: 'none', borderRadius: '100px', fontWeight: 'bold' }}>
           Return to Arsenal
        </a>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '4rem 2rem', position: 'relative' }}>
      <div className="noise"></div>
      <div className="custom-cursor" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, width: '20px', height: '20px' }}></div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontFamily: 'monospace' }}>
          <ArrowLeft size={16} /> ABORT CHECKOUT
        </a>

        <h1 style={{ fontSize: '3rem', fontFamily: 'Syncopate', marginBottom: '1rem', borderBottom: '2px solid #333', paddingBottom: '1rem' }}>SECURE CHECKOUT</h1>
        
        <div style={{ background: '#111', border: '1px solid #333', padding: '2rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'var(--accent-secondary)', fontFamily: 'monospace', marginBottom: '0.5rem' }}>TARGET ASSET</div>
            <h2 style={{ fontSize: '1.5rem' }}>{item}</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: '0.5rem' }}>VALUE</div>
            <h2 style={{ fontSize: '1.8rem', color: '#fff' }}>{price}</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <section>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>1. DESTINATION PROTOCOL</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <input required type="text" name="Full_Name" placeholder="Full Name" style={{ background: '#050505', border: '1px solid #333', padding: '1rem', color: '#fff', fontSize: '1rem', width: '100%', outline: 'none' }} />
              <input required type="email" name="Email_Address" placeholder="Email Address" style={{ background: '#050505', border: '1px solid #333', padding: '1rem', color: '#fff', fontSize: '1rem', width: '100%', outline: 'none' }} />
              <input required type="text" name="Phone_Number" placeholder="Phone Number" style={{ background: '#050505', border: '1px solid #333', padding: '1rem', color: '#fff', fontSize: '1rem', width: '100%', outline: 'none', gridColumn: '1 / -1' }} />
              <textarea required name="Shipping_Address" placeholder="Full Shipping Address" rows="3" style={{ background: '#050505', border: '1px solid #333', padding: '1rem', color: '#fff', fontSize: '1rem', width: '100%', outline: 'none', gridColumn: '1 / -1', resize: 'vertical' }}></textarea>
            </div>
          </section>

          <section>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>2. TRANSFER METHOD</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              
              <label style={{ background: paymentMethod === 'qr' ? 'rgba(0, 240, 255, 0.1)' : '#050505', border: `1px solid ${paymentMethod === 'qr' ? 'var(--accent-secondary)' : '#333'}`, padding: '1.5rem', cursor: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', transition: 'all 0.3s' }}>
                <input type="radio" name="Payment_Method" value="FamApp QR" checked={paymentMethod === 'qr'} onChange={() => setPaymentMethod('qr')} style={{ display: 'none' }} />
                <QrCode size={40} color={paymentMethod === 'qr' ? 'var(--accent-secondary)' : '#666'} />
                <span style={{ fontWeight: 'bold' }}>FamApp Transfer</span>
              </label>

              <label style={{ background: paymentMethod === 'cod' ? 'rgba(255, 0, 60, 0.1)' : '#050505', border: `1px solid ${paymentMethod === 'cod' ? 'var(--accent)' : '#333'}`, padding: '1.5rem', cursor: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', transition: 'all 0.3s' }}>
                <input type="radio" name="Payment_Method" value="Cash on Delivery" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{ display: 'none' }} />
                <Truck size={40} color={paymentMethod === 'cod' ? 'var(--accent)' : '#666'} />
                <span style={{ fontWeight: 'bold' }}>Cash on Delivery</span>
              </label>

            </div>

            {paymentMethod === 'qr' && (
              <div style={{ marginTop: '2rem', padding: '2rem', background: '#050505', border: '1px dashed var(--accent-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                   To complete this order, open FamApp and send exactly <strong style={{ color: '#fff' }}>{price}</strong> to:<br/><br/>
                   <span style={{ fontSize: '1.5rem', color: 'var(--accent-secondary)', fontWeight: 'bold', fontFamily: 'monospace' }}>dhanvanth10@fam</span>
                 </p>
                 
                 <div style={{ width: '100%', maxWidth: '400px', textAlign: 'left' }}>
                   <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-secondary)', fontFamily: 'monospace', fontSize: '0.9rem' }}>PAYMENT CONFIRMATION *</label>
                   <input 
                     required 
                     type="text" 
                     name="FamApp_Transaction_ID" 
                     placeholder="Enter FamApp Transaction ID" 
                     style={{ background: '#111', border: '1px solid var(--accent-secondary)', padding: '1rem', color: '#fff', fontSize: '1rem', width: '100%', outline: 'none' }} 
                   />
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>You cannot submit this order without a valid transaction ID.</p>
                 </div>
              </div>
            )}
          </section>

          <button type="submit" style={{ padding: '1.5rem', background: '#FFD814', color: '#000', fontSize: '1.2rem', fontWeight: 800, border: 'none', fontFamily: 'Syncopate', cursor: 'none', marginTop: '2rem' }}>
             CONFIRM ORDER // SUBMIT
          </button>
        </form>
      </div>
    </main>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', color: '#fff' }}>Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
