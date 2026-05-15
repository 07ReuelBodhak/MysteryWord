import { Card } from "@/components/shared/Card";
import { EmptyState } from "@/components/shared/EmptyState";
import { MessageSquare } from "lucide-react";
import { motion } from "motion/react";

export function GuessHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <Card className="h-full flex flex-col">
        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Question History</h3>
        <div className="flex-1 flex items-center justify-center min-h-[200px]">
          <EmptyState 
            title="No questions yet" 
            description="Responses will appear here."
            icon={MessageSquare} 
            className="border-none"
          />
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col max-h-[500px]">
      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Question History</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {history.map((item, idx) => {
          let borderColor = "border-neutral-500";
          let textColor = "text-neutral-400";
          let icon = "";
          let bg = "";
          
          if (item.answer === "Yes") {
            borderColor = "border-green-500";
            textColor = "text-green-500";
            icon = "✅";
          } else if (item.answer === "No") {
            borderColor = "border-red-500";
            textColor = "text-red-500";
            icon = "❌";
          } else {
            borderColor = "border-yellow-500";
            textColor = "text-yellow-500";
            bg = "bg-white/5 py-2 pr-2 rounded-r";
            icon = "🤔";
          }

          return (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={idx} 
              className={`border-l-2 ${borderColor} pl-3 ${bg}`}
            >
              <p className="text-[11px] text-neutral-500">{item.text}</p>
              <p className={`text-sm font-bold uppercase ${textColor}`}>{item.answer} {icon}</p>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
