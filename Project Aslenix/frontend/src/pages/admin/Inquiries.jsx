import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/inquiries.css";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

const filteredInquiries = inquiries.filter(
  (item) =>
    item.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    item.email
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
);
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/inquiries"
      );

      const data = await response.json();

      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/inquiries/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchInquiries();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
  <div className="inquiries-container">
       <h1>Customer Inquiries 📩</h1>

<div className="inquiry-search">
  <input
    type="text"
    placeholder="🔍 Search inquiries..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />
</div>

     <div className="inquiries-card">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#334155",
                }}
              >
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
             {filteredInquiries.map((item) => (
                <tr
                  key={item._id}
                  style={{
                    borderBottom: "1px solid #334155",
                  }}
                >
                  <td style={tdStyle}>{item.name}</td>

                  <td style={tdStyle}>{item.email}</td>

                  <td style={tdStyle}>{item.phone}</td>

                  <td style={tdStyle}>
                    {item.message}
                  </td>

                  <td style={tdStyle}>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td style={tdStyle}>
                  <button
  className="delete-btn"
  onClick={() =>
    deleteInquiry(item._id)
  }
>
  🗑 Delete
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
  color: "#facc15",
};

const tdStyle = {
  padding: "16px",
};

export default Inquiries;