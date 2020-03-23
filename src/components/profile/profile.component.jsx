import React, { Fragment } from "react";

const Profile = ({
  data: [profile, achievements, pvp_summary, pvp_2v2, pvp_3v3, pvp_rbg]
}) => (
  <Fragment>
    <p className="profile__stat">
      <strong>{profile.code > 400 ? "no data found" : profile.name}</strong>
    </p>
    <p className="profile__stat">
      item level:{" "}
      <strong>
        {pvp_summary.code > 400 ? "no data found" : profile.average_item_level}
      </strong>
    </p>
    <p className="profile__stat">
      2v2 current:{" "}
      <strong>{pvp_2v2.code > 400 ? "no data found" : pvp_2v2.rating}</strong>{" "}
      highest:{" "}
      <strong>
        {achievements.code > 400
          ? "no data found"
          : achievements.statistics
              .find(item => item.name === "Player vs. Player")
              .sub_categories.find(item => item.name === "Rated Arenas")
              .statistics.find(
                item => item.name === "Highest 2 man personal rating"
              ).quantity}
      </strong>
    </p>
    <p className="profile__stat">
      3v3 current:{" "}
      <strong>{pvp_3v3.code > 400 ? "no data found" : pvp_3v3.rating}</strong>{" "}
      highest:{" "}
      <strong>
        {achievements.code > 400
          ? "no data found"
          : achievements.statistics
              .find(item => item.name === "Player vs. Player")
              .sub_categories.find(item => item.name === "Rated Arenas")
              .statistics.find(
                item => item.name === "Highest 3 man personal rating"
              ).quantity}
      </strong>
    </p>
    <p className="profile__stat">
      rbg current:{" "}
      <strong>{pvp_rbg.code > 400 ? "no data found" : pvp_rbg.rating}</strong>
    </p>
    <p className="profile__stat">
      honorable kills:{" "}
      <strong>
        {pvp_summary.code > 400 ? "no data found" : pvp_summary.honorable_kills}
      </strong>
    </p>
  </Fragment>
);

export default Profile;
