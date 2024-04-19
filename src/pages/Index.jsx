// Complete the Index page component here
// Use chakra-ui
import { useState, useEffect } from "react";
import { Box, Flex, Text, Heading, Image, SimpleGrid, Spinner, useColorModeValue } from "@chakra-ui/react";
import { FaCloudSun, FaTemperatureHigh, FaWind } from "react-icons/fa";

const cities = [
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Madrid", lat: 40.4168, lon: -3.7038 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
];

const fetchWeather = async (lat, lon) => {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
  if (!response.ok) {
    throw new Error("Weather data could not be fetched.");
  }
  return response.json();
};

const WeatherCard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather(city.lat, city.lon)
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching weather:", error));
  }, [city.lat, city.lon]);

  const cardBg = useColorModeValue("white", "gray.800");
  const tempColor = useColorModeValue("yellow.500", "yellow.300");

  return (
    <Box p={5} shadow="md" borderWidth="1px" bg={cardBg} borderRadius="lg">
      {loading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Heading fontSize="xl">{city.name}</Heading>
          <Text mt={2}>
            <FaCloudSun /> Weather: {weather?.current_weather?.weathercode}
          </Text>
          <Text mt={2}>
            <FaTemperatureHigh color={tempColor} /> Temperature: {weather?.current_weather?.temperature} °C
          </Text>
          <Text mt={2}>
            <FaWind /> Wind Speed: {weather?.current_weather?.windspeed} km/h
          </Text>
        </>
      )}
    </Box>
  );
};

const Index = () => {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" p={5}>
      <Heading mb={10}>Weather Dashboard</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
        {cities.map((city) => (
          <WeatherCard key={city.name} city={city} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Index;
