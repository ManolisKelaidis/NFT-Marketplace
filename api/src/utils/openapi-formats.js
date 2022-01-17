const config = require("../config");

module.exports = {
  formats: [
    {
      name: "not-empty-string",
      type: "string",
      validate: (v) => {
        return v && v.trim() !== "";
      },
    },
    {
      name: "user-roles",
      type: "number",
      validate: (v) => {
        return Object.values(config.USER_TYPES).includes(v);
      },
    },
    {
      name: "devices-sort-by-option",
      type: "string",
      validate: (v) => {
        const FIELDS = [
          "proximId",
          "os",
          "osVersion",
          "carrier",
          "deviceModel",
          "deviceBrand",
          "gaid",
        ];
        return FIELDS.includes(v);
      },
    },
    {
      name: "sort-order",
      type: "number",
      validate: (v) => v == -1 || v == 1,
    },
    {
      name: "non-negative-number",
      type: "number",
      validate: (v) => v >= 0,
    },
    {
      name: "device-status",
      type: "number",
      validate: (v) => [1, 2, 3].includes(v),
    },

    {
      name: "positive-integer",
      type: "number",
      validate: (v) => v > 0,
    },
    {
      name: "scan-file-format",
      type: "string",
      validate: (v) => {
        let paramValueCapitalized = v.toUpperCase();
        let fileFormats = ["CSV", "XML"];
        return !v && fileFormats.includes(paramValueCapitalized);
      },
    },
    {
      name: "scans-sort-by-option",
      type: "string",
      validate: (v) => {
        const FIELDS = ["proximId", "name", "timestamp"];
        return FIELDS.includes(v);
      },
    },
    {
      name: "poi-sort-by-option",
      type: "string",
      validate: (v) => {
        const FIELDS = ["createdAt", "updatedAt", "placeName", "placeAddress"];
        return FIELDS.includes(v);
      },
    },
    {
      name: "request-status",
      type: "string",
      validate: (v) => {
        const STATUSES = [
          "approved",
          "rejected",
          "invited",
          "requested",
          "confirmed",
        ];
        console.log("🚀 ~ file: openapi-formats.js ~ line 87 ~ v", v);
        return v.every((value) => STATUSES.includes(value));
      },
    },
    {
      name: "request-type",
      type: "string",
      validate: (v) => {
        const TYPES = ["request", "invite"];
        return v.every((value) => TYPES.includes(value));
      },
    },
    {
      name: "time",
      type: "string",
      validate: (v) => {
        let pattern = /^([01]\d|2[0-3]):?([0-5]\d)$/g;
        return pattern.test(v);
      },
    },
    {
      name: "email",
      type: "string",
      validate: (v) => {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v);
      },
    },
    {
      name: "place-type",
      type: "string",
      validate: (v) => {
        let validPlaceTypes = [
          "accounting",
          "airport",
          "amusement_park",
          "aquarium",
          "art_gallery",
          "atm",
          "bakery",
          "bank",
          "bar",
          "beauty_salon",
          "bicycle_store",
          "book_store",
          "bowling_alley",
          "bus_station",
          "cafe",
          "campground",
          "car_dealer",
          "car_rental",
          "car_repair",
          "car_wash",
          "casino",
          "cemetery",
          "church",
          "city_hall",
          "clothing_store",
          "convenience_store",
          "courthouse",
          "dentist",
          "department_store",
          "doctor",
          "drugstore",
          "electrician",
          "electronics_store",
          "embassy",
          "fire_station",
          "florist",
          "funeral_home",
          "furniture_store",
          "gas_station",
          "gym",
          "hair_care",
          "hardware_store",
          "hindu_temple",
          "home_goods_store",
          "hospital",
          "insurance_agency",
          "jewelry_store",
          "laundry",
          "lawyer",
          "library",
          "light_rail_station",
          "liquor_store",
          "local_government_office",
          "locksmith",
          "lodging",
          "meal_delivery",
          "meal_takeaway",
          "mosque",
          "movie_rental",
          "movie_theater",
          "moving_company",
          "museum",
          "night_club",
          "painter",
          "park",
          "parking",
          "pet_store",
          "pharmacy",
          "physiotherapist",
          "plumber",
          "police",
          "post_office",
          "primary_school",
          "real_estate_agency",
          "restaurant",
          "roofing_contractor",
          "rv_park",
          "school",
          "secondary_school",
          "shoe_store",
          "shopping_mall",
          "spa",
          "stadium",
          "storage",
          "store",
          "subway_station",
          "supermarket",
          "synagogue",
          "taxi_stand",
          "tourist_attraction",
          "train_station",
          "transit_station",
          "travel_agency",
          "university",
          "veterinary_care",
          "zoo",
        ];
        return validPlaceTypes.includes(v);
      },
    },
    {
      name: "email-list",
      type: "string",
      validate: (v) => {
        let emails = typeof v == "string" ? v.split(/[;, \n]/) : v;

        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        for (const email of emails) {
          if (pattern.test(email) == false) return false;
        }

        return true;
      },
    },
  ],
};
