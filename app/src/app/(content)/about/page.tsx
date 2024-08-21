import { Metadata } from "next";
import React from "react";
import styles from "./styles.module.scss";

export const metadata: Metadata = {
    title: "About Us | GSL",
    description: 'History behind the GSL',
  };
  
const About = () => {
    return (
        <div className={styles.about}>
            <h1>About</h1>
        </div>
    );
}

export default About;