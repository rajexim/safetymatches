import React, { useEffect, useMemo, useState } from 'react';
import {
  Image as ImageIcon,
  LayoutTemplate,
  Package,
  Save,
  Upload,
  Plus,
  Trash2,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import SmartImage from '../components/SmartImage';

const TABS = [
  { id: 'banners', label: 'Banners', icon: LayoutTemplate },
  { id: 'products', label: 'Products & Galleries', icon: Package },
  { id: 'site', label: 'Site Text', icon: ImageIcon }
];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('cmsPassword') || '');
  const [authed, setAuthed] = useState(!!sessionStorage.getItem('cmsPassword'));
  const [tab, setTab] = useState('banners');
  const [content, setContent] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState('household');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const selectedProduct = useMemo(
    () => (content?.products || []).find((p) => p.id === selectedProductId) || null,
    [content, selectedProductId]
  );

  const loadContent = async () => {
    const res = await fetch(`/content/site-content.json?t=${Date.now()}`);
    const data = await res.json();
    setContent(data);
    if (data.products?.[0] && !data.products.find((p) => p.id === selectedProductId)) {
      setSelectedProductId(data.products[0].id);
    }
  };

  useEffect(() => {
    loadContent().catch((err) => setStatus({ type: 'error', message: err.message }));
  }, []);

  // Old sessions may store a wrong password (UI used to accept any string).
  // Re-check against the API and force login again if it fails.
  useEffect(() => {
    const stored = sessionStorage.getItem('cmsPassword');
    if (!stored) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/cms/login', {
          method: 'POST',
          headers: { 'x-cms-password': stored }
        });
        if (!res.ok && !cancelled) {
          sessionStorage.removeItem('cmsPassword');
          setAuthed(false);
          setPassword('');
          setStatus({
            type: 'error',
            message: 'Saved CMS password is invalid. Log in again with the CMS_PASSWORD from the server.'
          });
        }
      } catch {
        // Keep session; save will surface connectivity errors.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async () => {
    if (!password.trim()) {
      setStatus({ type: 'error', message: 'Enter CMS password' });
      return;
    }
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/cms/login', {
        method: 'POST',
        headers: { 'x-cms-password': password.trim() }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Invalid CMS password');
      sessionStorage.setItem('cmsPassword', password.trim());
      setAuthed(true);
      setStatus({ type: 'ok', message: 'Logged in.' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: `${err.message}. Check CMS_PASSWORD in the server systemd unit (glovel-cms).`
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem('cmsPassword');
    setAuthed(false);
    setPassword('');
  };

  const saveContent = async (nextContent = content) => {
    if (!nextContent) return false;
    setSaving(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/cms/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-cms-password': sessionStorage.getItem('cmsPassword') || ''
        },
        body: JSON.stringify(nextContent)
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        sessionStorage.removeItem('cmsPassword');
        setAuthed(false);
        setPassword('');
        throw new Error('Invalid CMS password — please log in again');
      }
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setStatus({ type: 'ok', message: `Saved at ${data.updatedAt}` });
      await loadContent();
      return true;
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file, folder) => {
    if (!file) throw new Error('No file selected');
    if (!file.type.startsWith('image/')) throw new Error('Please choose an image file');
    if (file.size > 18 * 1024 * 1024) throw new Error('Image must be under 18MB');

    setUploading(true);
    try {
      const dataUrl = await fileToBase64(file);
      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-cms-password': sessionStorage.getItem('cmsPassword') || ''
        },
        body: JSON.stringify({
          folder,
          filename: file.name,
          data: dataUrl
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        sessionStorage.removeItem('cmsPassword');
        setAuthed(false);
        setPassword('');
        throw new Error('Invalid CMS password — please log in again');
      }
      if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`);
      if (!data.path) throw new Error('Upload succeeded but no image path was returned');
      return data.path;
    } finally {
      setUploading(false);
    }
  };

  const applyProductPatch = (patchFn) => {
    let next = null;
    setContent((prev) => {
      next = {
        ...prev,
        products: prev.products.map((p) => (p.id === selectedProductId ? patchFn(p) : p))
      };
      return next;
    });
    return next;
  };

  const handleProductImageUpload = async (file, fieldKey, inputEl) => {
    try {
      const path = await uploadImage(file, `products/${selectedProductId}`);
      const next = applyProductPatch((p) => {
        const updated = { ...p, [fieldKey]: path };
        if (fieldKey === 'image') updated.showcaseImage = path;
        return updated;
      });
      setStatus({ type: 'ok', message: `Uploaded ${file.name}` });
      await saveContent(next);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      if (inputEl) inputEl.value = '';
    }
  };

  const handleGalleryImageUpload = async (file, index, inputEl) => {
    try {
      const path = await uploadImage(file, `products/${selectedProductId}`);
      const next = applyProductPatch((p) => {
        const gallery = [...(p.gallery || [])];
        gallery[index] = { ...gallery[index], src: path };
        return { ...p, gallery };
      });
      setStatus({ type: 'ok', message: `Uploaded ${file.name}` });
      await saveContent(next);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      if (inputEl) inputEl.value = '';
    }
  };

  const handleBannerImageUpload = async (file, index, inputEl) => {
    try {
      const path = await uploadImage(file, 'hero');
      let next = null;
      setContent((prev) => {
        const banners = [...prev.banners];
        banners[index] = { ...banners[index], image: path };
        next = { ...prev, banners };
        return next;
      });
      setStatus({ type: 'ok', message: `Uploaded ${file.name}` });
      await saveContent(next);
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      if (inputEl) inputEl.value = '';
    }
  };

  const updateBanner = (index, key, value) => {
    setContent((prev) => {
      const banners = [...prev.banners];
      banners[index] = { ...banners[index], [key]: value };
      return { ...prev, banners };
    });
  };

  const updateSite = (key, value) => {
    setContent((prev) => ({ ...prev, site: { ...prev.site, [key]: value } }));
  };

  const updateProduct = (key, value) => {
    setContent((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === selectedProductId ? { ...p, [key]: value } : p))
    }));
  };

  const updateGalleryItem = (index, key, value) => {
    setContent((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id !== selectedProductId) return p;
        const gallery = [...(p.gallery || [])];
        gallery[index] = { ...gallery[index], [key]: value };
        return { ...p, gallery };
      })
    }));
  };

  const addGalleryItem = () => {
    setContent((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === selectedProductId
          ? {
              ...p,
              gallery: [{ src: '', alt: '', label: '' }, ...(p.gallery || [])]
            }
          : p
      )
    }));
    setStatus({
      type: 'ok',
      message: 'New gallery slot added at the top — click Upload, then Save Changes if needed.'
    });
  };

  const removeGalleryItem = (index) => {
    setContent((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === selectedProductId
          ? { ...p, gallery: (p.gallery || []).filter((_, i) => i !== index) }
          : p
      )
    }));
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
            <Lock className="w-5 h-5 text-yellow-600" />
            Glovel CMS Login
          </div>
          <p className="text-sm text-slate-600">
            Simple built-in admin for banners, galleries, and site text.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="CMS password"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />
          <button
            onClick={login}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-3 rounded-xl"
          >
            Enter Admin
          </button>
          {status.message && (
            <p className={`text-xs ${status.type === 'error' ? 'text-red-600' : 'text-emerald-700'}`}>
              {status.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!content) {
    return <div className="min-h-screen grid place-items-center text-slate-600">Loading CMS content…</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-950 text-white px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-extrabold text-lg">Glovel CMS</div>
          <div className="text-xs text-slate-400">Manage banners, product galleries, and text</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadContent()}
            className="px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload
          </button>
          <button
            type="button"
            onClick={() => saveContent()}
            disabled={saving || uploading}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-slate-950 text-xs font-extrabold inline-flex items-center gap-1.5 disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving…' : uploading ? 'Uploading…' : 'Save Changes'}
          </button>
          <button type="button" onClick={logout} className="px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold">
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
        {status.message && (
          <div
            className={`rounded-xl px-4 py-3 text-sm flex items-start gap-2 ${
              status.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {status.type === 'error' ? <AlertCircle className="w-4 h-4 mt-0.5" /> : <CheckCircle2 className="w-4 h-4 mt-0.5" />}
            <span>{status.message}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 ${
                  tab === t.id ? 'bg-yellow-400 text-slate-950' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === 'banners' && (
          <div className="space-y-4">
            {content.banners.map((banner, index) => (
              <div key={banner.id || index} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="text-sm font-bold text-slate-900">Banner {index + 1}</div>
                <div className="grid md:grid-cols-[160px_1fr] gap-4">
                  <div className="space-y-2">
                    {banner.image ? (
                      <SmartImage
                        src={banner.image}
                        alt={`Preview of banner ${index + 1}`}
                        sizes="160px"
                        variant={400}
                        className="w-full h-24 object-cover rounded-lg border border-slate-200"
                      />
                    ) : (
                      <div className="h-24 rounded-lg bg-slate-100 border border-dashed border-slate-300" />
                    )}
                    <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          await handleBannerImageUpload(file, index, e.target);
                        }}
                      />
                    </label>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      className="border border-slate-300 rounded-lg px-3 py-2 text-sm sm:col-span-2"
                      value={banner.image || ''}
                      onChange={(e) => updateBanner(index, 'image', e.target.value)}
                      placeholder="Image path / URL"
                    />
                    <input
                      className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                      value={banner.tag || ''}
                      onChange={(e) => updateBanner(index, 'tag', e.target.value)}
                      placeholder="Tag"
                    />
                    <input
                      className="border border-slate-300 rounded-lg px-3 py-2 text-sm sm:col-span-2"
                      value={banner.title || ''}
                      onChange={(e) => updateBanner(index, 'title', e.target.value)}
                      placeholder="Title"
                    />
                    <textarea
                      className="border border-slate-300 rounded-lg px-3 py-2 text-sm sm:col-span-2 min-h-20"
                      value={banner.subtitle || ''}
                      onChange={(e) => updateBanner(index, 'subtitle', e.target.value)}
                      placeholder="Subtitle"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {content.products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold ${
                    selectedProductId === p.id ? 'bg-yellow-400 text-slate-950' : 'bg-white border border-slate-200'
                  }`}
                >
                  {p.category}
                </button>
              ))}
            </div>

            {selectedProduct && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedProduct.category || ''}
                    onChange={(e) => updateProduct('category', e.target.value)}
                    placeholder="Category"
                  />
                  <input
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedProduct.title || ''}
                    onChange={(e) => updateProduct('title', e.target.value)}
                    placeholder="Title"
                  />
                  <textarea
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm sm:col-span-2 min-h-20"
                    value={selectedProduct.desc || ''}
                    onChange={(e) => updateProduct('desc', e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    className="border border-slate-300 rounded-lg px-3 py-2 text-sm sm:col-span-2"
                    value={selectedProduct.specs || ''}
                    onChange={(e) => updateProduct('specs', e.target.value)}
                    placeholder="Specs"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: 'image', label: 'Catalog Image' },
                    { key: 'showcaseImage', label: 'Showcase Image' },
                    { key: 'heroImage', label: 'Product Page Hero Image' }
                  ].map((field) => (
                    <div key={field.key} className="border border-slate-200 rounded-xl p-3 space-y-2">
                      <div className="text-xs font-bold text-slate-700">{field.label}</div>
                      {selectedProduct[field.key] && (
                        <SmartImage
                          src={selectedProduct[field.key]}
                          alt={`Preview of ${field.label.toLowerCase()}`}
                          sizes="280px"
                          variant={400}
                          className="h-28 w-full object-contain rounded-lg bg-slate-50 border border-slate-100"
                        />
                      )}
                      <input
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs"
                        value={selectedProduct[field.key] || ''}
                        onChange={(e) => updateProduct(field.key, e.target.value)}
                      />
                      <label className="inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <Upload className="w-3.5 h-3.5" /> Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            await handleProductImageUpload(file, field.key, e.target);
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Gallery Images</h3>
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-slate-900 text-white"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Image
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(selectedProduct.gallery || []).map((img, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl p-3 space-y-2">
                      {img.src ? (
                        <SmartImage
                          src={img.src}
                          alt={img.alt || `Preview of gallery image ${index + 1}`}
                          sizes="280px"
                          variant={400}
                          className="h-28 w-full object-contain rounded-lg bg-slate-50"
                        />
                      ) : (
                        <div className="h-28 rounded-lg bg-slate-100 border border-dashed border-slate-300" />
                      )}
                      <input
                        className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs"
                        value={img.src || ''}
                        onChange={(e) => updateGalleryItem(index, 'src', e.target.value)}
                        placeholder="Image path"
                      />
                      <input
                        className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs"
                        value={img.alt || ''}
                        onChange={(e) => updateGalleryItem(index, 'alt', e.target.value)}
                        placeholder="Alt text — describe what is in the photo"
                      />
                      <input
                        className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-xs"
                        value={img.label || ''}
                        onChange={(e) => updateGalleryItem(index, 'label', e.target.value)}
                        placeholder="Caption under thumbnail (optional)"
                      />
                      <div className="flex items-center justify-between">
                        <label className="inline-flex items-center gap-1 text-xs font-semibold cursor-pointer">
                          <Upload className="w-3.5 h-3.5" /> Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              await handleGalleryImageUpload(file, index, e.target);
                            }}
                          />
                        </label>
                        <button
                          onClick={() => removeGalleryItem(index)}
                          className="text-red-600 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'site' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 grid sm:grid-cols-2 gap-3">
            {[
              ['phoneDisplay', 'Phone Display'],
              ['phoneTel', 'Phone Tel Link'],
              ['email', 'Email'],
              ['brandTagline', 'Top Bar Tagline'],
              ['trustBadge', 'Trust Badge Text'],
              ['factoryBadge', 'Hero Badge Text'],
              ['heroCta', 'Hero CTA Button Text']
            ].map(([key, label]) => (
              <label key={key} className="text-xs font-semibold text-slate-700 space-y-1">
                <span>{label}</span>
                <input
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-normal"
                  value={content.site?.[key] || ''}
                  onChange={(e) => updateSite(key, e.target.value)}
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
