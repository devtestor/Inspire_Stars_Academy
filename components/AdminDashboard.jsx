"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Clock3, ImagePlus, Images, LayoutDashboard, LogOut, Newspaper, Save, Search, Sparkles, Star, Trash2, UploadCloud } from "lucide-react";

const blankNewsItem = {
  id: "",
  slug: "",
  title: "",
  category: "",
  excerpt: "",
  body: "",
  image: "",
  alt: "",
  publishedAt: "",
  featured: false,
};

const blankGalleryItem = {
  id: "",
  title: "",
  caption: "",
  image: "",
  alt: "",
  publishedAt: "",
};

const tabs = [
  { key: "news", label: "News", icon: Newspaper },
  { key: "gallery", label: "Gallery", icon: Images },
];

function createDraftItem(template) {
  return { ...template, publishedAt: new Date().toISOString().slice(0, 16) };
}

function formatDate(value) {
  if (!value) return "Unscheduled";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unscheduled";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function createSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatTime(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatDateTime(value) {
  if (!value) return "Not scheduled";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not scheduled";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getItemState(item) {
  if (!item?.publishedAt) return { key: "draft", label: "Draft" };

  const time = new Date(item.publishedAt).getTime();
  if (Number.isNaN(time)) return { key: "draft", label: "Draft" };
  if (time > Date.now()) return { key: "scheduled", label: "Scheduled" };

  return { key: "live", label: "Live" };
}

function getStatusCounts(items) {
  return items.reduce(
    (summary, item) => {
      const state = getItemState(item).key;
      summary[state] += 1;
      return summary;
    },
    { live: 0, scheduled: 0, draft: 0 }
  );
}

