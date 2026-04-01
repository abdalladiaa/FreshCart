import React from "react";

interface PageDescriptionProps {
  icon: React.ReactNode;
  page: string;
  description: string;
}

export default function PageDescription({
  icon,
  page,
  description,
}: PageDescriptionProps) {
    
  return (
    <>
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container px-4 py-10 sm:py-14">
          <div className="flex items-center gap-5">

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl text-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                {icon}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {page}
                </h1>
                <p className="text-white/80 mt-1">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
