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

      try {
        const data = await api.query(
          `/wow/character/${realm}/${name}?fields=profile,statistics,pvp,items`
        );
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
          <p className="error__msg">Character not found</p>
        </div>
      ) : (
        <div className="profile__char">
          <p className="char__stat ">
            Name: <strong>{data.name}</strong>
          </p>
          <p className="char__stat ">
            Level: <strong>{data.level}</strong>
          </p>
          <p className="char__stat ">
            Item Level: {data.items.averageItemLevel}
          </p>
          <p className="char__stat ">
            2v2 Current:{" "}
            <strong>{data.pvp.brackets.ARENA_BRACKET_2v2.rating}</strong>{" "}
            Highest:{" "}
            <strong>
              {
                data.statistics.subCategories[9].subCategories[0].statistics[24]
                  .quantity
              }
            </strong>
          </p>
          <p className="char__stat ">
            3v3 Current:{" "}
            <strong>{data.pvp.brackets.ARENA_BRACKET_3v3.rating}</strong>{" "}
            Highest:{" "}
            <strong>
              {
                data.statistics.subCategories[9].subCategories[0].statistics[23]
                  .quantity
              }
            </strong>
          </p>
          <p className="char__stat ">
            RBG Current:{" "}
            <strong>{data.pvp.brackets.ARENA_BRACKET_RBG.rating}</strong>
          </p>
          <p className="char__stat ">
            Honorable Kills: <strong>{data.totalHonorableKills}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
