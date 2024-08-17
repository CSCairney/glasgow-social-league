import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Customers | Dashboard",
    description: 'Customers of the Idle Miner App',
  };

const Customers = () => {
    return (
        <div>
            <h1>Customers</h1>
        </div>
    );
}

export default Customers;