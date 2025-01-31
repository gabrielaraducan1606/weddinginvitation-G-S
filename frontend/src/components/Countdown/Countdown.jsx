import React, { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

function Countdown() {
    const calculateTimeLeft = () => {
        const eventDate = new Date("2025-05-17T19:00:00");
        const now = new Date();
        const difference = eventDate - now;

        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                zile: Math.floor(difference / (1000 * 60 * 60 * 24)),
                ore: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minute: Math.floor((difference / 1000 / 60) % 60),
                secunde: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div id="countdown" className={styles.pageContainer}>
            <div className={styles.backgroundBlur}></div>
            <div className={styles.content}>
                <h2 className={styles.countdownTitle}>Mai sunt</h2>
                <div className={styles.countdownTimer}>
                    <div className={styles.timeBox}>
                        <span className={styles.timeNumber}>{timeLeft.zile}</span>
                        <span className={styles.timeLabel}>Zile</span>
                    </div>
                    <div className={styles.timeBox}>
                        <span className={styles.timeNumber}>{timeLeft.ore}</span>
                        <span className={styles.timeLabel}>Ore</span>
                    </div>
                    <div className={styles.timeBox}>
                        <span className={styles.timeNumber}>{timeLeft.minute}</span>
                        <span className={styles.timeLabel}>Minute</span>
                    </div>
                    <div className={styles.timeBox}>
                        <span className={styles.timeNumber}>{timeLeft.secunde}</span>
                        <span className={styles.timeLabel}>Secunde</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Countdown;
