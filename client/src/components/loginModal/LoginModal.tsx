import React, { useState } from "react";
import { ISidebar } from "../../interface/props";
import styles from "../../styles/modal.module.css";
import { useAuth } from "../../services/users/useAuth";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const LoginModal = ({ open, setModalOpen }: ISidebar) => {
  const [register, setRegister] = useState<boolean>(false);
  const { handleLogin, handleRegister } = useAuth();
  const [formData, setFormData] = useState<{ username: string; email: string; password: string }>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  if (!open) return null;

  const handleToggle = () => {
    setRegister((prev) => !prev);
    setFormData({ username: "", email: "", password: "" });
    setErrorMsg(null);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormData({ username: "", email: "", password: "" });
    setModalOpen();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      if (register) {
        await handleRegister(formData.username, formData.email, formData.password);
      } else {
        await handleLogin(formData.username, formData.password);
      }
      setModalOpen();
      setFormData({ username: "", email: "", password: "" });
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <div className={styles.overlay} />
      <form 
      onSubmit={handleSubmit}
      className={styles.modal}>
        <h3>{register ? "Please register account" : "Please sign in"}</h3>
        <p>
          {register ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className={styles.signinSpan} onClick={handleToggle}>
            {register ? "Sign In" : "Register"}
          </span>
        </p>
        { errorMsg && <div className={styles.modalErrMsg}>
            <ReportGmailerrorredIcon/>
            <p>{errorMsg}</p>
            </div>}
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        {register && (
          <input
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className={styles.btnContainer}>
          <button className={styles.cancelBtn} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.confirmBtn} type="submit">
            {register ? "Register" : "Sign in"}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginModal;
