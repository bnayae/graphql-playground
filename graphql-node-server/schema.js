// https://github.com/r-spacex/SpaceX-API
// https://documenter.getpostman.com/view/2025350/RWaEzAiG
const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    /*
    # launches api:
    {
      launches {
        flight_number
        mission_name
        launch_year
          rocket {
          rocket_name
        }
      }
    }
    */ launches: {
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        let response = await axios.get(
          "https://api.spacexdata.com/v3/launches"
        );
        return response.data;
      }
    },
    /*
    # launch api:
    {
      launch(flight_number: 2) {
        mission_name
        rocket {
          rocket_name
        }
      }
    }
    */
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        let response = await axios.get(
          `https://api.spacexdata.com/v3/launches/${args.flight_number}`
        );
        return response.data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
