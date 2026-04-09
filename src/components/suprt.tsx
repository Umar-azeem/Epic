"use client"; 
import React from "react";

 function Suprt() {
  const services = [
    { name: 'Fortnite', status: 'Operational' },
    { name: 'LEGO Fortnite', status: 'Operational' },
    { name: 'Fortnite Festival', status: 'Operational' },
    { name: 'Rocket Racing', status: 'Operational' },
    { name: 'Rocket League', status: 'Operational' },
    { name: 'Fall Guys', status: 'Operational' },
  ];

  const incidents = [
    {
      date: 'Jan 27, 2026',
      title: 'EOS Maintenance',
      status: 'Completed',
      message: 'The scheduled maintenance has been completed.',
      time: 'Jan 27, 08:00 UTC',
    },
    {
      date: 'Jan 26, 2026',
      title: null,
      status: null,
      message: 'No incidents reported.',
      time: null,
    },
    {
      date: 'Jan 25, 2026',
      title: null,
      status: null,
      message: 'No incidents reported.',
      time: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-green-500 text-white rounded px-6 py-5 mb-8">
          <h2 className="text-xl">All Systems Operational</h2>
        </div>

        <div className="bg-white rounded border mb-12">
          {services.map((service) => (
            <div key={service.name} className="flex justify-between px-6 py-4 border-b last:border-0">
              <span className="text-sm">{service.name}</span>
              <span className="text-sm text-green-600">{service.status}</span>
            </div>
          ))}
        </div>

        <div>
          <h1 className="text-3xl mb-8">Past Incidents</h1>
          {incidents.map((incident) => (
            <div key={incident.date} className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-3 border-b">{incident.date}</h2>
              {incident.title ? (
                <div className="bg-white rounded border p-6">
                  <a href="#" className="text-blue-600 font-medium mb-4 block">{incident.title}</a>
                  <div className="mb-2">
                    <span className="font-semibold text-sm">{incident.status}</span>
                    <span className="text-sm text-gray-600"> - {incident.message}</span>
                  </div>
                  <p className="text-xs text-gray-400">{incident.time}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">{incident.message}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
export default Suprt