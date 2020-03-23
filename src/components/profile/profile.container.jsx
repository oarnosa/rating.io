import React, { useState, useEffect } from "react";
import BlizzAPI from "blizzapi";

import Profile from "./profile.component";

import "./profile.styles.scss";

const ProfileContainer = ({ realm, name }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const api = new BlizzAPI({
        region: "us",
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET
      });

      const accessToken = await api.getAccessToken();

      const urls = {
        profile: `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}?namespace=profile-us&locale=en_US&access_token=${accessToken}`,
        achievements: `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}/achievements/statistics?namespace=profile-us&locale=en_US&access_token=${accessToken}`,
        pvp_summary: `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}/pvp-summary?namespace=profile-us&locale=en_US&access_token=${accessToken}`,
        pvp_2v2: `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}/pvp-bracket/2v2?namespace=profile-us&locale=en_US&access_token=${accessToken}`,
        pvp_3v3: `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}/pvp-bracket/3v3?namespace=profile-us&locale=en_US&access_token=${accessToken}`,
        pvp_rbg: `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}/pvp-bracket/rbg?namespace=profile-us&locale=en_US&access_token=${accessToken}`
      };

      const data = await Promise.all([
        fetch(urls.profile).then(res => res.json()),
        fetch(urls.achievements).then(res => res.json()),
        fetch(urls.pvp_summary).then(res => res.json()),
        fetch(urls.pvp_2v2).then(res => res.json()),
        fetch(urls.pvp_3v3).then(res => res.json()),
        fetch(urls.pvp_rbg).then(res => res.json())
      ]);

      setData(data);
      setLoading(false);
    };

    fetchData();
  }, [realm, name]);

  return (
    <div className="profile">
      {loading ? (
        <p className="profile__loading">Looking for character...</p>
      ) : data === null || data[0].code > 400 ? (
        <p className="profile__error">
          No armory data for{" "}
          <strong>
            {name} - {realm}
          </strong>
        </p>
      ) : (
        <Profile data={data} />
      )}
    </div>
  );
};

export default ProfileContainer;
