import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import "../../styles/BusinessInquiries.css";

const API = import.meta.env.VITE_API_BASE_URL + "/business-inquiries";
const statuses = ["Pending", "Contacted", "Approved", "Rejected"];
const labels = { inquiryType: "Inquiry Type", name: "Name", business: "Business", company: "Company", owner: "Owner", shop: "Shop", location: "Location", phone: "Phone", email: "Email", products: "Products", quantity: "Quantity", sales: "Estimated Monthly Demand", message: "Notes" };
const contactValue = (key, value) => {
  if (key === "phone") return <a href={`tel:${value.replace(/[^\d+]/g, "")}`}>{value}</a>;
  if (key === "email") return <a href={`mailto:${value}`}>{value}</a>;
  return value;
};

const BusinessInquiryDetail = () => {
  const { id } = useParams(); const navigate = useNavigate(); const [inquiry, setInquiry] = useState(null);
  const load = async () => { try { const response = await fetch(`${API}/${id}`); const data = await response.json(); if (!data.success) throw new Error(data.message); setInquiry(data.inquiry); await fetch(`${API}/${id}/read`, { method: "PATCH" }); window.dispatchEvent(new Event("business-inquiries-updated")); } catch { toast.error("Business inquiry could not be loaded."); } };
  useEffect(() => { load(); }, [id]);
  const changeStatus = async (status) => { const response = await fetch(`${API}/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); const data = await response.json(); if (data.success) { setInquiry(data.inquiry); toast.success("Status updated."); } else toast.error(data.message || "Could not update status."); };
  const remove = async () => { const response = await fetch(`${API}/${id}`, { method: "DELETE" }); const data = await response.json(); if (data.success) { toast.success("Business inquiry deleted."); navigate("/admin/business-inquiries"); } else toast.error(data.message || "Could not delete inquiry."); };
  if (!inquiry) return <AdminLayout><div className="business-inquiries-page">Loading inquiry…</div></AdminLayout>;
  return <AdminLayout><div className="business-detail-page"><button className="back-link" onClick={() => navigate("/admin/business-inquiries")}>← Back to Business Inquiries</button><div className="business-detail-card"><div className="business-detail-head"><div><span className="type-badge">{inquiry.inquiryType}</span><h1>{inquiry.name}</h1><p>Submitted {new Date(inquiry.createdAt).toLocaleString()}</p></div><div><select value={inquiry.status} onChange={(event) => changeStatus(event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select><button className="business-delete" onClick={remove}>Delete</button></div></div><div className="business-detail-grid">{Object.entries(labels).map(([key, label]) => inquiry[key] ? <div key={key} className={key === "message" ? "detail-wide" : ""}><span>{label}</span><strong className={key === "message" ? "detail-message" : ""}>{contactValue(key, inquiry[key])}</strong></div> : null)}</div></div></div></AdminLayout>;
};
export default BusinessInquiryDetail;
