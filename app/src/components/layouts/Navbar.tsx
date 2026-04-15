import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <nav>
        <div>
          <span>LOGO</span>
        </div>
        <div>
          <div>
           
<Link href="/">Home</Link>
            <Link href="/src/shop">Shop</Link>
            <Link href="/src/contact">Contact</Link>




          </div>
        </div>
        <div>
          <button>Cart</button>
        </div>
      </nav>
    </div>
  );
}