import React from 'react';
import { db } from '../../lib/database';
import { History, User, Clock, Shield } from 'lucide-react';

export const AdminLogs: React.FC = () => {
  const activities = db.getActivities();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#08152F]">System Activity & Audit Logs</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Chronological audit trail tracking administrative logins, content updates, lead status transitions, and publishing events.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F8FC] border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6">Actor / User</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Action Executed</th>
                <th className="py-3 px-6">Target Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No activity logs recorded.
                  </td>
                </tr>
              ) : (
                activities.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-slate-400 text-[11px]">
                      {new Date(act.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-slate-900">{act.actor}</td>
                    <td className="py-3.5 px-6">
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {act.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-blue-600">{act.action}</td>
                    <td className="py-3.5 px-6 text-slate-700 font-mono text-[11px]">{act.target}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
