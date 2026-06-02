import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../../layouts/AdminLayout";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    console.log(data);
    console.log(error);

    if (!error) {
      setCategories(data || []);
    }
  };

  return (
    <AdminLayout>
      <div
        style={{
          padding: "30px",
          color: "white",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "20px",
          }}
        >
          Categories 📂
        </h1>

        <div
          style={{
            background: "#111c44",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px" }}>
                  Name
                </th>

                <th style={{ textAlign: "left", padding: "12px" }}>
                  Description
                </th>

                <th style={{ textAlign: "left", padding: "12px" }}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td style={{ padding: "12px" }}>
                    {category.name}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {category.description}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {category.status}
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

export default CategoriesAdmin;