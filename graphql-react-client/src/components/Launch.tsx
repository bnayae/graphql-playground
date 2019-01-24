import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { parse } from "url";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

export default function Launch(props: any) {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);
  return (
    <>
      <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          const {
            mission_name,
            launch_success,
            rocket: { rocket_name, rocket_type }
          } = data.launch;
          return (
            <>
              <div
                className={classNames({
                  succeed: launch_success,
                  failed: !launch_success
                })}
              >
                <h4>Mission: {mission_name}</h4>
                <p>
                  Roket: <b>"{rocket_name}"</b> of type "{rocket_type}"
                </p>
              </div>
              <Link to="/">Back</Link>
            </>
          );
        }}
      </Query>
    </>
  );
}
