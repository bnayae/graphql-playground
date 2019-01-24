import React from "react";
import classNames from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function LaunchItem(props: any) {
  let {
    flight_number,
    mission_name,
    launch_date_local,
    launch_success
  } = props.launch;
  return (
    <div
      className={classNames({
        succeed: launch_success,
        failed: !launch_success
      })}
    >
      <div>
        <h4>Mission: {mission_name}</h4>
        <p>
          At: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
        </p>
      </div>
      <div>
        <Link to={`/launch/${flight_number}`} style={{ margin: 4 }}>
          Details
        </Link>
      </div>
    </div>
  );
}
