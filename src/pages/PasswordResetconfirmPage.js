import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmPasswordReset } from "../actions/userAction";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PasswordResetConfirmPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { uidb64, token } = useParams();

  const passwordReset = useSelector((state) => state.passwordReset);
  const { loading, error, success } = passwordReset;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      dispatch(confirmPasswordReset(uidb64, token, password));
    }
  };

  return (
    <div className="flex justify-between">
      <img
        src={require("../image/22.avif")}
        alt="login"
        className="w-[800px] h-screen"
      />
      <div className="p-7 w-full my-auto space-y-[70px]">
        <h1 className="text-3xl font-black text-center">GharSewa</h1>
        <div>
          <p className="text-zinc-400 font-thin text-center text-sm">
            Reset Password
          </p>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && (
            <div className="alert alert-success">
              Password successfully reset
            </div>
          )}
          <form onSubmit={submitHandler}>
            <div className="flex flex-col p-[20px] space-y-[20px] pt-[30px] ">
              <label htmlFor="password" className="text-sm">
                New Password
              </label>
              <input
                type="password"
                className="border-b-2 h-[40px]"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="confirmPassword" className="text-sm">
                Confirm Password
              </label>
              <input
                type="password"
                className="border-b-2 h-[40px]"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="submit"
                className="bg-slate-700 w-[180px] h-[40px] text-white rounded-[15px] mx-auto text-sm"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirmPage;
