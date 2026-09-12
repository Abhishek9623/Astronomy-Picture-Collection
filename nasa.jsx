import axios from "axios";
import { useEffect, useState } from "react";

export function Mars() {
  const [marsList, setMarsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_NASA_API_KEY;

  function LoadData() {
    setLoading(true);
    // count=12 मुळे API एकाच वेळी 12 फोटोचा Array रिटर्न करेल
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=12`)
      .then((response) => {
        setMarsList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    LoadData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <h5 className="mt-2">NASA Photos Load होत आहेत...</h5>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Astronomy Picture Collection</h2>
        {/* नवीन फोटो लोड करण्यासाठी बटण */}
        <button onClick={LoadData} className="btn btn-primary">
          Reload New Photos
        </button>
      </div>

      <div className="row g-4">
        {marsList.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              {item.media_type === "image" ? (
                <img
                  src={item.url}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="bg-dark text-white d-flex align-items-center justify-content-center"
                  style={{ height: "220px" }}
                >
                  <span>Video Content</span>
                </div>
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{item.title}</h5>
                <p className="card-subtitle mb-2 text-muted font-monospace">{item.date}</p>
                
                {/* 3 ओळींनंतर Text Cut होईल */}
                <p
                  className="card-text text-secondary small"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.explanation}
                </p>

                <div className="mt-auto pt-2">
                  {item.hdurl ? (
                    <a
                      href={item.hdurl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-primary w-100"
                    >
                      View Full HD
                    </a>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-secondary w-100"
                    >
                      Open Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}