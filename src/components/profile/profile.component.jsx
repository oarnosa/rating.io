import React, { useState, useEffect } from "react";
import BlizzAPI from "blizzapi";

import "./profile.styles.scss";

const Profile = ({ realm, name }) => {
  // declare hooks to set and store data
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // request oauth access token with client info
    const api = new BlizzAPI({
      region: "us",
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET
    });

    // fetch and store profile data
    const fetchData = async () => {
      const data = await api.query(
        `/wow/character/${realm}/${name}?fields=profile,statistics,pvp,items`
      );

      const profile = {
        Name: data.name,
        Level: data.level,
        "Item Level": data.items.averageItemLevel,
        "Current 2v2": data.pvp.brackets.ARENA_BRACKET_2v2.rating,
        "Highest 2v2":
          data.statistics.subCategories[9].subCategories[0].statistics[24]
            .quantity,
        "Current 3v3": data.pvp.brackets.ARENA_BRACKET_3v3.rating,
        "Highest 3v3":
          data.statistics.subCategories[9].subCategories[0].statistics[23]
            .quantity,
        "Current RBG": data.pvp.brackets.ARENA_BRACKET_RBG.rating,
        "Honorable Kills": data.totalHonorableKills
      };

      setProfile(profile);
      console.log(data);
    };

    fetchData();
  }, [realm, name]);

  return (
    <div>
      <ul>
        {Object.entries(profile).map(([key, value], i) => (
          <li key={i}>
            {`${key}: `}
            <strong>{value}</strong>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          window.open(
            `https://worldofwarcraft.com/en-us/character/us/${realm}/${name}`
          )
        }
      >
        View Armory
      </button>
    </div>
  );
};

export default Profile;
