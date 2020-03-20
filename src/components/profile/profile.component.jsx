import React, { useState, useEffect } from "react";
import BlizzAPI from "blizzapi";

import "./profile.styles.scss";

const Profile = ({ realm, name }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);

      const api = new BlizzAPI({
        region: "us",
        clientId: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET
      });

      const accessToken = await api.getAccessToken();
      const url = `https://us.api.blizzard.com/profile/wow/character/${realm}/${name}?namespace=profile-us&locale=en_US&access_token=${accessToken}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (e) {
        setError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [realm, name]);

  return (
    <div className="profile">
      {isLoading ? (
        <div className="profile__loading">
          <p className="loading__msg">Looking for character...</p>
        </div>
      ) : error || data === null ? (
        <div className="profile__error">
          <p className="error__msg">
            No armory data found for{" "}
            <strong>
              {name} - {realm}
            </strong>
          </p>
        </div>
      ) : (
        <div className="profile__char">
          <p className="char__stat">
            Name: <strong>{data.name}</strong>
          </p>
          <p className="char__stat">
            Level: <strong>{data.level}</strong>
          </p>
          <p className="char__stat">
            Item Level: <strong>{data.average_item_level}</strong>
          </p>
          <p className="char__stat ">
            2v2 Current: <strong>{}</strong> Highest: <strong>{}</strong>
          </p>
          <p className="char__stat ">
            3v3 Current: <strong>{}</strong> Highest: <strong>{}</strong>
          </p>
          <p className="char__stat ">
            RBG Current: <strong>{}</strong>
          </p>
          <p className="char__stat ">
            Honorable Kills: <strong>{}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
