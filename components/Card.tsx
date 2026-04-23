type CardProps = {
  name: string;
  price: string;
};

export default function Card({ name, price }: CardProps) {
  return (
    <div
      style={{
        width: "160px",
        height: "170px",
        backgroundColor: "white",
        padding: "8px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
    justifyContent:"space-between",
        
      }}
    >
      <div>
        <h4 style={{ fontSize: "14px", margin: 0 }}>{name}</h4>
      </div>

      <p style={{ color: "green", margin: 0 }}>${price}</p>

      <button
        style={{
          fontSize: "12px",
          padding: "15px",
          backgroundColor: "black",
          color: "white",
          border: "none"
        }}
      >
        Shop
      </button>
    </div>
  );
}