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

        {/* HEADER */}

        <div className="inquiries-header">
          <div className="inquiries-title">
            <h1>Customer Inquiries</h1>
            <p>
              View and manage customer messages received from the website.
            </p>
          </div>
        </div>

        {/* STATS */}

        <div className="inquiries-stats">

          <div className="inquiry-stat">
            <span>Total Inquiries</span>
            <h2>{inquiries.length}</h2>
          </div>

          <div className="inquiry-stat">
            <span>Search Results</span>
            <h2>{filteredInquiries.length}</h2>
          </div>

          <div className="inquiry-stat">
            <span>Status</span>
            <h2 style={{ color: "#22c55e" }}>
              Active
            </h2>
          </div>

        </div>

 
        {/* SEARCH */}

        <div className="inquiry-search">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        {/* TABLE */}

        <div className="inquiries-card">

          {filteredInquiries.length === 0 ? (

            <div className="empty-state">
              <h3>No inquiries found</h3>
              <p>
                Customer messages will appear here.
              </p>
            </div>

          ) : (

            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredInquiries.map((item) => (
                  <tr key={item._id}>

                    <td>
                      <div className="customer-name">
                        {item.name}
                      </div>

                      <div className="customer-email">
                        {item.email}
                      </div>
                    </td>

                    <td>
                      {item.phone}
                    </td>

                    <td>
                      <div className="message-preview">
                        {item.message?.length > 70
                          ? item.message.slice(0, 70) + "..."
                          : item.message}
                      </div>
                    </td>

                    <td>
                      <div className="inquiry-date">
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </td>

                    <td>
                      <span className="status-badge">
                        ● New
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteInquiry(item._id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>

          )}

        </div>

      </div>
    </AdminLayout>
  );
};

export default Inquiries;