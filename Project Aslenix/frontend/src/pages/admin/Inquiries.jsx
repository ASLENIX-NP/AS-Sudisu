import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);

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
      <div
        style={{
          padding: "30px",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "30px",
          }}
        >
          Customer Inquiries 📩
        </h1>

        <div
          style={{
            overflowX: "auto",
            background: "#1e293b",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
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
              {inquiries.map((item) => (
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
                      onClick={() =>
                        deleteInquiry(item._id)
                      }
                      style={{
                        background: "#ef4444",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Delete
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