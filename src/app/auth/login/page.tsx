"use client";
import { loginRequest } from "@/authConfig";
import { useMsal } from "@azure/msal-react";
import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";

const LoginPage = () => {
  const { instance } = useMsal();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7007/api/";

  const handleMicrosoftLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const token = loginResponse.accessToken;

      axios
        .post(
          `${BASE_URL}external-auth/login`,
          { token: token, provider: "microsoft" },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((apiResponse) => {
          const jwtToken = apiResponse.data.accessToken;
          if (jwtToken) {
            localStorage.setItem("authToken", jwtToken);
            const decodedToken = jwtDecode(jwtToken);
            if (decodedToken.exp) {
              const expirationTime = decodedToken.exp * 1000;
              localStorage.setItem(
                "tokenExpiration",
                expirationTime.toString()
              );
            } else {
              setErrorMessage("Token expiration time is undefined.");
            }
          } else {
            setErrorMessage("No token found in API response!");
          }
        })
        .catch((error) => {
          setErrorMessage(
            error.response?.data || "Failed to log in with Microsoft."
          );
        });
    } catch {
      setErrorMessage("Microsoft Login failed. Please try again.");
    }
  };

  const handleGoogleLoginSuccess = (
    credentialResponse: GoogleCredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      setErrorMessage("Google credential is undefined.");
      return;
    }

    const token = credentialResponse.credential;

    axios
      .post(
        `${BASE_URL}external-auth/login`,
        { token: token, provider: "google" },
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      )
      .then(() => {
        localStorage.removeItem("authToken");
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
        setErrorMessage("Failed to log in with Google.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Login</h1>

      {/* Error Alert */}
      {errorMessage && (
        <div
          className="w-full max-w-sm mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <form className="w-full max-w-sm mb-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-black"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="text-gray-700 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Login
        </button>
      </form>

      <div className="w-full max-w-sm">
        <GoogleOAuthProvider clientId="889906333349-jolk3metmnq0l3rhm69pn7su5ihbp4ne.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              try {
                handleGoogleLoginSuccess(credentialResponse);
              } catch (error) {
                console.error(
                  "Error during Google login success handling:",
                  error
                );
                setErrorMessage("An error occurred during Google login.");
              }
            }}
            onError={() => {
              console.error("Google Login failed");
              setErrorMessage("Google Login failed. Please try again.");
            }}
          />
        </GoogleOAuthProvider>
        <button
          onClick={handleMicrosoftLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-2"
        >
          Login with Microsoft
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
