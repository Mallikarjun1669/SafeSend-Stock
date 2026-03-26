import { useEffect, useState } from "react";
import connection from "../signalRConnection";

function StockPrice() {
    const [stockData, setStockData] = useState({ name: "", price: 0 });

    useEffect(() => {
        connection.start().catch(err => console.error(err));

        connection.on("ReceiveStockUpdate", (stockName, price) => {
            setStockData({ name: stockName, price });
        });

        return () => {
            connection.off("ReceiveStockUpdate");
        };
    }, []);

    return (
        <div>
            <h2>{stockData.name}: ₹{stockData.price}</h2>
        </div>
    );
}

export default StockPrice;