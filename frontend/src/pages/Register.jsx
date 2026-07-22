import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../services/auth.service";

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {

      return toast.error("Please fill all fields");

    }

    try {

      setLoading(true);

      const data = await registerUser(formData);

      toast.success(data.message);

      navigate("/login");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Registration Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center">

      <form

        onSubmit={handleSubmit}

        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"

      >

        <h1 className="text-3xl font-bold mb-6 text-center">

          Register

        </h1>

        <input

          type="text"

          name="name"

          placeholder="Full Name"

          value={formData.name}

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4"

        />

        <input

          type="email"

          name="email"

          placeholder="Email"

          value={formData.email}

          onChange={handleChange}

          className="w-full border p-3 rounded mb-4"

        />

        <input

          type="password"

          name="password"

          placeholder="Password"

          value={formData.password}

          onChange={handleChange}

          className="w-full border p-3 rounded mb-6"

        />

        <button

          disabled={loading}

          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"

        >

          {loading ? "Creating Account..." : "Register"}

        </button>

        <p className="text-center mt-5">

          Already have an account?{" "}

          <Link

            to="/login"

            className="text-blue-600"

          >

            Login

          </Link>

        </p>

      </form>

    </div>

  );

};

export default Register;