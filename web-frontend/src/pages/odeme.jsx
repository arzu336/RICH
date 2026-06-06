import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Odeme() {
  const { cart, clearCart } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const total = cart.reduce((sum, item) => sum + Number(item.fiyat || item.price || 0), 0);
  const checkout = () => {
    if (cart.length === 0) return setMessage("Sepet boÅŸ.");
    setMessage("Ã–deme simÃ¼lasyonu baÅŸarÄ±lÄ±.");
    if (typeof clearCart === "function") clearCart();
  };
  return <div style={{background:"#0d1b33",border:"1px solid #243653",borderRadius:14,padding:20,color:"#fff"}}><h2 style={{color:"#d7ad5b"}}>Ã–deme</h2><p>Toplam: <b>{total} TL</b></p><button onClick={checkout} style={{background:"#d7ad5b",color:"#071122",border:0,borderRadius:8,padding:"12px 16px",fontWeight:700}}>Ã–demeyi Tamamla</button>{message && <p style={{color:"#4ade80"}}>{message}</p>}</div>
}
export default Odeme;


