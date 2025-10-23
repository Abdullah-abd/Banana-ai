// import { useEffect, useState } from "react";
// import { addProperty, deleteProperty, getProperties } from "../api/api";
// import Card from "../components/PropertyCard";
// import PropertyForm from "../components/PropertyForm";

// const PropertyDashboard = () => {
//   const [properties, setProperties] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingProperty, setEditingProperty] = useState(null);

//   // Fetch properties
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         const data = await getProperties();
//         setProperties(data || []);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProperties();
//   }, []);

//   // Add or Edit property
//   const handleSubmitProperty = async (propertyData) => {
//     if (editingProperty) {
//       // Edit mode: update local state
//       setProperties((prev) =>
//         prev.map((p) =>
//           p.id === editingProperty.id || p._id === editingProperty._id
//             ? { ...p, ...propertyData }
//             : p
//         )
//       );
//       setEditingProperty(null);
//     } else {
//       // Add mode
//       try {
//         const newProperty = await addProperty(propertyData);
//         setProperties((prev) => [...prev, newProperty]);
//       } catch (error) {
//         console.error("Error adding property:", error);
//       }
//     }
//     setShowForm(false);
//   };

//   // Delete property
//   const handleDeleteProperty = async (propertyId) => {
//     try {
//       await deleteProperty(propertyId);
//       setProperties((prev) =>
//         prev.filter((p) => p.id !== propertyId && p._id !== propertyId)
//       );
//     } catch (error) {
//       console.error("Failed to delete property:", error);
//     }
//   };

//   // Open form in edit mode
//   const handleEditProperty = (property) => {
//     setEditingProperty(property);
//     setShowForm(true);
//   };

//   // Filter properties based on search
//   const filteredProperties = properties.filter(
//     (p) =>
//       p.name?.toLowerCase().includes(search.toLowerCase()) ||
//       p.location?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       {/* Top Bar: Search + Add Property */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <input
//           type="text"
//           placeholder="Search by name or location"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/2 px-3 py-2 border rounded"
//         />
//         <button
//           onClick={() => {
//             setEditingProperty(null);
//             setShowForm((prev) => !prev);
//           }}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           {showForm ? "Close Form" : "Add Property"}
//         </button>
//       </div>

//       {/* Property Form */}
//       {showForm && (
//         <PropertyForm
//           onSubmit={handleSubmitProperty}
//           onClose={() => setShowForm(false)}
//           initialData={editingProperty}
//         />
//       )}

//       {/* Cards List */}
//       <div className="flex flex-wrap gap-6 justify-center mt-6">
//         {loading ? (
//           <p className="text-gray-500">Loading properties...</p>
//         ) : filteredProperties.length > 0 ? (
//           filteredProperties.map((property) => (
//             <Card
//               key={property.id || property._id}
//               title={property.name}
//               description={`📍 ${property.location} | 🏠 ${property.area_sqft} sqft | 💰 $${property.price}`}
//               image={property.image}
//               onDelete={() => handleDeleteProperty(property.id || property._id)}
//               onEdit={() => handleEditProperty(property)}
//             />
//           ))
//         ) : (
//           <p className="text-gray-500">No properties found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertyDashboard;
import { useEffect, useState } from "react";
import {
  addProperty,
  deleteProperty,
  getProperties,
  updateProperty,
} from "../api/api";
import Card from "../components/PropertyCard";
import PropertyForm from "../components/PropertyForm";

const PropertyDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Add or Update property
  const handleSubmitProperty = async (propertyData) => {
    if (editingProperty) {
      // Edit mode: call API to update
      try {
        const updatedProperty = await updateProperty(
          editingProperty.id || editingProperty._id,
          propertyData
        );
        setProperties((prev) =>
          prev.map((p) =>
            p.id === updatedProperty.id || p._id === updatedProperty._id
              ? updatedProperty
              : p
          )
        );
      } catch (error) {
        console.error("Failed to update property:", error);
      }
      setEditingProperty(null);
    } else {
      // Add mode
      try {
        const newProperty = await addProperty(propertyData);
        setProperties((prev) => [...prev, newProperty]);
      } catch (error) {
        console.error("Error adding property:", error);
      }
    }
    setShowForm(false);
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await deleteProperty(propertyId);
      setProperties((prev) =>
        prev.filter((p) => p.id !== propertyId && p._id !== propertyId)
      );
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const filteredProperties = properties.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded"
        />
        <button
          onClick={() => {
            setEditingProperty(null);
            setShowForm((prev) => !prev);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showForm ? "Close Form" : "Add Property"}
        </button>
      </div>

      {/* Property Form */}
      {showForm && (
        <PropertyForm
          onSubmit={handleSubmitProperty}
          onClose={() => setShowForm(false)}
          initialData={editingProperty} // prefill for edit
        />
      )}

      {/* Cards List */}
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {loading ? (
          <p className="text-gray-500">Loading properties...</p>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Card
              key={property.id || property._id}
              title={property.name}
              description={`📍 ${property.location} | 🏠 ${property.area_sqft} sqft | 💰 $${property.price}`}
              image={property.image}
              onDelete={() => handleDeleteProperty(property.id || property._id)}
              onEdit={() => handleEditProperty(property)}
            />
          ))
        ) : (
          <p className="text-gray-500">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyDashboard;
