import React from 'react';
import { Inbox, Clock, CheckCircle, XCircle } from 'lucide-react';

const StatusCards= ({ title, data, status }) => {
  const count = data.filter(task => task.status === status).length;

  const config = {
    'New': {
      Icon: Inbox,
      badgeBg: 'bg-green-500',
      iconColor: 'text-white',
    },
    'Pending': {
      Icon: Clock,
      badgeBg: 'bg-green-700',
      iconColor: 'text-white',
    },
    'Completed': {
      Icon: CheckCircle,
      badgeBg: 'bg-yellow-500',
      iconColor: 'text-white',
    },
    'Failed': {
      Icon: XCircle,
      badgeBg: 'bg-red-700',
      iconColor: 'text-white',
    },
  };

  const { Icon, badgeBg, iconColor } = config[status] || {};

  return (
    <div  className="
        relative cursor-pointer 
        transform hover:scale-105 transition-transform 
        bg-gradient-to-br from-blue-500 to-indigo-900 
        rounded-3xl 
        p-6 w-64 flex flex-col items-center m-4 shadow-lg shadow-black
      ">
      <div className={`absolute -top-5 ${badgeBg} rounded-full p-3 shadow-lg`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>

      <div className="mt-8 text-sm font-medium text-white uppercase tracking-wide">
        {title}
      </div>

      <div className="text-3xl font-bold text-white mt-2">
        {count}
      </div>

      <div className="mt-4 w-full bg-white/20 rounded-full h-1">
        <div
          className="bg-blue-500 h-1 rounded-full"
          style={{ width: `${Math.min(count * 8, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default StatusCards;
