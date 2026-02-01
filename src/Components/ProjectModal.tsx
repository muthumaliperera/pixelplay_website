import React, { useEffect } from "react";
import { Project } from "../data/projects";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const images =
    project.images && project.images.length > 0
      ? project.images
      : [{ src: project.image }];

  // Freeze background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div
        className="bg-white w-full h-[100vh] rounded-t-3xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER (FIXED / STICKY) */}
        <div className="sticky top-0 z-40 bg-white border-b">
          <div className="flex items-start gap-4 px-12 py-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold">{project.title}</h2>
              {project.description && (
                <p className="text-gray-600 mt-0">{project.description}</p>
              )}
            </div>

            {/* CLOSE ICON */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-full p-2 hover:bg-gray-100 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="w-full px-12 py-8">
            {project.category === "graphic" ? (
              /* GRAPHIC GRID */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((img, i) => (
                  <div key={i} className="space-y-3">
                    <img
                      src={img.src}
                      alt={img.caption || `${project.title} ${i + 1}`}
                      className="w-full h-auto rounded-xl shadow-sm"
                    />

                    {img.caption && (
                      <p className="text-xl text-gray-600">{img.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* UI / PRESENTATION SCROLL */
              <div className="space-y-12">
                {images.map((img, i) => (
                  <div key={i} className="w-full space-y-4">
                    <img
                      src={img.src}
                      alt={img.caption || `${project.title} ${i + 1}`}
                      className="w-full h-auto rounded-xl shadow-sm"
                    />

                    {img.caption && (
                      <p className="text-sm text-gray-600 w-full">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
