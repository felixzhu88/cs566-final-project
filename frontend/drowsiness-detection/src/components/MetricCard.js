import React from 'react';

export default function MetricCard({ icon, label, value, color, animate }) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/40',
    pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/40',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/40',
    green: 'from-green-500/20 to-green-600/20 border-green-500/40'
  };

  const textClasses = {
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    blue: 'text-blue-400',
    green: 'text-green-400'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 transform transition-all duration-700 ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      <div className={`${textClasses[color]} mb-3`}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}