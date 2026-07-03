import { useEffect, useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import api from "../api/api";

function ProfilePage() {

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const response =
          await api.get(
            "/profile"
          );

        setProfile(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
  className="
    min-h-screen
    relative
    overflow-hidden
    bg-gradient-to-br
    from-blue-50
    via-white
    to-purple-100
  "
>

      <Navbar />
      <div
  className="
    absolute
    top-20
    left-10
    w-96
    h-96
    bg-blue-300/30
    rounded-full
    blur-[120px]
    -z-10
  "
></div>

<div
  className="
    absolute
    right-10
    top-52
    w-96
    h-96
    bg-purple-300/30
    rounded-full
    blur-[120px]
    -z-10
  "
></div>

      <div
  className="
    relative
    z-10
    max-w-4xl
          mx-auto
          p-8
        "
      >

        <div
          className="
            bg-white/90
            backdrop-blur-lg
            rounded-3xl
            shadow-2xl
            border
            border-slate-200
            p-10
          "
        >

          {

            loading ? (

              <LoadingSpinner />

            ) : profile ? (

              <>

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    mb-10
                  "
                >

                  <div
                    className="
                      w-28
                      h-28
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      text-white
                      flex
                      items-center
                      justify-center
                      text-5xl
                      font-bold
                      shadow-xl
                    "
                  >
                    {
                      profile.name
                        .charAt(0)
                        .toUpperCase()
                    }
                  </div>

                  <h1
                    className="
                      text-4xl
                      font-bold
                      mt-5
                      text-slate-800
                    "
                  >
                    {profile.name}
                  </h1>

                  <p
                    className="
                      text-gray-500
                      mt-2
                    "
                  >
                    ✨ AI Content Creator
                  </p>

                </div>

                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-6
                  "
                >

                  {/* Email */}

                  <div
                    className="
                      bg-slate-50
                      rounded-2xl
                      border
                      border-slate-200
                      p-6
                    "
                  >

                    <p
                      className="
                        text-gray-500
                        mb-2
                      "
                    >
                      📧 Email
                    </p>

                    <h2
                      className="
                        text-xl
                        font-semibold
                        break-all
                      "
                    >
                      {profile.email}
                    </h2>

                  </div>

                  {/* Member Since */}

                  <div
                    className="
                      bg-slate-50
                      rounded-2xl
                      border
                      border-slate-200
                      p-6
                    "
                  >

                    <p
                      className="
                        text-gray-500
                        mb-2
                      "
                    >
                      📅 Member Since
                    </p>

                    <h2
                      className="
                        text-xl
                        font-semibold
                      "
                    >
                      {
                        new Date(
                          profile.member_since
                        ).toLocaleDateString()
                      }
                    </h2>

                  </div>

                  {/* Posts */}

                  <div
                    className="
                      bg-slate-50
                      rounded-2xl
                      border
                      border-slate-200
                      p-6
                    "
                  >

                    <p
                      className="
                        text-gray-500
                        mb-2
                      "
                    >
                      📄 Posts Generated
                    </p>

                    <h2
                      className="
                        text-3xl
                        font-bold
                        text-blue-600
                      "
                    >
                      {profile.posts_generated}
                    </h2>

                  </div>

                  {/* AI Model */}

                  <div
                    className="
                      bg-slate-50
                      rounded-2xl
                      border
                      border-slate-200
                      p-6
                    "
                  >

                    <p
                      className="
                        text-gray-500
                        mb-2
                      "
                    >
                      🤖 AI Model
                    </p>

                    <h2
                      className="
                        text-xl
                        font-semibold
                      "
                    >
                      {profile.ai_model}
                    </h2>

                  </div>

                </div>

              </>

            ) : (

              <div
                className="
                  text-center
                  py-16
                "
              >

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-red-600
                  "
                >
                  Unable to load profile
                </h2>

                <p
                  className="
                    text-gray-500
                    mt-3
                  "
                >
                  Please log in again.
                </p>

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default ProfilePage;