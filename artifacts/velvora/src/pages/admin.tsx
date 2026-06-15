import React, { useState, useEffect } from "react";
import { Star, CheckCircle, XCircle, Trash2, LogOut, RefreshCw } from "lucide-react";
import velvoraLogo from "@assets/velvora_1781462306011.PNG";

interface Review {
  id: number;
  name: string;
  rating: number;
  reviewText: string;
  photoPath: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function apiFetch(path: string, password: string, options?: RequestInit) {
  return fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": password,
      ...(options?.headers ?? {}),
    },
  });
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={s <= rating ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full border capitalize ${styles[status] ?? ""}`}>
      {status}
    </span>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState(() => sessionStorage.getItem("velvora_admin_pw") ?? "");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await apiFetch("/api/admin/reviews?status=pending", password);
    if (res.ok) {
      sessionStorage.setItem("velvora_admin_pw", password);
      setAuthed(true);
    } else {
      setAuthError("Incorrect password. Try again.");
    }
  }

  async function fetchReviews() {
    setLoading(true);
    try {
      const url = filter === "all"
        ? "/api/admin/reviews"
        : `/api/admin/reviews?status=${filter}`;
      const res = await apiFetch(url, password);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) fetchReviews();
  }, [authed, filter]);

  async function updateStatus(id: number, status: "approved" | "rejected") {
    setActionLoading(id);
    try {
      const res = await apiFetch(`/api/admin/reviews/${id}`, password, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showToast(status === "approved" ? "Review approved ✓" : "Review rejected");
        fetchReviews();
      }
    } finally {
      setActionLoading(null);
    }
  }

  async function deleteReview(id: number) {
    if (!confirm("Delete this review permanently?")) return;
    setActionLoading(id);
    try {
      const res = await apiFetch(`/api/admin/reviews/${id}`, password, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Review deleted");
        fetchReviews();
      }
    } finally {
      setActionLoading(null);
    }
  }

  function logout() {
    sessionStorage.removeItem("velvora_admin_pw");
    setAuthed(false);
    setPassword("");
    setReviews([]);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src={velvoraLogo} alt="VELVORA" className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-[#b5863a]/30" />
            <h1 className="font-serif text-2xl font-bold text-[#3b2a1a]">VELVORA Admin</h1>
            <p className="text-sm text-[#7a6045] mt-1">Review Management</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-sm border border-[#e8ddd0] p-8">
            <label className="block text-sm font-medium text-[#3b2a1a] mb-2">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#d9ccbe] rounded-xl px-4 py-3 text-[#3b2a1a] focus:outline-none focus:ring-2 focus:ring-[#b5863a]/30 mb-4 bg-[#faf7f2]"
              placeholder="Enter admin password"
              required
            />
            {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-[#b5863a] text-white rounded-xl py-3 font-medium tracking-wide hover:bg-[#9a7230] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const counts = {
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[#3b2a1a] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-[#e8ddd0] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={velvoraLogo} alt="VELVORA" className="w-9 h-9 rounded-full object-cover border border-[#b5863a]/30" />
          <div>
            <h1 className="font-serif text-lg font-bold text-[#3b2a1a]">VELVORA Admin</h1>
            <p className="text-xs text-[#7a6045]">Review Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchReviews}
            className="p-2 text-[#7a6045] hover:text-[#3b2a1a] hover:bg-[#f0e8da] rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-[#7a6045] hover:text-[#3b2a1a] px-3 py-2 hover:bg-[#f0e8da] rounded-lg transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-6 bg-white rounded-xl border border-[#e8ddd0] p-1 w-fit">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-[#b5863a] text-white"
                  : "text-[#7a6045] hover:text-[#3b2a1a] hover:bg-[#f0e8da]"
              }`}
            >
              {f}
              {f === "pending" && counts.pending > 0 && (
                <span className="ml-1.5 bg-white/30 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {counts.pending}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#7a6045]">Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#7a6045] font-serif text-lg">No {filter === "all" ? "" : filter} reviews yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-[#e8ddd0] p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="font-serif font-bold text-[#3b2a1a]">{review.name}</span>
                      <StarDisplay rating={review.rating} />
                      <StatusBadge status={review.status} />
                    </div>
                    <p className="text-sm text-[#7a6045] mb-3">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </p>
                    <p className="text-[#3b2a1a] leading-relaxed">{review.reviewText}</p>
                    {review.photoPath && (
                      <div className="mt-3">
                        <img
                          src={`${BASE}/api/storage${review.photoPath}`}
                          alt="Customer photo"
                          className="w-32 h-32 object-cover rounded-xl border border-[#e8ddd0]"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {review.status !== "approved" && (
                      <button
                        onClick={() => updateStatus(review.id, "approved")}
                        disabled={actionLoading === review.id}
                        className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle size={15} />
                        Approve
                      </button>
                    )}
                    {review.status !== "rejected" && (
                      <button
                        onClick={() => updateStatus(review.id, "rejected")}
                        disabled={actionLoading === review.id}
                        className="flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        <XCircle size={15} />
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(review.id)}
                      disabled={actionLoading === review.id}
                      className="flex items-center gap-1.5 bg-gray-50 text-gray-600 border border-gray-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
