import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Invoices | Dashboard",
    description: 'Invoices of the Idle Miner App',
  };
  
const Invoices = () => {
    return (
        <div>
            <h1>Invoices</h1>
        </div>
    );
}

export default Invoices;