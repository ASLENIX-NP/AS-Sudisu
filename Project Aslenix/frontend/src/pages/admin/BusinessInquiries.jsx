import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import "../../styles/BusinessInquiries.css";

const API = "http://localhost:5001/api/business-inquiries";
const statuses = ["Pending", "Contacted", "Approved", "Rejected"];
const businessTypes = [
  "Distributor Application",
  "Bulk Order Inquiry",
  "Retail Partnership",
  "Catalog Request",
];

const BusinessInquiries = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setType(searchParams.get("type") || "All");
  }, [searchParams]);

  const loadInquiries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API);
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message);
      setInquiries(data.inquiries || []);
    } catch (error) { toast.error("Could not load business inquiries."); } finally { setIsLoading(false); }
  };
  useEffect(() => {
    loadInquiries();
    window.addEventListener("business-inquiries-updated", loadInquiries);
    return () => window.removeEventListener("business-inquiries-updated", loadInquiries);
  }, []);

  const filtered = useMemo(() => inquiries.filter((inquiry) => {
    const text = [inquiry.name, inquiry.business, inquiry.company, inquiry.owner, inquiry.shop, inquiry.phone, inquiry.products, inquiry.inquiryType].join(" ").toLowerCase();
    return text.includes(search.toLowerCase()) && (status === "All" || inquiry.status === status) && (type === "All" || inquiry.inquiryType === type);
  }), [inquiries, search, status, type]);

  const countType = (value) => inquiries.filter((item) => item.inquiryType === value).length;
  const unreadTypeCount = (value) => inquiries.filter((item) => item.inquiryType === value && !item.isRead).length;

  return <AdminLayout><div className="business-inquiries-page">
    <div className="business-inquiries-header"><div><h1>Business Inquiries</h1><p>Manage distributor, bulk-order, retail, and catalog requests.</p></div></div>
    <div className="business-stats business-type-stats">
      {businessTypes.map((businessType) => {
        const unread = unreadTypeCount(businessType);
        const total = countType(businessType);
        const read = total - unread;
        return <button key={businessType} type="button" className={`business-type-card ${type === businessType ? "is-active" : ""}`} style={{ border: type === businessType ? "1px solid #2563eb" : "1px solid #e7edf5", borderRadius: 16, padding: 18, background: type === businessType ? "#f8fbff" : "#fff", boxShadow: "0 6px 20px rgba(15,23,42,.05)", cursor: "pointer", font: "inherit", textAlign: "left" }} onClick={() => setType(businessType)}><span>{businessType}</span><strong>{total}</strong><small>Unread: {unread} · Read: {read}</small></button>;
      })}
    </div>
    <div className="business-toolbar"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search business inquiries..." /><select value={type} onChange={(event) => setType(event.target.value)}><option>All</option>{[...new Set(inquiries.map((item) => item.inquiryType))].map((item) => <option key={item}>{item}</option>)}</select><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></div>
    <div className="business-table-wrap"><table><thead><tr><th>Type</th><th>Name / Business</th><th>Phone</th><th>Email</th><th>Products</th><th>Quantity</th><th>Status</th><th>Date</th><th></th></tr></thead><tbody>{!isLoading && filtered.map((item) => <tr key={item._id} className={!item.isRead ? "unread" : ""} onClick={() => navigate(`/admin/business-inquiries/${item._id}`)}><td><span className="type-badge">{item.inquiryType}</span>{!item.isRead && <span className="unread-badge">Unread</span>}</td><td><strong>{item.name}</strong>{(item.business || item.company || item.shop || item.owner) && <small>{item.business || item.company || item.shop || item.owner}</small>}</td><td>{item.phone ? <a className="business-contact-link" href={`tel:${item.phone.replace(/[^\d+]/g, "")}`} onClick={(event) => event.stopPropagation()}>{item.phone}</a> : "—"}</td><td>{item.email ? <a className="business-contact-link" href={`mailto:${item.email}`} onClick={(event) => event.stopPropagation()}>{item.email}</a> : "—"}</td><td>{item.products || "—"}</td><td>{item.quantity || "—"}</td><td><span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span></td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td><button type="button" onClick={(event) => { event.stopPropagation(); navigate(`/admin/business-inquiries/${item._id}`); }}>View</button></td></tr>)}</tbody></table>{isLoading ? <div className="business-empty">Loading business inquiries...</div> : !filtered.length && <div className="business-empty">No business inquiries found.</div>}</div>
  </div></AdminLayout>;
};
export default BusinessInquiries;
