import { useState } from 'react'
import {
  ArrowLeft, Bell, Camera, Check, ChevronRight, CircleHelp, Clock3,
  Eye, EyeOff, Heart, Home, Lock, MapPin, MessageSquare,
  Plus, Search, Share2, ShieldCheck, Sliders, Sprout, Star, Truck, UserRound, Users, Wallet
} from 'lucide-react'
import './App.css'

// ─── Data ────────────────────────────────────────────────────────────────────
const productsData = [
  { id: 1, name: 'Tomato', category: 'Vegetables', grade: 'Grade A', quantity: 200, price: 24, buyersCount: 2, farmer: 'Ramesh Kumar', location: 'Kanyakumari, TN', distance: '6 km', rating: 4.8, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=85', status: 'Active', organic: true },
  { id: 2, name: 'Carrot', category: 'Vegetables', grade: 'Grade A', quantity: 150, price: 22, buyersCount: 1, farmer: 'Nagaraj', location: 'Nagercoil, TN', distance: '12 km', rating: 4.7, image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=800&q=85', status: 'Active', organic: true },
  { id: 3, name: 'Brinjal', category: 'Vegetables', grade: 'Grade B', quantity: 80, price: 18, buyersCount: 0, farmer: 'Thiruvattar Agro', location: 'Thiruvattar, TN', distance: '15 km', rating: 4.5, image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=85', status: 'Active', organic: false },
  { id: 4, name: 'Beans', category: 'Vegetables', grade: 'Grade A', quantity: 50, price: 26, buyersCount: 0, farmer: 'Kanyakumari Farms', location: 'Kanyakumari, TN', distance: '8 km', rating: 4.9, image: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=800&q=85', status: 'Active', organic: true },
  { id: 5, name: 'Banana', category: 'Fruits', grade: 'Grade A', quantity: 150, price: 25, buyersCount: 3, farmer: 'Selvi', location: 'Kanyakumari, TN', distance: '10 km', rating: 4.8, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=85', status: 'Active', organic: true }
]

const potentialBuyersData = [
  { id: 1, name: 'Sri Venkateswara Retail Store', type: 'Retailer', qty: 100, offer: 24, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=85' },
  { id: 2, name: 'Hotel Sea View', type: 'Restaurant', qty: 50, offer: 25, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=85' },
  { id: 3, name: 'Kumari Veg Vendors', type: 'Small Vendor', qty: 50, offer: 24, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=85' }
]

const mandiPricesData = [
  { market: 'Nagercoil Mandi', time: 'Today 10:30 AM', price: 22 },
  { market: 'Thiruvattar Mandi', time: 'Today 09:45 AM', price: 20 },
  { market: 'Kanyakumari Mandi', time: 'Today 10:15 AM', price: 21 }
]

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [role, setRole] = useState('Farmer')
  const [toast, setToast] = useState('')
  const [selectedBuyerIds, setSelectedBuyerIds] = useState([1, 2, 3])
  const [selectedProduct, setSelectedProduct] = useState(productsData[0])

  const notify = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const toggleBuyerSelect = (id) => {
    setSelectedBuyerIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const navigateTo = (screenId) => setCurrentScreen(screenId)

  return (
    <div className="app-root">
      {currentScreen === 'splash'          && <SplashScreen onStart={() => navigateTo('home')} onLogin={() => navigateTo('login')} />}
      {currentScreen === 'login'           && <LoginScreen role={role} setRole={setRole} onLogin={() => navigateTo('home')} />}
      {currentScreen === 'home'            && <HomeScreen role={role} onNavigate={navigateTo} onSelectProduct={(p) => { setSelectedProduct(p); navigateTo('product-details') }} />}
      {currentScreen === 'farmer-products' && <FarmerProductsScreen onNavigate={navigateTo} />}
      {currentScreen === 'add-product'     && <AddProductScreen onNavigate={navigateTo} notify={notify} />}
      {currentScreen === 'buyer-marketplace' && <BuyerMarketplaceScreen onNavigate={navigateTo} onSelectProduct={(p) => { setSelectedProduct(p); navigateTo('product-details') }} />}
      {currentScreen === 'product-details' && <ProductDetailsScreen product={selectedProduct} onNavigate={navigateTo} notify={notify} />}
      {currentScreen === 'price-comparison' && <PriceComparisonScreen onNavigate={navigateTo} />}
      {currentScreen === 'buyer-matching'  && <BuyerMatchingScreen selectedBuyerIds={selectedBuyerIds} toggleBuyerSelect={toggleBuyerSelect} onNavigate={navigateTo} />}
      {currentScreen === 'order-tracking'  && <OrderTrackingScreen onNavigate={navigateTo} notify={notify} />}
      {currentScreen === 'payment'         && <PaymentScreen onNavigate={navigateTo} notify={notify} />}
      {currentScreen === 'profile'         && <ProfileScreen role={role} onNavigate={navigateTo} />}

      {toast && (
        <div className="global-toast">
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  )
}

/* ── SCREEN 1: SPLASH ─────────────────────────────────────────────────────── */
function SplashScreen({ onStart, onLogin }) {
  return (
    <div className="screen screen-splash">
      <div className="splash-body">
        <div className="splash-logo">
          <div className="splash-sprout"><Sprout size={36} /></div>
          <h2>AgriDirect</h2>
          <p className="splash-tagline">From Farmer to Buyer<br /><strong>Fair Price for Everyone</strong></p>
        </div>

        <div className="splash-hero-art">
          <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=85" alt="Farmer in field" />
        </div>

        <div className="splash-actions">
          <button className="btn-primary" onClick={onStart}>Get Started</button>
          <button className="btn-outline" onClick={onLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

/* ── SCREEN 2: LOGIN ─────────────────────────────────────────────────────── */
function LoginScreen({ role, setRole, onLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="screen screen-login">
      <div className="login-content">
        <div className="login-header">
          <div className="login-logo"><Sprout size={26} /></div>
          <h2>AgriDirect</h2>
          <h3>Welcome Back!</h3>
          <p>Login to continue your journey</p>
        </div>

        <div className="role-tab-switcher">
          <button className={role === 'Farmer' ? 'active' : ''} onClick={() => setRole('Farmer')}>Farmer</button>
          <button className={role === 'Buyer' ? 'active' : ''} onClick={() => setRole('Buyer')}>Buyer</button>
        </div>

        <div className="login-form">
          <div className="field-group">
            <label>Mobile Number</label>
            <input type="text" placeholder="Enter your mobile number" defaultValue="9876543210" />
          </div>

          <div className="field-group">
            <label>Password</label>
            <div className="input-row">
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" defaultValue="••••••••" />
              <button className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <a href="#forgot" className="forgot-link" onClick={e => e.preventDefault()}>Forgot Password?</a>
          </div>

          <button className="btn-primary" onClick={onLogin}>Login</button>

          <div className="or-divider"><span>OR</span></div>

          <button className="google-btn" onClick={onLogin}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
            Continue with Google
          </button>

          <p className="register-prompt">Don't have an account? <a href="#register" onClick={e => e.preventDefault()}>Register</a></p>
        </div>
      </div>
    </div>
  )
}

/* ── SCREEN 3: HOME DASHBOARD ─────────────────────────────────────────────── */
function HomeScreen({ onNavigate, onSelectProduct }) {
  return (
    <div className="screen screen-home">
      <div className="home-header">
        <div className="location-row">
          <div className="location-pin"><MapPin size={15} /><span>Kanyakumari, TN</span></div>
          <div className="header-right">
            <div className="bell-wrap"><Bell size={20} /><i className="notif-dot" /></div>
            <div className="avatar-mini" onClick={() => onNavigate('profile')}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=85" alt="Profile" />
            </div>
          </div>
        </div>
        <div className="search-box" onClick={() => onNavigate('buyer-marketplace')}>
          <Search size={16} />
          <input type="text" placeholder="Search products, farmers, buyers..." readOnly />
        </div>
      </div>

      <div className="scroll-body">
        <div className="hero-banner" onClick={() => onNavigate('buyer-marketplace')}>
          <div className="banner-text">
            <h3>Fresh Produce<br />Direct from Farmers</h3>
            <p>Better Prices · Better Lives</p>
            <button className="banner-btn">Explore Now</button>
          </div>
          <div className="banner-img">
            <img src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=400&q=85" alt="Farmer" />
          </div>
        </div>

        <div className="section-title-row">
          <h4>Categories</h4>
        </div>

        <div className="categories-grid">
          {[{ icon: '🥬', label: 'Vegetables', bg: '#dcfce7' }, { icon: '🍊', label: 'Fruits', bg: '#ffedd5' }, { icon: '🌾', label: 'Grains', bg: '#fef3c7' }, { icon: '🥛', label: 'Dairy', bg: '#e0f2fe' }].map(c => (
            <div key={c.label} className="cat-item" onClick={() => onNavigate('buyer-marketplace')}>
              <div className="cat-icon" style={{ background: c.bg }}>{c.icon}</div>
              <span>{c.label}</span>
            </div>
          ))}
        </div>

        <div className="section-title-row">
          <h4>Top Deals</h4>
          <button className="view-all" onClick={() => onNavigate('buyer-marketplace')}>View All</button>
        </div>

        <div className="deals-grid">
          {[productsData[0], productsData[4]].map(p => (
            <div key={p.id} className="deal-card" onClick={() => { onSelectProduct(p) }}>
              <div className="deal-img-wrap">
                <img src={p.image} alt={p.name} />
                <button className="wish-btn"><Heart size={13} /></button>
              </div>
              <div className="deal-info">
                <h5>{p.name}</h5>
                <div className="deal-price">₹{p.price}<small>/kg</small></div>
                <p>{p.grade} · {p.quantity} kg</p>
                <small>Farmer: {p.farmer.split(' ')[0]}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  )
}

/* ── SCREEN 4: FARMER PRODUCTS ────────────────────────────────────────────── */
function FarmerProductsScreen({ onNavigate }) {
  const [tab, setTab] = useState('active')
  return (
    <div className="screen screen-bg">
      <div className="top-nav">
        <button className="back-btn" onClick={() => onNavigate('home')}><ArrowLeft size={20} /></button>
        <h3>My Products</h3>
        <button className="icon-btn" onClick={() => onNavigate('add-product')}><Plus size={20} /></button>
      </div>

      <div className="tab-bar">
        {[['active', 'Active (3)'], ['pending', 'Pending (1)'], ['sold', 'Sold']].map(([key, label]) => (
          <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{label}</button>
        ))}
      </div>

      <div className="scroll-body">
        {productsData.slice(0, 4).map((p, idx) => (
          <div key={p.id} className="fp-card">
            <img src={p.image} alt={p.name} className="fp-thumb" />
            <div className="fp-info">
              <h4>{p.name}</h4>
              <p>{p.quantity} kg · {p.grade}</p>
              <div className="fp-price-row">
                <span className="price">₹{p.price}/kg</span>
                <span className="live-pill">Live</span>
              </div>
              <small>{idx === 0 ? '2 Buyers Interested' : idx === 1 ? '1 Buyer Interested' : '0 Buyers'}</small>
            </div>
            <button className="bids-btn" onClick={() => onNavigate('buyer-matching')}>View Bids</button>
          </div>
        ))}
      </div>

      <BottomNav active="products" onNavigate={onNavigate} />
    </div>
  )
}

/* ── SCREEN 5: ADD PRODUCT ────────────────────────────────────────────────── */
function AddProductScreen({ onNavigate, notify }) {
  return (
    <div className="screen screen-white">
      <div className="top-nav">
        <button className="back-btn" onClick={() => onNavigate('farmer-products')}><ArrowLeft size={20} /></button>
        <h3>Add Product</h3>
        <span />
      </div>

      <div className="scroll-body pad">
        <div className="photo-upload">
          <div className="camera-circle"><Camera size={28} /></div>
          <strong>Upload Photos</strong>
          <span>You can add multiple photos</span>
        </div>

        {[['Product Name', 'text', 'e.g. Tomato', 'Tomato'], ['Quantity (kg)', 'number', 'e.g. 100', '100'], ['Expected Price (₹/kg)', 'number', 'e.g. 24', '24']].map(([label, type, ph, val]) => (
          <div key={label} className="field-group">
            <label>{label}</label>
            <input type={type} placeholder={ph} defaultValue={val} />
          </div>
        ))}

        <div className="field-group">
          <label>Quality Grade</label>
          <select defaultValue="">
            <option value="" disabled>Select grade</option>
            <option>Grade A</option>
            <option>Grade A+</option>
            <option>Grade B</option>
          </select>
        </div>

        <div className="field-group">
          <label>Description (optional)</label>
          <textarea placeholder="Organic, Fresh, no pesticide..." defaultValue="Organic, Fresh, harvested this week..." />
        </div>

        <button className="btn-primary" onClick={() => { notify('Product submitted successfully!'); onNavigate('farmer-products') }}>
          Submit Product
        </button>
      </div>
    </div>
  )
}

/* ── SCREEN 6: BUYER MARKETPLACE ─────────────────────────────────────────── */
function BuyerMarketplaceScreen({ onNavigate, onSelectProduct }) {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? productsData : productsData.filter(p => p.category === cat)
  return (
    <div className="screen screen-bg">
      <div className="top-nav">
        <button className="back-btn" onClick={() => onNavigate('home')}><ArrowLeft size={20} /></button>
        <h3>Fresh Produce</h3>
        <button className="icon-btn"><Heart size={20} /></button>
      </div>

      <div className="cat-pills">
        {['All', 'Vegetables', 'Fruits', 'Grains'].map(c => (
          <button key={c} className={cat === c ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="scroll-body">
        {filtered.map(p => (
          <div key={p.id} className="market-card" onClick={() => onSelectProduct(p)}>
            <img src={p.image} alt={p.name} className="market-thumb" />
            <div className="market-info">
              <div className="market-top">
                <h4>{p.name}</h4>
                <button className="icon-btn-sm"><Heart size={14} /></button>
              </div>
              <div className="market-price">₹{p.price}<small>/kg</small> · {p.quantity} kg</div>
              <p>{p.grade} · {p.location}</p>
              <button className="buy-now-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="explore" onNavigate={onNavigate} />
    </div>
  )
}

/* ── SCREEN 7: PRODUCT DETAILS ────────────────────────────────────────────── */
function ProductDetailsScreen({ product, onNavigate, notify }) {
  const item = product || productsData[0]
  return (
    <div className="screen screen-white">
      <div className="pd-hero">
        <img src={item.image} alt={item.name} />
        <div className="pd-hero-btns">
          <button className="circle-btn" onClick={() => onNavigate('buyer-marketplace')}><ArrowLeft size={18} /></button>
          <div className="pd-hero-right">
            <button className="circle-btn"><Share2 size={16} /></button>
            <button className="circle-btn"><Heart size={16} /></button>
          </div>
        </div>
      </div>

      <div className="scroll-body pad">
        <div className="pd-title-row">
          <div>
            <h2>{item.name}</h2>
            <p className="text-muted">{item.grade} · {item.quantity} kg</p>
          </div>
          <div className="pd-price">₹{item.price}<small>/kg</small></div>
        </div>

        <div className="location-tag"><MapPin size={13} /> {item.location}</div>

        <div className="farmer-card">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=85" alt="Farmer" className="farmer-avatar" />
          <div className="farmer-info">
            <div className="farmer-name-row">
              <strong>Ramesh Kumar</strong>
              <span className="verified-badge"><ShieldCheck size={11} /> Verified</span>
            </div>
            <div className="rating-row"><Star size={11} fill="#eab308" color="#eab308" /> <span>4.8 (66 reviews)</span></div>
          </div>
        </div>

        <div className="field-group">
          <h5 className="section-heading">Description</h5>
          <p className="text-muted">Fresh and organic tomatoes, harvested this week. No pesticides used.</p>
        </div>

        <div className="tags-row">
          <span className="tag">Organic</span>
          <span className="tag">Farm: {item.location}</span>
        </div>
      </div>

      <div className="pd-action-bar">
        <button className="btn-outline" onClick={() => notify('Chat feature opened')}>Chat</button>
        <button className="btn-primary" onClick={() => onNavigate('payment')}>Buy Now</button>
      </div>
    </div>
  )
}

/* ── SCREEN 8: PRICE COMPARISON ───────────────────────────────────────────── */
function PriceComparisonScreen({ onNavigate }) {
  const [tab, setTab] = useState('nearby')
  return (
    <div className="screen screen-bg">
      <div className="top-nav">
        <button className="back-btn" onClick={() => onNavigate('home')}><ArrowLeft size={20} /></button>
        <h3>Price Comparison</h3>
        <span />
      </div>

      <div className="pc-product-strip">
        <img src={productsData[0].image} alt="Tomato" />
        <h4>Tomato (1 kg)</h4>
      </div>

      <div className="tab-bar">
        <button className={tab === 'nearby' ? 'active' : ''} onClick={() => setTab('nearby')}>Nearby Mandi Prices</button>
        <button className={tab === 'trend' ? 'active' : ''} onClick={() => setTab('trend')}>Market Trend</button>
      </div>

      <div className="scroll-body">
        <div className="mandi-list">
          {mandiPricesData.map(m => (
            <div key={m.market} className="mandi-item">
              <div>
                <strong>{m.market}</strong>
                <small>{m.time}</small>
              </div>
              <div className="mandi-price">₹{m.price}/kg</div>
            </div>
          ))}
        </div>

        <div className="rec-card">
          <div className="rec-header"><Sprout size={18} /><span>AgriDirect Recommended Price</span></div>
          <div className="rec-price">₹23 – ₹25/kg</div>
          <div className="rec-status">High demand · Good for farmers</div>
          <div className="mini-chart">
            <div className="chart-label"><span>High</span><span>Demand</span></div>
            <div className="chart-bars">
              {[35, 50, 65, 80, 95].map(h => <i key={h} style={{ height: `${h}%` }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── SCREEN 9: SMART BUYER MATCHING ──────────────────────────────────────── */
function BuyerMatchingScreen({ selectedBuyerIds, toggleBuyerSelect, onNavigate }) {
  return (
    <div className="screen screen-bg">
      <div className="top-nav">
        <button className="back-btn" onClick={() => onNavigate('farmer-products')}><ArrowLeft size={20} /></button>
        <h3>Matching Buyers</h3>
        <span />
      </div>

      <div className="matching-product-strip">
        <img src={productsData[0].image} alt="Tomato" />
        <div>
          <h4>Tomato</h4>
          <p>200 kg · Grade A · ₹24/kg</p>
        </div>
      </div>

      <div className="scroll-body">
        <p className="section-label">Potential Buyers</p>
        {potentialBuyersData.map(b => {
          const sel = selectedBuyerIds.includes(b.id)
          return (
            <div key={b.id} className="buyer-card">
              <img src={b.avatar} alt={b.name} className="b-avatar" />
              <div className="b-info">
                <strong>{b.name}</strong>
                <p>{b.type} · {b.qty} kg</p>
                <span className="b-offer">₹{b.offer}/kg</span>
              </div>
              <button className={`select-btn${sel ? ' selected' : ''}`} onClick={() => toggleBuyerSelect(b.id)}>
                {sel ? <Check size={14} /> : 'Select'}
              </button>
            </div>
          )
        })}

        <div className="demand-box">
          <div className="demand-row">
            <span>Total Demand Matched</span>
            <strong>200 kg / 200 kg</strong>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '100%' }} /></div>
        </div>

        <button className="btn-primary" onClick={() => onNavigate('order-tracking')}>Confirm Order</button>
      </div>
    </div>
  )
}

/* ── SCREEN 10: ORDER TRACKING ────────────────────────────────────────────── */
function OrderTrackingScreen({ onNavigate, notify }) {
  return (
    <div className="screen screen-bg">
      <div className="top-nav">
        <button className="back-btn" onClick={() => onNavigate('home')}><ArrowLeft size={20} /></button>
        <h3>Order & Delivery</h3>
        <span />
      </div>

      <div className="scroll-body">
        <div className="stepper">
          {[['Order Placed', 'done'], ['Processing', 'done'], ['Picked Up', 'done'], ['On the Way', 'active'], ['Delivered', '']].map(([label, state]) => (
            <div key={label} className={`step ${state}`}>
              <div className="step-dot" />
              <small>{label}</small>
            </div>
          ))}
        </div>

        <div className="tracking-card">
          <img src={productsData[0].image} alt="Tomato" />
          <div className="ti-info">
            <h4>Tomato</h4>
            <p>200 kg · 50 kg/bag</p>
            <strong>₹4,800</strong>
          </div>
          <button className="link-btn" onClick={() => notify('Order details viewed')}>View Details</button>
        </div>

        <div className="delivery-card">
          <div className="dp-icon"><Truck size={18} /></div>
          <div className="dp-text">
            <strong>Ravi Logistics</strong>
            <small>Tracking ID: #FL-321456</small>
          </div>
          <button className="contact-btn" onClick={() => notify('Contacting driver...')}>Contact</button>
        </div>

        <div className="map-box">
          <div className="map-area">
            <div className="map-road" />
            <div className="map-pin farm">📍 Farm</div>
            <div className="map-truck">🚚</div>
            <div className="map-pin buyer">📍 Buyer</div>
          </div>
          <div className="pickup-strip">
            <span>Pickup scheduled</span>
            <strong>Today, 4:00 PM – 5:00 PM</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── SCREEN 11: PAYMENT ───────────────────────────────────────────────────── */
function PaymentScreen({ onNavigate, notify }) {
  const [method, setMethod] = useState('upi')
  const methods = [
    ['upi', 'UPI', 'Google Pay / PhonePe / Paytm'],
    ['netbanking', 'Net Banking', null],
    ['wallet', 'Wallet', null],
    ['cod', 'Cash on Delivery', null],
  ]
  return (
    <div className="screen screen-bg">
      <div className="top-nav">
        <button className="back-btn" onClick={() => onNavigate('product-details')}><ArrowLeft size={20} /></button>
        <h3>Payment</h3>
        <span />
      </div>

      <div className="scroll-body">
        <div className="summary-box">
          <h4>Order Summary</h4>
          <div className="summary-row"><span>Tomato (200 kg)</span><strong>₹4,800</strong></div>
          <div className="summary-row"><span>Delivery Charge</span><strong>₹100</strong></div>
          <div className="summary-divider" />
          <div className="summary-row total"><span>Total Amount</span><strong>₹4,900</strong></div>
        </div>

        <div className="payment-box">
          <h4>Payment Method</h4>
          {methods.map(([key, title, sub]) => (
            <label key={key} className={`pm-item${method === key ? ' selected' : ''}`}>
              <input type="radio" name="pm" checked={method === key} onChange={() => setMethod(key)} />
              <div>
                <strong>{title}</strong>
                {sub && <small> ({sub})</small>}
              </div>
            </label>
          ))}
        </div>

        <button className="btn-primary" onClick={() => { notify('Payment Successful! Escrow holding funds.'); onNavigate('order-tracking') }}>
          Pay Securely
        </button>

        <div className="escrow-note"><Lock size={14} /><span>Secured with escrow</span></div>
      </div>
    </div>
  )
}

/* ── SCREEN 12: PROFILE ───────────────────────────────────────────────────── */
function ProfileScreen({ role, onNavigate }) {
  const menuItems = [
    { icon: <Sprout size={17} />, label: 'My Farm Details', screen: 'farmer-products' },
    { icon: <Users size={17} />, label: 'My Products', screen: 'farmer-products' },
    { icon: <Clock3 size={17} />, label: 'Order History', screen: 'order-tracking' },
    { icon: <Wallet size={17} />, label: 'Earnings', screen: 'price-comparison' },
    { icon: <Sliders size={17} />, label: 'Settings', screen: 'home' },
    { icon: <CircleHelp size={17} />, label: 'Help & Support', screen: 'home' },
  ]
  return (
    <div className="screen screen-bg">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=85" alt="Profile" />
        </div>
        <h3>Ramesh Kumar</h3>
        <p className="text-muted">{role}</p>
        <span className="verified-badge"><ShieldCheck size={12} /> Verified Farmer</span>
        <div className="stats-row">
          {[['12', 'Listings'], ['8', 'Orders'], ['4.8', 'Rating']].map(([val, label], i, arr) => (
            <div key={label} className="stat-col">
              <strong>{val}</strong><span>{label}</span>
              {i < arr.length - 1 && <div className="stat-divider" />}
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-body pad">
        {menuItems.map(({ icon, label, screen }) => (
          <div key={label} className="menu-item" onClick={() => onNavigate(screen)}>
            <div className="menu-icon">{icon}</div>
            <span>{label}</span>
            <ChevronRight size={16} color="#9ca3af" />
          </div>
        ))}
      </div>

      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  )
}

/* ── COMMON BOTTOM NAV ────────────────────────────────────────────────────── */
function BottomNav({ active, onNavigate }) {
  const items = [
    { key: 'home', icon: <Home size={20} />, label: 'Home' },
    { key: 'explore', icon: <Search size={20} />, label: 'Explore' },
    { key: 'orders', icon: <Clock3 size={20} />, label: 'Orders' },
    { key: 'messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { key: 'profile', icon: <UserRound size={20} />, label: 'Profile' },
  ]
  const screenMap = {
    explore: 'buyer-marketplace',
    orders: 'order-tracking',
    messages: 'buyer-matching',
  }
  return (
    <nav className="bottom-nav">
      {items.map(({ key, icon, label }) => (
        <button
          key={key}
          className={active === key ? 'active' : ''}
          onClick={() => onNavigate(screenMap[key] || key)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