export default function AdminDashboard({ username }) {
  const [content, setContent] = useState({ news: [], gallery: [], storageMode: "local" });
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState("");
  const [activeTab, setActiveTab] = useState("news");
  const [selected, setSelected] = useState({ news: 0, gallery: 0 });
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/content", { cache: "no-store" });
        const result = await response.json();

        if (!response.ok) {
          setError(result.error || "Unable to load dashboard content.");
          setLoading(false);
          return;
        }

        setContent(result);
      } catch {
        setError("Unable to load dashboard content.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setLoaded(true);
    };

    load();
  }, []);

  useEffect(() => {
    if (!loaded || !dirty) return undefined;

    const timeoutId = window.setTimeout(async () => {
      await saveContent(content, true);
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [content, dirty, loaded]);

  const collection = content[activeTab];
  const selectedIndex = Math.min(selected[activeTab], Math.max(collection.length - 1, 0));
  const selectedItem = collection[selectedIndex] || null;
  const storyCount = content.news.length;
  const galleryCount = content.gallery.length;
  const featuredCount = content.news.filter((item) => item.featured).length;
  const storyStatus = getStatusCounts(content.news);
  const galleryStatus = getStatusCounts(content.gallery);
  const latestPublish = [...content.news, ...content.gallery]
    .map((item) => item.publishedAt)
    .filter(Boolean)
    .sort((left, right) => new Date(right).getTime() - new Date(left).getTime())[0];
  const nextScheduled = [...content.news, ...content.gallery]
    .filter((item) => getItemState(item).key === "scheduled")
    .sort((left, right) => new Date(left.publishedAt).getTime() - new Date(right.publishedAt).getTime())[0];
  const filteredCollection = collection
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      const matchesQuery = !query || [item.title, item.category, item.excerpt, item.caption].some((value) => String(value || "").toLowerCase().includes(query.toLowerCase()));
      const matchesStatus = statusFilter === "all" || getItemState(item).key === statusFilter;
      return matchesQuery && matchesStatus;
    });

  const updateCollectionItem = (collectionKey, index, field, value) => {
    setContent((current) => {
      const currentItem = current[collectionKey][index];
      const nextItem = { ...currentItem, [field]: value };

      if (collectionKey === "news" && field === "title" && !currentItem.slug) {
        nextItem.slug = createSlug(value);
      }

      return {
        ...current,
        [collectionKey]: current[collectionKey].map((item, itemIndex) => (itemIndex === index ? nextItem : item)),
      };
    });
    setDirty(true);
    setNotice("");
  };

  const addCollectionItem = (collectionKey, template) => {
    setContent((current) => ({
      ...current,
      [collectionKey]: [createDraftItem(template), ...current[collectionKey]],
    }));
    setSelected((current) => ({ ...current, [collectionKey]: 0 }));
    setActiveTab(collectionKey);
    setDirty(true);
    setNotice("");
  };

  const removeCollectionItem = (collectionKey, index) => {
    setContent((current) => ({
      ...current,
      [collectionKey]: current[collectionKey].filter((_, itemIndex) => itemIndex !== index),
    }));

    setSelected((current) => ({
      ...current,
      [collectionKey]: Math.max(0, current[collectionKey] - (index <= current[collectionKey] ? 1 : 0)),
    }));
    setDirty(true);
    setNotice("");
  };

  const moveCollectionItem = (collectionKey, index, direction) => {
    setContent((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current[collectionKey].length) return current;

      const nextItems = [...current[collectionKey]];
      [nextItems[index], nextItems[nextIndex]] = [nextItems[nextIndex], nextItems[index]];

      return {
        ...current,
        [collectionKey]: nextItems,
      };
    });

    setSelected((current) => ({ ...current, [collectionKey]: Math.max(0, index + direction) }));
    setDirty(true);
    setNotice("");
  };

  const uploadImage = async (collectionKey, index, file) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(`${collectionKey}-${index}`);
    setError("");

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    setUploading("");

    if (!response.ok) {
      setError(result.error || "Image upload failed.");
      return;
    }

    updateCollectionItem(collectionKey, index, "image", result.path);
  };

  const saveContent = async (payload, silent = false) => {
    setSaving(true);
    setError("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok) {
      setSaving(false);
      setError(result.error || "Unable to save content.");
      return false;
    }

    setContent(result);
    setSaving(false);
    setDirty(false);
    setLastSavedAt(new Date().toISOString());

    if (!silent) {
      setNotice("All content changes are live.");
    } else {
      setNotice("Autosaved.");
    }

    return true;
  };

  const saveAll = async () => {
    setNotice("");
    const ok = await saveContent(content, false);
    if (!ok) {
      return;
    }
  };

  const signOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (loading) {
    return (
      <section className="admin-shell">
        <div className="admin-loading">Loading dashboard...</div>
      </section>
    );
  }

  return (
    <section className="admin-shell">
      <div className="admin-frame">
        <div className="admin-topbar">
          <div>
            <p className="admin-kicker">Inspire Stars Academy Rwanda</p>
            <span className="admin-brandline">Editorial operations dashboard</span>
          </div>
          <div className="admin-topbar-meta">
            <span className={`status-pill ${dirty ? "warning" : "live"}`}>{dirty ? "Changes pending" : "System synced"}</span>
            <span className="status-pill featured">{content.storageMode === "blob" ? "Blob storage" : "Local storage"}</span>
          </div>
        </div>

        <div className="admin-hero">
          <div className="admin-hero-copy">
            <p className="eyebrow">Private Dashboard</p>
            <h1>Editorial Control Center</h1>
            <p className="admin-copy">
              Manage the academy story, gallery moments and public-facing content with a cleaner publishing workflow. Signed in as {username}.
            </p>
            <div className="admin-state-row">
              <span className={`status-pill ${storyStatus.live ? "live" : "draft"}`}>{storyStatus.live} live stories</span>
              <span className={`status-pill ${galleryStatus.live ? "live" : "draft"}`}>{galleryStatus.live} live gallery items</span>
              {nextScheduled && <span className="status-pill scheduled">Next scheduled {formatDate(nextScheduled.publishedAt)}</span>}
              {lastSavedAt && <span className="admin-timestamp">Last save {formatTime(lastSavedAt)}</span>}
            </div>
          </div>
          <div className="admin-actions">
            <button className="btn secondary admin-btn" type="button" onClick={signOut}>
              <LogOut size={18} /> Sign Out
            </button>
            <button className="btn primary admin-btn" type="button" onClick={saveAll} disabled={saving}>
              <Save size={18} /> {saving ? "Saving..." : "Publish Changes"}
            </button>
          </div>
        </div>

        <div className="admin-metrics">
          <article className="metric-card">
            <span><LayoutDashboard size={16} /> Stories</span>
            <strong>{storyCount}</strong>
            <p>Published and draft news items in the editorial feed.</p>
          </article>
          <article className="metric-card">
            <span><Images size={16} /> Gallery</span>
            <strong>{galleryCount}</strong>
            <p>Image assets available for the homepage social section.</p>
          </article>
          <article className="metric-card">
            <span><Star size={16} /> Featured</span>
            <strong>{featuredCount}</strong>
            <p>Stories currently flagged for the hero treatment on the news page.</p>
          </article>
          <article className="metric-card">
            <span><Clock3 size={16} /> Latest Update</span>
            <strong>{formatDate(latestPublish)}</strong>
            <p>Most recent scheduled content date across the dashboard.</p>
          </article>
        </div>

        <div className="admin-overview">
          <article className="overview-panel">
            <div className="dashboard-card-head">
              <div>
                <p className="eyebrow dark">Publishing Health</p>
                <h2>Content Status</h2>
              </div>
            </div>
            <div className="signal-list">
              <div>
                <span>News queue</span>
                <strong>{storyStatus.live} live / {storyStatus.scheduled} scheduled / {storyStatus.draft} draft</strong>
              </div>
              <div>
                <span>Gallery queue</span>
                <strong>{galleryStatus.live} live / {galleryStatus.scheduled} scheduled / {galleryStatus.draft} draft</strong>
              </div>
              <div>
                <span>Featured stories</span>
                <strong>{featuredCount} selected for priority coverage</strong>
              </div>
            </div>
          </article>

          <article className="overview-panel">
            <div className="dashboard-card-head">
              <div>
                <p className="eyebrow dark">Selection</p>
                <h2>{selectedItem?.title || "No item selected"}</h2>
              </div>
            </div>
            <div className="signal-list">
              <div>
                <span>Status</span>
                <strong>{selectedItem ? getItemState(selectedItem).label : "Waiting"}</strong>
              </div>
              <div>
                <span>Publish window</span>
                <strong>{selectedItem ? formatDateTime(selectedItem.publishedAt) : "Select an item"}</strong>
              </div>
              <div>
                <span>Destination</span>
                <strong>{activeTab === "news" ? "News page and public API" : "Gallery section and public API"}</strong>
              </div>
            </div>
          </article>
        </div>

        {(error || notice) && (
          <div className="admin-notices">
            {error && <p className="form-status error">{error}</p>}
            {notice && <p className="form-status success">{notice}</p>}
          </div>
        )}

        <div className="admin-tabs" role="tablist" aria-label="Dashboard content sections">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`admin-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <strong>{content[tab.key].length}</strong>
              </button>
            );
          })}
        </div>

        <div className="admin-workspace">
          <aside className="admin-sidebar">
            <div className="sidebar-header">
              <div>
                <p className="eyebrow dark">{activeTab === "news" ? "News Feed" : "Visual Library"}</p>
                <h2>{activeTab === "news" ? "Content Queue" : "Gallery Queue"}</h2>
              </div>
              <button
                className="btn secondary sidebar-add"
                type="button"
                onClick={() => addCollectionItem(activeTab, activeTab === "news" ? blankNewsItem : blankGalleryItem)}
              >
                {activeTab === "news" ? <Newspaper size={18} /> : <ImagePlus size={18} />}
                {activeTab === "news" ? "Add Story" : "Add Image"}
              </button>
            </div>

            <div className="sidebar-toolbar">
              <label className="toolbar-search">
                <Search size={16} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${activeTab}...`} />
              </label>
              <label className="toolbar-filter">
                <span>Status</span>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="all">All</option>
                  <option value="live">Live</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="draft">Draft</option>
                </select>
              </label>
            </div>

            <div className="sidebar-list">
              {filteredCollection.map(({ item, index }) => {
                const state = getItemState(item);
                return (
                <button
                  key={item.id || `${activeTab}-${index}`}
                  type="button"
                  className={`sidebar-item ${index === selectedIndex ? "is-selected" : ""}`}
                  onClick={() => setSelected((current) => ({ ...current, [activeTab]: index }))}
                >
                  <div className="sidebar-thumb">
                    {item.image ? <img src={item.image} alt={item.alt || item.title || "Preview"} /> : <Sparkles size={20} />}
                  </div>
                  <div className="sidebar-meta">
                    <span>{activeTab === "news" ? item.category || "Story" : "Gallery image"}</span>
                    <strong>{item.title || "Untitled item"}</strong>
                    <p>{formatDate(item.publishedAt)}</p>
                    <div className="sidebar-tags">
                      <span className={`status-pill ${state.key}`}>{state.label}</span>
                      {activeTab === "news" && item.featured && <span className="status-pill featured">Featured</span>}
                    </div>
                  </div>
                </button>
                );
              })}
              {!filteredCollection.length && (
                <div className="sidebar-empty">
                  <Sparkles size={18} />
                  <p>No items match the current search or filter.</p>
                </div>
              )}
            </div>
          </aside>

          <div className="editor-panel">
            {selectedItem ? (
              <>
                <div className="editor-header">
                  <div>
                    <p className="eyebrow dark">{activeTab === "news" ? "Item Editor" : "Image Editor"}</p>
                    <h2>{selectedItem.title || (activeTab === "news" ? "New Story" : "New Image")}</h2>
                    <div className="editor-state-row">
                      <span className={`status-pill ${getItemState(selectedItem).key}`}>{getItemState(selectedItem).label}</span>
                      {activeTab === "news" && selectedItem.featured && <span className="status-pill featured">Featured</span>}
                    </div>
                  </div>
                  <div className="editor-actions">
                    <button type="button" className="icon-action" onClick={() => moveCollectionItem(activeTab, selectedIndex, -1)} aria-label="Move item up" disabled={selectedIndex === 0}>
                      <ArrowUp size={16} />
                    </button>
                    <button type="button" className="icon-action" onClick={() => moveCollectionItem(activeTab, selectedIndex, 1)} aria-label="Move item down" disabled={selectedIndex === collection.length - 1}>
                      <ArrowDown size={16} />
                    </button>
                    <button type="button" className="icon-action danger" onClick={() => removeCollectionItem(activeTab, selectedIndex)} aria-label="Delete current item">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="editor-layout">
                  <div className="editor-form">
                    <section className="editor-section">
                      <h3>Content Details</h3>
                      <div className="dashboard-fields">
                        <label className="field">
                          <span>Title</span>
                          <input value={selectedItem.title || ""} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "title", event.target.value)} />
                        </label>
                        {activeTab === "news" ? (
                          <label className="field">
                            <span>Category</span>
                            <input value={selectedItem.category || ""} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "category", event.target.value)} />
                          </label>
                        ) : (
                          <label className="field">
                            <span>Published</span>
                            <input type="datetime-local" value={(selectedItem.publishedAt || "").slice(0, 16)} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "publishedAt", event.target.value)} />
                          </label>
                        )}
                        {activeTab === "news" && (
                          <>
                            <label className="field">
                              <span>Published</span>
                              <input type="datetime-local" value={(selectedItem.publishedAt || "").slice(0, 16)} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "publishedAt", event.target.value)} />
                            </label>
                            <label className="field">
                              <span>Slug</span>
                              <input value={selectedItem.slug || ""} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "slug", createSlug(event.target.value))} />
                              <small className="field-hint">Used for cleaner news URLs and internal organization.</small>
                            </label>
                          </>
                        )}
                        <label className="field field-wide">
                          <span>{activeTab === "news" ? "Excerpt" : "Caption"}</span>
                          <textarea
                            rows={3}
                            value={activeTab === "news" ? selectedItem.excerpt || "" : selectedItem.caption || ""}
                            onChange={(event) => updateCollectionItem(activeTab, selectedIndex, activeTab === "news" ? "excerpt" : "caption", event.target.value)}
                          />
                        </label>
                        {activeTab === "news" && (
                          <label className="field field-wide">
                            <span>Body</span>
                            <textarea rows={6} value={selectedItem.body || ""} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "body", event.target.value)} />
                          </label>
                        )}
                      </div>
                    </section>

                    <section className="editor-section">
                      <h3>Media</h3>
                      <div className="dashboard-fields">
                        <label className="field field-wide">
                          <span>Image URL</span>
                          <input value={selectedItem.image || ""} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "image", event.target.value)} />
                          <small className="field-hint">Paste a public image URL or upload a new asset below.</small>
                        </label>
                        <label className="field">
                          <span>Upload Image</span>
                          <div className="upload-field">
                            <UploadCloud size={18} />
                            <input type="file" accept="image/*" onChange={(event) => event.target.files?.[0] && uploadImage(activeTab, selectedIndex, event.target.files[0])} />
                            <small>{uploading === `${activeTab}-${selectedIndex}` ? "Uploading..." : "PNG, JPG, WEBP or AVIF"}</small>
                          </div>
                        </label>
                        <label className="field">
                          <span>Alt Text</span>
                          <input value={selectedItem.alt || ""} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "alt", event.target.value)} />
                        </label>
                        {activeTab === "news" && (
                          <label className="field checkbox-field field-wide">
                            <input type="checkbox" checked={Boolean(selectedItem.featured)} onChange={(event) => updateCollectionItem(activeTab, selectedIndex, "featured", event.target.checked)} />
                            <span>Feature this story on the news page</span>
                          </label>
                        )}
                      </div>
                    </section>
                  </div>

                  <aside className="editor-preview">
                    <div className="preview-card">
                      <span className="preview-label">{activeTab === "news" ? "Live Card Preview" : "Gallery Preview"}</span>
                      <div className="preview-media">
                        {selectedItem.image ? <img src={selectedItem.image} alt={selectedItem.alt || selectedItem.title || "Preview"} /> : <Sparkles size={26} />}
                      </div>
                      <div className="preview-copy">
                        <p>{activeTab === "news" ? selectedItem.category || "Story" : "Gallery Image"}</p>
                        <h3>{selectedItem.title || (activeTab === "news" ? "Untitled story" : "Untitled image")}</h3>
                        <span>{activeTab === "news" ? selectedItem.excerpt || "Add an excerpt to preview the public card." : selectedItem.caption || "Add a caption to preview the gallery item."}</span>
                      </div>
                    </div>

                    <div className="preview-meta">
                      <div>
                        <span>Status</span>
                        <strong>{getItemState(selectedItem).label}</strong>
                      </div>
                      <div>
                        <span>Date</span>
                        <strong>{formatDate(selectedItem.publishedAt)}</strong>
                      </div>
                      {activeTab === "news" && (
                        <div>
                          <span>Featured</span>
                          <strong>{selectedItem.featured ? "Yes" : "No"}</strong>
                        </div>
                      )}
                      <div>
                        <span>Alt Text</span>
                        <strong>{selectedItem.alt || "Not set"}</strong>
                      </div>
                      {activeTab === "news" && (
                        <div>
                          <span>Slug</span>
                          <strong>{selectedItem.slug || "Auto-generated from title"}</strong>
                        </div>
                      )}
                    </div>
                  </aside>
                </div>
              </>
            ) : (
              <div className="editor-empty">
                <Sparkles size={24} />
                <h2>No items yet</h2>
                <p>Create the first {activeTab === "news" ? "story" : "gallery image"} to begin populating the site.</p>
                <button
                  className="btn primary admin-btn"
                  type="button"
                  onClick={() => addCollectionItem(activeTab, activeTab === "news" ? blankNewsItem : blankGalleryItem)}
                >
                  {activeTab === "news" ? "Add Story" : "Add Image"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
