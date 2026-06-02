import Badge from "@/components/ui/Badge";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "success" | "pending" | "failed";
  method: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const statusVariant = { success: "green", pending: "yellow", failed: "red" } as const;
  const statusLabel = { success: "Paid", pending: "Pending", failed: "Failed" };

  return (
    <div>
      <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#555", marginBottom: "16px" }}>
        Transaction History
      </h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["Transaction ID", "Date", "Description", "Method", "Amount", "Status"].map((h) => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#444", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={tx.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <td style={{ padding: "14px 16px", fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", color: "#CC0000", letterSpacing: "0.5px" }}>{tx.id}</td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#666", whiteSpace: "nowrap" }}>{tx.date}</td>
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#E8E8E8" }}>{tx.description}</td>
                <td style={{ padding: "14px 16px", fontSize: "12px", color: "#555", fontFamily: "'Rajdhani', sans-serif" }}>{tx.method}</td>
                <td style={{ padding: "14px 16px", fontFamily: "'Bebas Neue', cursive", fontSize: "18px", color: "#E8E8E8", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>₹{tx.amount}</td>
                <td style={{ padding: "14px 16px" }}>
                  <Badge variant={statusVariant[tx.status]}>{statusLabel[tx.status]}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#444", fontFamily: "'Rajdhani', sans-serif" }}>No transactions found</div>
        )}
      </div>
    </div>
  );
}
