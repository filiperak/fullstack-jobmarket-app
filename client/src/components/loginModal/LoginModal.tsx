import React, { useContext, useState } from "react";
import { ISidebar } from "../../interface/props";
import styles from "../../styles/modal.module.css";
//import { useAuth } from "../../services/users/useAuth";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { UserContext } from "../../context/UserContext";
import { loginUser } from "../../services/users/login";
import { registerUser } from "../../services/users/register";

const LoginModal = ({ open, setModalOpen }: ISidebar) => {
  const { userState, userDispatch } = useContext(UserContext);
  const [register, setRegister] = useState<boolean>(false);
  //const { handleLogin, handleRegister } = useAuth();
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

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
        await registerUser(
          formData.username,
          formData.email,
          formData.password,
          userDispatch
        );
      } else {
        await loginUser(formData.username, formData.password, userDispatch);
      }
      setModalOpen();
      setFormData({ username: "", email: "", password: "" });
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };
  const handleLogOut = (e: React.FormEvent) => {
    e.preventDefault();
    userDispatch({
      type: "LOG_OUT",
    });
    setModalOpen();
  };

  if (!open) return null;
  if (userState.logged) {
    return (
      <>
        <div className={styles.overlay}/>
        <form onSubmit={handleLogOut} className={styles.modal}>
            <h3>Log out</h3>
          <p>Do you want to log out?</p>
          <div className={styles.btnContainer}>
          <button
            className={styles.cancelBtn}
            onClick={handleClose}
            type="button"
          >
            Cancel
          </button>
          <button className={styles.confirmBtn} type="submit">
            Log out
          </button>
          </div>
        </form>
      </>
    );
  }
  return (
    <>
      <div className={styles.overlay} />
      <form onSubmit={handleSubmit} className={styles.modal}>
        <h3>{register ? "Please register account" : "Please sign in"}</h3>
        <p>
          {register ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className={styles.signinSpan} onClick={handleToggle}>
            {register ? "Sign In" : "Register"}
          </span>
        </p>
        {errorMsg && (
          <div className={styles.modalErrMsg}>
            <ReportGmailerrorredIcon />
            <p>{errorMsg}</p>
          </div>
        )}
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        {register && (
          <input
            type="email"
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
          <button
            className={styles.cancelBtn}
            onClick={handleClose}
            type="button"
          >
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
