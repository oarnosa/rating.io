import React, { useState, useEffect } from "react";
import BlizzAPI from "blizzapi";

import "./profile.styles.scss";

const Profile = ({ region, realm, name }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);

      const api = new BlizzAPI({
        region: `${region}`,
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET
      });

      const accessToken = await api.getAccessToken();
      const url = `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${name}?namespace=profile-${region}&access_token=${accessToken}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      } catch (e) {
        setError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [region, realm, name]);

  return (
    <div className="profile">
      {isLoading ? (
        <div className="profile__loading">
          <p className="loading__msg">Looking for character...</p>
        </div>
      ) : error || data === null ? (
        <div className="profile__error">
          <p className="error__msg" style={{ color: "red" }}>
            No armory data found for{" "}
            <strong>
              {name} - {realm}
            </strong>
          </p>
        </div>
      ) : (
        <div className="profile__char">
          <p className="success__msg" style={{ color: "green" }}>
            Successfully found armory data for{" "}
            <strong>
              {name} - {realm}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
