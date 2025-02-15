import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaUserTie, FaUserCog, FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../Firebase/config';

const CreateAccess = () => {
  const [role, setRole] = useState('Admin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (mobile.length !== 10) {
      toast.error('Mobile number must be exactly 10 digits');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await firebase.firestore().collection('users').doc(user.uid).set({
        name,
        email,
        mobile,
        role,
        uid: user.uid,
      });
      toast.success('Account Created successfully!');

      // Clear input fields after successful submission
      setName('');
      setEmail('');
      setMobile('');
      setPassword('');
      setConfirmPassword('');
      setRole('Admin'); // Reset role to default if needed
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use');
      } else {
        toast.error(error.message);
      }
    }
    setLoading(false);
  };


  return (
    <div className="bg-white font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full border p-8 rounded-md bg-gray-100">
        <div className="text-center">
          <FaUserTie size={80} className="text-gray-600 inline-block" />
        </div>

        <form className="mt-12 space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center justify-center mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="role" value="Admin" checked={role === 'Admin'} onChange={() => setRole('Admin')} className="hidden" />
              <FaUserCog className={`w-5 h-5 ${role === 'Admin' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="text-gray-800">Admin</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="role" value="Employee" checked={role === 'Employee'} onChange={() => setRole('Employee')} className="hidden" />
              <FaUser className={`w-5 h-5 ${role === 'Employee' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="text-gray-800">Employee</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="role" value="User" checked={role === 'User'} onChange={() => setRole('User')} className="hidden" />
              <FaUser className={`w-5 h-5 ${role === 'User' ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="text-gray-800">User</span>
            </label>
          </div>

          <div className="relative flex items-center">
            <input name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full text-sm text-gray-800 bg-white border-2 border-transparent focus:border-[#1E2772] pl-4 pr-8 py-3 rounded-md outline-none" placeholder="Enter name" />
            <FaUser className="w-5 h-5 absolute right-4 text-gray-400" />
          </div>

          <div className="relative flex items-center">
            <input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-sm text-gray-800 bg-white border-2 border-transparent focus:border-[#1E2772] pl-4 pr-8 py-3 rounded-md outline-none" placeholder="Enter email" />
            <FaEnvelope className="w-5 h-5 absolute right-4 text-gray-400" />
          </div>

          <div className="relative flex items-center">
            <input name="mobile" type="text" required value={mobile} onChange={handleMobileChange} className="w-full text-sm text-gray-800 bg-white border-2 border-transparent focus:border-[#1E2772] pl-4 pr-8 py-3 rounded-md outline-none" placeholder="Enter mobile number" maxLength="10" />
            <FaPhone className="w-5 h-5 absolute right-4 text-gray-400" />
          </div>

          <div className="relative flex items-center">
            <input name="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-sm text-gray-800 bg-white border-2 border-transparent focus:border-[#1E2772] pl-4 pr-8 py-3 rounded-md outline-none" placeholder="Enter password" />
            {showPassword ? <FaEyeSlash className="w-5 h-5 absolute right-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(false)} /> : <FaEye className="w-5 h-5 absolute right-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(true)} />}
          </div>

          <div className="relative flex items-center">
            <input name="confirm-password" type={showPassword ? 'text' : 'password'} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full text-sm text-gray-800 bg-white border-2 border-transparent focus:border-[#1E2772] pl-4 pr-8 py-3 rounded-md outline-none" placeholder="Confirm password" />
            {showPassword ? <FaEyeSlash className="w-5 h-5 absolute right-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(false)} /> : <FaEye className="w-5 h-5 absolute right-4 text-gray-400 cursor-pointer" onClick={() => setShowPassword(true)} />}
          </div>

          <div className="!mt-6">
            <button type="submit" disabled={loading} className="w-full py-2.5 px-4 text-base font-semibold rounded-md text-white bg-[#1E2772] hover:bg-[#1e4272] focus:outline-none">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateAccess;
