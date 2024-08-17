import { Metadata } from "next";
import React from "react";
import styles from "./styles.module.scss";

export const metadata: Metadata = {
    title: "Contact Us | Idle Miner",
    description: 'Tell us more about your experience with the Idle Miner App',
  };

const Contact = () => {
    return (
        <div className={styles.contact}>
            <h1>Contact</h1>
        </div>
    );
}

export default Contact;