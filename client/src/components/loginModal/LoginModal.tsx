import React from "react";
import { ISidebar } from "../../interface/props";
import styles from "../../styles/modal.module.css";

const LoginModal = ({ open,setModalOpen }: ISidebar) => {
  if (!open) return null;
  return (
    <>
      <div className={styles.overlay} />
      <form className={styles.modal}>
        <h3>Please log in</h3>
        <input type="text" placeholder="username"/>
        <input type="password" placeholder="password"/>



        <div className={styles.btnContainer}>
          <button className={styles.cancelBtn} onClick={() => setModalOpen()}>cancel</button>
          <button className={styles.confirmBtn}>register</button>
        </div>
      </form>
    </>
  );
};

export default LoginModal;
