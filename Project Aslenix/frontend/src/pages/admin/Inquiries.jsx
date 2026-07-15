import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/Inquiries.css";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInquiries = inquiries.filter(
    (item) =>
      (item.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (item.email || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/inquiries"
      );

      const data = await response.json();

      if (data.success) {
        setInquiries(data.inquiries);

        const markReadResponse = await fetch(
          "http://localhost:5001/api/inquiries/mark-read",
          { method: "PUT" },
        );

        if (markReadResponse.ok) {
          window.dispatchEvent(new Event("inquiries-read"));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/inquiries/${id}`,
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

  <div className="inquiry-stat total-card">
    <div className="stat-icon">
      📨
    </div>

    <div>
      <p className="stat-label">
        Total Inquiries
      </p>

      <h2 className="stat-number">
        {inquiries.length}
      </h2>
    </div>
  </div>

  <div className="inquiry-stat search-card">
    <div className="stat-icon">
      🔍
    </div>

    <div>
      <p className="stat-label">
        Search Results
      </p>

      <h2 className="stat-number">
        {filteredInquiries.length}
      </h2>
    </div>
  </div>

  <div className="inquiry-stat active-card">
    <div className="stat-icon">
      🟢
    </div>

    <div>
      <p className="stat-label">
        System Status
      </p>

      <h2
        className="stat-number"
        style={{ color: "#22c55e" }}
      >
        Active
      </h2>
    </div>
  </div>

</div>

 
        {/* SEARCH */}

<div className="inquiry-search">
  <div className="search-wrapper">

    <span className="search-icon">
      🔍
    </span>

    <input
      type="text"
      placeholder="Search inquiries by customer, email or phone..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />

  </div>
</div>

        {/* TABLE */}

        <div className="inquiries-card">

          {filteredInquiries.length === 0 ? (

  <div className="empty-state">

  <div className="empty-icon">
    📨
  </div>

  <h3>
    No Inquiries Yet
  </h3>

  <p>
    Customer inquiries submitted from your
    website will appear here.
  </p>

  <span className="empty-hint">
    Waiting for customer messages...
  </span>

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
